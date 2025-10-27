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
            { value: 110000, isCorrect: false }
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
            { value: 135000, isCorrect: false }
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
            { value: 70000, isCorrect: false }
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
            { value: 125000, isCorrect: false }
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
            { value: 25000, isCorrect: false }
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
            { value: 115000, isCorrect: false }
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
            { value: 90000, isCorrect: false }
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
    // 9. Good Structure, Full Cosmetic (Mid ARV, Mid Rehab)
    {
        id: 9,
        address: "11 All Systems Go",
        beds: 4, baths: 3, sqFt: 2000,
        condition: "All systems (HVAC, roof) are modern. Needs new kitchen, baths, and flooring throughout.",
        trueARV: Math.round((410000 + 390000 + 350000) / 3),
        trueRepairs: 55000,
        repairOptions: [
            { value: 35000, isCorrect: false },
            { value: 55000, isCorrect: true },
            { value: 75000, isCorrect: false },
            { value: 100000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((410000 + 390000 + 350000) / 3)) - (2 * 55000) - 10000),
        comps: [
            { id: 'A', price: 410000, date: '1 month ago', condition: 'Highest ARV comp, good ceiling.', isGood: true },
            { id: 'B', price: 390000, date: '2 weeks ago', condition: 'Reliable ARV comp.', isGood: true },
            { id: 'C', price: 350000, date: '3 months ago', condition: 'Dated interior, lowest ARV comp.', isGood: true },
            { id: 'D', price: 450000, date: '1 week ago', condition: 'New construction (ignore).', isGood: false },
            { id: 'E', price: 250000, date: '1 year ago', condition: 'Sale too old.', isGood: false },
            { id: 'F', price: 300000, date: '6 months ago', condition: 'Foreclosure sale.', isGood: false }
        ]
    },
    // 10. Large Rehab, Potential Addition (High ARV, Mid-High Rehab)
    {
        id: 10,
        address: "55 Copper Peak Dr",
        beds: 4, baths: 2, sqFt: 2500,
        condition: "Large home, requires new roof, windows, and full cosmetic. Potential for 3rd bath addition ($15k cost).",
        trueARV: Math.round((540000 + 580000 + 555000) / 3),
        trueRepairs: 80000,
        repairOptions: [
            { value: 50000, isCorrect: false },
            { value: 80000, isCorrect: true },
            { value: 110000, isCorrect: false },
            { value: 145000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((540000 + 580000 + 555000) / 3)) - (2 * 80000) - 10000),
        comps: [
            { id: 'A', price: 540000, date: '2 weeks ago', condition: 'Reliable ARV comp.', isGood: true },
            { id: 'B', price: 580000, date: '1 month ago', condition: 'Includes 3rd bath addition (good ARV indicator).', isGood: true },
            { id: 'C', price: 650000, date: '3 months ago', condition: 'New construction (ignore).', isGood: false },
            { id: 'D', price: 555000, date: '1 week ago', condition: 'Highest ARV comp, good ceiling.', isGood: true },
            { id: 'E', price: 400000, date: '6 months ago', condition: 'Sold As-Is.', isGood: false },
            { id: 'F', price: 450000, date: '1 year ago', condition: 'Sale too old.', isGood: false }
        ]
    },
    // 11. Basement Leak Fix (Mid ARV, Low-Mid Rehab)
    {
        id: 11,
        address: "65 Riverbend Circle",
        beds: 3, baths: 2, sqFt: 1800,
        condition: "Modern open concept, but basement requires $15k in waterproofing. Light cosmetic upstairs.",
        trueARV: Math.round((410000 + 425000 + 415000) / 3),
        trueRepairs: 40000,
        repairOptions: [
            { value: 25000, isCorrect: false },
            { value: 40000, isCorrect: true },
            { value: 55000, isCorrect: false },
            { value: 70000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((410000 + 425000 + 415000) / 3)) - (2 * 40000) - 10000),
        comps: [
            { id: 'A', price: 410000, date: '2 weeks ago', condition: 'Perfect match, same neighborhood.', isGood: true },
            { id: 'B', price: 445000, date: '1 month ago', condition: 'Fully finished basement (subject is unfinished).', isGood: false },
            { id: 'C', price: 425000, date: '1 week ago', condition: 'Recent sale, excellent ARV indicator.', isGood: true },
            { id: 'D', price: 300000, date: '1 year ago', condition: 'Sale too old.', isGood: false },
            { id: 'E', price: 415000, date: '3 months ago', condition: 'Good comp, slight adjustment for age.', isGood: true },
            { id: 'F', price: 350000, date: '2 months ago', condition: 'Foreclosure sale.', isGood: false }
        ]
    },
    // 12. Small Lot, Premium Area (High ARV, Low Rehab)
    {
        id: 12,
        address: "22 Cypress Way",
        beds: 4, baths: 3, sqFt: 2200,
        condition: "Top school district. Needs quick cosmetic refresh to meet buyer expectations. Systems are sound.",
        trueARV: Math.round((745000 + 700000 + 760000) / 3),
        trueRepairs: 30000,
        repairOptions: [
            { value: 18000, isCorrect: false },
            { value: 30000, isCorrect: true },
            { value: 40000, isCorrect: false },
            { value: 55000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((745000 + 700000 + 760000) / 3)) - (2 * 30000) - 10000),
        comps: [
            { id: 'A', price: 745000, date: '1 month ago', condition: 'Similar size, perfect comp.', isGood: true },
            { id: 'B', price: 700000, date: '3 months ago', condition: 'Dated interior, lowest ARV comp.', isGood: true },
            { id: 'C', price: 850000, date: '2 months ago', condition: 'New construction (ignore).', isGood: false },
            { id: 'D', price: 760000, date: '2 weeks ago', condition: 'High-end finishes, good ARV ceiling.', isGood: true },
            { id: 'E', price: 650000, date: '1 year ago', condition: 'Sale too old.', isGood: false },
            { id: 'F', price: 500000, date: '6 months ago', condition: 'Small 3 bed unit, ignore.', isGood: false }
        ]
    },
    // 13. Deferred Maintenance Special (Mid-Low ARV, Mid Rehab)
    {
        id: 13,
        address: "18 Pine Needle Rd",
        beds: 3, baths: 1, sqFt: 1300,
        condition: "Needs roof, HVAC, and kitchen updates. General deferred maintenance for 10+ years.",
        trueARV: Math.round((255000 + 280000 + 265000) / 3),
        trueRepairs: 60000,
        repairOptions: [
            { value: 35000, isCorrect: false },
            { value: 60000, isCorrect: true },
            { value: 85000, isCorrect: false },
            { value: 110000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((255000 + 280000 + 265000) / 3)) - (2 * 60000) - 10000),
        comps: [
            { id: 'A', price: 255000, date: '3 weeks ago', condition: 'Comparable rehab, reliable.', isGood: true },
            { id: 'B', price: 280000, date: '1 month ago', condition: 'Larger lot and better view (adjust down).', isGood: true },
            { id: 'C', price: 220000, date: '2 months ago', condition: 'Sold by motivated seller, low price.', isGood: false },
            { id: 'D', price: 350000, date: '1 year ago', condition: 'Completely different area.', isGood: false },
            { id: 'E', price: 265000, date: '1 week ago', condition: 'Excellent recent comp.', isGood: true },
            { id: 'F', price: 150000, date: '6 months ago', condition: 'Burned down property.', isGood: false }
        ]
    },
    // 14. Multifamily Conversion Potential (High ARV, High Rehab)
    {
        id: 14,
        address: "41 Industrial Way",
        beds: 4, baths: 2, sqFt: 2500,
        condition: "Large single-family house zoned for duplex conversion. Needs full gut, new electrical/plumbing for two units.",
        trueARV: Math.round((620000 + 590000 + 610000) / 3),
        trueRepairs: 120000,
        repairOptions: [
            { value: 70000, isCorrect: false },
            { value: 120000, isCorrect: true },
            { value: 170000, isCorrect: false },
            { value: 215000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((620000 + 590000 + 610000) / 3)) - (2 * 120000) - 10000),
        comps: [
            { id: 'A', price: 620000, date: '1 month ago', condition: 'Recently converted duplex.', isGood: true },
            { id: 'B', price: 550000, date: '3 months ago', condition: 'Standard single-family remodel (not true ARV).', isGood: false },
            { id: 'C', price: 590000, date: '2 weeks ago', condition: 'Converted property, good ceiling price.', isGood: true },
            { id: 'D', price: 700000, date: '6 weeks ago', condition: 'New commercial development (ignore).', isGood: false },
            { id: 'E', price: 610000, date: '2 months ago', condition: 'Solid duplex comp.', isGood: true },
            { id: 'F', price: 400000, date: '1 year ago', condition: 'Sold as vacant land.', isGood: false }
        ]
    },
    // 15. Flooded Basement/Mold (Mid-Low ARV, Very High Rehab)
    {
        id: 15,
        address: "707 Puddle Place",
        beds: 3, baths: 1, sqFt: 1000,
        condition: "Unfinished basement flooded. Significant mold and HVAC replacement required.",
        trueARV: Math.round((195000 + 205000 + 210000) / 3),
        trueRepairs: 80000,
        repairOptions: [
            { value: 50000, isCorrect: false },
            { value: 80000, isCorrect: true },
            { value: 110000, isCorrect: false },
            { value: 145000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((195000 + 205000 + 210000) / 3)) - (2 * 80000) - 10000),
        comps: [
            { id: 'A', price: 195000, date: '1 week ago', condition: 'Similar size, solid ARV.', isGood: true },
            { id: 'B', price: 250000, date: '3 months ago', condition: 'Recently added second bath (subject only has one).', isGood: false },
            { id: 'C', price: 205000, date: '2 months ago', condition: 'Best reliable comp.', isGood: true },
            { id: 'D', price: 150000, date: '1 year ago', condition: 'Too old.', isGood: false },
            { id: 'E', price: 210000, date: '1 month ago', condition: 'High end of comp range.', isGood: true },
            { id: 'F', price: 100000, date: '6 months ago', condition: 'Foreclosure, ignore.', isGood: false }
        ]
    },
    // 16. Average Suburban Flip (Mid ARV, Mid Rehab)
    {
        id: 16,
        address: "800 Generic Ave",
        beds: 4, baths: 3, sqFt: 2100,
        condition: "Needs full cosmetic updates throughout. Roof is 15 years old and needs replacement.",
        trueARV: Math.round((440000 + 460000 + 450000) / 3),
        trueRepairs: 65000,
        repairOptions: [

      { value: 40000, isCorrect: false },
            { value: 65000, isCorrect: true },
            { value: 90000, isCorrect: false },
            { value: 115000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((440000 + 460000 + 450000) / 3)) - (2 * 65000) - 10000),
        comps: [
            { id: 'A', price: 440000, date: '1 month ago', condition: 'Standard flip, useable.', isGood: true },
            { id: 'B', price: 480000, date: '2 weeks ago', condition: 'Oversized lot, adjust down.', isGood: false },
            { id: 'C', price: 460000, date: '1 week ago', condition: 'Excellent ARV comp.', isGood: true },
            { id: 'D', price: 350000, date: '1 year ago', condition: 'Too old.', isGood: false },
            { id: 'E', price: 450000, date: '3 months ago', condition: 'Perfect match to subject ARV.', isGood: true },
            { id: 'F', price: 550000, date: '2 months ago', condition: 'Brand new construction (ignore).', isGood: false }
        ]
    },
    // 17. High-End Condos (High ARV, Low Rehab)
    {
        id: 17,
        address: "15 Sky Tower, Unit 12B",
        beds: 2, baths: 2, sqFt: 1100,
        condition: "High-rise unit. Needs minor kitchen refresh and new flooring. Excellent views are a factor.",
        trueARV: Math.round((645000 + 660000 + 650000) / 3),
        trueRepairs: 20000,
        repairOptions: [
            { value: 12000, isCorrect: false },
            { value: 20000, isCorrect: true },
            { value: 30000, isCorrect: false },
            { value: 35000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((645000 + 660000 + 650000) / 3)) - (2 * 20000) - 10000),
        comps: [
            { id: 'A', price: 645000, date: '1 week ago', condition: 'Identical unit, strong ARV.', isGood: true },
            { id: 'B', price: 700000, date: '1 month ago', condition: 'Penthouse view (adjust down).', isGood: false },
            { id: 'C', price: 660000, date: '2 weeks ago', condition: 'Best recent comp.', isGood: true },
            { id: 'D', price: 550000, date: '6 months ago', condition: 'Facing alley (ignore).', isGood: false },
            { id: 'E', price: 650000, date: '3 months ago', condition: 'Reliable sale, similar floor.', isGood: true },
            { id: 'F', price: 400000, date: '1 year ago', condition: 'Too old.', isGood: false }
        ]
    },
    // 18. Fire Damage Repair (Mid ARV, Very High Rehab)
    {
        id: 18,
        address: "102 Ashes Drive",
        beds: 3, baths: 2, sqFt: 1600,
        condition: "Minor fire damage in the kitchen, smoke damage throughout. Requires full system checks and mitigation.",
        trueARV: Math.round((305000 + 310000 + 285000) / 3),
        trueRepairs: 90000,
        repairOptions: [
            { value: 55000, isCorrect: false },
            { value: 90000, isCorrect: true },
            { value: 125000, isCorrect: false },
            { value: 160000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((305000 + 310000 + 285000) / 3)) - (2 * 90000) - 10000),
        comps: [
            { id: 'A', price: 305000, date: '1 month ago', condition: 'Similar size, perfect comp.', isGood: true },
            { id: 'B', price: 250000, date: '2 months ago', condition: 'Sold as-is, not renovated.', isGood: false },
            { id: 'C', price: 310000, date: '2 weeks ago', condition: 'High-end ARV comp.', isGood: true },
            { id: 'D', price: 285000, date: '3 months ago', condition: 'Solid ARV comp.', isGood: true },
            { id: 'E', price: 400000, date: '1 year ago', condition: '4 bed, much larger.', isGood: false },
            { id: 'F', price: 200000, date: '6 months ago', condition: 'Vacant lot sale.', isGood: false }
        ]
    },
    // 19. Historical District Fix (Low ARV, Mid Rehab)
    {
        id: 19,
        address: "7 Old Colonial St",
        beds: 3, baths: 1, sqFt: 1250,
        condition: "Historical property. Interior needs full renovation, but exterior brick/windows must be preserved (costly).",
        trueARV: Math.round((215000 + 225000 + 220000) / 3),
        trueRepairs: 55000,
        repairOptions: [
            { value: 35000, isCorrect: false },
            { value: 55000, isCorrect: true },
            { value: 75000, isCorrect: false },
            { value: 100000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((215000 + 225000 + 220000) / 3)) - (2 * 55000) - 10000),
        comps: [
            { id: 'A', price: 215000, date: '1 week ago', condition: 'Historic district remodel, reliable.', isGood: true },
            { id: 'B', price: 250000, date: '1 month ago', condition: 'Recently added second floor (subject is single-story).', isGood: false },
            { id: 'C', price: 225000, date: '2 weeks ago', condition: 'Best recent comp.', isGood: true },
            { id: 'D', price: 150000, date: '1 year ago', condition: 'Sale too old.', isGood: false },
            { id: 'E', price: 220000, date: '3 months ago', condition: 'Excellent ARV match.', isGood: true },
            { id: 'F', price: 100000, date: '6 months ago', condition: 'Commercial property.', isGood: false }
        ]
    },
    // 20. New Roof and Systems (Mid ARV, Mid-High Rehab)
    {
        id: 20,
        address: "10 Cedar Lane",
        beds: 4, baths: 2, sqFt: 1750,
        condition: "Cosmetic wear, but roof, furnace, and AC are all original and must be replaced.",
        trueARV: Math.round((380000 + 370000 + 390000) / 3),
        trueRepairs: 70000,
        repairOptions: [
            { value: 40000, isCorrect: false },
            { value: 70000, isCorrect: true },
            { value: 100000, isCorrect: false },
            { value: 125000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((380000 + 370000 + 390000) / 3)) - (2 * 70000) - 10000),
        comps: [
            { id: 'A', price: 380000, date: '1 month ago', condition: 'Similar size, great ARV.', isGood: true },
            { id: 'B', price: 450000, date: '2 weeks ago', condition: 'Significantly larger lot and pool (exclude).', isGood: false },
            { id: 'C', price: 370000, date: '1 week ago', condition: 'Solid ARV comp.', isGood: true },
            { id: 'D', price: 390000, date: '3 months ago', condition: 'High-end finishes, adjust down.', isGood: true },
            { id: 'E', price: 250000, date: '1 year ago', condition: 'Too old.', isGood: false },
            { id: 'F', price: 300000, date: '6 months ago', condition: 'As-is investor sale.', isGood: false }
        ]
    },
    // 21. Light Cosmetic, Investor Special (Mid ARV, Low Rehab)
    {
        id: 21,
        address: "42 Market Square",
        beds: 2, baths: 1, sqFt: 1050,
        condition: "Ready to rent but needs new paint and carpet to maximize rent rate. Perfect buy-and-hold.",
        trueARV: Math.round((205000 + 215000 + 210000) / 3),
        trueRepairs: 20000,
        repairOptions: [
            { value: 12000, isCorrect: false },
            { value: 20000, isCorrect: true },
            { value: 30000, isCorrect: false },
            { value: 35000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((205000 + 215000 + 210000) / 3)) - (2 * 20000) - 10000),
        comps: [
            { id: 'A', price: 205000, date: '1 month ago', condition: 'Similar condition, good ARV.', isGood: true },
            { id: 'B', price: 230000, date: '2 weeks ago', condition: 'Fully updated kitchen (adjust down).', isGood: false },
            { id: 'C', price: 215000, date: '1 week ago', condition: 'Excellent comp.', isGood: true },
            { id: 'D', price: 180000, date: '3 months ago', condition: 'Sold by family, low price.', isGood: false },
            { id: 'E', price: 210000, date: '4 months ago', condition: 'Solid ARV match.', isGood: true },
            { id: 'F', price: 150000, date: '1 year ago', condition: 'Too old.', isGood: false }
        ]
    },
    // 22. Foundation Issues (Mid-High ARV, Extremely High Rehab)
    {
        id: 22,
        address: "100 Shakey Ground Rd",
        beds: 4, baths: 3, sqFt: 2400,
        condition: "Major foundation issues. Requires $70k in structural work plus cosmetic updates.",
        trueARV: Math.round((490000 + 520000 + 505000) / 3),
        trueRepairs: 110000,
        repairOptions: [
            { value: 65000, isCorrect: false },
            { value: 110000, isCorrect: true },
            { value: 155000, isCorrect: false },
            { value: 200000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((490000 + 520000 + 505000) / 3)) - (2 * 110000) - 10000),
        comps: [
            { id: 'A', price: 490000, date: '1 week ago', condition: 'Similar home, strong ARV.', isGood: true },
            { id: 'B', price: 520000, date: '1 month ago', condition: 'High-end remodel, top ARV.', isGood: true },
            { id: 'C', price: 400000, date: '3 months ago', condition: 'Sold with foundation issues (ignore).', isGood: false },
            { id: 'D', price: 505000, date: '2 weeks ago', condition: 'Excellent recent sale.', isGood: true },
            { id: 'E', price: 600000, date: '1 year ago', condition: '4,000 sq ft home (ignore).', isGood: false },
            { id: 'F', price: 450000, date: '6 months ago', condition: 'As-is investor sale.', isGood: false }
        ]
    },
    // 23. Vacant Lot Potential (High ARV, Low Rehab)
    {
        id: 23,
        address: "303 Infill Street",
        beds: 3, baths: 2, sqFt: 1500,
        condition: "Small lot, high price/sq ft area. Needs quick light cosmetic updates to flip fast.",
        trueARV: Math.round((590000 + 550000 + 585000) / 3),
        trueRepairs: 25000,
        repairOptions: [
            { value: 15000, isCorrect: false },
            { value: 25000, isCorrect: true },
            { value: 35000, isCorrect: false },
            { value: 45000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((590000 + 550000 + 585000) / 3)) - (2 * 25000) - 10000),
        comps: [
            { id: 'A', price: 590000, date: '1 month ago', condition: 'Similar size, perfect comp.', isGood: true },
            { id: 'B', price: 550000, date: '3 months ago', condition: 'Dated interior, lowest ARV comp.', isGood: true },
            { id: 'C', price: 650000, date: '2 weeks ago', condition: 'Larger lot, adjust down.', isGood: false },
            { id: 'D', price: 585000, date: '1 week ago', condition: 'Excellent recent sale.', isGood: true },
            { id: 'E', price: 450000, date: '1 year ago', condition: 'Too old.', isGood: false },
            { id: 'F', price: 500000, date: '6 months ago', condition: '3 story home (ignore).', isGood: false }
        ]
    },
    // 24. Full Gut, Large Home (High ARV, Very High Rehab)
    {
        id: 24,
        address: "777 Money Pit Mansion",
        beds: 5, baths: 4, sqFt: 3500,
        condition: "Requires total gut. All systems, windows, roof, and interior must be new.",
        trueARV: Math.round((920000 + 850000 + 900000) / 3),
        trueRepairs: 180000,
        repairOptions: [
            { value: 110000, isCorrect: false },
            { value: 180000, isCorrect: true },
            { value: 250000, isCorrect: false },
            { value: 325000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((920000 + 850000 + 900000) / 3)) - (2 * 180000) - 10000),
        comps: [
            { id: 'A', price: 920000, date: '1 month ago', condition: 'Top comp, high end.', isGood: true },
            { id: 'B', price: 850000, date: '3 months ago', condition: 'Standard finishes, solid ARV.', isGood: true },
            { id: 'C', price: 900000, date: '2 weeks ago', condition: 'Excellent match to true ARV.', isGood: true },
            { id: 'D', price: 1100000, date: '1 year ago', condition: 'Luxury custom build (ignore).', isGood: false },
            { id: 'E', price: 700000, date: '6 months ago', condition: 'As-is investor sale.', isGood: false },
            { id: 'F', price: 800000, date: '1 year ago', condition: 'Too old.', isGood: false }
        ]
    },
    // 25. Minor Cosmetic Only (Low ARV, Very Low Rehab)
    {
        id: 25,
        address: "100 Happy Trails Ln",
        beds: 2, baths: 1, sqFt: 850,
        condition: "Move-in ready condition. Needs only fresh exterior paint and minor landscaping.",
        trueARV: Math.round((165000 + 155000 + 160000) / 3),
        trueRepairs: 8000,
        repairOptions: [
            { value: 5000, isCorrect: false },
            { value: 8000, isCorrect: true },
            { value: 11000, isCorrect: false },
            { value: 14000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((165000 + 155000 + 160000) / 3)) - (2 * 8000) - 10000),
        comps: [
            { id: 'A', price: 165000, date: '1 week ago', condition: 'Perfect match, ideal ARV.', isGood: true },
            { id: 'B', price: 155000, date: '3 weeks ago', condition: 'Good comp, slight adjustment for age.', isGood: true },
            { id: 'C', price: 200000, date: '2 months ago', condition: 'Large garage added (exclude).', isGood: false },
            { id: 'D', price: 160000, date: '2 months ago', condition: 'Solid match to true ARV.', isGood: true },
            { id: 'E', price: 100000, date: '1 year ago', condition: 'Too old.', isGood: false },
            { id: 'F', price: 130000, date: '6 months ago', condition: 'Foreclosure sale.', isGood: false }
        ]
    },
    // 26. Bad Electrical/Plumbing (Mid-High ARV, High Rehab)
    {
        id: 26,
        address: "44 Sparky Street",
        beds: 3, baths: 2, sqFt: 1700,
        condition: "Kitchen and baths are fine, but the entire electrical and plumbing system must be replaced.",
        trueARV: Math.round((375000 + 400000 + 385000) / 3),
        trueRepairs: 85000,
        repairOptions: [
            { value: 50000, isCorrect: false },
            { value: 85000, isCorrect: true },
            { value: 120000, isCorrect: false },
            { value: 155000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((375000 + 400000 + 385000) / 3)) - (2 * 85000) - 10000),
        comps: [
            { id: 'A', price: 375000, date: '1 month ago', condition: 'Similar size, good ARV.', isGood: true },
            { id: 'B', price: 400000, date: '2 weeks ago', condition: 'High-end finishes, adjust down.', isGood: true },
            { id: 'C', price: 385000, date: '1 week ago', condition: 'Excellent recent comp.', isGood: true },
            { id: 'D', price: 300000, date: '1 year ago', condition: 'Too old.', isGood: false },
            { id: 'E', price: 450000, date: '3 months ago', condition: '4 bed, much larger.', isGood: false },
            { id: 'F', price: 320000, date: '6 months ago', condition: 'Investor as-is.', isGood: false }
        ]
    },
    // 27. High ARV, Needs Cosmetic (High ARV, Low-Mid Rehab)
    {
        id: 27,
        address: "909 Vista Point",
        beds: 4, baths: 3, sqFt: 2800,
        condition: "Luxury neighborhood. Needs cosmetic refresh of kitchen and baths to reach top market value.",
        trueARV: Math.round((730000 + 680000 + 725000) / 3),
        trueRepairs: 45000,
        repairOptions: [
            { value: 25000, isCorrect: false },
            { value: 45000, isCorrect: true },
            { value: 65000, isCorrect: false },
            { value: 80000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((730000 + 680000 + 725000) / 3)) - (2 * 45000) - 10000),
        comps: [
            { id: 'A', price: 730000, date: '1 week ago', condition: 'Highest comp, good ARV target.', isGood: true },
            { id: 'B', price: 680000, date: '2 months ago', condition: 'Dated interior, lowest ARV comp.', isGood: true },
            { id: 'C', price: 725000, date: '3 weeks ago', condition: 'Perfect match, ideal ARV.', isGood: true },
            { id: 'D', price: 800000, date: '1 year ago', condition: 'Too old.', isGood: false },
            { id: 'E', price: 550000, date: '6 months ago', condition: 'Investor as-is.', isGood: false },
            { id: 'F', price: 900000, date: '2 months ago', condition: 'New construction (ignore).', isGood: false }
        ]
    },
    // 28. Garage Conversion Opportunity (Mid ARV, Mid Rehab)
    {
        id: 28,
        address: "505 Corner Plot",
        beds: 3, baths: 2, sqFt: 1350,
        condition: "Garage can be converted to an extra bedroom/office (estimated $20k). Needs full interior update.",
        trueARV: Math.round((325000 + 340000 + 335000) / 3),
        trueRepairs: 55000,
        repairOptions: [
            { value: 35000, isCorrect: false },
            { value: 55000, isCorrect: true },
            { value: 75000, isCorrect: false },
            { value: 100000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((325000 + 340000 + 335000) / 3)) - (2 * 55000) - 10000),
        comps: [
            { id: 'A', price: 325000, date: '1 month ago', condition: 'Similar size, solid ARV.', isGood: true },
            { id: 'B', price: 340000, date: '2 weeks ago', condition: 'Includes garage conversion (good ARV).', isGood: true },
            { id: 'C', price: 250000, date: '1 year ago', condition: 'Too old.', isGood: false },
            { id: 'D', price: 335000, date: '1 week ago', condition: 'Excellent recent sale.', isGood: true },
            { id: 'E', price: 400000, date: '3 months ago', condition: '4 bed, much larger.', isGood: false },
            { id: 'F', price: 280000, date: '6 months ago', condition: 'Foreclosure sale.', isGood: false }
        ]
    },
    // 29. Tiny Home, High Price/SqFt (Low ARV, Low Rehab)
    {
        id: 29,
        address: "88 Little Cottage",
        beds: 1, baths: 1, sqFt: 500,
        condition: "Micro unit in a trendy area. Needs minor cosmetic updates only.",
        trueARV: Math.round((185000 + 200000 + 195000) / 3),
        trueRepairs: 15000,
        repairOptions: [
            { value: 9000, isCorrect: false },
            { value: 15000, isCorrect: true },
            { value: 20000, isCorrect: false },
            { value: 25000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((185000 + 200000 + 195000) / 3)) - (2 * 15000) - 10000),
        comps: [
            { id: 'A', price: 185000, date: '1 week ago', condition: 'Identical unit, reliable.', isGood: true },
            { id: 'B', price: 200000, date: '1 month ago', condition: 'High-end finishes, adjust down.', isGood: true },
            { id: 'C', price: 250000, date: '2 months ago', condition: 'Large yard, subject has small patio.', isGood: false },
            { id: 'D', price: 195000, date: '3 weeks ago', condition: 'Best recent comp.', isGood: true },
            { id: 'E', price: 150000, date: '1 year ago', condition: 'Too old.', isGood: false },
            { id: 'F', price: 100000, date: '6 months ago', condition: 'As-is investor sale.', isGood: false }
        ]
    },
    // 30. High Risk, High Reward (Mid-High ARV, Very High Rehab)
    {
        id: 30,
        address: "700 Cliffside View",
        beds: 5, baths: 3, sqFt: 2800,
        condition: "High-value area, but house is completely dilapidated. Full structural, system, and cosmetic gut required.",
        trueARV: Math.round((700000 + 650000 + 670000) / 3),
        trueRepairs: 150000,
        repairOptions: [
            { value: 90000, isCorrect: false },
            { value: 150000, isCorrect: true },
            { value: 210000, isCorrect: false },
            { value: 270000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((700000 + 650000 + 670000) / 3)) - (2 * 150000) - 10000),
        comps: [
            { id: 'A', price: 700000, date: '1 month ago', condition: 'Fully renovated, excellent ARV.', isGood: true },
            { id: 'B', price: 650000, date: '2 months ago', condition: 'Similar size, solid ARV.', isGood: true },
            { id: 'C', price: 800000, date: '1 week ago', condition: 'New construction (ignore).', isGood: false },
            { id: 'D', price: 670000, date: '3 weeks ago', condition: 'Best recent comp.', isGood: true },
            { id: 'E', price: 500000, date: '1 year ago', condition: 'Too old.', isGood: false },
            { id: 'F', price: 400000, date: '6 months ago', condition: 'As-is investor sale.', isGood: false }
        ]
    },
    // 31. Out of State Investor Special (Low ARV, Mid Rehab)
    {
        id: 31,
        address: "420 Rust Belt Way",
        beds: 3, baths: 1, sqFt: 1150,
        condition: "Needs full kitchen, bath, and new flooring/paint. All systems functioning but old.",
        trueARV: Math.round((135000 + 150000 + 140000) / 3),
        trueRepairs: 35000,
        repairOptions: [
            { value: 20000, isCorrect: false },
            { value: 35000, isCorrect: true },
            { value: 50000, isCorrect: false },
            { value: 65000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((135000 + 150000 + 140000) / 3)) - (2 * 35000) - 10000),
        comps: [
            { id: 'A', price: 135000, date: '1 month ago', condition: 'Similar condition, good ARV.', isGood: true },
            { id: 'B', price: 150000, date: '2 weeks ago', condition: 'High end of comp range.', isGood: true },
            { id: 'C', price: 180000, date: '1 year ago', condition: 'Too old.', isGood: false },
            { id: 'D', price: 140000, date: '1 week ago', condition: 'Perfect match to true ARV.', isGood: true },
            { id: 'E', price: 100000, date: '6 months ago', condition: 'Foreclosure sale.', isGood: false },
            { id: 'F', price: 200000, date: '3 months ago', condition: '4 bed, much larger.', isGood: false }
        ]
    },
    // 32. Standard Flip, Quick Turn (Mid ARV, Low-Mid Rehab)
    {
        id: 32,
        address: "17 Good Deal St",
        beds: 3, baths: 2, sqFt: 1550,
        condition: "Needs new kitchen counters/appliances, updated bathrooms, and fresh paint.",
        trueARV: Math.round((345000 + 320000 + 360000) / 3),
        trueRepairs: 45000,
        repairOptions: [
            { value: 25000, isCorrect: false },
            { value: 45000, isCorrect: true },
            { value: 65000, isCorrect: false },
            { value: 80000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((345000 + 320000 + 360000) / 3)) - (2 * 45000) - 10000),
        comps: [
            { id: 'A', price: 345000, date: '1 month ago', condition: 'Excellent comp.', isGood: true },
            { id: 'B', price: 320000, date: '3 weeks ago', condition: 'Slightly dated interior.', isGood: true },
            { id: 'C', price: 360000, date: '2 months ago', condition: 'Premium finishes, adjust down.', isGood: true },
            { id: 'D', price: 250000, date: '1 year ago', condition: 'Too old.', isGood: false },
            { id: 'E', price: 400000, date: '6 months ago', condition: 'Next neighborhood over (ignore).', isGood: false },
            { id: 'F', price: 280000, date: '4 months ago', condition: 'As-is investor sale.', isGood: false }
        ]
    },
    // 33. Rural, High Acreage (Mid ARV, Mid Rehab)
    {
        id: 33,
        address: "22 Farmland Way",
        beds: 4, baths: 2, sqFt: 2000,
        condition: "High acreage boosts ARV. House needs new roof and full cosmetic update.",
        trueARV: Math.round((410000 + 405000 + 395000) / 3),
        trueRepairs: 60000,
        repairOptions: [
            { value: 35000, isCorrect: false },
            { value: 60000, isCorrect: true },
            { value: 85000, isCorrect: false },
            { value: 110000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((410000 + 405000 + 395000) / 3)) - (2 * 60000) - 10000),
        comps: [
            { id: 'A', price: 410000, date: '2 weeks ago', condition: 'Similar acreage, good ARV.', isGood: true },
            { id: 'B', price: 350000, date: '1 month ago', condition: 'Low acreage (ignore).', isGood: false },
            { id: 'C', price: 405000, date: '1 week ago', condition: 'Excellent match to true ARV.', isGood: true },
            { id: 'D', price: 450000, date: '3 months ago', condition: 'Includes large barn (subject lacks one).', isGood: false },
            { id: 'E', price: 395000, date: '4 months ago', condition: 'Solid ARV comp.', isGood: true },
            { id: 'F', price: 300000, date: '1 year ago', condition: 'Too old.', isGood: false }
        ]
    },
    // 34. Multi-Unit Property (High ARV, Mid Rehab)
    {
        id: 34,
        address: "98 Duplex Drive",
        beds: 6, baths: 3, sqFt: 2800,
        condition: "Duplex needs cosmetic updates in both units to maximize rents. Systems are functional.",
        trueARV: Math.round((600000 + 625000 + 550000) / 3),
        trueRepairs: 70000,
        repairOptions: [
            { value: 40000, isCorrect: false },
            { value: 70000, isCorrect: true },
            { value: 100000, isCorrect: false },
            { value: 125000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((600000 + 625000 + 550000) / 3)) - (2 * 70000) - 10000),
        comps: [
            { id: 'A', price: 600000, date: '1 month ago', condition: 'Similar duplex, good ARV.', isGood: true },
            { id: 'B', price: 630000, date: '2 weeks ago', condition: 'Triplex unit (ignore).', isGood: false },
            { id: 'C', price: 625000, date: '1 week ago', condition: 'Excellent recent sale.', isGood: true },
            { id: 'D', price: 550000, date: '4 months ago', condition: 'Dated interior, lowest ARV comp.', isGood: true },
            { id: 'E', price: 400000, date: '1 year ago', condition: 'Too old.', isGood: false },
            { id: 'F', price: 700000, date: '3 months ago', condition: 'New construction townhome (ignore).', isGood: false }
        ]
    },
    // 35. High Rehab, Small House (Low ARV, Mid-High Rehab)
    {
        id: 35,
        address: "12 Smallest Home Ln",
        beds: 2, baths: 1, sqFt: 700,
        condition: "Needs roof, electric panel, and full interior gut. Very old house.",
        trueARV: Math.round((125000 + 100000 + 120000) / 3),
        trueRepairs: 45000,
        repairOptions: [
            { value: 25000, isCorrect: false },
            { value: 45000, isCorrect: true },
            { value: 65000, isCorrect: false },
            { value: 80000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((125000 + 100000 + 120000) / 3)) - (2 * 45000) - 10000),
        comps: [
            { id: 'A', price: 125000, date: '1 month ago', condition: 'Similar size, perfect ARV.', isGood: true },
            { id: 'B', price: 100000, date: '3 weeks ago', condition: 'Dated interior, lowest ARV comp.', isGood: true },
            { id: 'C', price: 150000, date: '2 months ago', condition: 'Two-story unit (ignore).', isGood: false },
            { id: 'D', price: 120000, date: '1 week ago', condition: 'Excellent match to true ARV.', isGood: true },
            { id: 'E', price: 80000, date: '1 year ago', condition: 'Too old.', isGood: false },
            { id: 'F', price: 60000, date: '6 months ago', condition: 'Foreclosure sale.', isGood: false }
        ]
    },
    // 36. Suburban Split-Level (Mid ARV, Mid Rehab)
    {
        id: 36,
        address: "77 Split Level Way",
        beds: 4, baths: 3, sqFt: 2200,
        condition: "Split-level style. Needs full cosmetic update and new HVAC system.",
        trueARV: Math.round((470000 + 440000 + 460000) / 3),
        trueRepairs: 60000,
        repairOptions: [
            { value: 35000, isCorrect: false },
            { value: 60000, isCorrect: true },
            { value: 85000, isCorrect: false },
            { value: 110000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((470000 + 440000 + 460000) / 3)) - (2 * 60000) - 10000),
        comps: [
            { id: 'A', price: 470000, date: '2 weeks ago', condition: 'Similar style, good ARV.', isGood: true },
            { id: 'B', price: 440000, date: '1 month ago', condition: 'Dated interior, lowest ARV comp.', isGood: true },
            { id: 'C', price: 500000, date: '3 months ago', condition: 'Pool added (ignore).', isGood: false },
            { id: 'D', price: 460000, date: '1 week ago', condition: 'Perfect match to true ARV.', isGood: true },
            { id: 'E', price: 350000, date: '1 year ago', condition: 'Too old.', isGood: false },
            { id: 'F', price: 550000, date: '6 months ago', condition: 'New construction ranch (ignore).', isGood: false }
        ]
    },
    // 37. High-End Custom Home (High ARV, Mid Rehab)
    {
        id: 37,
        address: "100 Gold Coast Dr",
        beds: 5, baths: 4, sqFt: 3500,
        condition: "Custom home, needs high-end kitchen and master bath renovation to match comps.",
        trueARV: Math.round((920000 + 1000000 + 960000) / 3),
        trueRepairs: 100000,
        repairOptions: [
            { value: 60000, isCorrect: false },
            { value: 100000, isCorrect: true },
            { value: 140000, isCorrect: false },
            { value: 180000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((920000 + 1000000 + 960000) / 3)) - (2 * 100000) - 10000),
        comps: [
            { id: 'A', price: 920000, date: '1 month ago', condition: 'Similar custom home, solid ARV.', isGood: true },
            { id: 'B', price: 1000000, date: '2 weeks ago', condition: 'Top end ARV comp.', isGood: true },
            { id: 'C', price: 1200000, date: '1 year ago', condition: 'Too old.', isGood: false },
            { id: 'D', price: 960000, date: '1 week ago', condition: 'Excellent recent sale.', isGood: true },
            { id: 'E', price: 750000, date: '6 months ago', condition: 'As-is investor sale.', isGood: false },
            { id: 'F', price: 800000, date: '4 months ago', condition: '4 bed, much smaller.', isGood: false }
        ]
    },
    // 38. Cosmetic, Quick Flip (Mid ARV, Low Rehab)
    {
        id: 38,
        address: "10 Fast Flip Lane",
        beds: 3, baths: 2, sqFt: 1400,
        condition: "Needs paint, flooring, and minor kitchen updates. Systems are all good.",
        trueARV: Math.round((295000 + 310000 + 305000) / 3),
        trueRepairs: 30000,
        repairOptions: [
            { value: 18000, isCorrect: false },
            { value: 30000, isCorrect: true },
            { value: 40000, isCorrect: false },
            { value: 55000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((295000 + 310000 + 305000) / 3)) - (2 * 30000) - 10000),
        comps: [
            { id: 'A', price: 295000, date: '1 month ago', condition: 'Similar size, solid ARV.', isGood: true },
            { id: 'B', price: 310000, date: '2 weeks ago', condition: 'High-end finishes, adjust down.', isGood: true },
            { id: 'C', price: 250000, date: '1 year ago', condition: 'Too old.', isGood: false },
            { id: 'D', price: 305000, date: '1 week ago', condition: 'Excellent match to true ARV.', isGood: true },
            { id: 'E', price: 350000, date: '3 months ago', condition: '4 bed, much larger.', isGood: false },
            { id: 'F', price: 200000, date: '6 months ago', condition: 'Foreclosure sale.', isGood: false }
        ]
    },
    // 39. Massive Systems Failure (Mid ARV, Very High Rehab)
    {
        id: 39,
        address: "20 Systems Out Place",
        beds: 3, baths: 1, sqFt: 1100,
        condition: "HVAC, roof, and water heater all need immediate replacement. Light cosmetic needed.",
        trueARV: Math.round((265000 + 280000 + 275000) / 3),
        trueRepairs: 80000,
        repairOptions: [
            { value: 50000, isCorrect: false },
            { value: 80000, isCorrect: true },
            { value: 110000, isCorrect: false },
            { value: 145000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((265000 + 280000 + 275000) / 3)) - (2 * 80000) - 10000),
        comps: [
            { id: 'A', price: 265000, date: '1 month ago', condition: 'Similar size, solid ARV.', isGood: true },
            { id: 'B', price: 280000, date: '2 weeks ago', condition: 'High-end finishes, adjust down.', isGood: true },
            { id: 'C', price: 220000, date: '1 year ago', condition: 'Too old.', isGood: false },
            { id: 'D', price: 275000, date: '1 week ago', condition: 'Excellent recent sale.', isGood: true },
            { id: 'E', price: 300000, date: '3 months ago', condition: '4 bed, much larger.', isGood: false },
            { id: 'F', price: 200000, date: '6 months ago', condition: 'As-is investor sale.', isGood: false }
        ]
    },
    // 40. High Sq Ft, Low Price/Sq Ft (Low ARV, Mid Rehab)
    {
        id: 40,
        address: "50 Wide Open Ranch",
        beds: 4, baths: 2, sqFt: 2500,
        condition: "Large ranch home. Needs full interior renovation. All systems function but are old.",
        trueARV: Math.round((350000 + 375000 + 360000) / 3),
        trueRepairs: 60000,
        repairOptions: [
            { value: 35000, isCorrect: false },
            { value: 60000, isCorrect: true },
            { value: 85000, isCorrect: false },
            { value: 110000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((350000 + 375000 + 360000) / 3)) - (2 * 60000) - 10000),
        comps: [
            { id: 'A', price: 350000, date: '1 month ago', condition: 'Similar size, solid ARV.', isGood: true },
            { id: 'B', price: 375000, date: '2 weeks ago', condition: 'High-end finishes, adjust down.', isGood: true },
            { id: 'C', price: 300000, date: '1 year ago', condition: 'Too old.', isGood: false },
            { id: 'D', price: 360000, date: '1 week ago', condition: 'Excellent match to true ARV.', isGood: true },
            { id: 'E', price: 450000, date: '3 months ago', condition: 'New construction (ignore).', isGood: false },
            { id: 'F', price: 250000, date: '6 months ago', condition: 'Foreclosure sale.', isGood: false }
        ]
    },
    // 41. Starter Home, Major Upgrades (Mid ARV, Mid Rehab)
    {
        id: 41,
        address: "70 Suburban Starter",
        beds: 3, baths: 1, sqFt: 1100,
        condition: "Needs full kitchen, bath, and electrical upgrade to modern standards.",
        trueARV: Math.round((235000 + 250000 + 245000) / 3),
        trueRepairs: 50000,
        repairOptions: [
            { value: 30000, isCorrect: false },
            { value: 50000, isCorrect: true },
            { value: 70000, isCorrect: false },
            { value: 90000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((235000 + 250000 + 245000) / 3)) - (2 * 50000) - 10000),
        comps: [
            { id: 'A', price: 235000, date: '1 month ago', condition: 'Similar size, solid ARV.', isGood: true },
            { id: 'B', price: 250000, date: '2 weeks ago', condition: 'High-end finishes, adjust down.', isGood: true },
            { id: 'C', price: 200000, date: '1 year ago', condition: 'Too old.', isGood: false },
            { id: 'D', price: 245000, date: '1 week ago', condition: 'Excellent recent sale.', isGood: true },
            { id: 'E', price: 300000, date: '3 months ago', condition: '4 bed, much larger.', isGood: false },
            { id: 'F', price: 150000, date: '6 months ago', condition: 'As-is investor sale.', isGood: false }
        ]
    },
    // 42. High-Density Townhome (Mid ARV, Low Rehab)
    {
        id: 42,
        address: "505 Townhouse Lane",
        beds: 3, baths: 2, sqFt: 1250,
        condition: "HOA handles exterior. Interior needs only light cosmetic updates (paint, carpet).",
        trueARV: Math.round((305000 + 320000 + 315000) / 3),
        trueRepairs: 20000,
        repairOptions: [
            { value: 12000, isCorrect: false },
            { value: 20000, isCorrect: true },
            { value: 30000, isCorrect: false },
            { value: 35000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((305000 + 320000 + 315000) / 3)) - (2 * 20000) - 10000),
        comps: [
            { id: 'A', price: 305000, date: '1 month ago', condition: 'Similar unit, good ARV.', isGood: true },
            { id: 'B', price: 320000, date: '2 weeks ago', condition: 'High-end finishes, adjust down.', isGood: true },
            { id: 'C', price: 280000, date: '1 year ago', condition: 'Too old.', isGood: false },
            { id: 'D', price: 315000, date: '1 week ago', condition: 'Excellent recent sale.', isGood: true },
            { id: 'E', price: 350000, date: '3 months ago', condition: 'End unit with premium (ignore).', isGood: false },
            { id: 'F', price: 250000, date: '6 months ago', condition: 'Foreclosure sale.', isGood: false }
        ]
    },
    // 43. Old Systems, Clean Interior (Mid ARV, Mid-High Rehab)
    {
        id: 43,
        address: "99 Antique Ave",
        beds: 4, baths: 2, sqFt: 1900,
        condition: "Clean interior but requires new furnace, water heater, and electrical panel.",
        trueARV: Math.round((380000 + 400000 + 395000) / 3),
        trueRepairs: 75000,
        repairOptions: [
            { value: 45000, isCorrect: false },
            { value: 75000, isCorrect: true },
            { value: 105000, isCorrect: false },
            { value: 135000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((380000 + 400000 + 395000) / 3)) - (2 * 75000) - 10000),
        comps: [
            { id: 'A', price: 380000, date: '1 month ago', condition: 'Similar size, solid ARV.', isGood: true },
            { id: 'B', price: 400000, date: '2 weeks ago', condition: 'High-end finishes, adjust down.', isGood: true },
            { id: 'C', price: 300000, date: '1 year ago', condition: 'Too old.', isGood: false },
            { id: 'D', price: 395000, date: '1 week ago', condition: 'Excellent recent sale.', isGood: true },
            { id: 'E', price: 450000, date: '3 months ago', condition: 'New construction (ignore).', isGood: false },
            { id: 'F', price: 320000, date: '6 months ago', condition: 'As-is investor sale.', isGood: false }
        ]
    },
    // 44. Low-End, High Volume Area (Low ARV, Mid Rehab)
    {
        id: 44,
        address: "70 Cheap Street",
        beds: 2, baths: 1, sqFt: 800,
        condition: "Needs full interior renovation (kitchen, bath, flooring). High volume turnover area.",
        trueARV: Math.round((125000 + 135000 + 130000) / 3),
        trueRepairs: 40000,
        repairOptions: [
            { value: 25000, isCorrect: false },
            { value: 40000, isCorrect: true },
            { value: 55000, isCorrect: false },
            { value: 70000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((125000 + 135000 + 130000) / 3)) - (2 * 40000) - 10000),
        comps: [
            { id: 'A', price: 125000, date: '1 month ago', condition: 'Similar size, solid ARV.', isGood: true },
            { id: 'B', price: 135000, date: '2 weeks ago', condition: 'High-end finishes, adjust down.', isGood: true },
            { id: 'C', price: 100000, date: '1 year ago', condition: 'Too old.', isGood: false },
            { id: 'D', price: 130000, date: '1 week ago', condition: 'Excellent match to true ARV.', isGood: true },
            { id: 'E', price: 150000, date: '3 months ago', condition: '3 bed, much larger.', isGood: false },
            { id: 'F', price: 80000, date: '6 months ago', condition: 'Foreclosure sale.', isGood: false }
        ]
    },
    // 45. Cosmetic Fix, High ARV (High ARV, Low Rehab)
    {
        id: 45,
        address: "20 Millionaire Row",
        beds: 4, baths: 3, sqFt: 3000,
        condition: "High-end neighborhood. Needs cosmetic refresh of master bath and kitchen to maximize ARV.",
        trueARV: Math.round((780000 + 820000 + 810000) / 3),
        trueRepairs: 50000,
        repairOptions: [
            { value: 30000, isCorrect: false },
            { value: 50000, isCorrect: true },
            { value: 70000, isCorrect: false },
            { value: 90000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((780000 + 820000 + 810000) / 3)) - (2 * 50000) - 10000),
        comps: [
            { id: 'A', price: 780000, date: '1 month ago', condition: 'Similar size, solid ARV.', isGood: true },
            { id: 'B', price: 820000, date: '2 weeks ago', condition: 'High-end finishes, adjust down.', isGood: true },
            { id: 'C', price: 900000, date: '1 year ago', condition: 'Too old.', isGood: false },
            { id: 'D', price: 810000, date: '1 week ago', condition: 'Excellent recent sale.', isGood: true },
            { id: 'E', price: 600000, date: '6 months ago', condition: 'As-is investor sale.', isGood: false },
            { id: 'F', price: 500000, date: '4 months ago', condition: '3 bed, much smaller.', isGood: false }
        ]
    },
    // 46. Deferred Maintenance Special (Mid ARV, Mid-High Rehab)
    {
        id: 46,
        address: "100 Backlog Blvd",
        beds: 3, baths: 2, sqFt: 1600,
        condition: "Roof is old, needs full interior renovation and new systems (HVAC, water heater).",
        trueARV: Math.round((315000 + 330000 + 325000) / 3),
        trueRepairs: 70000,
        repairOptions: [
            { value: 40000, isCorrect: false },
            { value: 70000, isCorrect: true },
            { value: 100000, isCorrect: false },
            { value: 125000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((315000 + 330000 + 325000) / 3)) - (2 * 70000) - 10000),
        comps: [
            { id: 'A', price: 315000, date: '1 month ago', condition: 'Similar size, solid ARV.', isGood: true },
            { id: 'B', price: 330000, date: '2 weeks ago', condition: 'High-end finishes, adjust down.', isGood: true },
            { id: 'C', price: 250000, date: '1 year ago', condition: 'Too old.', isGood: false },
            { id: 'D', price: 325000, date: '1 week ago', condition: 'Excellent recent sale.', isGood: true },
            { id: 'E', price: 400000, date: '3 months ago', condition: '4 bed, much larger.', isGood: false },
            { id: 'F', price: 200000, date: '6 months ago', condition: 'Foreclosure sale.', isGood: false }
        ]
    },
    // 47. Small Ranch Home (Low ARV, Low-Mid Rehab)
    {
        id: 47,
        address: "77 Ranch House Rd",
        beds: 2, baths: 1, sqFt: 900,
        condition: "Ranch style. Needs new flooring, paint, and minor kitchen updates.",
        trueARV: Math.round((175000 + 185000 + 180000) / 3),
        trueRepairs: 25000,
        repairOptions: [
            { value: 15000, isCorrect: false },
            { value: 25000, isCorrect: true },
            { value: 35000, isCorrect: false },
            { value: 45000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((175000 + 185000 + 180000) / 3)) - (2 * 25000) - 10000),
        comps: [
            { id: 'A', price: 175000, date: '1 month ago', condition: 'Similar size, solid ARV.', isGood: true },
            { id: 'B', price: 185000, date: '2 weeks ago', condition: 'High-end finishes, adjust down.', isGood: true },
            { id: 'C', price: 150000, date: '1 year ago', condition: 'Too old.', isGood: false },
            { id: 'D', price: 180000, date: '1 week ago', condition: 'Excellent match to true ARV.', isGood: true },
            { id: 'E', price: 220000, date: '3 months ago', condition: '3 bed, much larger.', isGood: false },
            { id: 'F', price: 120000, date: '6 months ago', condition: 'Foreclosure sale.', isGood: false }
        ]
    },
    // 48. High Volume, Low Price Area (Low ARV, Mid Rehab)
    {
        id: 48,
        address: "22 Busy Street",
        beds: 3, baths: 1, sqFt: 1200,
        condition: "Needs full interior renovation. High volume rental area.",
        trueARV: Math.round((145000 + 155000 + 150000) / 3),
        trueRepairs: 45000,
        repairOptions: [
            { value: 25000, isCorrect: false },
            { value: 45000, isCorrect: true },
            { value: 65000, isCorrect: false },
            { value: 80000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((145000 + 155000 + 150000) / 3)) - (2 * 45000) - 10000),
        comps: [
            { id: 'A', price: 145000, date: '1 month ago', condition: 'Similar size, solid ARV.', isGood: true },
            { id: 'B', price: 155000, date: '2 weeks ago', condition: 'High-end finishes, adjust down.', isGood: true },
            { id: 'C', price: 110000, date: '1 year ago', condition: 'Too old.', isGood: false },
            { id: 'D', price: 150000, date: '1 week ago', condition: 'Excellent match to true ARV.', isGood: true },
            { id: 'E
                ', price: 180000, date: '3 months ago', condition: '4 bed, much larger.', isGood: false },
            { id: 'F', price: 90000, date: '6 months ago', condition: 'Foreclosure sale.', isGood: false }
        ]
    },
    // 49. Large Lot, Suburbia (Mid ARV, Mid Rehab)
    {
        id: 49,
        address: "33 Acreage Drive",
        beds: 4, baths: 3, sqFt: 2100,
        condition: "Large lot, needs full cosmetic update and new roof.",
        trueARV: Math.round((420000 + 440000 + 435000) / 3),
        trueRepairs: 60000,
        repairOptions: [
            { value: 35000, isCorrect: false },
            { value: 60000, isCorrect: true },
            { value: 85000, isCorrect: false },
            { value: 110000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((420000 + 440000 + 435000) / 3)) - (2 * 60000) - 10000),
        comps: [
            { id: 'A', price: 420000, date: '1 month ago', condition: 'Similar size, solid ARV.', isGood: true },
            { id: 'B', price: 440000, date: '2 weeks ago', condition: 'High-end finishes, adjust down.', isGood: true },
            { id: 'C', price: 350000, date: '1 year ago', condition: 'Too old.', isGood: false },
            { id: 'D', price: 435000, date: '1 week ago', condition: 'Excellent recent sale.', isGood: true },
            { id: 'E', price: 500000, date: '3 months ago', condition: 'New construction (ignore).', isGood: false },
            { id: 'F', price: 380000, date: '6 months ago', condition: 'As-is investor sale.', isGood: false }
        ]
    },
    // 50. Final Heavy Rehab (Mid ARV, Very High Rehab)
    {
        id: 50,
        address: "100 Finish Line Way",
        beds: 3, baths: 2, sqFt: 1500,
        condition: "Full gut job. Needs new roof, all systems, and total interior renovation.",
        trueARV: Math.round((295000 + 310000 + 305000) / 3),
        trueRepairs: 100000,
        repairOptions: [
            { value: 60000, isCorrect: false },
            { value: 100000, isCorrect: true },
            { value: 140000, isCorrect: false },
            { value: 180000, isCorrect: false }
        ],
        trueMAO: Math.round((0.90 * Math.round((295000 + 310000 + 305000) / 3)) - (2 * 100000) - 10000),
        comps: [
            { id: 'A', price: 295000, date: '1 month ago', condition: 'Similar size, solid ARV.', isGood: true },
            { id: 'B', price: 310000, date: '2 weeks ago', condition: 'High-end finishes, adjust down.', isGood: true },
            { id: 'C', price: 250000, date: '1 year ago', condition: 'Too old.', isGood: false },
            { id: 'D', price: 305000, date: '1 week ago', condition: 'Excellent recent sale.', isGood: true },
            { id: 'E', price: 350000, date: '3 months ago', condition: '4 bed, much larger.', isGood: false },
            { id: 'F', price: 200000, date: '6 months ago', condition: 'Foreclosure sale.', isGood: false }
        ]
    }
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

    const textContent = element.textContent;
    const finalValue = parseInt(textContent);
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

// === Apex Option B: Welcome overlay flow ===
document.addEventListener('DOMContentLoaded', function() {
    const passwordScreen = document.getElementById('password-screen');
    const welcomeScreen = document.getElementById('welcome-screen');
    const startBtn = document.getElementById('start-analyzer');
    const gameContainer = document.getElementById('game-container');

    function showWelcome() {
        if (welcomeScreen) {
            welcomeScreen.classList.remove('hidden');
            welcomeScreen.classList.add('visible');
        }
    }
    function hideWelcome() {
        if (welcomeScreen) {
            welcomeScreen.classList.remove('visible');
            welcomeScreen.classList.add('hidden');
        }
    }

    // If access already granted (or just granted), show the welcome overlay
    if (sessionStorage.getItem('apexAccess') === 'true') {
        // Hide password if still visible
        if (passwordScreen) passwordScreen.classList.add('hidden');
        // Ensure game container is visible (original initializeGame may rely on it)
        if (gameContainer) gameContainer.classList.add('visible');
        // Show welcome overlay on top
        showWelcome();
    }

    if (startBtn) {
        startBtn.addEventListener('click', function() {
            hideWelcome();
            // At this point the original script should have already called initializeGame().
            // But if not, try to call it safely.
            try { 
                if (typeof initializeGame === "function") {
                    // If game hasn't been initialized, call it now.
                    initializeGame();
                }
            } catch(e) { console.warn("initializeGame not available yet:", e); }
        });
    }
});
