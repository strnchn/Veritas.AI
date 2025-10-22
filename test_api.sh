#!/bin/bash

echo "=========================================="
echo "  Teste da API Veritas.AI"
echo "=========================================="
echo ""

# Verifica se o servidor está rodando
echo "1. Testando Health Check..."
curl -s http://localhost:8000/api/evaluation/health | python3.11 -m json.tool
echo ""
echo ""

# Teste de avaliação de texto
echo "2. Testando avaliação de texto..."
echo "(Este teste requer API Key configurada)"
echo ""

# Mostra exemplo de comando
echo "Exemplo de comando para testar avaliação:"
echo ""
echo 'curl -X POST http://localhost:8000/api/evaluation/text \'
echo '  -H "Content-Type: application/json" \'
echo '  -d '"'"'{"text": "Seu texto de TCC aqui com mais de 100 caracteres..."}'"'"
echo ""

