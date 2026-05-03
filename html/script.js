const EQUATIONS = [
  { eq: '34² + 6×√256 - 25',          ans: 1227 },
  { eq: '34² + 5×√400 + 15',          ans: 1271 },
  { eq: '36² - 2×√529 + 30',          ans: 1280 },
  { eq: '(12 + 5²) × √1225 - 4',      ans: 1291 },
  { eq: '35² + 4×√324 - 5',           ans: 1292 },
  { eq: '(16 + 7²) × √400 - 7',       ans: 1293 },
  { eq: '34² + 8×√441 + 5',           ans: 1329 },
  { eq: '35² + 7×√400 - 15',          ans: 1350 },
  { eq: '14² × 7 - √289',             ans: 1355 },
  { eq: '√900 × 7² - 5×√441',         ans: 1365 },
  { eq: '√1600 × 6² - 3×√484',        ans: 1374 },
  { eq: '(20 + 6²) × √625 - 8',       ans: 1392 },
  { eq: '38² - 3×√256 + 20',          ans: 1416 },
  { eq: '19² × 4 - √529',             ans: 1421 },
  { eq: '17² × 5 - √400',             ans: 1425 },
  { eq: '22² × 3 - √225',             ans: 1437 },
  { eq: '27² × 2 - √289',             ans: 1441 },
  { eq: '36² + 8×√361 - 5',           ans: 1443 },
  { eq: '(22 + 6²) × √625 - 3',       ans: 1447 },
  { eq: '37² + 4×√529 - 10',          ans: 1451 },
  { eq: '13² × 9 - √400',             ans: 1501 },
  { eq: '38² + 5×√289 - 20',          ans: 1509 },
  { eq: '40² - 5×√576 + 35',          ans: 1515 },
  { eq: '√400 × 9² - 5×√361',         ans: 1525 },
  { eq: '(15 + 7²) × √576 - 6',       ans: 1530 },
  { eq: '28² × 2 - √441',             ans: 1547 },
  { eq: '(14 + 8²) × √400 - 2',       ans: 1558 },
  { eq: '23² × 3 - √361',             ans: 1568 },
  { eq: '38² + 7×√324 + 1',           ans: 1571 },
  { eq: '20² × 4 - √289',             ans: 1583 },
  { eq: '39² + 2×√784 + 10',          ans: 1587 },
  { eq: '(6 + 8²) × √529 - 15',       ans: 1595 },
  { eq: '18² × 5 - √361',             ans: 1601 },
  { eq: '39² + 6×√256 + 3',           ans: 1620 },
  { eq: '(11 + 8²) × √484 - 9',       ans: 1641 },
  { eq: '42² - 7×√324 + 15',          ans: 1653 },
  { eq: '29² × 2 - √289',             ans: 1665 },
  { eq: '40² + 6×√324 - 18',          ans: 1690 },
  { eq: '40² + 7×√225 + 10',          ans: 1715 },
  { eq: '41² + 3×√625 - 30',          ans: 1726 },
  { eq: '21² × 4 - √900',             ans: 1734 },
  { eq: '44² - 9×√484 + 3',           ans: 1741 },
  { eq: '42² + 2×√225 - 40',          ans: 1754 },
  { eq: '(10 + 7²) × √900 - 3',       ans: 1767 },
  { eq: '41² + 5×√289 + 6',           ans: 1772 },
  { eq: '(8 + 9²) × √400 - 7',        ans: 1773 },
  { eq: '30² × 2 - √484',             ans: 1778 },
  { eq: '44² - √2500 × 3 + 6',        ans: 1792 },
  { eq: '43² - 3×√400 + 16',          ans: 1805 },
  { eq: '43² - 2×√441 + 8',           ans: 1815 },
  { eq: '42² + 4×√256 - 12',          ans: 1816 },
  { eq: '√900 × 8² - 4×√529',         ans: 1828 },
  { eq: '√1600 × 7² - 8×√225',        ans: 1840 },
  { eq: '(7 + 9²) × √441 - 5',        ans: 1843 },
  { eq: '25² × 3 - √576',             ans: 1851 },
  { eq: '45² - 8×√484 + 11',          ans: 1860 },
  { eq: '44² - 4×√361 + 5',           ans: 1865 },
  { eq: '43² + 2×√169 - 5',           ans: 1870 },
  { eq: '31² × 2 - √361',             ans: 1903 },
  { eq: '45² - 5×√529 + 10',          ans: 1920 },
  { eq: '45² - 4×√625 + 0',           ans: 1925 },
  { eq: '47² - 11×√529 + 4',          ans: 1960 },
  { eq: '45² - 3×√441 + 5',           ans: 1967 },
  { eq: '46² - 6×√400 + 7',           ans: 2003 },
];

// 2.5 voltas = 900°
const TURNS_REQUIRED = 900;

