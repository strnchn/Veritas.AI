"""
Modelos de dados para a aplicação Veritas.AI
"""
from pydantic import BaseModel, Field
from typing import Optional


class TextEvaluationRequest(BaseModel):
    """Requisição de avaliação de texto direto"""
    text: str = Field(..., min_length=100, description="Texto do TCC a ser avaliado")


class EvaluatorResponse(BaseModel):
    """Resposta de um avaliador individual"""
    name: str = Field(..., description="Nome do avaliador")
    analysis: str = Field(..., description="Análise detalhada")
    score: float = Field(..., ge=0, description="Pontuação parcial")


class FinalVerdict(BaseModel):
    """Parecer final da banca"""
    summary: str = Field(..., description="Síntese geral da avaliação")
    final_score: float = Field(..., ge=0, le=10, description="Nota final (0-10)")
    recommendations: str = Field(..., description="Recomendações de melhoria")


class EvaluationResponse(BaseModel):
    """Resposta completa da avaliação"""
    evaluator_1: EvaluatorResponse = Field(..., description="Avaliador de Metodologia")
    evaluator_2: EvaluatorResponse = Field(..., description="Avaliador de Escrita e ABNT")
    evaluator_3: EvaluatorResponse = Field(..., description="Avaliador de Originalidade")
    final_verdict: FinalVerdict = Field(..., description="Parecer final da banca")
    success: bool = Field(default=True, description="Status da avaliação")
    message: Optional[str] = Field(default=None, description="Mensagem adicional")


class ErrorResponse(BaseModel):
    """Resposta de erro"""
    success: bool = Field(default=False)
    message: str = Field(..., description="Mensagem de erro")
    detail: Optional[str] = Field(default=None, description="Detalhes do erro")

