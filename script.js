const testText = "The quick brown fox jumps over the lazy dog.";
const displayElement = document.getElementById('text-display');
const inputElement = document.getElementById('text-input');
const timerElement = document.getElementById('timer');
const wpmElement = document.getElementById('wpm');
const startButton = document.getElementById('start-button');

let timeLeft = 60;
let timer;
let wordCount = 0;

displayElement.textContent = testText;

function startTest() {
    wordCount = 0;
    timeLeft = 60;
    inputElement.value = "";
    inputElement.disabled = false;
    inputElement.focus();
    startButton.disabled = true;
    timerElement.textContent = `Time: ${timeLeft}s`;
    wpmElement.textContent = `WPM: 0`;

    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerElement.textContent = `Time: ${timeLeft}s`;
        } else {
            clearInterval(timer);
            endTest();
        }
    }, 1000);
}

function endTest() {
    inputElement.disabled = true;
    startButton.disabled = false;
    const typedText = inputElement.value.trim();
    const typedWords = typedText.split(' ').filter(word => word.length > 0);
    wordCount = typedWords.length;
    const wpm = Math.round((wordCount / 60) * 60);
    wpmElement.textContent = `WPM: ${wpm}`;
}

inputElement.addEventListener('input', () => {
    const typedText = inputElement.value.trim();
    const typedWords = typedText.split(' ').filter(word => word.length > 0);
    wordCount = typedWords.length;
    const wpm = Math.round((wordCount / (60 - timeLeft)) * 60);
    wpmElement.textContent = `WPM: ${wpm}`;
});

startButton.addEventListener('click', startTest);

