// Password Protection
const CORRECT_PASSWORD = "ApexAnalyze2025";

function checkPassword() {
    const input = document.getElementById('password-input');
    const errorMsg = document.getElementById('password-error');
    
    if (input.value === CORRECT_PASSWORD) {
        // Store session
        sessionStorage.setItem('apexAccess', 'true');
        
        // Hide password screen and show game
        document.getElementById('password-screen').classList.add('hidden');
        document.getElementById('game-container').classList.add('visible');
        
        // Initialize game
        initializeGame();
    } else {
        // Show error
        errorMsg.classList.add('show');
        input.value = '';
        input.focus();
        
        // Hide error after 3 seconds
        setTimeout(() => {
            errorMsg.classList.remove('show');
        }, 3000);
    }
}

// Allow Enter key to submit password
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password-input');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
    }
    
    // Check if user already has access
    if (sessionStorage.getItem('apexAccess') === 'true') {
        document.getElementById('password-screen').classList.add('hidden');
        document.getElementById('game-container').classList.add('visible');
        initializeGame();
    }
});

// Global State Variables
const properties = [
    // 1. Light Cosmetic Fix (Mid ARV, Low Rehab)
    {
        id: 1,
        address: "123 Main Street",
        beds: 3, baths: 2, sqFt: 1500,
        condition: "Good structure. Needs paint, new carpet, and updated fixtures.",
        trueARV: Math.round((310000 + 280000 + 305000) / 3),
        trueRepairs: 30000,
        repairOptions: [
            { value: 20000, isCorrect: false },
            { value: 30000, isCorrect: true },
            { value: 40000, isCorrect: false },
            { value: 50000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((310000 + 280000 + 305000) / 3)) - (2 * 30000) - 10000),
        comps: [
            { id: 'A', price: 310000, date: '1 month ago', condition: 'Perfect match, recently flipped.', isGood: true },
            { id: 'B', price: 350000, date: '2 weeks ago', condition: 'Larger lot (ignore).', isGood: false },
            { id: 'C', price: 280000, date: '3 months ago', condition: 'Dated interior, lowest ARV comp.', isGood: true },
            { id: 'D', price: 305000, date: '1 week ago', condition: 'Solid ARV indicator.', isGood: true },
            { id: 'E', price: 200000, date: '1 year ago', condition: 'Sale too old.', isGood: false },
            { id: 'F', price: 250000, date: '6 months ago', condition: 'Foreclosure sale.', isGood: false }
        ]
    },
    // 2. Full Kitchen/Bath Remodel (Mid ARV, Mid Rehab)
    {
        id: 2,
        address: "45 Oak Lane",
        beds: 4, baths: 2, sqFt: 2100,
        condition: "Needs full kitchen and two bathroom remodels. New roof required (approx $15k).",
        trueARV: Math.round((445000 + 460000 + 430000) / 3),
        trueRepairs: 60000, 
        repairOptions: [
            { value: 35000, isCorrect: false },
            { value: 60000, isCorrect: true },
            { value: 85000, isCorrect: false },
            { value: 110000, isCorrect: false },
        ],
        trueMAO: Math.round((0.90 * Math.round((445000 + 460000 + 430000) / 3)) - (2 * 60000) - 10000),
        comps: [
            { id: 'A', price: 445000, date: '2 weeks ago', condition: 'Similar size, perfect comp.', isGood: true },
            { id: 'B', price: 500000, date: '1 month ago', condition: 'Includes pool (subject does not).', isGood: false },
            { id: 'C', price: 460000, date: '1 week ago', condition: 'Highest ARV comp, good ceiling.', isGood: true },
            { id: 'D', price: 430000, date: '3 months ago', condition: 'Reliable ARV comp.', isGood: true },
            { id: 'E', price: 300000, date: '1 year ago', condition: 'Sale too old.', isGood: false },
            { id: 'F', price: 350000, date: '6 months ago', condition: 'Sold As-Is.', isGood: false }
        ]
    },
    // 3. Heavy Structural/Gut (Low ARV, Very High Rehab)
    {
        id: 3,
        address: "99 Disaster Close",
        beds: 2, baths: 1, sqFt: 900,
        condition: "Total gut. Foundation, electrical, plumbing, and roof all need replacement. Very costly.",
        trueARV: Math.round((160000 + 145000 + 120000) / 3),
        trueRepairs: 75000,
        repairOptions: [
            { value: 45000, isCorrect: false },
            { value: 75000, isCorrect: true },
            { value: 105000, isCorrect: false },
            { value: 135000, isCorrect: false },
        ],
        trueMAO: Math.round((0.90 * Math.round((160000 + 145000 + 120000) / 3)) - (2 * 75000) - 10000),
        comps: [
            { id: 'A', price: 160000, date: '1 week ago', condition: 'Highest comp for renovated small home.', isGood: true },
            { id: 'B', price: 145000, date: '2 months ago', condition: 'Reliable ARV comp.', isGood: true },
            { id: 'C', price: 120000, date: '3 months ago', condition: 'Dated interior, lowest ARV comp.', isGood: true },
            { id: 'D', price: 200000, date: '6 months ago', condition: 'Large 3 bed home (ignore).', isGood: false },
            { id: 'E', price: 80000, date: '1 year ago', condition: 'Sale too old.', isGood: false },
            { id: 'F', price: 50000, date: '1 month ago', condition: 'Vacant land sale.', isGood: false } 
        ]
    },
    // 4. Premium Area, Light Cosmetic (High ARV, Low Rehab)
    {
        id: 4,
        address: "10 Luxury Heights",
        beds: 5, baths: 4, sqFt: 3500,
        condition: "Excellent condition. Needs minor high-end paint, trim, and landscaping to maximize profit.",
        trueARV: Math.round((840000 + 860000 + 830000) / 3),
        trueRepairs: 40000,
        repairOptions: [
            { value: 25000, isCorrect: false },
            { value: 40000, isCorrect: true },
            { value: 55000, isCorrect: false },
            { value: 70000, isCorrect: false },
        ],
        trueMAO: Math.round((0.90 * Math.round((840000 + 860000 + 830000) / 3)) - (2 * 40000) - 10000),
        comps: [
            { id: 'A', price: 840000, date: '1 month ago', condition: 'Similar size, perfect comp.', isGood: true },
            { id: 'B', price: 950000, date: '2 weeks ago', condition: 'New construction (ignore).', isGood: false },
            { id: 'C', price: 860000, date: '1 week ago', condition: 'Highest ARV comp, good ceiling.', isGood: true },
            { id: 'D', price: 830000, date: '3 months ago', condition: 'Good ARV indicator.', isGood: true },
            { id: 'E', price: 650000, date: '6 months ago', condition: 'Sold by motivated seller.', isGood: false },
            { id: 'F', price: 700000, date: '1 year ago', condition: 'Sale too old.', isGood: false } 
        ]
    },
    // 5. Fire Damage, Mid-Range (Mid ARV, High Rehab)
    {
        id: 5,
        address: "20 Smoke Trail",
        beds: 3, baths: 1, sqFt: 1200,
        condition: "Kitchen fire damage and smoke damage throughout. Requires full mitigation and new HVAC.",
        trueARV: Math.round((260000 + 240000 + 255000) / 3),
        trueRepairs: 70000,
        repairOptions: [
            { value: 40000, isCorrect: false },
            { value: 70000, isCorrect: true },
            { value: 100000, isCorrect: false },
            { value: 125000, isCorrect: false },
        ],
        trueMAO: Math.round((0.90 * Math.round((260000 + 240000 + 255000) / 3)) - (2 * 70000) - 10000),
        comps: [
            { id: 'A', price: 260000, date: '1 week ago', condition: 'Highest comp for renovated small home.', isGood: true },
            { id: 'B', price: 240000, date: '2 months ago', condition: 'Reliable ARV comp.', isGood: true },
            { id: 'C', price: 300000, date: '1 month ago', condition: 'Two-story home (ignore).', isGood: false },
            { id: 'D', price: 255000, date: '3 weeks ago', condition: 'Solid ARV indicator.', isGood: true },
            { id: 'E', price: 150000, date: '6 months ago', condition: 'Sold As-Is with damage.', isGood: false },
            { id: 'F', price: 180000, date: '1 year ago', condition: 'Sale too old.', isGood: false } 
        ]
    }
    // NOTE: Add remaining 45 properties here following the same pattern
    // I'm showing 5 examples - you'll need to add properties 6-50 from your original data
];

