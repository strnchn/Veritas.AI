"""
Cliente para integração com a API do Perplexity
"""
import httpx
import json
from typing import Dict, Any
from backend.config import settings


class PerplexityClient:
    """Cliente para comunicação com a API do Perplexity"""
    
    def __init__(self):
        self.api_url = settings.perplexity_api_url
        self.api_key = settings.perplexity_api_key
        self.model = settings.perplexity_model
        self.timeout = 120.0  # 2 minutos de timeout
    
    def _get_headers(self) -> Dict[str, str]:
        """Retorna os headers para a requisição"""
        return {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
    
    def _build_evaluation_prompt(self, text: str) -> str:
        """
        Constrói o prompt otimizado para avaliação de TCC
        
        Args:
            text: Texto do TCC a ser avaliado
            
        Returns:
            str: Prompt formatado
        """
        prompt = f"""Você é o sistema Veritas.AI, uma banca avaliadora de TCC composta por três avaliadores virtuais especializados. Sua missão é analisar o artigo científico fornecido com rigor acadêmico e emitir um parecer estruturado.

## COMPOSIÇÃO DA BANCA

**Avaliador 1 - Metodologia (0-3 pontos)**
- Avalia coerência metodológica, clareza dos objetivos, adequação dos métodos
- Verifica se a metodologia está bem descrita e justificada
- Analisa se os resultados são sustentados pela metodologia aplicada

**Avaliador 2 - Escrita Acadêmica e ABNT (0-2 pontos)**
- Verifica conformidade com normas ABNT (NBR 6023, 10520, 6024, 6028)
- Avalia qualidade redacional, clareza, coesão e coerência textual
- Analisa formatação de citações, referências e estrutura do documento

**Avaliador 3 - Originalidade e Coerência Científica (0-2 pontos)**
- Detecta possíveis indícios de plágio ou paráfrases inadequadas
- Avalia originalidade da contribuição científica
- Verifica coerência entre objetivos, metodologia, resultados e conclusões

**Coerência Científica Geral (0-3 pontos)**
- Qualidade da base teórica
- Sustentação das conclusões pelos dados apresentados
- Relevância e contribuição científica do trabalho

## INSTRUÇÕES DE ANÁLISE

1. Leia cuidadosamente todo o artigo
2. Identifique: título, resumo, introdução, objetivos, metodologia, resultados, conclusão e referências
3. Para cada avaliador, faça uma análise crítica e objetiva
4. Aponte pontos fortes e fracos específicos
5. Para suspeitas de plágio, indique trechos e classifique o risco (Baixo/Médio/Alto)
6. Atribua pontuações parciais justificadas
7. Calcule a nota final (soma das pontuações, máximo 10)
8. Forneça recomendações concretas e acionáveis

## FORMATO DE RESPOSTA OBRIGATÓRIO (JSON)

Responda APENAS com um objeto JSON válido, sem texto adicional antes ou depois:

{{
  "evaluator_1": {{
    "name": "Avaliador 1 - Metodologia",
    "analysis": "Análise detalhada da metodologia, objetivos e coerência metodológica. Mínimo 200 caracteres.",
    "score": 0.0
  }},
  "evaluator_2": {{
    "name": "Avaliador 2 - Escrita Acadêmica e ABNT",
    "analysis": "Análise detalhada da conformidade ABNT e qualidade redacional. Mínimo 200 caracteres.",
    "score": 0.0
  }},
  "evaluator_3": {{
    "name": "Avaliador 3 - Originalidade e Coerência Científica",
    "analysis": "Análise de originalidade, plágio e coerência científica. Mínimo 200 caracteres.",
    "score": 0.0
  }},
  "final_verdict": {{
    "summary": "Síntese geral da avaliação com visão integrada dos três avaliadores. Mínimo 300 caracteres.",
    "final_score": 0.0,
    "recommendations": "Recomendações específicas e acionáveis para melhoria do trabalho. Mínimo 200 caracteres."
  }}
}}

## ARTIGO PARA AVALIAÇÃO

{text}

---

Agora, avalie o artigo acima seguindo rigorosamente as instruções e retorne APENAS o JSON formatado."""
        
        return prompt
    
    async def evaluate_text(self, text: str) -> Dict[str, Any]:
        """
        Envia texto para avaliação via API do Perplexity
        
        Args:
            text: Texto do TCC a ser avaliado
            
        Returns:
            Dict: Resposta estruturada da avaliação
        """
        if not self.api_key:
            raise ValueError("API Key do Perplexity não configurada. Configure a variável PERPLEXITY_API_KEY no arquivo .env")
        
        prompt = self._build_evaluation_prompt(text)
        
        payload = {
            "model": self.model,
            "messages": [
                {
                    "role": "system",
                    "content": "Você é um sistema especializado em avaliação acadêmica. Responda sempre em formato JSON válido, sem texto adicional."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "temperature": 0.3,  # Baixa temperatura para respostas mais consistentes
            "max_tokens": 4000
        }
        
        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                response = await client.post(
                    self.api_url,
                    headers=self._get_headers(),
                    json=payload
                )
                
                response.raise_for_status()
                
                result = response.json()
                
                # Extrai o conteúdo da resposta
                if "choices" in result and len(result["choices"]) > 0:
                    content = result["choices"][0]["message"]["content"]
                    
                    # Tenta parsear o JSON da resposta
                    try:
                        # Remove possíveis marcadores de código
                        content = content.strip()
                        if content.startswith("```json"):
                            content = content[7:]
                        if content.startswith("```"):
                            content = content[3:]
                        if content.endswith("```"):
                            content = content[:-3]
                        content = content.strip()
                        
                        evaluation_data = json.loads(content)
                        return evaluation_data
                    except json.JSONDecodeError as e:
                        raise Exception(f"Erro ao parsear resposta JSON da IA: {str(e)}\nConteúdo: {content[:500]}")
                else:
                    raise Exception("Resposta da API não contém choices")
        
        except httpx.HTTPStatusError as e:
            raise Exception(f"Erro HTTP ao chamar API Perplexity: {e.response.status_code} - {e.response.text}")
        except httpx.TimeoutException:
            raise Exception("Timeout ao chamar API Perplexity. O texto pode ser muito longo.")
        except Exception as e:
            raise Exception(f"Erro ao comunicar com API Perplexity: {str(e)}")

