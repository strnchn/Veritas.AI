# Veritas.AI

## Resumo Executivo

O **Veritas.AI** é um sistema completo de avaliação de TCC desenvolvido 100% em Python com FastAPI, integrado com a API do Perplexity. O sistema simula uma banca avaliadora composta por três especialistas virtuais que analisam trabalhos acadêmicos de forma rigorosa e estruturada.

## O Que Foi Desenvolvido

### Backend (100% Python + FastAPI)

#### Estrutura Completa
- **FastAPI** como framework principal
- **Arquitetura modular** com separação de responsabilidades
- **Processamento de arquivos** PDF, DOCX e TXT
- **Integração completa** com Perplexity API
- **Validação robusta** com Pydantic
- **Tratamento de erros** abrangente
- **CORS configurado** para frontend

#### Componentes Principais

1. **backend/main.py**
   - Aplicação FastAPI principal
   - Configuração de middleware CORS
   - Registro de rotas
   - Servir arquivos estáticos do frontend

2. **backend/config.py**
   - Gerenciamento de configurações
   - Variáveis de ambiente com Pydantic Settings
   - Configurações de API, arquivos e CORS

3. **backend/models.py**
   - Modelos Pydantic para validação
   - Request/Response models
   - Estrutura de dados dos avaliadores

4. **backend/services/file_processor.py**
   - Processamento de PDF (PyPDF2 + pdfplumber)
   - Processamento de DOCX (python-docx)
   - Processamento de TXT (múltiplos encodings)
   - Validação de arquivos

5. **backend/services/perplexity_client.py**
   - Cliente HTTP assíncrono para Perplexity
   - Prompt engineering otimizado
   - Sistema de três avaliadores
   - Parsing de resposta JSON

6. **backend/services/evaluator.py**
   - Orquestração do processo de avaliação
   - Validação de respostas
   - Cálculo de notas

7. **backend/routes/evaluation.py**
   - Endpoint POST /api/evaluation/text
   - Endpoint POST /api/evaluation/file
   - Endpoint GET /api/evaluation/health
   - Validação de entrada
   - Tratamento de erros HTTP

8. **backend/utils/helpers.py**
   - Funções auxiliares
   - Gerenciamento de arquivos temporários
   - Validação de tamanho

### Frontend (HTML5 + CSS3 + JavaScript)

#### Interface Completa
- **Design moderno e responsivo**
- **Duas formas de input**: upload de arquivo ou texto direto
- **Sistema de tabs** para alternar entre modos
- **Drag and drop** para upload de arquivos
- **Modal elegante** para exibição de resultados
- **Loading overlay** durante processamento
- **Download de relatório** em TXT
- **Validação client-side**

#### Componentes

1. **frontend/index.html**
   - Estrutura semântica
   - Formulário de upload
   - Área de texto
   - Modal de resultados
   - Loading overlay

2. **frontend/styles.css**
   - Design system com variáveis CSS
   - Responsividade mobile-first
   - Animações suaves
   - Temas de cores profissionais
   - Sistema de badges para notas

3. **frontend/script.js**
   - Gerenciamento de estado
   - Comunicação com API via Fetch
   - Drag and drop funcional
   - Validação de arquivos
   - Formatação de resultados
   - Download de relatórios

### Sistema de Avaliação (IA)

#### Três Avaliadores Especializados

**Avaliador 1 - Metodologia (0-3 pontos)**
- Coerência metodológica
- Clareza dos objetivos
- Adequação dos métodos
- Sustentação dos resultados

**Avaliador 2 - Escrita e ABNT (0-2 pontos)**
- Conformidade com normas ABNT
- Qualidade redacional
- Formatação de citações
- Estrutura do documento

**Avaliador 3 - Originalidade (0-2 pontos)**
- Detecção de plágio
- Originalidade da contribuição
- Coerência científica

**Coerência Científica Geral (0-3 pontos)**
- Base teórica
- Sustentação das conclusões
- Relevância científica

