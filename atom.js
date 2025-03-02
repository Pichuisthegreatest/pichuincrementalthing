// Atom-related functions and variables
let atoms = new Decimal(0);
let atomMultiplier = new Decimal(1);
let hasAtomized = false;
let canExceedRank10 = false; // rankcap boolean
const currency = document.getElementById("currency");

function initializeAtomVariables(savedData) {
    if (savedData) {
        canExceedRank10 = savedData.canExceedRank10 || false;
        atoms = new Decimal(savedData.atoms || 0);
        atomMultiplier = new Decimal(savedData.atomMultiplier || 1);
        hasAtomized = savedData.hasAtomized || false;
        
        // Initialize shell power variables if they exist in the save
        if (typeof savedData.shellPower !== 'undefined') {
            shellPower = parseInt(savedData.shellPower) || 0;
            shellCost = parseInt(savedData.shellCost) || 10;
            shellMultiplier = new Decimal(savedData.shellMultiplier || 1);
        }
        
        // Show Shell Power section if it was previously unlocked
        if (hasAtomized) {
            const shellPowerSection = document.getElementById("shell-power-section");
            if (shellPowerSection) {
                shellPowerSection.style.display = "block";
            }
        }
    }
}

function handleAtomUI() {
    // Update atomize tab UI
    const atomizeTab = document.getElementById("atomize-tab");
    const atomizeTabButton = document.getElementById("atomize-tab-button");
    
    if (atomizeTab) {
        // Show atomize tab if rank >= 10 OR if player has already atomized previously
        const shouldShowAtomizeTab = rank >= 10 || hasAtomized;
        atomizeTab.style.display = shouldShowAtomizeTab ? "block" : "none";
        // Moved atomize tab to atom area.  Original location in settings was not specified.
        atomizeTab.style.backgroundColor = "linear-gradient(to right, red, green, blue)"; // Gradient color
        
        if (atomizeTabButton) {
            atomizeTabButton.style.display = shouldShowAtomizeTab ? "block" : "none";
        }
    }

    // Update atom stats
    if (document.getElementById("atom-count")) {
        document.getElementById("atom-count").textContent = formatNumber(atoms);
    }

    if (document.getElementById("stat-atoms")) {
        document.getElementById("stat-atoms").textContent = formatNumber(atoms);
    }
}

function setupAtomizeButton() {
    const atomizeButton = document.getElementById("atomize-button");
    if (atomizeButton) {
        atomizeButton.addEventListener("click", () => {
            // Calculate atoms to gain based on current progress
            const atomsToGain = calculateAtomsToGain();

            // Add atoms to total
            atoms = atoms.plus(atomsToGain);

            // Apply atom multiplier
            atomMultiplier = calculateAtomMultiplier();

            // Reset progress but keep atoms
            resetProgressForAtomize();

            // Set hasAtomized flag
            hasAtomized = true;

            // Show Shell Power section
            const shellPowerSection = document.getElementById("shell-power-section");
            if (shellPowerSection) {
                shellPowerSection.style.display = "block";
            }

            // Update UI
            updateUI();
        });
    }

    // Setup atom upgrade buttons
    setupAtomUpgradeButtons();
}

function calculateAtomsToGain() {
    // Modified formula to gain atoms based on quarks (assuming 'quarks' variable exists)
    let atomGain = new Decimal(currency).div(new Decimal(1000000000000)); // 1 trillion quarks = 1 atom

    // Apply atom multipliers if any
    if (hasAtomUpgrade("atom-upgrade3")) {
        atomGain = atomGain.times(2); // Double atom gain
    }

    return atomGain.floor(); // Round down to nearest whole atom
}

// Helper function to format numbers with suffixes for atom.js
function formatNumber(num) {
    const decimal = new Decimal(num);

    // Define suffix arrays
    const suffixes = ["", "K", "M", "B", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "No", "Dc"];

    // If the number is less than 1000, just show 2 decimals
    if (decimal.lt(1000)) {
        return decimal.toNumber().toFixed(2);
    }

    // For scientific notation (e notation)
    if (decimal.gte(new Decimal(10).pow(36))) {
        return decimal.toExponential(2).toString().replace("+", "");
    }

    // For suffix notation
    const e = Math.floor(decimal.log10().div(3).toNumber());
    if (e < suffixes.length) {
        const mantissa = decimal.div(new Decimal(10).pow(e * 3)).toNumber();
        return mantissa.toFixed(2) + suffixes[e];
    }

    // Fallback to scientific notation
    return decimal.toExponential(2).toString().replace("+", "");
}

function calculateAtomMultiplier() {
    // Each atom gives 10% production boost
    return new Decimal(1).plus(atoms.div(10));
}

