// 캔버스 가져오기

var bgCanvas = document.getElementById("background");
var bgCtx = bgCanvas.getContext("2d");

var gCanvas = document.getElementById("game");
var gCtx = gCanvas.getContext("2d");

// 배경, 공 이미지 표시

var bgImage = new Image();
bgImage.src = "./images/background.png";
var hoopImage = new Image();
hoopImage.src = "./images/hoop.png";
var ball = new Image();
ball.src = "./images/basketball.png";

window.onload = function drawBackground(){
    bgCtx.drawImage(bgImage, 0, 0);
    bgCtx.drawImage(hoopImage, 1060, 400);
    scoreArr = [0, 0, 0];
    showTime();
    createRanking();
    startScreen();
}

const width = gCanvas.width;
const height = gCanvas.height;
const groundX = 100;
const groundY = 630;
let ballX = 100;
let ballY = 630;
let ballPower;
let ballV;
let ballVx;
let ballVy;
let ballRadius = 60;

let gauge = 0;
let Rgauge = false;     // 게이지 감소
let isCharging = false;
let isFired = false;
let isHitted = false;
const GRAVITY_ACCELERATION = 0.098;
let degree=0;
let stopArrow = false;
let goal = false;

// 화살표 회전
var direction = -1;
var rotateX = -1;
var rotateY = -1;

var time = 30;

// 각도기 조절

var arrow = new Image();
arrow.src = "./images/arrow.png";

// 90도 틀 그리기

function arrowFrame() {
  gCtx.beginPath();
  gCtx.moveTo(248, 610);
  gCtx.lineTo(340, 610);
  gCtx.strokeStyle = "#707070";
  gCtx.lineWidth = 5;
  gCtx.stroke();
  gCtx.closePath();

  gCtx.beginPath();
  gCtx.moveTo(250, 520);
  gCtx.lineTo(250, 612);
  gCtx.strokeStyle = "#707070";
  gCtx.lineWidth = 5;
  gCtx.stroke();
  gCtx.closePath();
}

// 화살표 그리기

function drawArrow() {
  gCtx.save();
  gCtx.translate(248, 600);
  gCtx.rotate(degree * Math.PI / 180);
  gCtx.drawImage(arrow, rotateX, rotateY);
  gCtx.restore();
}

function moveArrow() {
  
    // 방향 설정
    if (degree == -20) direction = -1;
    else if (degree == -90) direction = 1;

    // 화살표 위치 조정
    rotateX = -(-degree / 10) - 1.5;
    rotateY = -(-degree / 30) * 2 - 1;

    // 화살표 그리기
    gCtx.save();
    gCtx.translate(248, 600);
    gCtx.rotate(degree * Math.PI / 180);
    gCtx.drawImage(arrow, rotateX, rotateY);
    gCtx.restore();

    degree += direction;
}

// 타이머 영역 만들기

var timeArea = document.createElement("div");
timeArea.setAttribute("class", "timer area");
document.getElementById("canvas-area").appendChild(timeArea);

var sec = document.createElement("p");
sec.setAttribute("class", "large");
document.querySelector(".timer").appendChild(sec);

var timerText = document.createElement("span");
timerText.setAttribute("class", "bold");
timerText.innerText = "SECOND";
document.querySelector(".timer").appendChild(timerText);

function showTime() {
  document.querySelector(".timer > p").innerText = time;
}

// 타이머

function gameTimer() {
//   var arrow = setInterval(moveArrow, 10);
  var timer = setInterval(changeTime, 1000);
  var start = setInterval(function() {
    draw(stopArrow);
  }, 10);
  function changeTime() {
    time -= 1;
    if (time != 0) {
      document.querySelector(".timer > p").innerText = time;
    } else {
      document.querySelector(".timer > p").innerText = time;
      clearInterval(timer);
      clearInterval(arrow);
      clearInterval(start);
      time = 30;
      endScreen();
    }
  }
}

// 스코어 영역 만들기

var scoreArea = document.createElement("div");
scoreArea.setAttribute("class", "score area");
document.getElementById("canvas-area").appendChild(scoreArea);

var score = document.createElement("p");
score.setAttribute("class", "large");
score.innerText = 0;
document.querySelector(".score").appendChild(score);

