# Veritas.AI - Sistema de Avaliação de TCC com IA

Sistema completo de avaliação de Trabalhos de Conclusão de Curso (TCC) utilizando Inteligência Artificial. O Veritas.AI simula uma banca avaliadora composta por três especialistas virtuais que analisam metodologia, normas ABNT, originalidade e coerência científica.

## Características

### Avaliadores Virtuais

1. **Avaliador 1 - Metodologia (0-3 pontos)**
   - Avalia coerência metodológica
   - Verifica clareza dos objetivos
   - Analisa adequação dos métodos aplicados

2. **Avaliador 2 - Escrita Acadêmica e ABNT (0-2 pontos)**
   - Verifica conformidade com normas ABNT
   - Avalia qualidade redacional
   - Analisa formatação de citações e referências

3. **Avaliador 3 - Originalidade e Coerência Científica (0-2 pontos)**
   - Detecta possíveis indícios de plágio
   - Avalia originalidade da contribuição
   - Verifica coerência científica

4. **Coerência Científica Geral (0-3 pontos)**
   - Qualidade da base teórica
   - Sustentação das conclusões
   - Relevância científica

**Nota Final:** Soma das pontuações (máximo 10.0)

### Funcionalidades

- Upload de arquivos PDF, DOCX e TXT
- Input de texto direto
- Análise completa com IA (Perplexity API)
- Resultados detalhados em modal
- Download de relatório em TXT
- Interface responsiva e moderna
- API REST completa

## Tecnologias Utilizadas

### Backend
- **FastAPI** - Framework web moderno e rápido
- **Python 3.11** - Linguagem de programação
- **Pydantic** - Validação de dados
- **python-docx** - Processamento de arquivos Word
- **PyPDF2/pdfplumber** - Processamento de PDFs
- **httpx** - Cliente HTTP assíncrono
- **Uvicorn** - Servidor ASGI

### Frontend
- **HTML5/CSS3/JavaScript** - Interface web
- **Fetch API** - Requisições HTTP
- **Design Responsivo** - Compatível com dispositivos móveis

### IA
- **Perplexity API** - Modelo de linguagem avançado
- **Prompt Engineering** - Sistema de três avaliadores

## Estrutura do Projeto

```
veritas.ai/
├── backend/
│   ├── main.py                 # Aplicação FastAPI principal
│   ├── config.py               # Configurações
│   ├── models.py               # Modelos Pydantic
│   ├── services/
│   │   ├── file_processor.py  # Processamento de arquivos
│   │   ├── perplexity_client.py # Cliente Perplexity API
│   │   └── evaluator.py       # Lógica de avaliação
│   ├── routes/
│   │   └── evaluation.py      # Endpoints da API
│   └── utils/
│       └── helpers.py          # Funções auxiliares
├── frontend/
│   ├── index.html              # Interface principal
│   ├── styles.css              # Estilos
│   └── script.js               # Lógica frontend
├── requirements.txt            # Dependências Python
├── .env.example                # Exemplo de configuração
├── .env                        # Configuração (criar)
├── run.sh                      # Script de inicialização
└── README.md                   # Esta documentação
```

## Instalação

### Pré-requisitos

