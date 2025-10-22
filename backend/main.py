"""
Aplicação principal FastAPI - Veritas.AI
Sistema de Avaliação de TCC com IA
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, HTMLResponse
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
landing_path = os.path.join(base_path, "landing")
app_path = os.path.join(base_path, "app")

# Serve arquivos estáticos da aplicação
if os.path.exists(app_path):
    app.mount("/static/app", StaticFiles(directory=app_path), name="app_static")

# Serve arquivos estáticos da landing page
if os.path.exists(landing_path):
    # Monta os arquivos públicos da landing
    landing_public = os.path.join(landing_path, "public")
    if os.path.exists(landing_public):
        app.mount("/static/landing", StaticFiles(directory=landing_public), name="landing_static")
    
    # Monta os assets do src (se houver arquivos compilados)
    landing_src = os.path.join(landing_path, "src")
    if os.path.exists(landing_src):
        app.mount("/static/src", StaticFiles(directory=landing_src), name="src_static")


@app.get("/")
async def serve_landing():
    """Serve a landing page"""
    # Para a landing page React, precisamos servir um HTML simples que carrega os assets
    landing_html = """
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Veritas.AI - Sistema de Avaliação de TCC com IA</title>
    <meta name="description" content="Sistema de avaliação de TCC com inteligência artificial. Banca avaliadora virtual composta por três especialistas.">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #1a1a1a;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            text-align: center;
            padding: 2rem;
        }
        .container {
            max-width: 600px;
        }
        h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, #ffccf6, #a8d8ea);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        p {
            font-size: 1.25rem;
            color: #b0b0b0;
            margin-bottom: 2rem;
            line-height: 1.6;
        }
        .btn {
            display: inline-block;
            padding: 1rem 2.5rem;
            background: #ffccf6;
            color: #1a1a1a;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            margin: 0.5rem;
        }
        .btn:hover {
            background: #ffa8e8;
            transform: translateY(-2px);
        }
        .btn-secondary {
            background: transparent;
            border: 2px solid #ffccf6;
            color: #ffccf6;
        }
        .btn-secondary:hover {
            background: rgba(255, 204, 246, 0.1);
        }
        .features {
            margin-top: 3rem;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            text-align: left;
        }
        .feature {
            background: #0d0d0d;
            padding: 1.5rem;
            border-radius: 8px;
            border: 1px solid #333;
        }
        .feature h3 {
            color: #ffccf6;
            margin-bottom: 0.5rem;
            font-size: 1.1rem;
        }
        .feature p {
            font-size: 0.95rem;
            margin: 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Veritas.AI®</h1>
        <p>Sistema de Avaliação de TCC com Inteligência Artificial</p>
        <p>Uma banca avaliadora virtual composta por três especialistas que analisam trabalhos acadêmicos de forma rigorosa e estruturada.</p>
        
        <div>
            <a href="/app" class="btn">Avaliar TCC Agora</a>
            <a href="/api/docs" class="btn btn-secondary">Documentação da API</a>
        </div>
        
        <div class="features">
            <div class="feature">
                <h3>Metodologia</h3>
                <p>Avalia coerência metodológica e adequação dos métodos aplicados (0-3 pontos)</p>
            </div>
            <div class="feature">
                <h3>Escrita Acadêmica</h3>
                <p>Verifica conformidade com normas ABNT e qualidade redacional (0-2 pontos)</p>
            </div>
            <div class="feature">
                <h3>Originalidade</h3>
                <p>Detecta indícios de plágio e avalia originalidade científica (0-2 pontos)</p>
            </div>
            <div class="feature">
                <h3>Coerência Científica</h3>
                <p>Avalia base teórica e relevância científica do trabalho (0-3 pontos)</p>
            </div>
        </div>
    </div>
</body>
</html>
    """
    return HTMLResponse(content=landing_html)


@app.get("/app")
async def serve_app():
    """Serve a aplicação de avaliação"""
    index_path = os.path.join(app_path, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
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