function resetProgressForAtomize() {
    // Reset currency and upgrades
    currency = new Decimal(0);
    increment = new Decimal(1);
    increment2 = new Decimal(1);
    booster3 = new Decimal(1);
    electronPower = new Decimal(1);
    multiplier = new Decimal(1);

    // Reset costs
    upgradeCost = new Decimal(10);
    upgradeCost2 = new Decimal(50);
    upgradeCost3 = new Decimal(10000);
    upgradeCost4 = new Decimal(5000000);

    // Reset upgrade amounts
    upgradeamount = 0;
    upgradeamount2 = 0;
    upgradeamount3 = 0;
    upgradeamount4 = 0;

    // Reset rank
    rank = 0;
    rankCost = new Decimal(1000000);
    rankScaling = new Decimal(8);

    // Apply atom upgrades if any
    applyAtomUpgrades();
}

function applyAtomUpgrades() {
    // Apply any permanent atom upgrades
    if (hasAtomUpgrade("atom-upgrade1")) {
        // Start with 10 protons
        upgradeamount2 = 10;
        increment2 = new Decimal(2).pow(10); // 2^10
    }

    if (hasAtomUpgrade("atom-upgrade2")) {
        // Start with 5 neutrons
        upgradeamount3 = 5;
        booster3 = new Decimal(1).plus(new Decimal(0.1).times(5)); // 1 + (0.1 * 5)
    }
}

function hasAtomUpgrade(upgradeId) {
    // Check if the player has purchased a specific atom upgrade
    const upgrade = document.getElementById(upgradeId);
    if (upgrade) {
        return upgrade.classList.contains("purchased");
    }
    return false;
}

function setupAtomUpgradeButtons() {
    // Atom upgrade 1: Start with 10 protons
    const atomUpgrade1 = document.getElementById("atom-upgrade1");
    if (atomUpgrade1) {
        atomUpgrade1.addEventListener("click", () => {
            if (atoms.gte(5) && !hasAtomUpgrade("atom-upgrade1")) {
                atoms = atoms.minus(5);
                atomUpgrade1.classList.add("purchased");
                atomUpgrade1.disabled = true;
                updateUI();
            }
        });
    }

    // Atom upgrade 2: Start with 5 neutrons
    const atomUpgrade2 = document.getElementById("atom-upgrade2");
    if (atomUpgrade2) {
        atomUpgrade2.addEventListener("click", () => {
            if (atoms.gte(10) && !hasAtomUpgrade("atom-upgrade2")) {
                atoms = atoms.minus(10);
                atomUpgrade2.classList.add("purchased");
                atomUpgrade2.disabled = true;
                updateUI();
            }
        });
    }

    // Atom upgrade 3: Double atom gain
    const atomUpgrade3 = document.getElementById("atom-upgrade3");
    if (atomUpgrade3) {
        atomUpgrade3.addEventListener("click", () => {
            if (atoms.gte(25) && !hasAtomUpgrade("atom-upgrade3")) {
                atoms = atoms.minus(25);
                atomUpgrade3.classList.add("purchased");
                atomUpgrade3.disabled = true;
                updateUI();
            }
        });
    }
}

// Shell Power functionality (unlocked after first atomize)
let shellPower = 0;
let shellCost = 10;
let shellMultiplier = new Decimal(1);

function setupShellPowerButton() {
    const shellButton = document.getElementById("shell-button");
    if (shellButton) {
        shellButton.addEventListener("click", () => {
            if (rank >= shellCost) {
                // Calculate Shell Power gain
                shellPower += 1;

                // Update shell multiplier
                shellMultiplier = calculateShellMultiplier();

                // Reset progress but keep atoms and Shell Power
                resetProgressForShell();

                // Increase shell cost
                shellCost = Math.floor(shellCost * 1.5);

                // Update UI
                updateUI();
            }
        });
    }
}

function calculateShellMultiplier() {
    // Each Shell Power gives 20% production boost
    return new Decimal(1).plus(new Decimal(shellPower).times(0.2));
}

function resetProgressForShell() {
    // Similar to atomize reset, but don't reset atoms
    currency = new Decimal(0);
    increment = new Decimal(1);
    increment2 = new Decimal(1);
    booster3 = new Decimal(1);
    electronPower = new Decimal(1);
    multiplier = new Decimal(1);

    // Reset costs
    upgradeCost = new Decimal(10);
    upgradeCost2 = new Decimal(50);
    upgradeCost3 = new Decimal(10000);
    upgradeCost4 = new Decimal(5000000);

    // Reset upgrade amounts
    upgradeamount = 0;
    upgradeamount2 = 0;
    upgradeamount3 = 0;
    upgradeamount4 = 0;

    // Reset rank
    rank = 0;
    rankCost = new Decimal(1000000);
    rankScaling = new Decimal(8);

    // Apply atom upgrades
    applyAtomUpgrades();
}
