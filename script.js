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

function initializeGame() {
    console.log("Game initialized!");
}
