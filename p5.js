/* Width, Height */
const screenWidth = document.querySelector('#container').clientWidth;
const screenHeight = document.querySelector('#container').clientHeight;
/* Score DOM */
const scoreElement = document.querySelector('.score');
/* Heart DOM */
const heartElement = document.querySelector('.heart');
/* Global Value */
let score = 0;
let heart = 5;

const bgColor = 220;
let x = 10;
let y = 10;

window.addEventListener('load', initializeGame);

function loadHeart() {
  for (let i = 1; i <= heart; i++) {
    const heartImg = document.createElement('img');
    heartImg.src = './asset/heart.png';
    heartImg.classList.add('heart-item');
    heartElement.appendChild(heartImg);
  }
}
function loadScore() {
  scoreElement.textContent = score;
}
function initializeGame() {
  loadHeart();
  loadScore();
}
/* Processing  */
function setup() {
  createCanvas(screenWidth, screenHeight);
}
function draw() {
  text(a, screenWidth / 2, screenHeight / 2);
}