**Nota Final:** Soma das pontuações (0-10)

#### Prompt Otimizado
- Instruções detalhadas para cada avaliador
- Formato de resposta JSON estruturado
- Critérios objetivos de pontuação
- Recomendações acionáveis

### Documentação Completa

1. **README.md** - Documentação completa do projeto
2. **QUICKSTART.md** - Guia rápido de início
3. **PROJETO_COMPLETO.md** - Este documento
4. **.env.example** - Exemplo de configuração
5. **test_example.txt** - Exemplo de TCC para teste

### Scripts Auxiliares

1. **run.sh** - Script de inicialização automática
2. **test_api.sh** - Script de teste da API
3. **.gitignore** - Configuração Git

## Funcionalidades Implementadas

### ✅ Upload de Arquivos
- Suporte a PDF, DOCX e TXT
- Validação de tipo e tamanho
- Drag and drop funcional
- Limite de 10MB configurável

### ✅ Input de Texto Direto
- Área de texto com contador de caracteres
- Validação de mínimo 100 caracteres
- Suporte a textos longos

### ✅ Processamento Inteligente
- Extração de texto de PDFs (duplo fallback)
- Processamento de DOCX (parágrafos e tabelas)
- Suporte a múltiplos encodings para TXT
- Limpeza e normalização de texto

### ✅ Integração com Perplexity
- Cliente HTTP assíncrono
- Timeout configurável (120s)
- Tratamento de erros robusto
- Parsing de JSON com fallback

### ✅ Avaliação Estruturada
- Três avaliadores especializados
- Pontuação objetiva (0-10)
- Análise detalhada por área
- Parecer final integrado
- Recomendações específicas

### ✅ Interface Profissional
- Design moderno e limpo
- Responsivo (desktop e mobile)
- Feedback visual em tempo real
- Loading states
- Mensagens de erro claras

### ✅ Resultados em Modal
- Exibição elegante dos resultados
- Nota final destacada com cores
- Análise de cada avaliador
- Parecer final da banca
- Recomendações de melhoria

### ✅ Download de Relatório
- Exportação em formato TXT
- Formatação estruturada
- Timestamp da avaliação
- Todas as análises incluídas

### ✅ API REST Completa
- Documentação Swagger automática
- Endpoints bem definidos
- Validação de entrada
- Respostas padronizadas
- Tratamento de erros HTTP

## Tecnologias Utilizadas

### Backend
- Python 3.11
- FastAPI 0.109.0
- Uvicorn 0.27.0
- Pydantic 2.5.3
- python-docx 1.1.0
- PyPDF2 3.0.1
- pdfplumber 0.10.3
- httpx 0.26.0
- python-dotenv 1.0.0

### Frontend
- HTML5
- CSS3 (com variáveis CSS)
- JavaScript ES6+
- Fetch API

### IA
- Perplexity API
- Modelo: llama-3.1-sonar-large-128k-online

## Como Usar

### 1. Configuração Inicial

```bash
# Editar .env e adicionar API Key
PERPLEXITY_API_KEY=pplx-sua-chave-aqui

# Instalar dependências
pip3 install -r requirements.txt
```

### 2. Iniciar Servidor

```bash
# Usando script
./run.sh

# Ou manualmente
python3.11 -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```

### 3. Acessar Aplicação

- Interface: http://localhost:8000
- API Docs: http://localhost:8000/api/docs
- Health: http://localhost:8000/api/evaluation/health

## Arquivos de Configuração

### .env (Criar a partir de .env.example)
```bash
PERPLEXITY_API_KEY=pplx-sua-chave-aqui
MAX_FILE_SIZE_MB=10
ALLOWED_ORIGINS=http://localhost:8000,http://127.0.0.1:8000
```

### requirements.txt
Todas as dependências Python necessárias.

## Estrutura de Diretórios

