# Veritas.AI - Sistema de Avaliação de TCC com IA

<div align="center">

![Veritas.AI](https://img.shields.io/badge/Veritas.AI-v1.0.0-ff66cc?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![License](https://img.shields.io/badge/License-Academic-blue?style=for-the-badge)

**Sistema completo de avaliação de Trabalhos de Conclusão de Curso (TCC) utilizando Inteligência Artificial**

Uma banca avaliadora virtual composta por três especialistas que analisam metodologia, normas ABNT, originalidade e coerência científica.

[Começar Agora](#instalação) • [Documentação](#documentação) • [API](#api-rest) • [Demo](#uso)

</div>

---

## 📋 Índice

- [Características](#características)
- [Tecnologias](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Uso](#uso)
- [API REST](#api-rest)
- [Configuração](#configuração)
- [Desenvolvimento](#desenvolvimento)
- [Limitações](#limitações-e-considerações)
- [Licença](#licença)

---

## ✨ Características

### 🎓 Avaliadores Virtuais

O Veritas.AI simula uma banca avaliadora completa com quatro critérios de avaliação:

| Avaliador | Critério | Pontuação | Descrição |
|-----------|----------|-----------|-----------|
| **1** | Metodologia | 0-3 pontos | Avalia coerência metodológica, clareza dos objetivos e adequação dos métodos aplicados |
| **2** | Escrita Acadêmica | 0-2 pontos | Verifica conformidade com normas ABNT, qualidade redacional e formatação de citações |
| **3** | Originalidade | 0-2 pontos | Detecta possíveis indícios de plágio e avalia originalidade da contribuição científica |
| **4** | Coerência Científica | 0-3 pontos | Avalia qualidade da base teórica, sustentação das conclusões e relevância científica |

**Nota Final:** Soma das pontuações (máximo 10.0)

### 🚀 Funcionalidades

- ✅ Upload de arquivos **PDF, DOCX e TXT**
- ✅ Input de texto direto na interface
- ✅ Análise completa com IA (Perplexity API)
- ✅ Resultados detalhados em modal interativo
- ✅ Download de relatório completo em TXT
- ✅ Interface moderna e responsiva
- ✅ API REST completa e documentada
- ✅ Landing page profissional
- ✅ Aplicação web funcional integrada

---

## 🛠 Tecnologias Utilizadas

### Backend
- **FastAPI** - Framework web moderno e rápido para Python
- **Python 3.11** - Linguagem de programação
- **Pydantic** - Validação de dados e configurações
- **python-docx** - Processamento de arquivos Word
- **PyPDF2/pdfplumber** - Processamento de PDFs
- **httpx** - Cliente HTTP assíncrono
- **Uvicorn** - Servidor ASGI de alta performance

### Frontend
- **HTML5/CSS3/JavaScript** - Interface web moderna
- **Design System** - Inspirado em locomotive.ca
- **Tipografia** - Bodoni Moda + Inter
- **Fetch API** - Requisições HTTP assíncronas
- **Design Responsivo** - Mobile-first approach

### Inteligência Artificial
- **Perplexity API** - Modelo de linguagem avançado (Llama 3.1)
- **Prompt Engineering** - Sistema especializado de três avaliadores
- **Análise Contextual** - Compreensão profunda de textos acadêmicos

---

## 📁 Estrutura do Projeto

```
Veritas.AI/
├── backend/                    # Backend FastAPI
│   ├── main.py                # Aplicação principal
│   ├── config.py              # Configurações
│   ├── models.py              # Modelos Pydantic
│   ├── services/
│   │   ├── file_processor.py  # Processamento de arquivos
│   │   ├── perplexity_client.py # Cliente Perplexity API
│   │   └── evaluator.py       # Lógica de avaliação
│   ├── routes/
│   │   └── evaluation.py      # Endpoints da API
│   └── utils/
│       └── helpers.py          # Funções auxiliares
│
├── landing/                    # Landing page (apresentação)
│   ├── index.html             # Página inicial
│   ├── src/                   # Componentes React
│   └── public/                # Assets estáticos
│
├── app/                        # Aplicação funcional
│   ├── index.html             # Interface de avaliação
│   ├── styles.css             # Estilos da aplicação
│   └── script.js              # Lógica frontend
│
├── requirements.txt            # Dependências Python
├── .env.example               # Exemplo de configuração
├── run.sh                     # Script de inicialização
├── README.md                  # Esta documentação
├── QUICKSTART.md              # Guia rápido
└── PROJETO_COMPLETO.md        # Documentação técnica completa
```

---

## 🚀 Instalação

### Pré-requisitos

- **Python 3.11** ou superior
- **pip** (gerenciador de pacotes Python)
- **Chave de API do Perplexity** ([obtenha aqui](https://www.perplexity.ai/))

### Passo a Passo

1. **Clone ou baixe o projeto**
   ```bash
   git clone https://github.com/strnchn/Veritas.AI.git
   cd Veritas.AI
   ```

2. **Instale as dependências**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure a API Key do Perplexity**
   
   Crie um arquivo `.env` na raiz do projeto:
   ```bash
   PERPLEXITY_API_KEY=pplx-sua-chave-aqui
   ```

4. **Inicie o servidor**
   
   Usando o script:
   ```bash
   chmod +x run.sh
   ./run.sh
   ```
   
   Ou manualmente:
   ```bash
   python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
   ```

5. **Acesse a aplicação**
   
   - **Landing Page:** `http://localhost:8000`
   - **Aplicação:** `http://localhost:8000/app`
   - **API Docs:** `http://localhost:8000/api/docs`

---

## 💻 Uso

### Interface Web

1. Acesse `http://localhost:8000`
2. Clique em **"Avaliar TCC Agora"**
3. Escolha entre:
   - **Enviar Arquivo**: Upload de PDF, DOCX ou TXT
   - **Colar Texto**: Input direto do texto do TCC
4. Clique em **"Avaliar TCC"**
5. Aguarde a análise (pode levar 30-60 segundos)
6. Visualize os resultados detalhados no modal
7. Baixe o relatório em TXT se desejar

### Screenshots

<img width="1919" height="806" alt="image" src="https://github.com/user-attachments/assets/f6511380-3f16-4801-96d5-008a4cdd00e0" />


<img width="1893" height="913" alt="image" src="https://github.com/user-attachments/assets/4e17b92d-a841-46cd-9393-ce7a3a99f561" />


---

## 🔌 API REST

### Endpoints Disponíveis

#### 1. Health Check
```http
GET /api/evaluation/health
```

**Resposta:**
```json
{
  "status": "healthy",
  "message": "Veritas.AI API está funcionando corretamente"
}
```

#### 2. Avaliar Texto
```http
POST /api/evaluation/text
Content-Type: application/json

{
  "text": "Texto completo do TCC aqui..."
}
```

#### 3. Avaliar Arquivo
```http
POST /api/evaluation/file
Content-Type: multipart/form-data

file: arquivo.pdf
```

### Exemplo de Resposta

```json
{
  "evaluator_1": {
    "name": "Avaliador 1 - Metodologia",
    "analysis": "Análise detalhada da metodologia...",
    "score": 2.5
  },
  "evaluator_2": {
    "name": "Avaliador 2 - Escrita Acadêmica e ABNT",
    "analysis": "Análise da conformidade com normas...",
    "score": 1.8
  },
  "evaluator_3": {
    "name": "Avaliador 3 - Originalidade e Coerência Científica",
    "analysis": "Análise de originalidade...",
    "score": 1.7
  },
  "final_verdict": {
    "summary": "Síntese geral da avaliação...",
    "final_score": 8.5,
    "recommendations": "Recomendações específicas para melhoria..."
  },
  "success": true,
  "message": "Avaliação concluída com sucesso"
}
```

### Documentação Interativa

Acesse `http://localhost:8000/api/docs` para a documentação Swagger interativa completa.

---

## ⚙️ Configuração

### Variáveis de Ambiente (.env)

```bash
# API Key do Perplexity (OBRIGATÓRIO)
PERPLEXITY_API_KEY=pplx-sua-chave-aqui

# Tamanho máximo de arquivo em MB (padrão: 10)
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
- `sonar` (mais rápido, menor custo)
- `sonar-reasoning-pro` (balanceado)
- `sonar-deep-research` (mais preciso, maior custo)

#### Ajustar Prompt de Avaliação

Edite `backend/services/perplexity_client.py`, método `_build_evaluation_prompt()`.

---

## 🔧 Desenvolvimento

### Executar em Modo de Desenvolvimento

```bash
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
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

### Estrutura de Código

- **Backend:** Arquitetura em camadas (routes → services → utils)
- **Frontend:** Vanilla JavaScript com design moderno
- **API:** RESTful com validação Pydantic
- **Documentação:** Swagger/OpenAPI automática

---

## ⚠️ Limitações e Considerações

1. **API Key Necessária**: Requer chave válida do Perplexity
2. **Custos**: Uso da API pode gerar custos (consulte pricing da Perplexity)
3. **Tempo de Resposta**: Análises podem levar 30-60 segundos
4. **Tamanho de Arquivo**: Limite padrão de 10MB
5. **Detecção de Plágio**: Indicativa, não substitui ferramentas especializadas
6. **Normas ABNT**: Análise textual, não visual da formatação

---

## 🔒 Segurança

- ✅ API Key armazenada em variável de ambiente
- ✅ Validação de tipos e tamanhos de arquivo
- ✅ CORS configurado adequadamente
- ✅ Arquivos temporários removidos após processamento
- ✅ Sem armazenamento de dados sensíveis
- ✅ Rate limiting recomendado para produção

---

## 📄 Licença

Este projeto tem finalidade **acadêmica e de portfólio**. O uso de seu conteúdo em trabalhos ou publicações reais é de total responsabilidade do usuário.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

---

## 📞 Suporte

Para dúvidas ou problemas:

1. Verifique a [documentação completa](PROJETO_COMPLETO.md)
2. Consulte o [guia rápido](QUICKSTART.md)
3. Revise os logs do servidor
4. Abra uma issue no GitHub

---

## 👨‍💻 Créditos

**Desenvolvido por:** Leonardo Fonseca  
**Ferramentas:** FastAPI, Python, Perplexity AI  
**Design:** Inspirado em locomotive.ca  
**Versão:** 1.0.0

---

<div align="center">

**Veritas.AI v1.0.0** - Sistema de Avaliação de TCC com Inteligência Artificial

API 100% desenvolvida em Python com FastAPI

[⬆ Voltar ao topo](#veritasai---sistema-de-avaliação-de-tcc-com-ia)

</div>

