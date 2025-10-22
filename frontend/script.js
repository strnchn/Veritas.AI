// Estado da aplicação
let currentFile = null;
let evaluationResult = null;

// Elementos do DOM
const fileInput = document.getElementById('fileInput');
const textInput = document.getElementById('textInput');
const dropArea = document.getElementById('dropArea');
const selectFileBtn = document.getElementById('selectFileBtn');
const evaluateBtn = document.getElementById('evaluateBtn');
const fileInfo = document.getElementById('fileInfo');
const charCount = document.getElementById('charCount');
const loadingOverlay = document.getElementById('loadingOverlay');
const resultModal = document.getElementById('resultModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.getElementById('closeModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const downloadBtn = document.getElementById('downloadBtn');

// Tabs
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

// Configuração da API
const API_BASE_URL = window.location.origin;

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    setupTabs();
    setupFileUpload();
    setupTextInput();
    setupEvaluateButton();
    setupModal();
});

// Configuração das tabs
function setupTabs() {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            
            // Remove active de todos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Adiciona active no clicado
            button.classList.add('active');
            document.getElementById(`${tabName}-tab`).classList.add('active');
            
            // Limpa dados
            currentFile = null;
            fileInfo.classList.add('hidden');
        });
    });
}

// Configuração do upload de arquivo
function setupFileUpload() {
    // Click no botão
    selectFileBtn.addEventListener('click', () => {
        fileInput.click();
    });
    
    // Click na área de drop
    dropArea.addEventListener('click', (e) => {
        if (e.target !== selectFileBtn) {
            fileInput.click();
        }
    });
    
    // Seleção de arquivo
    fileInput.addEventListener('change', (e) => {
        handleFileSelect(e.target.files[0]);
    });
    
    // Drag and drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => {
            dropArea.classList.add('drag-over');
        });
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => {
            dropArea.classList.remove('drag-over');
        });
    });
    
    dropArea.addEventListener('drop', (e) => {
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelect(files[0]);
        }
    });
}

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function handleFileSelect(file) {
    if (!file) return;
    
    // Valida extensão
    const allowedExtensions = ['.pdf', '.docx', '.txt'];
    const fileName = file.name.toLowerCase();
    const isValid = allowedExtensions.some(ext => fileName.endsWith(ext));
    
    if (!isValid) {
        showError('Tipo de arquivo nao permitido. Use PDF, DOCX ou TXT.');
        return;
    }
    
    // Valida tamanho (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
        showError('Arquivo muito grande. Tamanho maximo: 10MB.');
        return;
    }
    
    currentFile = file;
    fileInfo.textContent = `Arquivo selecionado: ${file.name} (${formatFileSize(file.size)})`;
    fileInfo.classList.remove('hidden');
}

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// Configuração do input de texto
function setupTextInput() {
    textInput.addEventListener('input', () => {
        const count = textInput.value.length;
        charCount.textContent = count;
    });
}

// Configuração do botão de avaliar
function setupEvaluateButton() {
    evaluateBtn.addEventListener('click', async () => {
        const activeTab = document.querySelector('.tab-button.active').getAttribute('data-tab');
        
        if (activeTab === 'file') {
            if (!currentFile) {
                showError('Selecione um arquivo para avaliar.');
                return;
            }
            await evaluateFile();
        } else {
            const text = textInput.value.trim();
            if (text.length < 100) {
                showError('O texto deve conter pelo menos 100 caracteres.');
                return;
            }
            await evaluateText(text);
        }
    });
}

// Avaliação de arquivo
async function evaluateFile() {
    const formData = new FormData();
    formData.append('file', currentFile);
    
    showLoading(true);
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/evaluation/file`, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Erro ao processar arquivo');
        }
        
        const result = await response.json();
        evaluationResult = result;
        showResults(result);
    } catch (error) {
        showError(error.message);
    } finally {
        showLoading(false);
    }
}

// Avaliação de texto
async function evaluateText(text) {
    showLoading(true);
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/evaluation/text`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Erro ao processar texto');
        }
        
        const result = await response.json();
        evaluationResult = result;
        showResults(result);
    } catch (error) {
        showError(error.message);
    } finally {
        showLoading(false);
    }
}

