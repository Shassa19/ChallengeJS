import { Levels } from './level.js';

const keys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
};

let currentLevelIndex = 0;
let currentLevel;
let steps = 0;
let lastDirection = 'down';
let playerPos = null;

const gameboard = document.getElementById('gameboard');
const resetBtn = document.getElementById('resetBtn');
const stepCounter = document.getElementById('stepCounter');
const messageDiv = document.getElementById('message');
const menu = document.getElementById('menu');
const classicBtn = document.getElementById('classicMode');

classicBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', () => loadLevel(currentLevelIndex));

function startGame() {
    menu.style.display = 'none';
    document.getElementById('hud').style.display = 'flex';
    resetBtn.style.display = 'block';
    stepCounter.style.display = 'block';
    messageDiv.style.display = 'block';

    currentLevelIndex = 0;
    loadLevel(currentLevelIndex);
    enableGame();
    gameLoop();
}
function gameLoop() {
    generateGrid();
    requestAnimationFrame(gameLoop);
}


function enableGame() {
    window.addEventListener('keydown', handleKeyDown);
}

function disableGame() {
    window.removeEventListener('keydown', handleKeyDown);
}

function handleKeyDown(e) {
    if (keys[e.keyCode]) {
        e.preventDefault();
        movePlayer(keys[e.keyCode]);
    }
}

function loadLevel(index) {
    currentLevel = JSON.parse(JSON.stringify(Levels[index]));
    playerPos = findPlayer();

    if (!playerPos) {
        alert("❌ Ce niveau ne contient pas de joueur (valeur 3).");
        menu.style.display = 'flex';
        document.getElementById('hud').style.display = 'none';
        return;
    }

    steps = 0;
    updateStepCounter();
    messageDiv.textContent = '';
    generateGrid();
}


function findPlayer() {
    for (let y = 0; y < currentLevel.length; y++) {
        for (let x = 0; x < currentLevel[y].length; x++) {
            if (currentLevel[y][x] === 3) return { x, y };
        }
    }
    return null;
}

function canMoveTo(x, y) {
    const cell = currentLevel[y]?.[x];
    if (cell === undefined || cell === 1) return false;

    if (cell === 2) {
        const dx = x - playerPos.x;
        const dy = y - playerPos.y;
        const nextX = x + dx;
        const nextY = y + dy;
        const nextCell = currentLevel[nextY]?.[nextX];
        return nextCell === 0 || nextCell === 4;
    }
    return true;
}

function movePlayer(direction) {
    lastDirection = direction;
    const { x, y } = playerPos;
    let newX = x, newY = y;

    if (direction === 'left') newX--;
    else if (direction === 'right') newX++;
    else if (direction === 'up') newY--;
    else if (direction === 'down') newY++;

    if (!canMoveTo(newX, newY)) return;

    steps++;
    updateStepCounter();

    if (currentLevel[newY][newX] === 2) {
        const dx = newX - x;
        const dy = newY - y;
        const boxNewX = newX + dx;
        const boxNewY = newY + dy;
        currentLevel[boxNewY][boxNewX] = 2;
        currentLevel[newY][newX] = 0;
    }

    currentLevel[y][x] = Levels[currentLevelIndex][y][x] === 4 ? 4 : 0;
    currentLevel[newY][newX] = 3;
    playerPos = { x: newX, y: newY };

    generateGrid();

    if (checkVictory()) {
        disableGame();
        messageDiv.textContent = '🎉 Bravo ! Tu as terminé ce niveau.';

        setTimeout(() => {
            currentLevelIndex++;

            if (currentLevelIndex >= Levels.length) {
                messageDiv.textContent = '🏆 Tous les niveaux sont terminés !';
            } else {
                loadLevel(currentLevelIndex);
                enableGame();
            }
        }, 3000);
    }
}

function checkVictory() {
    for (let y = 0; y < Levels[currentLevelIndex].length; y++) {
        for (let x = 0; x < Levels[currentLevelIndex][y].length; x++) {
            const isTarget = Levels[currentLevelIndex][y][x] === 4;
            const hasBox = currentLevel[y][x] === 2;
            if (isTarget && !hasBox) return false;
        }
    }
    return true;
}

function isBoxOnTarget(x, y) {
    return Levels[currentLevelIndex][y][x] === 4 && currentLevel[y][x] === 2;
}

function generateGrid() {
    gameboard.innerHTML = '';
    currentLevel.forEach((row, y) => {
        row.forEach((cell, x) => {
            const div = document.createElement('div');
            div.classList.add('cell');

            switch (cell) {
                case 0: div.classList.add('floor'); break;
                case 1: div.classList.add('wall'); break;
                case 2: div.classList.add(isBoxOnTarget(x, y) ? 'box-on-target' : 'box'); break;
                case 3: div.classList.add(`player-${lastDirection}`); break;
                case 4: div.classList.add('target'); break;
            }

            gameboard.appendChild(div);
        });
    });
}

function updateStepCounter() {
    stepCounter.textContent = `Steps: ${steps}`;
}
