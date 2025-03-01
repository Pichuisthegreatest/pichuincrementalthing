let currency = 0;
let increment = 1;
let upgradeCost = 10;

const currencyElement = document.getElementById("currency");
const upgradeCostElement = document.getElementById("upgrade-cost");
const clickButton = document.getElementById("click-button");
const upgradeButton = document.getElementById("upgrade-button");


if (localStorage.getItem("currency")) {
    currency = parseInt(localStorage.getItem("currency"));
    increment = parseInt(localStorage.getItem("increment"));
    upgradeCost = parseInt(localStorage.getItem("upgradeCost"));
    updateUI();
}

clickButton.addEventListener("click", () => {
    currency += increment;
    updateUI();
});

upgradeButton.addEventListener("click", () => {
    if (currency >= upgradeCost) {
        currency -= upgradeCost;
        increment += 1;
        upgradeCost *= 2;
        updateUI();
    }
});

function updateUI() {
    currencyElement.textContent = currency;
    upgradeCostElement.textContent = upgradeCost;
    localStorage.setItem("currency", currency);
    localStorage.setItem("increment", increment);
    localStorage.setItem("upgradeCost", upgradeCost);
}

setInterval(() => {
    localStorage.setItem("currency", currency);
}, 5000);
