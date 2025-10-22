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

# Registra rotas da API
app.include_router(evaluation.router)

# Paths dos diretórios
base_path = os.path.dirname(os.path.dirname(__file__))
static_path = os.path.join(base_path, "static")
app_path = os.path.join(base_path, "app")

# Serve arquivos estáticos
if os.path.exists(static_path):
    app.mount("/static", StaticFiles(directory=static_path), name="static")


@app.get("/")
async def serve_landing():
    """Serve a landing page principal"""
    landing_index = os.path.join(static_path, "landing", "index.html")
    if os.path.exists(landing_index):
        return FileResponse(landing_index)
    return {"message": "Landing page não encontrada"}


@app.get("/home")
async def serve_home():
    """Serve a página intermediária com opções"""
    home_index = os.path.join(static_path, "home", "index.html")
    if os.path.exists(home_index):
        return FileResponse(home_index)
    return {"message": "Página home não encontrada"}


@app.get("/app")
async def serve_app():
    """Serve a aplicação de avaliação"""
    app_index = os.path.join(app_path, "index.html")
    if os.path.exists(app_index):
        return FileResponse(app_index)
    return {"message": "Aplicação não encontrada"}


@app.get("/api")
async def root():
    """Endpoint raiz da API"""
    return {
        "service": "Veritas.AI API",
        "version": "1.0.0",
        "description": "Sistema de Avaliação de TCC com IA",
        "endpoints": {
            "landing": "/",
            "home": "/home",
            "app": "/app",
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