- Python 3.11 ou superior
- pip (gerenciador de pacotes Python)
- Chave de API do Perplexity ([obtenha aqui](https://www.perplexity.ai/))

### Passo a Passo

1. **Clone ou baixe o projeto**
   ```bash
   cd veritas-ai
   ```

2. **Instale as dependências**
   ```bash
   pip3 install -r requirements.txt
   ```

3. **Configure a API Key do Perplexity**
   
   Edite o arquivo `.env` e adicione sua chave:
   ```
   PERPLEXITY_API_KEY=pplx-sua-chave-aqui
   ```

4. **Inicie o servidor**
   
   Usando o script:
   ```bash
   ./run.sh
   ```
   
   Ou manualmente:
   ```bash
   python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
   ```

5. **Acesse a aplicação**
   
   Abra seu navegador em: `http://localhost:8000`

## Uso

### Interface Web

1. Acesse `http://localhost:8000`
2. Escolha entre:
   - **Enviar Arquivo**: Upload de PDF, DOCX ou TXT
   - **Colar Texto**: Input direto do texto do TCC
3. Clique em "Avaliar TCC"
4. Aguarde a análise (pode levar alguns instantes)
5. Visualize os resultados no modal
6. Baixe o relatório em TXT se desejar

### API REST

#### Endpoints Disponíveis

**1. Health Check**
```http
GET /api/evaluation/health
```

**2. Avaliar Texto**
```http
POST /api/evaluation/text
Content-Type: application/json

{
  "text": "Texto completo do TCC aqui..."
}
```

**3. Avaliar Arquivo**
```http
POST /api/evaluation/file
Content-Type: multipart/form-data

file: arquivo.pdf
```

#### Exemplo de Resposta

```json
{
  "evaluator_1": {
    "name": "Avaliador 1 - Metodologia",
    "analysis": "Análise detalhada...",
    "score": 2.5
  },
  "evaluator_2": {
    "name": "Avaliador 2 - Escrita Acadêmica e ABNT",
    "analysis": "Análise detalhada...",
    "score": 1.8
  },
  "evaluator_3": {
    "name": "Avaliador 3 - Originalidade e Coerência Científica",
    "analysis": "Análise detalhada...",
    "score": 1.7
  },
  "final_verdict": {
    "summary": "Síntese geral...",
    "final_score": 8.5,
    "recommendations": "Recomendações específicas..."
  },
  "success": true,
  "message": "Avaliação concluída com sucesso"
}
```

### Documentação Interativa da API

Acesse `http://localhost:8000/api/docs` para a documentação Swagger interativa.

## Configuração

### Variáveis de Ambiente (.env)

```bash
# API Key do Perplexity (OBRIGATÓRIO)
PERPLEXITY_API_KEY=pplx-sua-chave-aqui

# Tamanho máximo de arquivo em MB
MAX_FILE_SIZE_MB=10

# Origens permitidas para CORS (separadas por vírgula)
ALLOWED_ORIGINS=http://localhost:8000,http://127.0.0.1:8000
```

### Personalização

#### Alterar Modelo da IA

Edite `backend/config.py`:
```python
perplexity_model: str = "llama-3.1-sonar-large-128k-online"
```

Modelos disponíveis:
- `llama-3.1-sonar-small-128k-online`
- `llama-3.1-sonar-large-128k-online`
- `llama-3.1-sonar-huge-128k-online`

#### Ajustar Prompt de Avaliação

Edite `backend/services/perplexity_client.py`, método `_build_evaluation_prompt()`.

## Limitações e Considerações

1. **API Key Necessária**: Requer chave válida do Perplexity
2. **Custos**: Uso da API pode gerar custos
3. **Tempo de Resposta**: Análises podem levar 30-60 segundos
4. **Tamanho de Arquivo**: Limite padrão de 10MB
5. **Detecção de Plágio**: Indicativa, não substitui ferramentas especializadas
6. **Normas ABNT**: Análise textual, não visual da formatação

## Solução de Problemas

### Erro: "API Key do Perplexity não configurada"
- Verifique se o arquivo `.env` existe
- Confirme que `PERPLEXITY_API_KEY` está configurada corretamente

### Erro ao processar PDF
- Tente converter para TXT ou DOCX
- Verifique se o PDF não está protegido ou criptografado

### Timeout na análise
- Textos muito longos podem exceder o timeout
- Tente dividir em seções menores

### Servidor não inicia
- Verifique se a porta 8000 está disponível
- Confirme que todas as dependências foram instaladas

## Desenvolvimento

### Executar em Modo de Desenvolvimento

```bash
python3.11 -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```

### Executar Testes

```bash
# Teste de health check
curl http://localhost:8000/api/evaluation/health

# Teste de avaliação de texto
curl -X POST http://localhost:8000/api/evaluation/text \
  -H "Content-Type: application/json" \
  -d '{"text": "Texto de teste com mais de 100 caracteres para validação do sistema de avaliação do Veritas.AI..."}'
```

## Segurança

- API Key armazenada em variável de ambiente
- Validação de tipos e tamanhos de arquivo
- CORS configurado adequadamente
- Arquivos temporários removidos após processamento
- Sem armazenamento de dados sensíveis

## Licença

Este projeto tem finalidade acadêmica e de portfólio. O uso de seu conteúdo em trabalhos ou publicações reais é de total responsabilidade do usuário.

## Suporte

Para dúvidas ou problemas:
1. Verifique a documentação
2. Consulte a seção de Solução de Problemas
3. Revise os logs do servidor

## Créditos

Desenvolvido por: Leonardo Fonseca
Ferramentas utilizadas: FastAPI, Python e Perplexity AI.

---

**Veritas.AI v1.0.0** - Sistema de Avaliação de TCC com Inteligência Artificial

