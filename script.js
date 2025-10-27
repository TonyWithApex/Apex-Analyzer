document.addEventListener('DOMContentLoaded', () => {
  const CORRECT_PASSWORD = "ApexAnalyze2025";
  const passwordInput = document.getElementById('password-input');
  const errorMsg = document.getElementById('password-error');
  const passwordScreen = document.getElementById('password-screen');
  const welcomeScreen = document.getElementById('welcome-screen');
  const gameContainer = document.getElementById('game-container');
  const startBtn = document.getElementById('start-analyzer');

  function show(el) { el.classList.remove('hidden'); el.classList.add('visible'); }
  function hide(el) { el.classList.add('hidden'); el.classList.remove('visible'); }

  function checkPassword() {
    if (passwordInput.value === CORRECT_PASSWORD) {
      sessionStorage.setItem('apexAccess', 'true');
      hide(passwordScreen);
      show(welcomeScreen);
    } else {
      errorMsg.classList.add('show');
      passwordInput.value = '';
      setTimeout(() => errorMsg.classList.remove('show'), 2000);
    }
  }

  document.querySelector('.password-submit').addEventListener('click', checkPassword);
  passwordInput.addEventListener('keypress', e => { if (e.key === 'Enter') checkPassword(); });
  startBtn.addEventListener('click', () => {
    hide(welcomeScreen);
    show(gameContainer);
    initializeGame();
  });

  if (sessionStorage.getItem('apexAccess') === 'true') {
    hide(passwordScreen);
    show(welcomeScreen);
  }
});

function initializeGame() {
  const container = document.getElementById('game-container');
  container.innerHTML = `<div style="text-align:center;margin-top:100px;">
      <h1>🦈 The Apex Analyzer</h1>
      <p>Welcome to the full Apex Analyzer experience!</p>
      <button id='simulate-btn'>Load Tutorial Deals</button>
    </div>`;
  document.getElementById('simulate-btn').addEventListener('click', loadTutorial);
}

function loadTutorial() {
  const container = document.getElementById('game-container');
  container.innerHTML = `<div style="padding:40px;text-align:center;">
      <h2>🟡 Tutorial Deal Loaded</h2>
      <p>Now analyzing first property...</p>
      <div style="margin-top:20px;">
        <button onclick="alert('Deal Complete!')">Submit Analysis</button>
      </div>
    </div>`;
}
