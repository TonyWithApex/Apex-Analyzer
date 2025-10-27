// === APEX ANALYZER FINAL SCRIPT ===
// Password system + welcome overlay + game initialization sync

const CORRECT_PASSWORD = "ApexAnalyze2025";

// Handle password input and validation
function checkPassword() {
    const input = document.getElementById('password-input');
    const errorMsg = document.getElementById('password-error');

    if (input.value === CORRECT_PASSWORD) {
        // Store session
        sessionStorage.setItem('apexAccess', 'true');

        // Hide password screen and show game container
        document.getElementById('password-screen').classList.add('hidden');
        document.getElementById('game-container').classList.add('visible');

        // Show welcome overlay
        const welcome = document.getElementById('welcome-screen');
        if (welcome) {
            welcome.classList.remove('hidden');
            welcome.classList.add('visible');
        }

        console.log("✅ Access granted, welcome screen displayed.");
    } else {
        // Show error feedback
        errorMsg.classList.add('show');
        input.value = '';
        input.focus();
        setTimeout(() => errorMsg.classList.remove('show'), 3000);
    }
}

// Auto-login if already verified on this session
document.addEventListener('DOMContentLoaded', () => {
    const passwordScreen = document.getElementById('password-screen');
    const gameContainer = document.getElementById('game-container');
    const welcomeScreen = document.getElementById('welcome-screen');

    // Auto-skip login if access already verified
    if (sessionStorage.getItem('apexAccess') === 'true') {
        if (passwordScreen) passwordScreen.classList.add('hidden');
        if (gameContainer) gameContainer.classList.add('visible');
        if (welcomeScreen) {
            welcomeScreen.classList.remove('hidden');
            welcomeScreen.classList.add('visible');
        }
        console.log("🔁 Auto-login detected, skipping password.");
    }

    // Attach enter key + button handler
    const passwordInput = document.getElementById('password-input');
    const submitBtn = document.querySelector('.password-submit');

    if (submitBtn) submitBtn.addEventListener('click', checkPassword);
    if (passwordInput) {
        passwordInput.addEventListener('keypress', e => {
            if (e.key === 'Enter') checkPassword();
        });
    }

    // Welcome overlay control
    const startBtn = document.getElementById('start-analyzer');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            console.log("🚀 Launching Apex Analyzer game...");
            const welcome = document.getElementById('welcome-screen');
            if (welcome) {
                welcome.classList.remove('visible');
                welcome.classList.add('hidden');
            }
            initializeGame();
        });
    }
});

// === BASIC GAME INITIALIZATION ===
function initializeGame() {
    console.log("🎮 Apex Analyzer game initialized successfully!");
    const container = document.getElementById('game-container');
    if (container) {
        container.style.display = 'block';
        container.style.opacity = '1';
    }

    // Attempt to load property data if defined
    try {
        if (typeof loadNewProperty === 'function') loadNewProperty();
    } catch (e) {
        console.warn('Game logic not found:', e);
    }
}
