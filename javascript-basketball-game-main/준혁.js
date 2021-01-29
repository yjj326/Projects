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

function drawBackground(){
    bgCtx.drawImage(bgImage, 0, 0);
    bgCtx.drawImage(hoopImage, 1060, 400);
}

const width = gCanvas.width;
const height = gCanvas.height;
let ballX = 100;
let ballY = 630;
let ballPower;
let ballVx;
let ballVy;
let gauge = 0;
let isCharging = false;
let isFired = false;
let isHitted = false;
const GRAVITY_ACCELERATION = 0.098;
let degree=0;

// 공 그리기

function drawBall(){
    gCtx.drawImage(ball, ballX, ballY, 120, 120);
}

function draw(){
    gCtx.clearRect(0,0,width,height);
    arrowFrame();
    moveArrow();
    drawGauging();
    drawGaugeBar();
    drawBall();
    drawBackground();

    if(!isFired){
        ballX = 100;
        ballY = 630;
    }
    else{
        ballVy += 1.98;
        ballX = ballX + ballVx;
        ballY = ballY + ballVy;
    }
}

function drawGaugeBar(){
    gCtx.strokeRect(635,100,200,30);
    gCtx.lineWidth = 3;
    gCtx.font = "20px bold"
    gCtx.fillText("파워 게이지", 685, 180);
}

function drawGauging(){
    if(gauge<=200 && isCharging && !isFired){
        gCtx.fillStyle = "#E67567";
        gauge += 1;
        gCtx.fillRect(635,100,gauge,30);
    }
    else if(!isCharging && isFired){
        gCtx.fillStyle = "black";
        gCtx.fillRect(635,100,0,30);
    }
    else if(isCharging){
        gCtx.fillRect(635,100,200,30);
    }
};

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

var direction = -1;
var rotateX = -1;
var rotateY = -1;

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

// 스페이스바 입력

const keydownHandler = event => {
    if (event.keyCode === 32) {
        event.preventDefault();
        isCharging = true;
        isFired = false;
        draw();
    }
};

const keyupHandler = event => {
    if(event.keyCode === 32 && !isFired){
        isCharging = false;
        isFired = true;
        ballPower = gauge / 2.43;
        let degreeR = degree * Math.PI / 180;
        ballVx = ballPower * Math.cos(degreeR);
        ballVy = -ballPower * Math.sin(degreeR);
        gauge = 0;
    }
};

const start = setInterval(draw, 10);
document.addEventListener("keydown", keydownHandler, false);
document.addEventListener("keyup", keyupHandler, false);