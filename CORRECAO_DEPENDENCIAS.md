# Correção de Dependências - Veritas.AI

## Problema Identificado

Durante a instalação, ocorreu um conflito de dependências entre `pdfplumber` e `pdfminer-six`:

```
ERROR: pip's dependency resolver does not currently take into account all the packages that are installed.
camelot-py 1.0.0 requires pdfminer-six>=20240706, but you have pdfminer-six 20221105 which is incompatible.
```

## Solução Aplicada

### 1. Remoção do pdfplumber

Removemos a dependência `pdfplumber` do arquivo `requirements.txt`, pois ela causava conflito de versões com `pdfminer-six`.

### 2. Uso Exclusivo do PyPDF2

Atualizamos o arquivo `backend/services/file_processor.py` para usar **apenas PyPDF2** para processamento de PDFs, que é:
- Mais leve
- Sem conflitos de dependências
- Suficiente para a maioria dos PDFs de TCC

### 3. Melhorias no Processamento

O código foi otimizado para:
- Processar página por página com tratamento de erros individual
- Continuar processamento mesmo se uma página falhar
- Fornecer mensagens de erro mais claras

## Arquivo requirements.txt Atualizado

```
fastapi==0.109.0
uvicorn[standard]==0.27.0
python-multipart==0.0.6
pydantic==2.5.3
pydantic-settings==2.1.0
httpx==0.26.0
python-docx==1.1.0
PyPDF2==3.0.1
python-dotenv==1.0.0
```

## Como Instalar Agora

### Opção 1: Instalação Limpa (Recomendado)

```bash
# Desinstale as dependências antigas
pip3 uninstall -y pdfplumber pdfminer-six pypdfium2

# Instale as novas dependências
pip3 install -r requirements.txt
```

### Opção 2: Instalação Forçada

```bash
pip3 install --force-reinstall -r requirements.txt
```

### Opção 3: Ambiente Virtual (Melhor Prática)

```bash
# Crie um ambiente virtual
python -m venv venv

# Ative o ambiente virtual
# No Windows:
venv\Scripts\activate
# No Linux/Mac:
source venv/bin/activate

# Instale as dependências
pip install -r requirements.txt
```

## Verificação da Instalação

Execute o seguinte comando para verificar se tudo está funcionando:

```bash
python3.11 -c "import fastapi, uvicorn, PyPDF2, docx, httpx; print('Todas as dependências instaladas com sucesso!')"
```

## Teste do Servidor

```bash
# Inicie o servidor
./run.sh

# Ou manualmente
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```

Você deve ver:
```
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

## Impacto na Funcionalidade

### ✅ Mantido
- Processamento de PDFs (usando PyPDF2)
- Processamento de DOCX (usando python-docx)
- Processamento de TXT
- Todas as funcionalidades da API
- Interface frontend
- Integração com Perplexity

### ⚠️ Observação sobre PDFs
O PyPDF2 funciona bem para a maioria dos PDFs de TCC, mas pode ter dificuldade com:
- PDFs escaneados (imagens)
- PDFs com formatação muito complexa
- PDFs protegidos por senha

**Solução alternativa:** Se encontrar um PDF problemático, converta-o para DOCX ou TXT antes de enviar.

## Dependências Removidas

- ❌ `pdfplumber==0.10.3` (conflito de dependências)
- ❌ `pdfminer-six` (dependência transitiva removida)
- ❌ `pypdfium2` (dependência transitiva removida)

## Dependências Mantidas

- ✅ `fastapi` - Framework web
- ✅ `uvicorn` - Servidor ASGI
- ✅ `python-multipart` - Upload de arquivos
- ✅ `pydantic` - Validação de dados
- ✅ `pydantic-settings` - Configurações
- ✅ `httpx` - Cliente HTTP para Perplexity
- ✅ `python-docx` - Processamento de Word
- ✅ `PyPDF2` - Processamento de PDF
- ✅ `python-dotenv` - Variáveis de ambiente

## Troubleshooting

### Erro: "ModuleNotFoundError: No module named 'pdfplumber'"

**Solução:** Isso é esperado. O pdfplumber foi removido. O sistema agora usa apenas PyPDF2.

### Erro: "Não foi possível extrair texto do PDF"

**Possíveis causas:**
1. PDF é uma imagem escaneada
2. PDF está protegido
3. PDF está corrompido

**Solução:**
1. Tente converter o PDF para DOCX usando Word ou LibreOffice
2. Ou copie o texto manualmente e use a opção "Colar Texto"

### Erro de instalação persiste

**Solução:**
```bash
# Limpe o cache do pip
pip3 cache purge

# Reinstale
pip3 install -r requirements.txt
```

## Testado e Funcionando

✅ Instalação sem conflitos
✅ Servidor inicia corretamente
✅ Processamento de PDF com PyPDF2
✅ Processamento de DOCX
✅ Processamento de TXT
✅ API funcionando
✅ Frontend funcionando

## Conclusão

O problema de dependências foi **totalmente resolvido**. O sistema está funcional e pronto para uso com as dependências atualizadas.

A remoção do pdfplumber não afeta a funcionalidade principal do sistema, pois o PyPDF2 é suficiente para processar PDFs de TCC na maioria dos casos.

---

**Veritas.AI v1.0.1** - Correção de Dependências

