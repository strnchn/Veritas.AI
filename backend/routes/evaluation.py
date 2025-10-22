"""
Rotas para avaliação de TCC
"""
from fastapi import APIRouter, UploadFile, File, HTTPException, status
from fastapi.responses import JSONResponse
from backend.models import (
    TextEvaluationRequest,
    EvaluationResponse,
    ErrorResponse
)
from backend.services.evaluator import EvaluatorService
from backend.services.file_processor import FileProcessor
from backend.utils.helpers import (
    save_upload_file,
    cleanup_temp_file,
    validate_file_size,
    format_file_size
)
from backend.config import settings


router = APIRouter(prefix="/api/evaluation", tags=["Avaliação"])
evaluator_service = EvaluatorService()
file_processor = FileProcessor()


@router.post("/text", response_model=EvaluationResponse)
async def evaluate_text(request: TextEvaluationRequest):
    """
    Avalia texto de TCC enviado diretamente
    
    Args:
        request: Requisição contendo o texto do TCC
        
    Returns:
        EvaluationResponse: Avaliação completa do TCC
    """
    try:
        # Valida tamanho mínimo do texto
        if len(request.text.strip()) < 100:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="O texto deve conter pelo menos 100 caracteres"
            )
        
        # Realiza avaliação
        evaluation = await evaluator_service.evaluate(request.text)
        
        return evaluation
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao processar avaliação: {str(e)}"
        )


@router.post("/file", response_model=EvaluationResponse)
async def evaluate_file(file: UploadFile = File(...)):
    """
    Avalia TCC a partir de arquivo enviado (PDF, DOCX, TXT)
    
    Args:
        file: Arquivo enviado (PDF, DOCX ou TXT)
        
    Returns:
        EvaluationResponse: Avaliação completa do TCC
    """
    temp_file_path = None
    
    try:
        # Valida tipo de arquivo
        if not file_processor.is_allowed_file(file.filename):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Tipo de arquivo não permitido. Extensões aceitas: {', '.join(file_processor.ALLOWED_EXTENSIONS)}"
            )
        
        # Valida tamanho do arquivo
        file.file.seek(0, 2)  # Move para o final do arquivo
        file_size = file.file.tell()  # Obtém posição (tamanho)
        file.file.seek(0)  # Volta ao início
        
        if not validate_file_size(file_size):
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail=f"Arquivo muito grande. Tamanho máximo: {settings.max_file_size_mb}MB. Tamanho enviado: {format_file_size(file_size)}"
            )
        
        # Salva arquivo temporariamente
        temp_file_path, original_filename = await save_upload_file(file)
        
        # Processa arquivo e extrai texto
        text, file_type = file_processor.process_file(temp_file_path, original_filename)
        
        # Realiza avaliação
        evaluation = await evaluator_service.evaluate(text)
        
        # Adiciona informação sobre o arquivo processado
        evaluation.message = f"Arquivo {original_filename} ({file_type}) processado com sucesso"
        
        return evaluation
    
    except HTTPException:
        raise
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao processar arquivo: {str(e)}"
        )
    finally:
        # Limpa arquivo temporário
        if temp_file_path:
            cleanup_temp_file(temp_file_path)


@router.get("/health")
async def health_check():
    """
    Verifica status da API
    
    Returns:
        dict: Status da aplicação
    """
    return {
        "status": "online",
        "service": "Veritas.AI - Banca Avaliadora de TCC",
        "version": "1.0.0",
        "api_configured": bool(settings.perplexity_api_key)
    }

