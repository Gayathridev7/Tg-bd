// Countdown
const countdownEl = document.getElementById("countdown");
const birthdayDate = new Date("2026-01-25 00:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    let gap = birthdayDate - now;
    if(gap < 0) gap = 0;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = String(Math.floor(gap / day)).padStart(2,"0");
    const hours = String(Math.floor((gap % day)/hour)).padStart(2,"0");
    const minutes = String(Math.floor((gap % hour)/minute)).padStart(2,"0");
    const seconds = String(Math.floor((gap % minute)/second)).padStart(2,"0");

    countdownEl.innerText = `${days}:${hours}:${minutes}:${seconds}`;
}
setInterval(updateCountdown, 1000);

// Surprise Button
const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseMsg = document.getElementById("surpriseMessage");
const birthdayMusic = document.getElementById("birthdayMusic");

surpriseBtn.addEventListener("click", () => {
    surpriseMsg.classList.remove("d-none");
    startConfetti();
    birthdayMusic.play().catch(()=>console.log("Click to allow music"));
});

// Confetti
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confettiArr = [];
class Confetti {
    constructor(){
        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height - canvas.height;
        this.size = Math.random()*10+5;
        this.speed = Math.random()*3+2;
        this.color = `hsl(${Math.random()*360},100%,50%)`;
    }
    update(){
        this.y += this.speed;
        if(this.y > canvas.height){
            this.y = -this.size;
            this.x = Math.random()*canvas.width;
        }
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.size,this.size);
    }
}
function startConfetti(){
    confettiArr = [];
    for(let i=0;i<200;i++){
        confettiArr.push(new Confetti());
    }
    animateConfetti();
}
function animateConfetti(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    confettiArr.forEach(c=>{
        c.update();
        c.draw();
    });
    requestAnimationFrame(animateConfetti);
}

// Balloons
const balloonContainer = document.getElementById("balloons-container");
const colors = ["#ff4d4d","#ffb84d","#4d79ff","#33cc33","#ff66b2"];
for(let i=0;i<20;i++){
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");
    balloon.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)];
    balloon.style.left = Math.random()*100 + "vw";
    balloon.style.animationDuration = 5+Math.random()*5 + "s";
    balloonContainer.appendChild(balloon);
}
