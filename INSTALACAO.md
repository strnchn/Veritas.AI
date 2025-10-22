# 📦 Guia de Instalação - Veritas.AI v1.0.0

## Requisitos do Sistema

Antes de começar, certifique-se de ter instalado:

- **Python 3.11** ou superior
- **pip** (gerenciador de pacotes Python)
- **Chave de API do Perplexity** ([obtenha aqui](https://www.perplexity.ai/))

## Instalação Completa

### Passo 1: Extrair o Projeto

Se você recebeu o arquivo compactado, extraia-o:

```bash
cd Veritas.AI
```

Ou clone do repositório:

```bash
git clone https://github.com/strnchn/Veritas.AI.git
cd Veritas.AI
```

### Passo 2: Instalar Dependências Python

Instale todas as dependências necessárias:

```bash
pip install -r requirements.txt
```

**Dependências instaladas:**
- fastapi==0.109.0
- uvicorn[standard]==0.27.0
- python-multipart==0.0.6
- pydantic==2.5.3
- pydantic-settings==2.1.0
- httpx==0.26.0
- python-docx==1.1.0
- PyPDF2==3.0.1
- python-dotenv==1.0.0

### Passo 3: Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione sua chave de API do Perplexity:

```bash
PERPLEXITY_API_KEY=pplx-sua-chave-aqui
MAX_FILE_SIZE_MB=10
ALLOWED_ORIGINS=http://localhost:8000,http://127.0.0.1:8000
```

**Como obter a chave de API:**

1. Acesse [perplexity.ai](https://www.perplexity.ai/)
2. Faça login ou crie uma conta
3. Vá em **Settings → API**
4. Gere uma nova API Key
5. Copie e cole no arquivo `.env`

### Passo 4: Iniciar o Servidor

Você pode iniciar o servidor de duas formas:

**Opção 1: Usando o script (recomendado)**

```bash
chmod +x run.sh
./run.sh
```

**Opção 2: Manualmente**

```bash
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```

### Passo 5: Acessar a Aplicação

Após iniciar o servidor, acesse no navegador:

- **Landing Page:** http://localhost:8000
- **Aplicação de Avaliação:** http://localhost:8000/app
- **Documentação da API:** http://localhost:8000/api/docs
- **Health Check:** http://localhost:8000/api/evaluation/health

## Estrutura do Projeto

```
Veritas.AI/
├── backend/                    # Backend FastAPI
│   ├── main.py                # Aplicação principal
│   ├── config.py              # Configurações
│   ├── models.py              # Modelos Pydantic
│   ├── services/              # Serviços (IA, processamento)
│   ├── routes/                # Endpoints da API
│   └── utils/                 # Funções auxiliares
│
├── landing/                    # Landing page
│   ├── index.html             # Página de apresentação
│   ├── src/                   # Componentes React
│   └── public/                # Imagens e assets
│
├── app/                        # Aplicação funcional
│   ├── index.html             # Interface de avaliação
│   ├── styles.css             # Estilos
│   └── script.js              # Lógica frontend
│
├── .env.example               # Exemplo de configuração
├── requirements.txt           # Dependências Python
├── run.sh                     # Script de inicialização
├── README.md                  # Documentação principal
├── QUICKSTART.md              # Guia rápido
└── INSTALACAO.md              # Este arquivo
```

## Verificação da Instalação

### Teste 1: Health Check da API

```bash
curl http://localhost:8000/api/evaluation/health
```

**Resposta esperada:**
```json
{
  "status": "online",
  "service": "Veritas.AI - Banca Avaliadora de TCC",
  "version": "1.0.0",
  "api_configured": true
}
```

### Teste 2: Avaliar Texto via API

```bash
curl -X POST http://localhost:8000/api/evaluation/text \
  -H "Content-Type: application/json" \
  -d '{"text": "Este é um texto de teste para o sistema Veritas.AI. O sistema utiliza inteligência artificial para avaliar trabalhos acadêmicos de forma rigorosa e estruturada, considerando metodologia, normas ABNT, originalidade e coerência científica."}'
```

### Teste 3: Interface Web

1. Abra http://localhost:8000 no navegador
2. Clique em "Avaliar TCC Agora"
3. Cole um texto de teste (mínimo 100 caracteres)
4. Clique em "Avaliar TCC"
5. Aguarde o resultado

## Solução de Problemas

### Erro: "ModuleNotFoundError"

**Causa:** Dependências não instaladas corretamente

**Solução:**
```bash
pip install -r requirements.txt --upgrade
```

### Erro: "API Key não configurada"

**Causa:** Arquivo `.env` não existe ou está mal configurado

**Solução:**
```bash
cp .env.example .env
# Edite o arquivo .env e adicione sua chave
nano .env
```

### Erro: "Porta 8000 já em uso"

**Causa:** Outra aplicação está usando a porta 8000

**Solução:** Use outra porta
```bash
python -m uvicorn backend.main:app --port 8080
```

### Erro ao processar PDF

**Causa:** PDF protegido ou corrompido

**Solução:**
- Tente converter o PDF para TXT ou DOCX
- Verifique se o PDF não está protegido por senha
- Use PDFs nativos (não escaneados)

### Timeout na análise

**Causa:** Texto muito longo ou API lenta

**Solução:**
- Divida textos muito longos em seções
- Aguarde mais tempo (até 60 segundos)
- Verifique sua conexão com a internet

## Configurações Avançadas

### Alterar Modelo de IA

Edite `backend/config.py`:

```python
perplexity_model: str = "llama-3.1-sonar-large-128k-online"
```

**Opções disponíveis:**
- `llama-3.1-sonar-small-128k-online` - Mais rápido, menor custo
- `llama-3.1-sonar-large-128k-online` - Balanceado (padrão)
- `llama-3.1-sonar-huge-128k-online` - Mais preciso, maior custo

### Alterar Tamanho Máximo de Arquivo

No arquivo `.env`:

```bash
MAX_FILE_SIZE_MB=20
```

### Configurar CORS

No arquivo `.env`:

```bash
ALLOWED_ORIGINS=http://localhost:8000,http://127.0.0.1:8000,https://seudominio.com
```

## Modo de Produção

Para executar em produção, recomenda-se:

1. **Usar HTTPS** com certificado SSL
2. **Configurar proxy reverso** (Nginx ou Apache)
3. **Usar gerenciador de processos** (systemd, supervisor)
4. **Configurar rate limiting** para evitar abuso
5. **Monitorar logs** e performance

### Exemplo com systemd

Crie `/etc/systemd/system/veritas-ai.service`:

```ini
[Unit]
Description=Veritas.AI - Sistema de Avaliacao de TCC
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/Veritas.AI
Environment="PATH=/usr/bin"
ExecStart=/usr/bin/python3.11 -m uvicorn backend.main:app --host 0.0.0.0 --port 8000
Restart=always

[Install]
WantedBy=multi-user.target
```

Ative o serviço:

```bash
sudo systemctl enable veritas-ai
sudo systemctl start veritas-ai
sudo systemctl status veritas-ai
```

## Suporte

Para mais informações:

- 📖 [README.md](README.md) - Documentação completa
- 🚀 [QUICKSTART.md](QUICKSTART.md) - Guia rápido
- 📚 [Documentação da API](http://localhost:8000/api/docs) - Swagger interativo
- 🐛 [GitHub Issues](https://github.com/strnchn/Veritas.AI/issues) - Reportar problemas

---

**Veritas.AI v1.0.0** - Sistema de Avaliação de TCC com Inteligência Artificial

Desenvolvido 100% em Python com FastAPI

