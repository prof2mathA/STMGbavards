let tempsEcoule = 0; // Temps en secondes
let intervalID = null;
const display = document.getElementById('display');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const STORAGE_KEY = 'elapsedTime';

// 1. Initialisation
function initialiserChrono() {
    const tempsStocke = localStorage.getItem(STORAGE_KEY);
    if (tempsStocke !== null) {
        tempsEcoule = parseInt(tempsStocke, 10);
    }
    afficherTemps(tempsEcoule);
}

// 2. Affichage
function afficherTemps(secondes) {
    const h = String(Math.floor(secondes / 3600)).padStart(2, '0');
    const m = String(Math.floor((secondes % 3600) / 60)).padStart(2, '0');
    const s = String(secondes % 60).padStart(2, '0');
    display.textContent = `${h}:${m}:${s}`;
}

// 3. Logique du chronomètre
function demarrerChrono() {
    if (intervalID !== null) return; // Empêche de démarrer plusieurs fois

    intervalID = setInterval(() => {
        tempsEcoule++;
        afficherTemps(tempsEcoule);
        // Sauvegarde persistante à chaque seconde
        localStorage.setItem(STORAGE_KEY, tempsEcoule.toString()); 
    }, 1000);
    startBtn.disabled = true;
    stopBtn.disabled = false;
}

function arreterChrono() {
    clearInterval(intervalID);
    intervalID = null;
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

// 4. Événements des boutons
startBtn.addEventListener('click', demarrerChrono);
stopBtn.addEventListener('click', arreterChrono);

// Lancement à l'ouverture de la page
initialiserChrono();
stopBtn.disabled = true;