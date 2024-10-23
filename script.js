let coinCount = parseInt(localStorage.getItem('coinCount')) || 0;
let coinsPerClick = parseInt(localStorage.getItem('coinsPerClick')) || 1;
let passiveIncomeRate = parseInt(localStorage.getItem('passiveIncomeRate')) || 0;

let clickUpgradeCost = 100;
let passiveUpgradeCost = 200;
let skinCost = 10000;
let currentSkin = 'tap.png'; // Начальный скин

document.getElementById('clickImage').addEventListener('click', function() {
    coinCount += coinsPerClick;
    updateDisplay();
    saveData();
});

document.getElementById('upgradeClick').addEventListener('click', function() {
    if (coinCount >= clickUpgradeCost) {
        coinCount -= clickUpgradeCost;
        coinsPerClick++;
        clickUpgradeCost = Math.ceil(clickUpgradeCost * 1.10); // Увеличиваем стоимость на 10%
        updateDisplay();
        saveData();
    }
});

document.getElementById('upgradePassive').addEventListener('click', function() {
    if (coinCount >= passiveUpgradeCost) {
        coinCount -= passiveUpgradeCost;
        passiveIncomeRate++;
        passiveUpgradeCost = Math.ceil(passiveUpgradeCost * 1.10); // Увеличиваем стоимость на 10%
        updateDisplay();
        saveData();
    }
});

function buySkin() {
    if (coinCount >= skinCost) {
        coinCount -= skinCost;
        currentSkin = 'new_skin.png'; // Путь к новому изображению скина
        document.getElementById('clickImage').src = currentSkin; // Меняем изображение
        updateDisplay();
        saveData();
    }
}

function updateDisplay() {
    document.getElementById('coinCount').innerText = 'Монеты: ' + formatNumber(coinCount);
    document.getElementById('clickValue').innerText = 'За клик: ' + coinsPerClick;
    document.getElementById('passiveIncome').innerText = 'Пассивный доход: ' + passiveIncomeRate + ' монет в секунду';
    document.getElementById('upgradeClick').innerText = 'Улучшить клик (' + formatNumber(clickUpgradeCost) + ' монет)';
    document.getElementById('upgradePassive').innerText = 'Увеличить пассивный доход (' + formatNumber(passiveUpgradeCost) + ' монет)';
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function saveData() {
    localStorage.setItem('coinCount', coinCount);
    localStorage.setItem('coinsPerClick', coinsPerClick);
    localStorage.setItem('passiveIncomeRate', passiveIncomeRate);
    localStorage.setItem('clickUpgradeCost', clickUpgradeCost);
    localStorage.setItem('passiveUpgradeCost', passiveUpgradeCost);
}

setInterval(function() {
    coinCount += passiveIncomeRate;
    updateDisplay();
    saveData();
}, 1000);

// Загружаем стоимость улучшений из localStorage
clickUpgradeCost = parseInt(localStorage.getItem('clickUpgradeCost')) || clickUpgradeCost;
passiveUpgradeCost = parseInt(localStorage.getItem('passiveUpgradeCost')) || passiveUpgradeCost;

// Обновляем отображение при загрузке страницы
updateDisplay();
