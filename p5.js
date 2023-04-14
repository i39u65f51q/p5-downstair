/* Media-Screen Width, Height */
const container = document.querySelector('#container');
const screenWidth = container.clientWidth;
const screenHeight = Math.floor(container.clientHeight / 10) * 10;

const scoreElement = document.querySelector('.score');
const heartElement = document.querySelector('.heart');
const gameStatusElement = document.querySelector('.game-status');
/* ----------- Global Value ------------*/
let score = 0;
let heart = 3;

let isEndGame = false;

/* 角色設定 */
let roleImg;
let roleX = screenWidth / 2;
let roleY = 50;
let step = 0;
let direction = 1; //1=LEFT, 2=RIGHT
let isStandOnBuilding = false;

/* 建築設定 */
const bWidth = 250;
const bHeight = 10;
let standIndex = -1;
const buildings = [{ x: screenWidth / 2 - 100, y: screenHeight / 2, width: bWidth, height: bHeight }];

/* ----------- Processing ------------*/
function setup() {
  createCanvas(screenWidth, screenHeight); //size
  roleImg = loadImage('./asset/role.png');
}

//每幀(0.01s)執行一次
function draw() {
  if (heart === 0) {
    endGame();
    return;
  }
  /* 角色超出螢幕範圍 */
  if (roleY >= screenHeight || roleY <= 0) {
    roleDead();
  }
  /* 增除上一幀畫面 */
  clear();

  /* 建立樓梯物件 */
  buildings.forEach(b => {
    fill(250);
    stroke(0);
    rect(b.x, b.y, b.width, b.height);
  });
  buildings.forEach(b => b.y--);

  /* 清除超出螢幕外的物件 */
  // const removeIndex = buildings.findIndex(b => b.y <= 10);
  // removeIndex !== -1 && buildings.splice(removeIndex, 1);

  /* 掉落：如果role在螢幕範圍內 && 未站在物件上 */
  if (roleY < screenHeight && !isStandOnBuilding) {
    fallDown();
  }
  /* 判斷人物是否站在物件上 */
  const checkStandBuildingIndex = buildings.findIndex(
    b => roleY === b.y - bHeight * 4 && roleX >= b.x && roleX <= b.x + bWidth,
  );
  if (checkStandBuildingIndex !== -1 && standIndex === -1) {
    standIndex = checkStandBuildingIndex;
    isStandOnBuilding = true;
  }
  if (standIndex !== -1) {
    roleY = buildings[standIndex].y - bHeight * 4;

    /* 判斷角色是否站在建築物上 */
    if (roleX + 32 <= buildings[standIndex].x || roleX >= buildings[standIndex].x + bWidth) {
      isStandOnBuilding = false;
      standIndex = -1;
    }
  }
  /* 建立角色 */
  gRole();

  /* 鍵盤事件 */
  if (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW)) {
    step++;
    step = step % 4;
  }
  if (keyIsDown(LEFT_ARROW) && isStandOnBuilding) toLeft();
  if (keyIsDown(RIGHT_ARROW) && isStandOnBuilding) toRight();

  /* 每60幀=1S */
  if (!isEndGame && frameCount % 60 === 0) {
    gBuilding();
    score++;
    scoreElement.textContent = score;
  }
}
function gRole() {
  //p5: image(img, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight, fit, xAlign, yAlign)
  image(roleImg, roleX, roleY, 32, 48, step * 32, direction * 48, 32, 48, step * 32 + 32, direction * 48, CENTER);
}
function toLeft() {
  direction = 1;
  roleX -= 5;
}
/* px= 128, py=96 */
function toRight() {
  direction = 2;
  roleX += 5;
}

function fallDown() {
  roleY++;
}
/* 角色受傷 */
function roleDead() {
  if (heart === 0) {
    endGame();
    return;
  }
  heart--;
  loadHeart();
  resetRole();
}
/* 受傷後重設角色位置 */
function resetRole() {
  roleX = screenWidth / 2;
  roleY = 50;
  standIndex = -1;
  isStandOnBuilding = false;
}
/* 新增物件 */
function gBuilding() {
  const x = Math.ceil(Math.random() * 1000) + 10;
  const y = Math.floor((screenHeight - Math.random() * 15) / 100) * 100;
  buildings.push({ x: x, y: y, width: bWidth, height: bHeight });
}
/* ----------- 遊戲初始化 ------------*/
function initializeGame() {
  loadHeart();
  loadScore();
}
function loadHeart() {
  heartElement.innerHTML = '';
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
/* TODO: 結束遊戲 */
function endGame() {
  isEndGame = true;
}

// window.addEventListener('click', startGame);
window.addEventListener('load', initializeGame);
