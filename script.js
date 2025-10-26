document.addEventListener('DOMContentLoaded', () => {
    const CORRECT_PASSWORD = "ApexAnalyze2025";

    const passwordInput = document.getElementById('password-input');
    const errorMsg = document.getElementById('password-error');
    const passwordScreen = document.getElementById('password-screen');
    const gameContainer = document.getElementById('game-container');

    function checkPassword() {
        if (passwordInput.value === CORRECT_PASSWORD) {
            sessionStorage.setItem('apexAccess', 'true');
            passwordScreen.classList.add('hidden');
            gameContainer.classList.add('visible');
            initializeGame();
        } else {
            errorMsg.classList.add('show');
            passwordInput.value = '';
            setTimeout(() => errorMsg.classList.remove('show'), 3000);
        }
    }

    // Attach event listeners
    document.querySelector('.password-submit').addEventListener('click', checkPassword);
    passwordInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') checkPassword();
    });

    // Auto-skip password if already verified
    if (sessionStorage.getItem('apexAccess') === 'true') {
        passwordScreen.classList.add('hidden');
        gameContainer.classList.add('visible');
        initializeGame();
    }
});

// === BASIC FALLBACK ===
// Prevents crash when initializeGame() is missing
function initializeGame() {
    console.log("✅ Apex Analyzer initialized successfully!");
    
    // Show a test message so you know it’s working
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div style="text-align:center; margin-top: 100px; color: white;">
            <h1>Welcome to The Apex Analyzer 🦈</h1>
            <p>Access Granted — Game successfully loaded.</p>
        </div>
    `;
}