var scoreText = document.createElement("span");
scoreText.setAttribute("class", "bold");
scoreText.innerText = "SCORE";
document.querySelector(".score").appendChild(scoreText);

// 시작 화면

function startScreen() {
    var darkDiv = document.createElement("div");
    darkDiv.setAttribute("class", "dark-div");
  
    var largeBtn = document.createElement("p");
    largeBtn.setAttribute("class", "div-btn");
    largeBtn.innerHTML = "PRESS ENTER<br />TO START";
    darkDiv.appendChild(largeBtn);
  
    document.getElementById("canvas-area").appendChild(darkDiv);
  }
  
  // 엔딩 화면
  
  function endScreen() {
    ballX = 100;
    ballY = 630;
    isFired = false;

    var darkDiv = document.createElement("div");
    darkDiv.setAttribute("class", "dark-div end");
  
    var gameOver = document.createElement("h1");
    gameOver.setAttribute("class", "end-heading");
    gameOver.innerText = "GAME OVER";
    darkDiv.appendChild(gameOver);
  
    var scoreBox = document.createElement("div");
    scoreBox.setAttribute("class", "score-box");
    darkDiv.appendChild(scoreBox);
  
    var scoreText = document.createElement("div");
    scoreText.setAttribute("class", "score-text-box");
    scoreBox.appendChild(scoreText);
  
    var score = document.createElement("p");
    score.setAttribute("class", "score-text");
    score.innerText = "SCORE";
    scoreText.appendChild(score);
  
    var scoreNum = document.createElement("p");
    scoreNum.setAttribute("class", "score-text");
    var currentScore = document.querySelector(".score p").innerText;
    scoreNum.innerText = currentScore;
    scoreText.appendChild(scoreNum);
  
    var best = document.createElement("p");
    best.setAttribute("class", "score-text");
    best.innerText = "BEST";
    scoreText.appendChild(best);
  
    var bestNum = document.createElement("p");
    bestNum.setAttribute("class", "score-text");
    bestNum.innerText = (parseInt(currentScore) > parseInt(scoreArr[0]) ? currentScore : scoreArr[0]);
    scoreText.appendChild(bestNum);
  
    // 새로운 베스트 스코어가 나오면 new 이미지 띄우기
  
    if (parseInt(scoreNum.innerText) > parseInt(scoreArr[0])) {
      var newScore = document.createElement("img");
      newScore.setAttribute("src", "./images/new.png");
      newScore.setAttribute("class", "new-score");
      scoreBox.appendChild(newScore);
    }
  
    var smallBtn = document.createElement("p");
    smallBtn.setAttribute("class", "div-btn smBtn");
    smallBtn.innerHTML = "PRESS ENTER TO RESTART";
    darkDiv.appendChild(smallBtn);
  
    document.getElementById("canvas-area").appendChild(darkDiv);
  
    // 랭킹 업데이트 
  
    for (var i = 0; i < scoreArr.length; i++) {
      if (scoreArr.includes(parseInt(currentScore))) break;
      if (parseInt(currentScore) > parseInt(scoreArr[i])) {
        scoreArr.splice(i, 0, parseInt(currentScore));
        scoreArr.pop();
        break;
      }
    }
  }
  
  // 게임 시작 & 재시작
  
  function startGame(event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      var div = document.querySelector(".dark-div");
      div.parentNode.removeChild(div);
      var rank = document.querySelector(".ranking");
      rank.parentNode.removeChild(rank);
      document.querySelector(".score p").innerText = 0;
      isCharging = false;
      isFired = false;
      stopArrow = false;
      goal = false;
      showTime();
      createRanking();
      gameTimer();
    }
  }
  
  document.addEventListener("keydown", startGame);
  
  // 랭킹 테이블
  
  var scoreArr;
  
  function createRanking() {
    var ranking = document.createElement("table");
    var rankingHead = document.createElement("thead");
    var rankingBody = document.createElement("tbody");
    ranking.appendChild(rankingHead);
    ranking.appendChild(rankingBody);
    ranking.setAttribute("class", "ranking");
    for (var i = 0; i < 4; i++) {
      if (!i) {
        rankingHead.innerHTML += "<tr><th>순위</th><th>점수</th></tr>";
      } else {
        rankingBody.innerHTML += "<tr><td>"+i+"등</td><td>"+scoreArr[i-1]+"점</td></tr>";
      }
    }
    document.getElementById("canvas-area").appendChild(ranking);
  }

