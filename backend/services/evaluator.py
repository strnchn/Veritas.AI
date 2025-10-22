"""
Serviço de avaliação que orquestra o processo de análise de TCC
"""
from typing import Dict, Any
from backend.services.perplexity_client import PerplexityClient
from backend.models import (
    EvaluationResponse,
    EvaluatorResponse,
    FinalVerdict
)


class EvaluatorService:
    """Serviço responsável pela orquestração da avaliação de TCCs"""
    
    def __init__(self):
        self.perplexity_client = PerplexityClient()
    
    async def evaluate(self, text: str) -> EvaluationResponse:
        """
        Avalia o texto do TCC usando a API do Perplexity
        
        Args:
            text: Texto completo do TCC
            
        Returns:
            EvaluationResponse: Resposta estruturada com avaliação completa
        """
        try:
            # Chama a API do Perplexity
            raw_evaluation = await self.perplexity_client.evaluate_text(text)
            
            # Valida e estrutura a resposta
            evaluation_response = self._parse_evaluation(raw_evaluation)
            
            return evaluation_response
        
        except Exception as e:
            raise Exception(f"Erro durante avaliação: {str(e)}")
    
    def _parse_evaluation(self, raw_data: Dict[str, Any]) -> EvaluationResponse:
        """
        Converte dados brutos da API em modelo estruturado
        
        Args:
            raw_data: Dados brutos da API
            
        Returns:
            EvaluationResponse: Modelo validado
        """
        try:
            # Extrai dados dos avaliadores
            evaluator_1 = EvaluatorResponse(
                name=raw_data["evaluator_1"]["name"],
                analysis=raw_data["evaluator_1"]["analysis"],
                score=float(raw_data["evaluator_1"]["score"])
            )
            
            evaluator_2 = EvaluatorResponse(
                name=raw_data["evaluator_2"]["name"],
                analysis=raw_data["evaluator_2"]["analysis"],
                score=float(raw_data["evaluator_2"]["score"])
            )
            
            evaluator_3 = EvaluatorResponse(
                name=raw_data["evaluator_3"]["name"],
                analysis=raw_data["evaluator_3"]["analysis"],
                score=float(raw_data["evaluator_3"]["score"])
            )
            
            # Extrai parecer final
            final_verdict = FinalVerdict(
                summary=raw_data["final_verdict"]["summary"],
                final_score=float(raw_data["final_verdict"]["final_score"]),
                recommendations=raw_data["final_verdict"]["recommendations"]
            )
            
            # Valida a nota final
            calculated_score = evaluator_1.score + evaluator_2.score + evaluator_3.score
            
            # Se a diferença for significativa, usa a nota calculada
            if abs(calculated_score - final_verdict.final_score) > 0.5:
                final_verdict.final_score = min(calculated_score, 10.0)
            
            return EvaluationResponse(
                evaluator_1=evaluator_1,
                evaluator_2=evaluator_2,
                evaluator_3=evaluator_3,
                final_verdict=final_verdict,
                success=True,
                message="Avaliação concluída com sucesso"
            )
        
        except KeyError as e:
            raise Exception(f"Estrutura de resposta inválida. Campo faltando: {str(e)}")
        except ValueError as e:
            raise Exception(f"Erro ao converter valores numéricos: {str(e)}")
        except Exception as e:
            raise Exception(f"Erro ao processar resposta da avaliação: {str(e)}")

