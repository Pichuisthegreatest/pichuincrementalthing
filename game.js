document.addEventListener("DOMContentLoaded", () => {
				// Use Decimal for all big number math
				let updateInterval = 1000;
				let currency = new Decimal(0);
				let increment = new Decimal(5);
				let increment2 = new Decimal(1);
				let booster3 = new Decimal(1);
				let rankincrement = new Decimal(1);
				let rankincrement2 = new Decimal(1);
				let electronPower = new Decimal(1); // Upg4 power
				let upgradeCost = new Decimal(10);
				let upgradeCost2 = new Decimal(50);
				let upgradeCost3 = new Decimal(10000);
				let upgradeCost4 = new Decimal(5000000);
				let multiplier = new Decimal(5);
				let time = 2500; // in ms

				let upgradeamount = 0;
				let upgradeamount2 = 0;
				let upgradeamount3 = 0;
				let upgradeamount4 = 0;
				let freeUpgrade1 = 0;
				let freeUpgrade2 = 0;

				let rank = 0;
				let rankCost = new Decimal(1000000);
				let rankScaling = new Decimal(8);

				const currencyElement = document.getElementById("currency");
				const upgradeCostElement = document.getElementById("upgrade-cost");
				const upgradeCostElement2 = document.getElementById("upgrade-cost2");
				const upgradeCostElement3 = document.getElementById("upgrade-cost3");
				const upgradeButton = document.getElementById("upgrade-button");
				const upgradeButton2 = document.getElementById("upgrade-button2");
				const upgradeButton3 = document.getElementById("upgrade-button3");
				const quarkLabel = document.getElementById("quark-label");
				const upgrade1amountElem = document.getElementById("upgrade-amount");
				const upgrade2amountElem = document.getElementById("upgrade-amount2");
				const upgrade3amountElem = document.getElementById("upgrade-amount3");
				const resetButton = document.getElementById("reset-button");
				const rankElement = document.getElementById("rank");
				const rankupButton = document.getElementById("rankupbutton");
				const tabButtons = document.querySelectorAll(".tab-button");
				const tabContent = document.querySelectorAll(".tab-content");
				const neutronCapElement = document.getElementById("neutron-cap");
				const upgrade4Container = document.getElementById("upgrade4-container");
				const atomizeTab = document.getElementById("atomize-tab");

				function clearOldSaveFormat() {
								// Clear all game-related data from localStorage (old format)
								localStorage.removeItem("currency");
								localStorage.removeItem("increment");
								localStorage.removeItem("increment2");
								localStorage.removeItem("booster3");
								localStorage.removeItem("electronPower");
								localStorage.removeItem("multiplier");
								localStorage.removeItem("upgradeCost");
								localStorage.removeItem("upgradeCost2");
								localStorage.removeItem("upgradeCost3");
								localStorage.removeItem("upgradeCost4");
								localStorage.removeItem("upgradeamount");
								localStorage.removeItem("upgradeamount2");
								localStorage.removeItem("upgradeamount3");
								localStorage.removeItem("upgradeamount4");
								localStorage.removeItem("rank");
								localStorage.removeItem("rankCost");
								localStorage.removeItem("rankScaling");
								localStorage.removeItem("time");
								localStorage.removeItem("canExceedRank10");
								localStorage.removeItem("atoms");
								localStorage.removeItem("atomMultiplier");
								localStorage.removeItem("hasAtomized");
								localStorage.removeItem("shellPower");
								localStorage.removeItem("shellCost");
								localStorage.removeItem("shellMultiplier");
				}

				const savedGameData = localStorage.getItem("gameData");

				if (savedGameData) {
								try {
												// Decode Base64
												const jsonString = atob(savedGameData);
												const saveData = JSON.parse(jsonString);

												// Load all game variables
												currency = new Decimal(saveData.currency || 0);
												increment = new Decimal(saveData.increment || 1);
												increment2 = new Decimal(saveData.increment2 || 1);
												booster3 = new Decimal(saveData.booster3 || 1);
												electronPower = new Decimal(saveData.electronPower || 1);
												multiplier = new Decimal(saveData.multiplier || 1);
												upgradeCost = new Decimal(saveData.upgradeCost || 10);
												upgradeCost2 = new Decimal(saveData.upgradeCost2 || 50);
												upgradeCost3 = new Decimal(saveData.upgradeCost3 || 10000);
												upgradeCost4 = new Decimal(saveData.upgradeCost4 || 5000000);
												upgradeamount = parseInt(saveData.upgradeamount) || 0;
												upgradeamount2 = parseInt(saveData.upgradeamount2) || 0;
												upgradeamount3 = parseInt(saveData.upgradeamount3) || 0;
												upgradeamount4 = parseInt(saveData.upgradeamount4) || 0;
												rank = parseInt(saveData.rank) || 0;
												rankCost = new Decimal(saveData.rankCost || 1000000);
												rankScaling = new Decimal(saveData.rankScaling || 8);
												time = parseInt(saveData.time) || 2500;
												rankincrement = new Decimal(saveData.rankincrement || 1);
												rankincrement2 = new Decimal(saveData.rankincrement2 || 1);
												freeUpgrade1 = parseInt(saveData.freeUpgrade1) || 0;
												freeUpgrade2 = parseInt(saveData.freeUpgrade2) || 0;

												// Initialize atom variables
												initializeAtomVariables(saveData);

												// Apply rank benefits
												applyRankBenefits();
												updateUI();
								} catch (error) {
												console.error("Error loading save data:", error);
								}
				} else if (localStorage.getItem("currency")) {
								currency = new Decimal(localStorage.getItem("currency") || 0);
								increment = new Decimal(localStorage.getItem("increment") || 1);
								increment2 = new Decimal(localStorage.getItem("increment2") || 1);
								booster3 = new Decimal(localStorage.getItem("booster3") || 1);
								electronPower = new Decimal(localStorage.getItem("electronPower") || 1);
								multiplier = new Decimal(localStorage.getItem("multiplier") || 1);
								upgradeCost = new Decimal(localStorage.getItem("upgradeCost") || 10);
								upgradeCost2 = new Decimal(localStorage.getItem("upgradeCost2") || 50);
								upgradeCost3 = new Decimal(localStorage.getItem("upgradeCost3") || 10000);
								upgradeCost4 = new Decimal(localStorage.getItem("upgradeCost4") || 5000000);
								upgradeamount = parseInt(localStorage.getItem("upgradeamount")) || 0;
								upgradeamount2 = parseInt(localStorage.getItem("upgradeamount2")) || 0;
								upgradeamount3 = parseInt(localStorage.getItem("upgradeamount3")) || 0;
								upgradeamount4 = parseInt(localStorage.getItem("upgradeamount4")) || 0;
								rank = parseInt(localStorage.getItem("rank")) || 0;
								rankCost = new Decimal(localStorage.getItem("rankCost") || 1000000);
								rankScaling = new Decimal(localStorage.getItem("rankScaling") || 8);

								applyRankBenefits();
								updateUI();

								clearOldSaveFormat();
				}

				function applyRankBenefits() {
								// Reset free upgrades before applying them
								freeUpgrade1 = 0;
								freeUpgrade2 = 0;

								// Rank 1: Increases the rank increment variable
								if (rank >= 1) {
												rankincrement = new Decimal(2); // Increase rank increment from 1 to 2
								}

								// Rank 2: Multiply quark gain by log10 of quarks
								if (rank >= 2) {
												// Calculate logarithmic boost based on currency
												const logBoost = Decimal.max(1, Decimal.log10(currency.plus(1)));
												rankincrement2 = logBoost;
								}

								// Rank 3: Reduces time between quarks gathering to 2s
								if (rank >= 3) {
												time = 2000; // 2000ms = 2s
								}

								// Rank 4: Unlock upgrade 4
								if (document.getElementById("upgrade4-container")) {
												document.getElementById("upgrade4-container").style.display = rank >= 4 ? "block" : "none";
								}

								// Rank 5: Increase the cap of upgrade 3 to 15
								if (rank >= 5) {
												document.getElementById("neutron-cap").textContent = "15";
								} else {
												document.getElementById("neutron-cap").textContent = "10";
								}

								// Rank 6: Make upgrade 1 increase its multiplier by purchases
								if (rank >= 6) {
												// This affects how increment is calculated
												// We'll implement the logic in the updateUI function
												// The increment value will be based on upgradeamount
								}

								// Rank 7: For every upgrade 2, you gain one free upgrade 1
								if (rank >= 7) {
												freeUpgrade1 = upgradeamount2;
								}

								// Rank 8: For every upgrade 3, you gain one free upgrade 2
								if (rank >= 8) {
												freeUpgrade2 = upgradeamount3;
								}

								// Rank 10: Unlock Atomize (handled in atom.js)
								// Handle Atomize UI - considering if player has already atomized
								handleAtomUI();

								// Show/hide Shell Power display based on atomization status
								const shellPowerSection = document.getElementById("shell-power-section");
								if (shellPowerSection) {
												// Show shell power section if player has atomized at any point
												shellPowerSection.style.display = hasAtomized ? "block" : "none";
								}

								// Update stats display for rank benefits
								if (document.getElementById("stat-rank-increment")) {
												document.getElementById("stat-rank-increment").textContent = rankincrement.toString();
								}
								if (document.getElementById("stat-rank-increment2")) {
												document.getElementById("stat-rank-increment2").textContent = rankincrement2.toString();
								}
								if (document.getElementById("stat-free-upgrade1")) {
												document.getElementById("stat-free-upgrade1").textContent = freeUpgrade1.toString();
								}
								if (document.getElementById("stat-free-upgrade2")) {
												document.getElementById("stat-free-upgrade2").textContent = freeUpgrade2.toString();
								}
				}

				// Initially hide upgrade 4 and Atomize tab if rank < 4 and < 10 respectively
				if (upgrade4Container) {
								upgrade4Container.style.display = rank >= 4 ? "block" : "none";
				}

				// Show Atomize tab if rank >= 10 OR if player has previously atomized
				if (atomizeTab) {
								const shouldShowAtomizeTab = rank >= 10 || hasAtomized;
								atomizeTab.style.display = shouldShowAtomizeTab ? "block" : "none";

								const atomizeTabButton = document.getElementById("atomize-tab-button");
								if (atomizeTabButton) {
										atomizeTabButton.style.display = shouldShowAtomizeTab ? "block" : "none";
								}
				}


				// Generate quarks automatically every (time) ms using Decimal math
				setInterval(() => {
								// Apply rank 6 benefit - increase increment based on purchases
								let incrementValue = increment;
								if (rank >= 6) {
												// Multiply increment by upgradeamount to implement rank 6 benefit
												incrementValue = new Decimal(1).plus(upgradeamount);
								}

								// Calculate multiplier once to ensure consistent display and actual gain
								multiplier = incrementValue.times(increment2.pow(booster3)).times(electronPower).times(rankincrement).times(rankincrement2);
								currency = currency.plus(multiplier);
								updateUI();
				}, time);


				// Upgrade 1: Increases gain by +1
				upgradeButton.addEventListener("click", () => {
								if (currency.gte(upgradeCost)) {
												currency = currency.minus(upgradeCost);
												increment = increment.plus(1);
												upgradeCost = upgradeCost.times(1.75);
												upgradeamount += 1;

												// Apply free upgrades from rank 7 benefit
												if (rank >= 7 && freeUpgrade1 > 0) {
																increment = increment.plus(freeUpgrade1);
												}

												updateUI();
								}
				});

				// Upgrade 2: Multiplies gain by 2 (and then applies booster effect)
				upgradeButton2.addEventListener("click", () => {
								if (currency.gte(upgradeCost2)) {
												currency = currency.minus(upgradeCost2);
												increment2 = increment2.times(2);

												// Apply different cost scaling after 20 purchases
												if (upgradeamount2 >= 19) { // Check 19 because we're about to add 1
																upgradeCost2 = upgradeCost2.times(5); // 5x multiplier after 20 purchases
												} else {
																upgradeCost2 = upgradeCost2.times(3); // Original 3x multiplier
												}

												upgradeamount2 += 1;

												// Apply free upgrades from rank 8 benefit
												if (rank >= 8 && freeUpgrade2 > 0) {
																for (let i = 0; i < freeUpgrade2; i++) {
																				increment2 = increment2.times(2);
																}
												}

												// Rank 7 benefit: For every upgrade 2, gain a free upgrade 1
												if (rank >= 7) {
																freeUpgrade1 = upgradeamount2;
																applyRankBenefits();
												}

												updateUI();
								}
				});

				// Upgrade 3: Increases booster effect
				upgradeButton3.addEventListener("click", () => {
								if (currency.gte(upgradeCost3)) {
												// Check cap based on rank
												const neutronCap = rank >= 5 ? 15 : 10;
												if (upgradeamount3 < neutronCap) {
																currency = currency.minus(upgradeCost3);
																booster3 = booster3.plus(0.1);
																upgradeCost3 = upgradeCost3.times(8);
																upgradeamount3 += 1;

																// Rank 8 benefit: For every upgrade 3, gain a free upgrade 2
																if (rank >= 8) {
																				freeUpgrade2 = upgradeamount3;
																				applyRankBenefits();
																}

																updateUI();
												}
								}
				});

				// Upgrade 4: Create electrons that multiply quark gain
				const upgradeButton4 = document.getElementById("upgrade-button4");
				if (upgradeButton4) {
								upgradeButton4.addEventListener("click", () => {
												if (currency.gte(upgradeCost4)) {
																currency = currency.minus(upgradeCost4);
																// Quintuples production (as mentioned in rank-benefits-list)
																electronPower = electronPower.times(5);
																// Exponential cost increase starting at 15x
																let costMultiplier = new Decimal(15).plus(upgradeamount4);
																upgradeCost4 = upgradeCost4.times(costMultiplier);
																upgradeamount4 += 1;
																updateUI();
												}
								});
				}

				// Rank Up button: increases energy level
				rankupButton.addEventListener("click", () => {
								if (currency.gte(rankCost)) {
												// Calculate how many ranks can be purchased
												let rankUps = 0;
												let tempCurrency = currency;
												let tempRankCost = rankCost;

												// Keep ranking up as long as we can afford it
												while (tempCurrency.gte(tempRankCost)) {
																tempCurrency = tempCurrency.minus(tempRankCost);
																rankUps++;

																// Calculate next rank cost with scaling factor
																// Increase scaling factor by 1 + (current rank / 8)
																let tempScaling = rankScaling.plus(new Decimal(rankUps).div(8));
																tempRankCost = tempRankCost.times(tempScaling);
												}

												if (rankUps > 0) {
																// Apply all rank ups at once
																currency = tempCurrency;
																rank += rankUps;
																if (!canExceedRank10 && rank > 10) rank = 10; // Apply rank cap

																// Calculate new rank cost
																for (let i = 0; i < rankUps; i++) {
																				rankScaling = rankScaling.plus(new Decimal(1).div(8));
																				rankCost = rankCost.times(rankScaling);
																}

																// Apply rank benefits
																applyRankBenefits();

																// Update rank benefits display
																updateRankBenefits(rank);

																// Update UI
																updateUI();
												}
								}
				});

				// Update the UI and save the current state
				// Update the UI and save the current state
				function updateUI() {
								multiplier = increment.times(increment2.pow(booster3)).times(electronPower).times(rankincrement).times(rankincrement2);
								// Format numbers with suffixes
								const formatNumber = (num) => {
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
								};
								currencyElement.textContent = formatNumber(currency);
								quarkLabel.textContent = `Quarks: ${formatNumber(currency)} (+${formatNumber(multiplier)} / ${time}ms)`;
								// Update button texts to show cost and upgrade count
								upgradeButton.textContent = `Increase quark gain: (Cost: ${formatNumber(upgradeCost)}) (${upgradeamount})`;
								upgradeButton2.textContent = `Create a proton: (Cost: ${formatNumber(upgradeCost2)}) (${upgradeamount2})`;
								upgradeButton3.textContent = `Create a neutron: (Cost: ${formatNumber(upgradeCost3)}) (${upgradeamount3})`;
								// Update upgrade 4 button if it exists
								const upgradeBtn4 = document.getElementById("upgrade-button4");
								if (upgradeBtn4) {
												upgradeBtn4.textContent = `Create an electron: (Cost: ${formatNumber(upgradeCost4)}) (${upgradeamount4})`;
								}
								// Update rank and rank cost
								rankElement.textContent = rank;
								document.getElementById("rankcost").textContent = formatNumber(rankCost);
								// Update statistics tab values
								if (document.getElementById("stat-rank")) {
												document.getElementById("stat-rank").textContent = rank;
												document.getElementById("stat-total-quarks").textContent = formatNumber(currency);
												document.getElementById("stat-production").textContent = formatNumber(multiplier.div(time / 1000));
												document.getElementById("stat-protons").textContent = upgradeamount2;
												document.getElementById("stat-neutrons").textContent = upgradeamount3;
												document.getElementById("stat-electrons").textContent = upgradeamount4;
												document.getElementById("stat-shell-power").textContent = shellPower;
								}
								// Update Atomize UI through the atom.js function
								handleAtomUI();
								// Check if rank 10 is reached to unlock Atomize
								const atomizeContainer = document.getElementById("atomize-tab");
								const atomizeTabButton = document.getElementById("atomize-tab-button");
								if (atomizeContainer && atomizeTabButton) {
												const shouldShowAtomizeTab = rank >= 10 || hasAtomized; // Unlock if rank 10 is reached
												atomizeContainer.style.display = shouldShowAtomizeTab ? "block" : "none";
												atomizeTabButton.style.display = shouldShowAtomizeTab ? "block" : "none";
								}
								// Save to localStorage using base64 encoding
								const saveData = {
												// existing save data properties...
												// Add needed properties here as previously
								};
								// Convert to JSON and encode as Base64
								const jsonString = JSON.stringify(saveData);
								const base64Save = btoa(jsonString);
								// Save base64 string to localStorage
								localStorage.setItem("gameData", base64Save);
				}

				function setupUpdateInterval() {
								// Clear existing interval if it exists
								if (updateInterval) {
												clearInterval(updateInterval);
								}

								// Only update UI in this interval, actual quark gain is handled by the main interval
								updateInterval = setInterval(() => {
												updateUI();
								}, 5000); // Update UI every 5 seconds as a backup
				}

				// Initial setup of update interval
				setupUpdateInterval();

				const autoSaveInterval = setInterval(() => {
								// Create save data object
								const saveData = {
												currency: currency.toString(),
												increment: increment.toString(),
												increment2: increment2.toString(),
												booster3: booster3.toString(),
												electronPower: electronPower.toString(),
												multiplier: multiplier.toString(),
												upgradeCost: upgradeCost.toString(),
												upgradeCost2: upgradeCost2.toString(),
												upgradeCost3: upgradeCost3.toString(),
												upgradeCost4: upgradeCost4.toString(),
												upgradeamount: upgradeamount,
												upgradeamount2: upgradeamount2,
												upgradeamount3: upgradeamount3,
												upgradeamount4: upgradeamount4,
												rank: rank,
												rankCost: rankCost.toString(),
												rankScaling: rankScaling.toString(),
												rankincrement: rankincrement.toString(),
												rankincrement2: rankincrement2.toString(),
												freeUpgrade1: freeUpgrade1,
												freeUpgrade2: freeUpgrade2,
												time: time,
												canExceedRank10: canExceedRank10,
												atoms: atoms.toString(),
												atomMultiplier: atomMultiplier.toString(),
												hasAtomized: hasAtomized,
												shellPower: shellPower,
												shellCost: shellCost,
												shellMultiplier: shellMultiplier.toString()
								};

								const atomizeContainer = document.getElementById("atomize-tab");
    								const atomizeTabButton = document.getElementById("atomize-tab-button");
    								if (atomizeContainer && atomizeTabButton) {
       								 const shouldShowAtomizeTab = rank >= 10 || hasAtomized;
        							 atomizeContainer.style.display = shouldShowAtomizeTab ? "block" : "none";
        							 atomizeTabButton.style.display = shouldShowAtomizeTab ? "block" : "none";
									
								// Convert to JSON and encode as Base64
								const jsonString = JSON.stringify(saveData);
								const base64Save = btoa(jsonString);

								// Save to localStorage
								localStorage.setItem("gameData", base64Save);
				}, 5000);

				// Function to update rank benefits text based on current rank
				function updateRankBenefits(currentRank) {
								const benefitsList = document.getElementById("rank-benefits-list");
								const nextRank = currentRank + 1;

								// Find the next rank benefit text
								const nextBenefit = benefitsList.querySelector(`[data-rank="${nextRank}"]`);

								if (nextBenefit) {
												document.getElementById("rank-benefits").textContent = `(Next: ${nextRank}) ${nextBenefit.textContent}`;
								} else {
												document.getElementById("rank-benefits").textContent = "Maximum rank reached!";
								}
				}

				// Initialize rank benefits
				updateRankBenefits(rank);

				// Export save data functionality
				const exportSaveButton = document.getElementById("export-save");
				if (exportSaveButton) {
								exportSaveButton.addEventListener("click", () => {
												// Gather all game data
												const saveData = {
																currency: currency.toString(),
																increment: increment.toString(),
																increment2: increment2.toString(),
																booster3: booster3.toString(),
																electronPower: electronPower.toString(),
																multiplier: multiplier.toString(),
																upgradeCost: upgradeCost.toString(),
																upgradeCost2: upgradeCost2.toString(),
																upgradeCost3: upgradeCost3.toString(),
																upgradeCost4: upgradeCost4.toString(),
																upgradeamount: upgradeamount,
																upgradeamount2: upgradeamount2,
																upgradeamount3: upgradeamount3,
																upgradeamount4: upgradeamount4,
																rank: rank,
																rankCost: rankCost.toString(),
																rankScaling: rankScaling.toString(),
																rankincrement: rankincrement.toString(),
																rankincrement2: rankincrement2.toString(),
																freeUpgrade1: freeUpgrade1,
																freeUpgrade2: freeUpgrade2,
																time: time,
																canExceedRank10: canExceedRank10,
																atoms: atoms.toString(),
																atomMultiplier: atomMultiplier.toString(),
																hasAtomized: hasAtomized,
																shellPower: shellPower,
																shellCost: shellCost,
																shellMultiplier: shellMultiplier.toString()
												};

												// Convert to JSON and encode as Base64
												const jsonString = JSON.stringify(saveData);
												const base64Save = btoa(jsonString);

												// Create a text area with the save data
												const textArea = document.createElement("textarea");
												textArea.value = base64Save;
												textArea.style.width = "100%";
												textArea.style.height = "100px";
												textArea.style.marginTop = "10px";
												textArea.readOnly = true;

												// Create container for save data
												const saveContainer = document.createElement("div");
												saveContainer.className = "save-data-container";
												saveContainer.style.marginTop = "20px";

												// Add title and instructions
												const title = document.createElement("h4");
												title.textContent = "Copy this save code:";

												// Create copy button
												const copyButton = document.createElement("button");
												copyButton.textContent = "Copy to Clipboard";
												copyButton.addEventListener("click", () => {
																textArea.select();
																document.execCommand("copy");
																copyButton.textContent = "Copied!";
																setTimeout(() => {
																				copyButton.textContent = "Copy to Clipboard";
																}, 2000);
												});

												// Add close button
												const closeButton = document.createElement("button");
												closeButton.textContent = "Close";
												closeButton.addEventListener("click", () => {
																saveContainer.remove();
												});

												// Append elements
												saveContainer.appendChild(title);
												saveContainer.appendChild(textArea);
												saveContainer.appendChild(copyButton);
												saveContainer.appendChild(closeButton);

												// Remove any existing save containers
												const existingContainer = document.querySelector(".save-data-container");
												if (existingContainer) {
																existingContainer.remove();
												}

												// Add to settings tab
												document.querySelector(".settings-container").appendChild(saveContainer);
								});
				}

				// Import save data functionality
				const importSaveButton = document.getElementById("import-save");
				if (importSaveButton) {
								importSaveButton.addEventListener("click", () => {
												// Create container for save import
												const importContainer = document.createElement("div");
												importContainer.className = "import-data-container";
												importContainer.style.marginTop = "20px";

												// Add title and instructions
												const title = document.createElement("h4");
												title.textContent = "Paste your save code:";

												// Create text area for input
												const textArea = document.createElement("textarea");
												textArea.style.width = "100%";
												textArea.style.height = "100px";
												textArea.style.marginTop = "10px";

												// Create import button
												const importButton = document.createElement("button");
												importButton.textContent = "Import Save";
												importButton.addEventListener("click", () => {
																try {
																				// Decode Base64 and parse JSON
																				const base64Save = textArea.value.trim();
																				const jsonString = atob(base64Save);
																				const saveData = JSON.parse(jsonString);

																				// Apply the save data
																				currency = new Decimal(saveData.currency || 0);
																				increment = new Decimal(saveData.increment || 1);
																				increment2 = new Decimal(saveData.increment2 || 1);
																				booster3 = new Decimal(saveData.booster3 || 1);
																				electronPower = new Decimal(saveData.electronPower || 1);
																				multiplier = new Decimal(saveData.multiplier || 1);
																				upgradeCost = new Decimal(saveData.upgradeCost || 10);
																				upgradeCost2 = new Decimal(saveData.upgradeCost2 || 50);
																				upgradeCost3 = new Decimal(saveData.upgradeCost3 || 10000);
																				upgradeCost4 = new Decimal(saveData.upgradeCost4 || 5000000);
																				upgradeamount = parseInt(saveData.upgradeamount) || 0;
																				upgradeamount2 = parseInt(saveData.upgradeamount2) || 0;
																				upgradeamount3 = parseInt(saveData.upgradeamount3) || 0;
																				upgradeamount4 = parseInt(saveData.upgradeamount4) || 0;
																				rank = parseInt(saveData.rank) || 0;
																				rankCost = new Decimal(saveData.rankCost || 1000000);
																				rankScaling = new Decimal(saveData.rankScaling || 8);
																				time = parseInt(saveData.time) || 2500;
																				rankincrement = new Decimal(saveData.rankincrement || 1);
																				rankincrement2 = new Decimal(saveData.rankincrement2 || 1);
																				freeUpgrade1 = parseInt(saveData.freeUpgrade1) || 0;
																				freeUpgrade2 = parseInt(saveData.freeUpgrade2) || 0;

																				// Load atomize and shell variables through function in atom.js
																				initializeAtomVariables(saveData);

																				// Apply rank benefits
																				applyRankBenefits();

																				// Update UI
																				updateUI();
																				updateRankBenefits(rank);

																				// Show success message
																				importButton.textContent = "Import Successful!";
																				setTimeout(() => {
																								importContainer.remove();
																				}, 2000);

																} catch (error) {
																				// Show error message
																				importButton.textContent = "Invalid Save Code!";
																				console.error("Import error:", error);
																				setTimeout(() => {
																								importButton.textContent = "Import Save";
																				}, 2000);
																}
												});

												// Add cancel button
												const cancelButton = document.createElement("button");
												cancelButton.textContent = "Cancel";
												cancelButton.addEventListener("click", () => {
																importContainer.remove();
												});

												// Append elements
												importContainer.appendChild(title);
												importContainer.appendChild(textArea);
												importContainer.appendChild(importButton);
												importContainer.appendChild(cancelButton);

												// Remove any existing import containers
												const existingContainer = document.querySelector(".import-data-container");
												if (existingContainer) {
																existingContainer.remove();
												}

												// Add to settings tab
												document.querySelector(".settings-container").appendChild(importContainer);
								});
				}

				// Dark/Light mode toggle functionality
				const darkModeToggle = document.getElementById("toggle-dark-mode");
				if (darkModeToggle) {
								// Check if dark mode preference is stored
								const isDarkMode = localStorage.getItem("darkMode") === "true";

								// Apply the stored theme or default to dark
								if (isDarkMode !== false) {
												document.body.classList.add("light-mode");
												darkModeToggle.textContent = "Switch to Dark Mode";
								}

								darkModeToggle.addEventListener("click", () => {
												// Toggle the light-mode class on body
												document.body.classList.toggle("light-mode");

												// Update button text based on current mode
												const isLightMode = document.body.classList.contains("light-mode");
												darkModeToggle.textContent = isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode";

												// Save preference to localStorage
												localStorage.setItem("darkMode", isLightMode.toString());
								});
				}

				// Set up tab navigation
				tabButtons.forEach(button => {
								button.addEventListener("click", () => {
												// Remove active class from all buttons and content
												tabButtons.forEach(btn => btn.classList.remove("active"));
												tabContent.forEach(content => content.classList.remove("active"));

												// Add active class to clicked button
												button.classList.add("active");

												// Get the tab ID to show
												const tabId = button.getAttribute("data-tab");
												document.getElementById(`${tabId}-tab`).classList.add("active");
								});
				});

				resetButton.addEventListener("click", (event) => {
								event.preventDefault();
								event.stopPropagation();
								resetButton.disabled = true;

								if (confirm("Resetting your save is irreversible. Do you want to do this still?")) {
												// Clear game data using new base64 format
												localStorage.removeItem("gameData");

												// Also clear old format data if it exists
												clearOldSaveFormat();

												// Stop all intervals to prevent data from being saved again before reload
												clearInterval(autoSaveInterval);
												clearInterval(updateInterval);

												// Force a clean reload
												window.location.href = window.location.pathname + "?reset=" + Date.now();
								} else {
												resetButton.disabled = false;
								}
				});

				// Initialize atomize functionality
				setupAtomizeButton();
				setupShellPowerButton();

				// Initialize the first tab
				if (tabButtons.length > 0) {
								tabButtons[0].click();
				}

});
