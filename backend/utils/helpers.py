"""
Funções auxiliares para a aplicação
"""
import os
import tempfile
from typing import Tuple
from fastapi import UploadFile
from backend.config import settings


async def save_upload_file(upload_file: UploadFile) -> Tuple[str, str]:
    """
    Salva arquivo enviado temporariamente
    
    Args:
        upload_file: Arquivo enviado via FastAPI
        
    Returns:
        Tuple[str, str]: (caminho_temporário, nome_original)
    """
    # Cria arquivo temporário
    suffix = os.path.splitext(upload_file.filename)[1]
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=suffix)
    
    try:
        # Lê e salva o conteúdo
        content = await upload_file.read()
        temp_file.write(content)
        temp_file.close()
        
        return temp_file.name, upload_file.filename
    except Exception as e:
        # Remove arquivo temporário em caso de erro
        if os.path.exists(temp_file.name):
            os.unlink(temp_file.name)
        raise Exception(f"Erro ao salvar arquivo: {str(e)}")


def cleanup_temp_file(file_path: str):
    """
    Remove arquivo temporário
    
    Args:
        file_path: Caminho do arquivo a ser removido
    """
    try:
        if os.path.exists(file_path):
            os.unlink(file_path)
    except Exception as e:
        print(f"Aviso: Não foi possível remover arquivo temporário {file_path}: {str(e)}")


def validate_file_size(file_size: int) -> bool:
    """
    Valida tamanho do arquivo
    
    Args:
        file_size: Tamanho do arquivo em bytes
        
    Returns:
        bool: True se o tamanho é válido
    """
    max_size_bytes = settings.max_file_size_mb * 1024 * 1024
    return file_size <= max_size_bytes


def format_file_size(size_bytes: int) -> str:
    """
    Formata tamanho de arquivo para exibição
    
    Args:
        size_bytes: Tamanho em bytes
        
    Returns:
        str: Tamanho formatado (ex: "2.5 MB")
    """
    for unit in ['B', 'KB', 'MB', 'GB']:
        if size_bytes < 1024.0:
            return f"{size_bytes:.1f} {unit}"
        size_bytes /= 1024.0
    return f"{size_bytes:.1f} TB"

