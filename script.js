const allNumbers = Array.from({ length: 90 }, (_, i) => i + 1);
let usedNumbers = [];
let history = [];
let currentIndex = -1;

// Generate the number board
const numberBoard = document.getElementById('numberBoard');
allNumbers.forEach(num => {
    const cell = document.createElement('div');
    cell.classList.add('number-cell');
    cell.id = `cell-${num}`;
    cell.textContent = num;
    numberBoard.appendChild(cell);
});

function generateUniqueRandomNumber() {
    if (allNumbers.length === 0) {
        alert("All numbers have been displayed!");
        document.getElementById('nextButton').disabled = true;
        return;
    }

    const randomIndex = Math.floor(Math.random() * allNumbers.length);
    const randomNumber = allNumbers.splice(randomIndex, 1)[0];

    if (currentIndex === history.length - 1) {
        history.push(randomNumber);
        currentIndex++;
    } else {
        history.splice(currentIndex + 1);
        history.push(randomNumber);
        currentIndex++;
    }

    updateDisplay(randomNumber);
    document.getElementById('prevButton').disabled = currentIndex === 0;
}

function showPreviousNumber() {
    if (currentIndex > 0) {
        currentIndex--;
        const previousNumber = history[currentIndex];
        updateDisplay(previousNumber);
    }

    document.getElementById('prevButton').disabled = currentIndex === 0;
    document.getElementById('nextButton').disabled = false;
}

function updateDisplay(number) {
    const numberDisplay = document.getElementById('numberDisplay');
    numberDisplay.textContent = number;

    document.querySelectorAll('.number-cell').forEach(cell => {
        cell.classList.remove('current');
    });

    history.forEach(num => {
        document.getElementById(`cell-${num}`).classList.add('finished');
    });

    document.getElementById(`cell-${number}`).classList.add('current');
}

function showRestartDialog() {
    document.getElementById('dialogOverlay').style.display = 'flex';
}

function closeDialog() {
    document.getElementById('dialogOverlay').style.display = 'none';
}

function restartGame() {
    allNumbers.push(...history);
    usedNumbers = [];
    history = [];
    currentIndex = -1;
    document.getElementById('numberDisplay').textContent = 'Start!';
    document.querySelectorAll('.number-cell').forEach(cell => {
        cell.classList.remove('current', 'finished');
    });
    document.getElementById('dialogOverlay').style.display = 'none';
    document.getElementById('nextButton').disabled = false;
    document.getElementById('prevButton').disabled = true;
}