let currentProperty = null;
let currentPropertyIndex = 0;
let gameStats = {
    scores: [],
    totalDeals: 0,
    avgScore: 0,
    bestScore: 0
};
let hintUsed = false;
let hintPenalty = 0;

// Helper function to format currency
const formatCurrency = (amount) => {
    if (amount < 0) {
        return `($${Math.abs(amount).toLocaleString()})`;
    }
    return `$${amount.toLocaleString()}`;
};

// Function to load the current property data into the HTML
function loadProperty(property) {
    currentProperty = property;
    
    document.getElementById('arv-form').reset();
    document.getElementById('results').classList.add('hidden');
    document.getElementById('feedback').className = '';
    document.getElementById('player-mao').textContent = '--';
    document.getElementById('final-score').textContent = '-- / 100';
    
    document.getElementById('next-challenge-btn').disabled = true;

    document.getElementById('property-id').textContent = `${property.id}`;
    document.getElementById('property-address').textContent = property.address;
    document.getElementById('property-beds').textContent = property.beds;
    document.getElementById('property-baths').textContent = property.baths;
    document.getElementById('property-sqft').textContent = property.sqFt.toLocaleString();
    document.getElementById('property-condition').textContent = property.condition;

    const repairOptionsContainer = document.getElementById('repair-options');
    const repairOptionsSection = document.getElementById('repair-options-section');
    const repairInput = document.getElementById('input-repairs');
    const repairInputGroup = repairInput?.parentElement;

    if (property.repairOptions && repairOptionsContainer) {
        repairOptionsContainer.innerHTML = '';
        const shuffledOptions = [...property.repairOptions].sort(() => Math.random() - 0.5);

        shuffledOptions.forEach((option, index) => {
            const label = document.createElement('label');
            label.innerHTML = `
                <input type="radio" name="repair-estimate" value="${option.value}" required>
                ${formatCurrency(option.value)}
            `;
            repairOptionsContainer.appendChild(label);
        });
        if (repairOptionsSection) repairOptionsSection.style.display = 'block';
        if (repairInputGroup) repairInputGroup.style.display = 'none';
        if (repairInput) repairInput.removeAttribute('required');
    } else {
        if (repairOptionsSection) repairOptionsSection.style.display = 'none';
        if (repairInputGroup) repairInputGroup.style.display = 'block';
        if (repairInput) repairInput.setAttribute('required', '');
    }

    const compsList = document.getElementById('comps-list');
    compsList.innerHTML = '';
    property.comps.forEach(comp => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>Comp ${comp.id}:</strong> ${formatCurrency(comp.price)} | ${comp.date}<br>
            <span style="color: var(--text-secondary);">${comp.condition}</span>
        `;
        compsList.appendChild(li);
    });

    const compCheckboxes = document.getElementById('comp-checkboxes');
    compCheckboxes.innerHTML = '';
    property.comps.forEach(comp => {
        const label = document.createElement('label');
        label.innerHTML = `
            <input type="checkbox" name="selected-comps" value="${comp.id}">
            Comp ${comp.id}
        `;
        compCheckboxes.appendChild(label);
    });

    hintUsed = false;
    hintPenalty = 0;
    document.getElementById('hint-btn').disabled = false;
    document.getElementById('hint-btn').textContent = '💡 Use Hint (-10 points)';

    fadeInElement(document.querySelector('.container'));
}

// Function to calculate score based on deviation
function calculateScore(playerValue, trueValue, tolerance) {
    const deviation = Math.abs(playerValue - trueValue);
    
    if (deviation <= tolerance) return 100;
    
    const maxDeviationForZeroScore = tolerance * 2.5;
    if (deviation >= maxDeviationForZeroScore) return 0;
    
    const score = 100 - (deviation / maxDeviationForZeroScore) * 100;
    return Math.round(Math.max(0, score));
}

// Function to determine overall grade
function getGrade(score) {
    if (score >= 90) return 'A+ (Elite Analyzer!)';
    if (score >= 80) return 'A (Exceptional!)';
    if (score >= 70) return 'B (Solid Analysis)';
    if (score >= 60) return 'C (Needs Work)';
    return 'D (Keep Practicing)';
}

// Function to provide detailed feedback
function getDetailedFeedback(arvScore, repairsScore, compScore, maoScore, finalScore) {
    let feedbackHTML = '';
    let feedbackClass = 'feedback-bad';

    if (compScore >= 90) {
        feedbackHTML += '<p><strong>Comp Selection:</strong> Excellent! You identified the most relevant comparable properties. 🎯</p>';
    } else if (compScore >= 70) {
        feedbackHTML += '<p><strong>Comp Selection:</strong> Good. You selected mostly relevant comps, but may have included some outliers or missed key ones.</p>';
    } else {
        feedbackHTML += '<p><strong>Comp Selection:</strong> Needs Work. Review which comps are most similar (date, condition, features). ⚠️</p>';
    }

    if (arvScore >= 90) {
        feedbackHTML += '<p><strong>ARV Estimate:</strong> Excellent! Your ARV estimate was spot on. 🎯</p>';
    } else if (arvScore >= 70) {
        feedbackHTML += '<p><strong>ARV Estimate:</strong> Good. Your ARV was close, but you may have been slightly swayed by the highest or lowest comps.</p>';
    } else {
        feedbackHTML += '<p><strong>ARV Estimate:</strong> Needs Work. Re-examine the comps (especially the most recent and relevant ones) for a better ARV. ⚠️</p>';
    }

    if (repairsScore >= 90) {
        feedbackHTML += '<p><strong>Repairs Estimate:</strong> Excellent! You nailed the repair budget based on the property condition. 🎯</p>';
    } else if (repairsScore >= 70) {
        feedbackHTML += '<p><strong>Repairs Estimate:</strong> Good. Your repair budget was reasonable, but check for missed big-ticket items.</p>';
    } else {
        feedbackHTML += '<p><strong>Repairs Estimate:</strong> Needs Work. Your repair budget was significantly off. Account for all major systems. ⚠️</p>';
    }

    if (maoScore >= 90) {
        feedbackHTML += '<p><strong>MAO Calculation:</strong> Excellent! Your MAO calculation was accurate. 🎯</p>';
    } else if (maoScore >= 70) {
        feedbackHTML += '<p><strong>MAO Calculation:</strong> Good. Your MAO was close, but double-check your math and formula application.</p>';
    } else {
        feedbackHTML += '<p><strong>MAO Calculation:</strong> Needs Work. Review the MAO formula: (ARV × 90%) - (Repairs × 2) - $10,000. ⚠️</p>';
    }

    if (finalScore >= 90) {
        feedbackHTML += '<p style="margin-top: 10px;"><strong>Overall Grade:</strong> You are an elite Apex Analyzer. Keep making offers like this! 💪</p>';
        feedbackClass = 'feedback-good';
    } else if (finalScore >= 70) {
        feedbackHTML += '<p style="margin-top: 10px;"><strong>Overall Grade:</strong> A solid, profitable analysis. You are ready to close deals. ✓</p>';
        feedbackClass = 'feedback-good';
    } else {
        feedbackHTML += '<p style="margin-top: 10px;"><strong>Overall Grade:</strong> Caution! This offer could have left money on the table or resulted in an unprofitable deal. 🚫</p>';
        feedbackClass = 'feedback-bad';
    }

    const feedbackElement = document.getElementById('feedback');
    feedbackElement.innerHTML = feedbackHTML;
    feedbackElement.className = feedbackClass;
}

// Main logic for form submission
document.getElementById('arv-form').addEventListener('submit', function(e) {
    e.preventDefault();

    if (!currentProperty) return;

    const playerARV = parseInt(document.getElementById('input-arv').value);

    let playerRepairs;
    if (currentProperty.repairOptions) {
        const selectedRepair = document.querySelector('input[name="repair-estimate"]:checked');
        playerRepairs = selectedRepair ? parseInt(selectedRepair.value) : 0;
    } else {
        playerRepairs = parseInt(document.getElementById('input-repairs').value);
    }

    const playerMAO = parseInt(document.getElementById('input-mao').value);

    const selectedComps = Array.from(document.querySelectorAll('input[name="selected-comps"]:checked'))
        .map(cb => cb.value);

    const ARV_TOLERANCE = currentProperty.trueARV * 0.05;
    const MAO_TOLERANCE = currentProperty.trueMAO * 0.10;

    let repairsScore;
    if (currentProperty.repairOptions) {
        const correctRepairOption = currentProperty.repairOptions.find(opt => opt.isCorrect);
        repairsScore = (playerRepairs === correctRepairOption.value) ? 100 : 0;
    } else {
        const REPAIRS_TOLERANCE = currentProperty.trueRepairs * 0.20;
        repairsScore = calculateScore(playerRepairs, currentProperty.trueRepairs, REPAIRS_TOLERANCE);
    }

    const arvScore = calculateScore(playerARV, currentProperty.trueARV, ARV_TOLERANCE);
    const maoScore = calculateScore(playerMAO, currentProperty.trueMAO, MAO_TOLERANCE);

    const goodComps = currentProperty.comps.filter(c => c.isGood).map(c => c.id);
    const correctSelections = selectedComps.filter(id => goodComps.includes(id)).length;
    const incorrectSelections = selectedComps.filter(id => !goodComps.includes(id)).length;
    const missedGoodComps = goodComps.filter(id => !selectedComps.includes(id)).length;

    let compScore = 100;
    compScore -= (incorrectSelections * 20);
    compScore -= (missedGoodComps * 15);
    compScore = Math.max(0, compScore);

    let finalScore = Math.round((compScore * 0.2) + (arvScore * 0.3) + (repairsScore * 0.2) + (maoScore * 0.3));
    finalScore = Math.max(0, finalScore - hintPenalty);
    const grade = getGrade(finalScore);

    document.getElementById('player-mao').textContent = formatCurrency(playerMAO);
    const scoreElement = document.getElementById('final-score');
    scoreElement.textContent = `${finalScore} / 100 (${grade})`;
    document.getElementById('results').classList.remove('hidden');

    showCompFeedback(selectedComps, goodComps);
    recordScore(finalScore);
    animateScore(scoreElement);

    if (finalScore >= 90) {
        showConfetti();
    }

    document.getElementById('next-challenge-btn').disabled = false;

    document.getElementById('true-arv').textContent = formatCurrency(currentProperty.trueARV);
    document.getElementById('true-repairs').textContent = formatCurrency(currentProperty.trueRepairs);
    document.getElementById('true-mao').textContent = formatCurrency(currentProperty.trueMAO);

    getDetailedFeedback(arvScore, repairsScore, compScore, maoScore, finalScore);

    if (currentProperty.id === properties.length) {
        document.getElementById('next-challenge-btn').textContent = "Game Complete! View Final Stats";
        document.getElementById('next-challenge-btn').onclick = showFinalStats;
    }
});

// Function to advance to the next property
function loadNewProperty() {
    currentPropertyIndex++;
    if (currentPropertyIndex < properties.length) {
        loadProperty(properties[currentPropertyIndex]);
        window.scrollTo(0, 0);
    } else {
        showFinalStats();
    }
}

// Function to load a random property
function loadRandomProperty() {
    const randomIndex = Math.floor(Math.random() * properties.length);
    currentPropertyIndex = randomIndex;
    loadProperty(properties[currentPropertyIndex]);
    document.getElementById('results').classList.add('hidden');
    document.getElementById('arv-form').reset();
    document.getElementById('next-challenge-btn').disabled = true;
    window.scrollTo(0, 0);
}

// Function to handle the end of the game
function showFinalStats() {
    alert(`Congratulations! You have analyzed all properties.\n\nYour Average Score: ${gameStats.avgScore}\nYour Best Score: ${gameStats.bestScore}\n\nKeep practicing with The Apex Method!`);
    document.getElementById('next-challenge-btn').disabled = true;
    document.getElementById('next-challenge-btn').textContent = "Game Complete!";
}

// Initialize game
function initializeGame() {
    console.log('Initializing Apex Analyzer...');
    loadStats();
    if (properties && properties.length > 0) {
        loadProperty(properties[currentPropertyIndex]);
    } else {
        console.error('No properties found!');
    }
}

// Calculator Functions
function appendCalc(value) {
    const display = document.getElementById('calc-display');
    if (display.value === '0' && value !== '.') {
        display.value = value;
    } else {
        display.value += value;
    }
}

function clearCalc() {
    document.getElementById('calc-display').value = '0';
}

function backspaceCalc() {
    const display = document.getElementById('calc-display');
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = '0';
    }
}

function calculateCalc() {
    const display = document.getElementById('calc-display');
    try {
        const expression = display.value.replace(/×/g, '*');
        const result = eval(expression);
        display.value = result;
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => {
            display.value = '0';
        }, 1500);
    }
}

// Statistics Functions
function loadStats() {
    const saved = localStorage.getItem('apexAnalyzerStats');
    if (saved) {
        gameStats = JSON.parse(saved);
        updateStatsDisplay();
    }
}

function saveStats() {
    localStorage.setItem('apexAnalyzerStats', JSON.stringify(gameStats));
}

function updateStatsDisplay() {
    document.getElementById('avg-score').textContent = gameStats.avgScore || '--';
    document.getElementById('best-score').textContent = gameStats.bestScore || '--';
}

function recordScore(score) {
    gameStats.scores.push(score);
    gameStats.totalDeals++;
    gameStats.avgScore = Math.round(gameStats.scores.reduce((a, b) => a + b, 0) / gameStats.scores.length);
    gameStats.bestScore = Math.max(gameStats.bestScore, score);
    saveStats();
    updateStatsDisplay();
}

// Hint System
function useHint() {
    if (hintUsed || !currentProperty) return;

    const goodComps = currentProperty.comps.filter(c => c.isGood);
    if (goodComps.length === 0) return;

    const randomGoodComp = goodComps[Math.floor(Math.random() * goodComps.length)];
const checkboxes = document.querySelectorAll('input[name="selected-comps"]');
    checkboxes.forEach(cb => {
        if (cb.value === randomGoodComp.id) {
            cb.parentElement.classList.add('comp-hint');
        }
    });

    hintUsed = true;
    hintPenalty = 10;
    document.getElementById('hint-btn').disabled = true;
    document.getElementById('hint-btn').textContent = 'Hint Used ✓';
}

// Visual Feedback on Comp Selection
function showCompFeedback(selectedComps, goodComps) {
    const checkboxes = document.querySelectorAll('input[name="selected-comps"]');

    checkboxes.forEach(cb => {
        const label = cb.parentElement;
        const compId = cb.value;

        label.classList.remove('comp-correct', 'comp-incorrect', 'comp-missed', 'comp-hint');

        if (selectedComps.includes(compId)) {
            if (goodComps.includes(compId)) {
                label.classList.add('comp-correct');
            } else {
                label.classList.add('comp-incorrect');
            }
        } else if (goodComps.includes(compId)) {
            label.classList.add('comp-missed');
        }
    });
}

// Animation Functions
function animateScore(element) {
    element.classList.add('score-animate');

    const finalValue = parseInt(element.textContent);
    let current = 0;
    const increment = Math.ceil(finalValue / 30);
    const timer = setInterval(() => {
        current += increment;
        if (current >= finalValue) {
            current = finalValue;
            clearInterval(timer);
        }
        const grade = getGrade(current);
        element.textContent = `${current} / 100 (${grade})`;
    }, 30);
}

function showConfetti() {
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);

    const colors = ['#C6A45E', '#FFD700', '#7A663A', '#FFA500', '#4CAF50'];

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(confetti);
    }

    setTimeout(() => {
        document.body.removeChild(container);
    }, 4000);
}

function fadeInElement(element) {
    element.classList.add('fade-in');
    setTimeout(() => {
        element.classList.remove('fade-in');
    }, 500);
}