// --- Estado ---
let targetPin       = '';
let currentPin      = '';
let isUnlocked      = false;
let currentRotation = 0;
let totalRotation   = 0;

// --- Elementos DOM ---
const container     = document.getElementById('container');
const display       = document.getElementById('display');
const statusText    = document.getElementById('statusText');
const wheelWrap     = document.getElementById('wheelWrap');
const wheelGroup    = document.getElementById('wheelGroup');
const postitEq      = document.getElementById('postitEq');
const wheelProgress = document.getElementById('wheelProgress');

// --- Helpers ---
function pickRandom() {
    return EQUATIONS[Math.floor(Math.random() * EQUATIONS.length)];
}

function setDisplay(text, cls) {
    display.className = 'display-text' + (cls ? ' ' + cls : '');
    display.textContent = text;
}

function applyRotation(deg) {
    wheelGroup.style.transform = `rotate(${deg}deg)`;
}

function updateProgress() {
    const pct = Math.min(Math.abs(totalRotation) / TURNS_REQUIRED * 100, 100);
    if (wheelProgress) wheelProgress.style.width = pct + '%';
}

// --- Teclado numérico ---
function pressKey(n) {
    if (isUnlocked) return;
    if (currentPin.length < 4) {
        currentPin += n;
        setDisplay('*'.repeat(currentPin.length) + '_'.repeat(4 - currentPin.length));
    }
}

function clearPin() {
    if (isUnlocked) return;
    currentPin = '';
    setDisplay('PIN');
}

function checkPin() {
    if (isUnlocked) return;
    if (currentPin === targetPin) {
        setDisplay('ACESSO', 'ok');
        statusText.textContent = 'TRAVA LIBERADA — GIRE O VOLANTE (A/D)';
        statusText.className = 'status-text active';
        isUnlocked = true;
        wheelWrap.classList.add('unlocked');
        
        wheelGroup.style.animation = 'jiggle 0.5s ease-in-out';
        setTimeout(() => {
            wheelGroup.style.animation = '';
        }, 500);
    } else {
        setDisplay('ERRO', 'error');
        setTimeout(() => { clearPin(); }, 900);
    }
}

// --- GIRAR VOLANTE COM TECLAS A e D ---
function rotateWheel(direction) {
    if (!isUnlocked) return;
    
    const step = 15;
    const newRot = currentRotation + (direction * step);
    
    totalRotation += Math.abs(direction * step);
    currentRotation = newRot;
    
    applyRotation(currentRotation);
    updateProgress();
    
    if (totalRotation >= TURNS_REQUIRED) {
        success();
    }
}

// --- Sucesso: abre o cofre ---
function success() {
    isUnlocked = false;
    setDisplay('ABERTO', 'ok');
    statusText.textContent = 'COFRE ABERTO!';
    statusText.className = 'status-text success';
    if (wheelProgress) wheelProgress.style.width = '100%';
    
    window.removeEventListener('keydown', keydownHandler);
    
    setTimeout(() => {
        fetch(`https://${GetParentResourceName()}/sucesso`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ success: true })
        });
        fechar();
    }, 1200);
}

// --- Fechar sem completar ---
function fechar() {
    container.style.display = 'none';
    fetch(`https://${GetParentResourceName()}/fechar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: false })
    });
}

// --- Reset com nova equação ---
function resetGame() {
    const chosen    = pickRandom();
    targetPin       = String(chosen.ans);
    currentPin      = '';
    isUnlocked      = false;
    currentRotation = 0;
    totalRotation   = 0;
    
    postitEq.textContent = chosen.eq + ' = ?';
    
    applyRotation(0);
    setDisplay('PIN');
    statusText.textContent = 'SISTEMA BLOQUEADO';
    statusText.className   = 'status-text';
    wheelWrap.classList.remove('unlocked');
    if (wheelProgress) wheelProgress.style.width = '0%';
}

// --- Evento de teclado ---
function keydownHandler(e) {
    const key = e.key.toLowerCase();
    
    if (key === 'a') {
        e.preventDefault();
        rotateWheel(-1);
    } else if (key === 'd') {
        e.preventDefault();
        rotateWheel(1);
    } else if (/^[0-9]$/.test(key)) {
        pressKey(key);
    } else if (key === 'enter') {
        checkPin();
    } else if (key === 'backspace') {
        clearPin();
    }
}

// --- Evento do FiveM ---
window.addEventListener('message', e => {
    if (e.data.action === 'open') {
        container.style.display = 'flex';
        resetGame();
        window.addEventListener('keydown', keydownHandler);
    }
});

window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        fechar();
        window.removeEventListener('keydown', keydownHandler);
    }
});

window.pressKey = pressKey;
window.clearPin = clearPin;
window.checkPin = checkPin;