// Exibir resultados no modal
function showResults(result) {
    const scoreClass = getScoreClass(result.final_verdict.final_score);
    
    const html = `
        <div style="text-align: center; margin-bottom: 2rem;">
            <h3>Nota Final</h3>
            <div class="score-badge ${scoreClass}">
                ${result.final_verdict.final_score.toFixed(1)} / 10.0
            </div>
        </div>
        
        <div class="evaluator-section">
            <h3>${result.evaluator_1.name}</h3>
            <p class="evaluator-score">Pontuacao: ${result.evaluator_1.score.toFixed(1)} / 3.0</p>
            <div class="evaluator-analysis">${result.evaluator_1.analysis}</div>
        </div>
        
        <div class="evaluator-section">
            <h3>${result.evaluator_2.name}</h3>
            <p class="evaluator-score">Pontuacao: ${result.evaluator_2.score.toFixed(1)} / 2.0</p>
            <div class="evaluator-analysis">${result.evaluator_2.analysis}</div>
        </div>
        
        <div class="evaluator-section">
            <h3>${result.evaluator_3.name}</h3>
            <p class="evaluator-score">Pontuacao: ${result.evaluator_3.score.toFixed(1)} / 2.0</p>
            <div class="evaluator-analysis">${result.evaluator_3.analysis}</div>
        </div>
        
        <div class="final-verdict">
            <h3>Parecer Final da Banca</h3>
            <p style="margin-bottom: 1.5rem; line-height: 1.8;">${result.final_verdict.summary}</p>
            
            <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem;">Recomendacoes</h4>
            <p style="line-height: 1.8;">${result.final_verdict.recommendations}</p>
        </div>
    `;
    
    modalBody.innerHTML = html;
    resultModal.classList.add('active');
}

function getScoreClass(score) {
    if (score >= 8.5) return 'score-excellent';
    if (score >= 7.0) return 'score-good';
    if (score >= 5.0) return 'score-average';
    return 'score-poor';
}

// Configuração do modal
function setupModal() {
    closeModal.addEventListener('click', () => {
        resultModal.classList.remove('active');
    });
    
    closeModalBtn.addEventListener('click', () => {
        resultModal.classList.remove('active');
    });
    
    downloadBtn.addEventListener('click', () => {
        downloadReport();
    });
    
    // Fechar ao clicar fora
    resultModal.addEventListener('click', (e) => {
        if (e.target === resultModal) {
            resultModal.classList.remove('active');
        }
    });
}

// Download do relatório
function downloadReport() {
    if (!evaluationResult) return;
    
    const report = generateReportText(evaluationResult);
    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `avaliacao-tcc-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function generateReportText(result) {
    return `
VERITAS.AI - RELATORIO DE AVALIACAO DE TCC
==========================================

Data: ${new Date().toLocaleString('pt-BR')}

NOTA FINAL: ${result.final_verdict.final_score.toFixed(1)} / 10.0

==========================================

${result.evaluator_1.name}
Pontuacao: ${result.evaluator_1.score.toFixed(1)} / 3.0

${result.evaluator_1.analysis}

==========================================

${result.evaluator_2.name}
Pontuacao: ${result.evaluator_2.score.toFixed(1)} / 2.0

${result.evaluator_2.analysis}

==========================================

${result.evaluator_3.name}
Pontuacao: ${result.evaluator_3.score.toFixed(1)} / 2.0

${result.evaluator_3.analysis}

==========================================

PARECER FINAL DA BANCA

${result.final_verdict.summary}

RECOMENDACOES

${result.final_verdict.recommendations}

==========================================
Gerado por Veritas.AI v1.0.0
`.trim();
}

// Funções auxiliares
function showLoading(show) {
    if (show) {
        loadingOverlay.classList.remove('hidden');
        evaluateBtn.disabled = true;
    } else {
        loadingOverlay.classList.add('hidden');
        evaluateBtn.disabled = false;
    }
}

function showError(message) {
    alert('Erro: ' + message);
}