// 공 그리기

function drawBall(){
    gCtx.drawImage(ball, ballX, ballY, 120, 120);
}

// 게임 화면 그리기

function draw(stop){
    gCtx.clearRect(0,0,width,height);
    arrowFrame();
    if (stopArrow == false) moveArrow();
    else drawArrow();
    drawGaugeBar();
    drawGauging();
    drawBall();
    // drawBackground();

    if(!isFired){       // 초기 상태
        ballX = 100;
        ballY = 630;
    }
    else if(isFired && (ballY > 640 || ballY < 60 || ballX < 60 ) && goal == false){          // 바닥 또는 천장에 닿으면 재시작
        isFired = false;
        stopArrow = false;
        goal = false;
    }
    else if((ballX + ballRadius >= 1100 && ballX + ballRadius <= 1240 && ballY + ballRadius >= 400 && ballY + ballRadius <= 430) || goal == true ){
        hoopAnimation(ballX, ballY);
    }
    else{               // 발사 후 X, Y좌표 계산
        if(ballY+ballVy < 0 || ballY + ballVy > height){                     // 천장에 닿았을 때 튕기는거  
            ballVy = - ballVy;
        }
        else if(ballX+ballVx < 0 || ballX + ballVx > width || (ballX+ballRadius >= 1000 && (ballY+ballRadius >= 400 && ballY+ballRadius <= 420))){                 // 벽에 닿았을 때 튕기는거
            ballVx = - ballVx;
        }
        ballVy += 0.98;
        ballX += ballVx;
        ballY += ballVy;
    }
}

// 골 넣으면 바닥으로 떨어지는 애니메이션

function hoopAnimation(x, y) {
  if (y < 800) {
    if (x >= 1110 && x <= 1130) {
      ballY += 20;
    }
    else if (x >= 1110) {
      ballX -= 20;
      ballY += 20;
    }
    else if (x <= 1110) {
      ballX += 20;
      ballY += 20;
    }
    goal = true;
  }
  else if (y >= 800) {
    goal = false;
    isFired = false;
    stopArrow = false;
    var crScore = parseInt(document.querySelector(".score p").innerText)+1;
    document.querySelector(".score p").innerText = crScore;
  }
}

// 게이지 바 그리기

function drawGaugeBar(){
    gCtx.beginPath();
    gCtx.fillStyle = "#fff"
    gCtx.fillRect(432.5, 65, 405, 60);
    gCtx.closePath();
}

function drawGauging(){
    if(gauge < 100 && isCharging && !isFired && Rgauge == false){
        gauge += 1;
    }
    else if(gauge == 100 && Rgauge == false){
        Rgauge = true;
        gauge -= 1;
    }
    else if(gauge > 0 && isCharging && !isFired && Rgauge == true ){
        gauge -= 1;
    }
    else if(gauge == 0 && Rgauge == true){
        Rgauge = false;
        gauge += 1;
    }
    gCtx.beginPath();
    gCtx.rect(437.5, 70, gauge*4, 50);
    gCtx.fillStyle = "#E67567";
    gCtx.fill();
    gCtx.closePath();
};

// 스페이스바 입력 (공 던지기)

const keydownHandler = event => {
    if (event.keyCode === 32) {
        event.preventDefault();
        isCharging = true;
        isFired = false;
        stopArrow = true;
        draw(stopArrow);
    }
};

const keyupHandler = event => {
    if(event.keyCode === 32 && !isFired){
        gCtx.fillStyle = "black";
        isCharging = false;
        isFired = true;
        ballPower = 25 + gauge / 6;
        let degreeR = -(degree) * Math.PI / 180;

        ballVx = ballPower * Math.cos(degreeR);
        ballVy = -ballPower * Math.sin(degreeR);

        gauge = 0;
        Rgauge = false;
    }
};

document.addEventListener("keydown", keydownHandler, false);
document.addEventListener("keyup", keyupHandler, false);