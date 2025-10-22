"""
Configurações da aplicação Veritas.AI
"""
from pydantic_settings import BaseSettings
from typing import List, Union


class Settings(BaseSettings):
    """Configurações da aplicação"""
    
    # API Keys
    perplexity_api_key: str = ""
    
    # Configurações de arquivo
    max_file_size_mb: int = 10
    allowed_file_types: List[str] = [".pdf", ".docx", ".txt"]
    
    # CORS
    allowed_origins: str = "http://localhost:8000,http://127.0.0.1:8000,http://localhost:3000,http://127.0.0.1:3000"
    
    @property
    def allowed_origins_list(self) -> List[str]:
        """Converte string de origens em lista"""
        return [origin.strip() for origin in self.allowed_origins.split(',')]
    
    # Perplexity API
    perplexity_api_url: str = "https://api.perplexity.ai/chat/completions"
    perplexity_model: str = "llama-3.1-sonar-large-128k-online"
    
    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()

