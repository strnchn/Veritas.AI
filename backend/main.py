"""
Aplicação principal FastAPI - Veritas.AI
Sistema de Avaliação de TCC com IA
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
from backend.config import settings
from backend.routes import evaluation


# Cria aplicação FastAPI
app = FastAPI(
    title="Veritas.AI",
    description="Sistema de Avaliação de TCC com IA - Banca Avaliadora Virtual",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# Configuração CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registra rotas
app.include_router(evaluation.router)

# Serve arquivos estáticos do frontend
frontend_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend")
if os.path.exists(frontend_path):
    app.mount("/static", StaticFiles(directory=frontend_path), name="static")
    
    @app.get("/")
    async def serve_frontend():
        """Serve a página principal do frontend"""
        index_path = os.path.join(frontend_path, "index.html")
        if os.path.exists(index_path):
            return FileResponse(index_path)
        return {"message": "Frontend não encontrado"}


@app.get("/api")
async def root():
    """Endpoint raiz da API"""
    return {
        "service": "Veritas.AI API",
        "version": "1.0.0",
        "description": "Sistema de Avaliação de TCC com IA",
        "endpoints": {
            "health": "/api/evaluation/health",
            "evaluate_text": "/api/evaluation/text",
            "evaluate_file": "/api/evaluation/file",
            "docs": "/api/docs"
        }
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "backend.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )

