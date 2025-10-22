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
const modalOverlay = document.getElementById('modalOverlay');
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
        if (e.target !== selectFileBtn && !e.target.closest('.btn-secondary')) {
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
        showError('Tipo de arquivo não permitido. Use PDF, DOCX ou TXT.');
        return;
    }
    
    // Valida tamanho (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
        showError('Arquivo muito grande. Tamanho máximo: 10MB.');
        return;
    }
    
    currentFile = file;
    fileInfo.innerHTML = `
        <strong>Arquivo selecionado:</strong><br>
        ${file.name} (${formatFileSize(file.size)})
    `;
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
    const html = `
        <div class="result-section">
            <div class="result-header">
                <h3 class="result-title">${result.evaluator_1.name}</h3>
                <span class="result-score">${result.evaluator_1.score.toFixed(1)}/3.0</span>
            </div>
            <div class="result-content">${formatText(result.evaluator_1.analysis)}</div>
        </div>
        
        <div class="result-section">
            <div class="result-header">
                <h3 class="result-title">${result.evaluator_2.name}</h3>
                <span class="result-score">${result.evaluator_2.score.toFixed(1)}/2.0</span>
            </div>
            <div class="result-content">${formatText(result.evaluator_2.analysis)}</div>
        </div>
        
        <div class="result-section">
            <div class="result-header">
                <h3 class="result-title">${result.evaluator_3.name}</h3>
                <span class="result-score">${result.evaluator_3.score.toFixed(1)}/2.0</span>
            </div>
            <div class="result-content">${formatText(result.evaluator_3.analysis)}</div>
        </div>
        
        <div class="result-section">
            <div class="result-header">
                <h3 class="result-title">Coerência Científica Geral</h3>
                <span class="result-score">${(result.final_verdict.final_score - result.evaluator_1.score - result.evaluator_2.score - result.evaluator_3.score).toFixed(1)}/3.0</span>
            </div>
            <div class="result-content">${formatText(result.final_verdict.summary)}</div>
        </div>
        
        <div class="final-score">
            <div class="final-score-value">${result.final_verdict.final_score.toFixed(1)}/10.0</div>
            <div class="final-score-label">Nota Final</div>
        </div>
        
        <div class="result-section">
            <h3 class="result-title">Recomendações</h3>
            <div class="result-content">${formatText(result.final_verdict.recommendations)}</div>
        </div>
    `;
    
    modalBody.innerHTML = html;
    resultModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function formatText(text) {
    // Converte quebras de linha em parágrafos
    return text.split('\n').filter(p => p.trim()).map(p => `<p>${p}</p>`).join('');
}

// Configuração do modal
function setupModal() {
    closeModal.addEventListener('click', closeModalHandler);
    closeModalBtn.addEventListener('click', closeModalHandler);
    modalOverlay.addEventListener('click', closeModalHandler);
    
    downloadBtn.addEventListener('click', () => {
        downloadReport();
    });
    
    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && resultModal.classList.contains('active')) {
            closeModalHandler();
        }
    });
}

function closeModalHandler() {
    resultModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Download do relatório
function downloadReport() {
    if (!evaluationResult) return;
    
    const report = generateReportText(evaluationResult);
    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `avaliacao-tcc-veritas-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function generateReportText(result) {
    const coerenciaScore = (result.final_verdict.final_score - result.evaluator_1.score - result.evaluator_2.score - result.evaluator_3.score).toFixed(1);
    
    return `
================================================================================
                    VERITAS.AI - RELATÓRIO DE AVALIAÇÃO DE TCC
================================================================================

Data: ${new Date().toLocaleString('pt-BR')}

NOTA FINAL: ${result.final_verdict.final_score.toFixed(1)} / 10.0

================================================================================

${result.evaluator_1.name}
Pontuação: ${result.evaluator_1.score.toFixed(1)} / 3.0

${result.evaluator_1.analysis}

================================================================================

${result.evaluator_2.name}
Pontuação: ${result.evaluator_2.score.toFixed(1)} / 2.0

${result.evaluator_2.analysis}

================================================================================

${result.evaluator_3.name}
Pontuação: ${result.evaluator_3.score.toFixed(1)} / 2.0

${result.evaluator_3.analysis}

================================================================================

Coerência Científica Geral
Pontuação: ${coerenciaScore} / 3.0

${result.final_verdict.summary}

================================================================================

RECOMENDAÇÕES

${result.final_verdict.recommendations}

================================================================================
Gerado por Veritas.AI v1.0.0
Sistema de Avaliação de TCC com Inteligência Artificial
================================================================================
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