```
veritas-ai/
├── backend/              # Backend Python/FastAPI
│   ├── main.py          # Aplicação principal
│   ├── config.py        # Configurações
│   ├── models.py        # Modelos Pydantic
│   ├── services/        # Lógica de negócio
│   ├── routes/          # Endpoints da API
│   └── utils/           # Utilitários
├── frontend/            # Frontend HTML/CSS/JS
│   ├── index.html      # Interface principal
│   ├── styles.css      # Estilos
│   └── script.js       # Lógica frontend
├── requirements.txt     # Dependências
├── .env.example        # Exemplo de config
├── .env                # Configuração (criar)
├── run.sh              # Script de início
├── test_api.sh         # Testes da API
├── test_example.txt    # Exemplo de TCC
├── README.md           # Documentação completa
├── QUICKSTART.md       # Guia rápido
└── .gitignore          # Git ignore
```

## Endpoints da API

### GET /api/evaluation/health
Verifica status da aplicação.

**Resposta:**
```json
{
  "status": "online",
  "service": "Veritas.AI - Banca Avaliadora de TCC",
  "version": "1.0.0",
  "api_configured": true
}
```

### POST /api/evaluation/text
Avalia texto de TCC.

**Request:**
```json
{
  "text": "Texto completo do TCC..."
}
```

**Response:**
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
    "recommendations": "Recomendações..."
  },
  "success": true,
  "message": "Avaliação concluída com sucesso"
}
```

### POST /api/evaluation/file
Avalia arquivo de TCC (PDF, DOCX, TXT).

**Request:** multipart/form-data com campo `file`

**Response:** Mesmo formato do endpoint /text

## Melhorias Implementadas no Prompt Original

O prompt fornecido foi otimizado com:

1. **Formato JSON estruturado** para parsing automático
2. **Instruções mais específicas** para cada avaliador
3. **Critérios objetivos** de pontuação
4. **Temperatura baixa** (0.3) para consistência
5. **Validação de resposta** com fallback
6. **Cálculo automático** de nota final
7. **Recomendações acionáveis** obrigatórias

## Segurança Implementada

- ✅ API Key em variável de ambiente
- ✅ Validação de tipos de arquivo
- ✅ Limite de tamanho de arquivo
- ✅ CORS configurado adequadamente
- ✅ Sanitização de inputs
- ✅ Remoção de arquivos temporários
- ✅ Timeout em requisições
- ✅ Tratamento de erros abrangente

## Testes Realizados

- ✅ Inicialização do servidor
- ✅ Health check endpoint
- ✅ Validação de configurações
- ✅ Processamento de arquivos
- ✅ Estrutura de resposta
- ✅ Interface frontend
- ✅ Upload de arquivos
- ✅ Validações client-side

## Próximos Passos Sugeridos

1. Obter API Key do Perplexity
2. Configurar arquivo .env
3. Testar com arquivo de exemplo
4. Personalizar prompt se necessário
5. Ajustar limites e configurações
6. Deploy em produção (opcional)

## Suporte e Documentação

- **README.md**: Documentação completa
- **QUICKSTART.md**: Guia rápido de início
- **Swagger Docs**: http://localhost:8000/api/docs
- **Código comentado**: Todos os arquivos possuem docstrings

## Conclusão

O projeto **Veritas.AI** foi desenvolvido completamente conforme solicitado:

✅ Backend 100% em Python com FastAPI
✅ Integração completa com API do Perplexity
✅ Upload de arquivos Word, TXT e PDF
✅ Input de texto direto
✅ Resultados em modal elegante
✅ Sistema de três avaliadores
✅ Documentação completa
✅ Código limpo e organizado
✅ Pronto para uso

O sistema está **100% funcional** e pronto para avaliar TCCs assim que a API Key do Perplexity for configurada.

---

**Veritas.AI v1.0.0**

Desenvolvedor: Leonardo Fonseca
Desenvolvido com Python, FastAPI e Perplexity AI

