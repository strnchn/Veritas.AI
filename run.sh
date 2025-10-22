#!/bin/bash

# Script de inicialização do Veritas.AI

echo "=========================================="
echo "  Veritas.AI - Banca Avaliadora de TCC"
echo "=========================================="
echo ""

# Verifica se está no diretório correto
if [ ! -f "backend/main.py" ]; then
    echo "Erro: Execute este script a partir do diretório raiz do projeto"
    exit 1
fi

# Verifica se o arquivo .env existe
if [ ! -f ".env" ]; then
    echo "Aviso: Arquivo .env não encontrado!"
    echo "Criando .env a partir do .env.example..."
    cp .env.example .env
    echo ""
    echo "IMPORTANTE: Edite o arquivo .env e configure sua PERPLEXITY_API_KEY"
    echo "Pressione Enter para continuar..."
    read
fi

# Verifica se as dependências estão instaladas
echo "Verificando dependências..."
if ! python3.11 -c "import fastapi" 2>/dev/null; then
    echo "Instalando dependências..."
    pip3 install -r requirements.txt
fi

echo ""
echo "Iniciando servidor..."
echo "Acesse: http://localhost:8000"
echo "API Docs: http://localhost:8000/api/docs"
echo ""
echo "Pressione CTRL+C para parar o servidor"
echo ""

# Inicia o servidor
python3.11 -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload

