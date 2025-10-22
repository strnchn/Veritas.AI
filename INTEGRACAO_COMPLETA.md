# Veritas.AI - Integração Completa

## 📋 Visão Geral

O projeto Veritas.AI foi completamente integrado com um site moderno inspirado no design do locomotive.ca. O sistema agora possui três páginas distintas, todas com o mesmo estilo visual elegante e minimalista.

## 🎨 Estrutura do Projeto

### 1. Landing Page (`/`)
- **Localização**: `/static/landing/`
- **Descrição**: Página de apresentação profissional do projeto
- **Características**:
  - Design moderno inspirado no locomotive.ca
  - Tipografia Bodoni Moda para títulos
  - Paleta de cores dark com acentos rosa (#ffccf6), menta, coral e azul
  - Seções: Hero, Sobre, Avaliadores, Como Funciona, Tecnologias, FAQ, CTA, Footer
  - Animações suaves e scroll effects
  - Totalmente responsivo

### 2. Página Intermediária (`/home`)
- **Localização**: `/static/home/`
- **Descrição**: Página de escolha entre avaliar TCC ou ver documentação da API
- **Características**:
  - Dois cards principais: "Avaliar TCC" e "Documentação da API"
  - Mesmo estilo visual da landing page
  - Cards com bordas coloridas (amarelo e roxo)
  - Ícones informativos na parte inferior

### 3. Aplicação Funcional (`/app`)
- **Localização**: `/app/`
- **Descrição**: Interface de avaliação de TCC integrada com o backend FastAPI
- **Características**:
  - Upload de arquivos (PDF, DOCX, TXT) ou input de texto direto
  - Integração completa com a API do backend
  - Modal de resultados elegante
  - Download de relatórios
  - Mesmo estilo visual das outras páginas
  - Cards informativos sobre os critérios de avaliação

## 🚀 Como Executar

### Pré-requisitos
- Python 3.11+
- pip (gerenciador de pacotes Python)
- Chave de API do Perplexity AI

### Instalação

1. **Extrair o projeto**:
```bash
cd Veritas.AI
```

2. **Instalar dependências**:
```bash
pip install -r requirements.txt
```

3. **Configurar variáveis de ambiente**:
Crie um arquivo `.env` na raiz do projeto:
```env
PERPLEXITY_API_KEY=sua_chave_api_aqui
```

4. **Iniciar o servidor**:
```bash
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```

Ou use o script de inicialização:
```bash
chmod +x run.sh
./run.sh
```

5. **Acessar o sistema**:
- Landing Page: http://localhost:8000/
- Página Intermediária: http://localhost:8000/home
- Aplicação de Avaliação: http://localhost:8000/app
- Documentação da API: http://localhost:8000/api/docs

## 📁 Estrutura de Diretórios

```
Veritas.AI/
├── backend/
│   ├── main.py              # Servidor FastAPI principal
│   ├── evaluators.py        # Lógica dos avaliadores
│   └── requirements.txt     # Dependências Python
├── static/
│   ├── landing/             # Landing page (HTML/CSS/JS)
│   │   ├── index.html
│   │   ├── styles.css
│   │   └── script.js
│   ├── home/                # Página intermediária
│   │   └── index.html
│   ├── veritas_*.jpg        # Imagens do projeto
│   └── ...
├── app/
│   ├── index.html           # Aplicação de avaliação
│   ├── styles.css
│   └── script.js
├── README.md                # Documentação principal
├── QUICKSTART.md            # Guia rápido
├── INSTALACAO.md            # Guia de instalação detalhado
├── .env.example             # Exemplo de configuração
└── run.sh                   # Script de inicialização

```

## 🎯 Fluxo de Navegação

```
Landing Page (/)
    ↓
    [Conheça o Sistema]
    ↓
Página Intermediária (/home)
    ↓
    ├─→ [Avaliar TCC] → Aplicação (/app)
    └─→ [Documentação da API] → Swagger (/api/docs)
```

## 🎨 Design System

### Cores
- **Background Dark**: `#1a1a1a`
- **Background Darker**: `#0d0d0d`
- **Text Primary**: `#ffffff`
- **Text Secondary**: `#b0b0b0`
- **Accent Pink**: `#ffccf6`
- **Accent Mint**: `#d4f4dd`
- **Accent Coral**: `#ffb3a7`
- **Accent Blue**: `#a8d8ea`

### Tipografia
- **Títulos**: Bodoni Moda (serif)
- **Corpo**: Inter (sans-serif)

### Espaçamento
- Seções: `8rem` (padding vertical)
- Cards: `2.5rem` (padding interno)
- Grid gaps: `2.5rem` a `5rem`

## 🔧 Tecnologias Utilizadas

### Backend
- **FastAPI**: Framework web moderno e de alta performance
- **Perplexity AI**: Modelo de linguagem Llama 3.1 para análise
- **Python 3.11**: Linguagem de programação
- **Uvicorn**: Servidor ASGI

### Frontend
- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com Grid e Flexbox
- **JavaScript ES6+**: Interatividade e animações
- **Intersection Observer API**: Animações on-scroll

## 📊 Critérios de Avaliação

O sistema avalia TCCs em 4 critérios principais:

1. **Metodologia** (0-3 pontos)
   - Coerência metodológica
   - Clareza dos objetivos
   - Adequação dos métodos

2. **Escrita Acadêmica** (0-2 pontos)
   - Conformidade com normas ABNT
   - Qualidade redacional
   - Formatação de citações

3. **Originalidade** (0-2 pontos)
   - Detecção de indícios de plágio
   - Originalidade da contribuição

4. **Coerência Científica** (0-3 pontos)
   - Qualidade da base teórica
   - Sustentação das conclusões
   - Relevância científica

**Nota Final**: Soma de todos os critérios (máximo 10.0)

## 🌐 API Endpoints

### Health Check
```
GET /api/evaluation/health
```

### Avaliar TCC
```
POST /api/evaluation/evaluate
Content-Type: multipart/form-data

Body:
- file: arquivo PDF/DOCX/TXT (opcional)
- text: texto do TCC (opcional)
```

### Documentação Interativa
```
GET /api/docs
```

## 📝 Observações Importantes

1. **Chave de API**: É necessário configurar a chave do Perplexity AI no arquivo `.env`
2. **Tempo de Análise**: Cada avaliação leva entre 30-60 segundos
3. **Tamanho Máximo**: Arquivos de até 10MB são aceitos
4. **Formatos Suportados**: PDF, DOCX, TXT
5. **Navegação**: Use os botões "Voltar para Home" para navegar entre as páginas

## 🎓 Créditos

- **Desenvolvedor**: Leonardo Fonseca
- **Projeto**: Acadêmico e de portfólio
- **Inspiração de Design**: locomotive.ca
- **Tecnologias**: FastAPI, Perplexity AI, Python

## 📄 Licença

Projeto acadêmico e de portfólio. Desenvolvido 100% em Python com FastAPI.

---

**Veritas.AI** - Sistema de Avaliação de TCC com Inteligência Artificial

