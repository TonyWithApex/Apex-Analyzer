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
    },
    // 6. Quick Turn Rental (Low ARV, Very Low Rehab)
    {
        id: 6,
        address: "7 Renters Delight",
        beds: 2, baths: 1, sqFt: 800,
        condition: "Rent-ready, but needs new paint and deep clean to maximize rent/value.",
        trueARV: Math.round((185000 + 190000 + 160000) / 3),
        trueRepairs: 15000,
        repairOptions: [
            { value: 9000, isCorrect: false },
            { value: 15000, isCorrect: true },
            { value: 20000, isCorrect: false },
            { value: 25000, isCorrect: false },
        ],
        trueMAO: Math.round((0.90 * Math.round((185000 + 190000 + 160000) / 3)) - (2 * 15000) - 10000),
        comps: [
            { id: 'A', price: 185000, date: '2 weeks ago', condition: 'Identical unit, strong ARV.', isGood: true },
            { id: 'B', price: 190000, date: '1 month ago', condition: 'High-end finishes, adjust down.', isGood: true },
            { id: 'C', price: 160000, date: '3 months ago', condition: 'Dated interior, lowest ARV comp.', isGood: true },
            { id: 'D', price: 220000, date: '6 months ago', condition: 'Sold with a detached garage (ignore).', isGood: false },
            { id: 'E', price: 100000, date: '1 year ago', condition: 'Sale too old.', isGood: false },
            { id: 'F', price: 150000, date: '4 months ago', condition: 'Sold As-Is.', isGood: false }
        ]
    },
    // 7. Hoarder House Cleanout (Mid ARV, Mid-High Rehab)
    {
        id: 7,
        address: "33 Clutter Court",
        beds: 3, baths: 2, sqFt: 1600,
        condition: "Major cleanout needed. Interior is trashed. Requires new floors, kitchen, and minor drywall repair.",
        trueARV: Math.round((340000 + 360000 + 355000) / 3),
        trueRepairs: 65000,
        repairOptions: [
            { value: 40000, isCorrect: false },
            { value: 65000, isCorrect: true },
            { value: 90000, isCorrect: false },
            { value: 115000, isCorrect: false },
        ],
        trueMAO: Math.round((0.90 * Math.round((340000 + 360000 + 355000) / 3)) - (2 * 65000) - 10000),
        comps: [
            { id: 'A', price: 340000, date: '1 week ago', condition: 'Reliable ARV comp.', isGood: true },
            { id: 'B', price: 360000, date: '2 months ago', condition: 'Highest ARV comp, good ceiling.', isGood: true },
            { id: 'C', price: 400000, date: '1 month ago', condition: '4 bed, much larger (ignore).', isGood: false },
            { id: 'D', price: 355000, date: '3 weeks ago', condition: 'Solid ARV indicator.', isGood: true },
            { id: 'E', price: 250000, date: '6 months ago', condition: 'Sold by motivated seller.', isGood: false },
            { id: 'F', price: 200000, date: '1 year ago', condition: 'Sale too old.', isGood: false }
        ]
    },
    // 8. Bad Area, Minimal Profit (Low ARV, Mid Rehab)
    {
        id: 8,
        address: "8 Tough Neighborhood",
        beds: 3, baths: 1, sqFt: 1100,
        condition: "Need new roof, HVAC, and full cosmetic overhaul. Area dictates low ARV cap.",
        trueARV: Math.round((165000 + 175000 + 155000) / 3),
        trueRepairs: 50000,
        repairOptions: [
            { value: 30000, isCorrect: false },
            { value: 50000, isCorrect: true },
            { value: 70000, isCorrect: false },
            { value: 90000, isCorrect: false },
        ],
        trueMAO: Math.round((0.90 * Math.round((165000 + 175000 + 155000) / 3)) - (2 * 50000) - 10000),
        comps: [
            { id: 'A', price: 165000, date: '2 weeks ago', condition: 'Reliable ARV comp.', isGood: true },
            { id: 'B', price: 175000, date: '1 month ago', condition: 'Highest ARV comp, good ceiling.', isGood: true },
            { id: 'C', price: 200000, date: '3 months ago', condition: 'Just outside the area (ignore).', isGood: false },
            { id: 'D', price: 155000, date: '1 week ago', condition: 'Lowest ARV comp.', isGood: true },
            { id: 'E', price: 100000, date: '1 year ago', condition: 'Sale too old.', isGood: false },
            { id: 'F', price: 80000, date: '6 months ago', condition: 'Sold As-Is.', isGood: false }
        ]
    },
    // ... (rest of file continues unchanged)