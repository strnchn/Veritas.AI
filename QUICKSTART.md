# Guia Rápido - Veritas.AI

## Início Rápido em 3 Passos

### 1. Configure a API Key do Perplexity

Edite o arquivo `.env` e adicione sua chave:

```bash
PERPLEXITY_API_KEY=pplx-sua-chave-aqui
```

**Como obter a chave:**
1. Acesse https://www.perplexity.ai/
2. Crie uma conta ou faça login
3. Vá em Settings > API
4. Gere uma nova API Key
5. Copie e cole no arquivo `.env`

### 2. Instale as Dependências

```bash
pip3 install -r requirements.txt
```

### 3. Inicie o Servidor

```bash
./run.sh
```

Ou manualmente:

```bash
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```

## Acesse a Aplicação

- **Landing Page:** http://localhost:8000
- **Aplicação de Avaliação:** http://localhost:8000/app
- **API Docs:** http://localhost:8000/api/docs
- **Health Check:** http://localhost:8000/api/evaluation/health

## Teste Rápido

### Via Interface Web

1. Abra http://localhost:8000 (landing page)
2. Clique em "Avaliar TCC Agora"
3. Escolha "Enviar Arquivo" ou "Colar Texto"
4. Faça upload do seu TCC ou cole o texto
5. Clique em "Avaliar TCC"
6. Aguarde o resultado (30-60 segundos)
7. Visualize os resultados e baixe o relatório

### Via API (curl)

```bash
# Health Check
curl http://localhost:8000/api/evaluation/health

# Avaliação de texto
curl -X POST http://localhost:8000/api/evaluation/text \
  -H "Content-Type: application/json" \
  -d @- << 'EOF'
{
  "text": "Seu texto de TCC aqui com pelo menos 100 caracteres para ser válido..."
}
EOF
```

## Formatos Suportados

- **PDF** (.pdf)
- **Word** (.docx)
- **Texto** (.txt)

## Limites

- Tamanho máximo: 10MB
- Texto mínimo: 100 caracteres

## Solução Rápida de Problemas

### Erro: "API Key não configurada"
→ Edite `.env` e adicione `PERPLEXITY_API_KEY=sua-chave`

### Erro: "Porta 8000 em uso"
→ Mude a porta: `--port 8001`

### Erro ao processar PDF
→ Tente converter para TXT ou DOCX

## Próximos Passos

- Leia o [README.md](README.md) completo
- Explore a documentação da API em `/api/docs`
- Personalize o prompt em `backend/services/perplexity_client.py`

---

**Pronto!** Você já pode começar a avaliar TCCs com IA.

