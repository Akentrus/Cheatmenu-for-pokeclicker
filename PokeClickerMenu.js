// ==UserScript==
// @name         Pokeclicker currency cheat
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Currency cheat for Pokeclicker.com
// @author       Akentrus
// @match         https://www.pokeclicker.com/
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const menuButton = document.createElement('div');
    menuButton.style.position = 'fixed';
    menuButton.style.top = '10px';
    menuButton.style.left = '1010px';
    menuButton.style.background = '#e74c3c';
    menuButton.style.padding = '10px';
    menuButton.style.color = '#fff';
    menuButton.style.cursor = 'move';
    menuButton.innerHTML = 'Menu by Akentrus';
    document.body.appendChild(menuButton);

    let isDragging = false;
    let offsetX, offsetY;

    menuButton.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - menuButton.getBoundingClientRect().left;
        offsetY = e.clientY - menuButton.getBoundingClientRect().top;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;
            menuButton.style.left = x + 'px';
            menuButton.style.top = y + 'px';
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    let secondaryMenu = null;

    menuButton.addEventListener('click', () => {
        if (secondaryMenu && secondaryMenu.parentElement) {
            // Close the secondary menu
            document.body.removeChild(secondaryMenu);
            secondaryMenu = null;
        } else {
            // Open the secondary menu
            createSecondaryMenu();
        }
    });

    function createSecondaryMenu() {
        const buttonRect = menuButton.getBoundingClientRect();
        const secondaryMenuHeight = 200; // Adjust this value as needed

        secondaryMenu = document.createElement('div');
        secondaryMenu.style.position = 'fixed';
        secondaryMenu.style.top = `${buttonRect.bottom}px`;
        secondaryMenu.style.left = `${buttonRect.left}px`;
        secondaryMenu.style.background = '#2ecc71';
        secondaryMenu.style.padding = '10px';
        secondaryMenu.style.color = '#fff';
        secondaryMenu.style.cursor = 'move'; 
        secondaryMenu.innerHTML = `
            <div>
                <label for="diamonds">Diamonds:</label>
                <input type="text" id="diamondsAmount" placeholder="Enter amount">
                <button onclick="applyCommand('App.game.wallet.gainDiamonds', 'diamondsAmount')">Apply</button>
            </div>
            <div>
                <label for="questPoints">Quest Points:</label>
                <input type="text" id="questPointsAmount" placeholder="Enter amount">
                <button onclick="applyCommand('App.game.wallet.gainQuestPoints', 'questPointsAmount')">Apply</button>
            </div>
            <div>
                <label for="money">Money:</label>
                <input type="text" id="moneyAmount" placeholder="Enter amount">
                <button onclick="applyCommand('App.game.wallet.gainMoney', 'moneyAmount')">Apply</button>
            </div>
            <div>
                <label for="dungeonTokens">Dungeon Tokens:</label>
                <input type="text" id="dungeonTokensAmount" placeholder="Enter amount">
                <button onclick="applyCommand('App.game.wallet.gainDungeonTokens', 'dungeonTokensAmount')">Apply</button>
            </div>
            <div>
                <label for="battlePoints">Battle Points:</label>
                <input type="text" id="battlePointsAmount" placeholder="Enter amount">
                <button onclick="applyCommand('App.game.wallet.gainBattlePoints', 'battlePointsAmount')">Apply</button>
            </div>
            <div>
                <label for="farmPoints">Farm Points:</label>
                <input type="text" id="farmPointsAmount" placeholder="Enter amount">
                <button onclick="applyCommand('App.game.wallet.gainFarmPoints', 'farmPointsAmount')">Apply</button>
            </div>
        `;
        document.body.appendChild(secondaryMenu);

        // Make the secondary menu draggable
        let isSecondaryDragging = false;
        let secondaryOffsetX, secondaryOffsetY;

        secondaryMenu.addEventListener('mousedown', (e) => {
            isSecondaryDragging = true;
            secondaryOffsetX = e.clientX - secondaryMenu.getBoundingClientRect().left;
            secondaryOffsetY = e.clientY - secondaryMenu.getBoundingClientRect().top;
        });

        document.addEventListener('mousemove', (e) => {
            if (isSecondaryDragging) {
                const x = e.clientX - secondaryOffsetX;
                const y = e.clientY - secondaryOffsetY;
                secondaryMenu.style.left = x + 'px';
                secondaryMenu.style.top = y + 'px';
            }
        });

        document.addEventListener('mouseup', () => {
            isSecondaryDragging = false;
        });
    }

    window.applyCommand = function (commandFunction, amountInputId) {
        const amountInput = document.getElementById(amountInputId);
        const amount = parseFloat(amountInput.value);
        if (!isNaN(amount)) {
            eval(`${commandFunction}(${amount})`);
            amountInput.value = '';
        } else {
            alert('Please enter a valid numeric amount.');
        }
    };
})();