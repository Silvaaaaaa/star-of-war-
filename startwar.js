const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector('.score');
const  moles = document.querySelectorAll(".mole");
const countdownboard = document.querySelector(".countdown");
const startbuttom = document.querySelector(".startbutton");
const highscoreBoard = document.querySelector(".highscore");


let lasthole ; 
let timeup =false;
let timelimit = 20000;
let score = 0 ;          
let countdown ;
let highscore = localStorage.getItem('game1HighScore')|| 0 ;
    highscoreBoard.textContent = 'High Score:' + highscore;

function pickRandomHole(holes){
    const randomHole = Math.floor(Math.random() * holes.length);
    const hole = holes[randomHole];
    if(hole === lasthole){
        return pickRandomHole(holes);
    }
    lasthole = hole ; 
    return hole ; 
}
function popOut(){
    const time = Math.random() * 1300 + 400 ;
    const hole = pickRandomHole(holes);
    hole.classList.add('up');   
    setTimeout(function(){
        hole.classList.remove('up');
        if(!timeup) popOut();
    } ,time)
}
popOut();

function startGame(){
    countdown = timelimit / 1000 ;
    scoreBoard.textContent = 0 ; 
    scoreBoard.style.display = 'block' ;
    countdownboard.textContent  = countdown;
    timeup = false; 
    score =  0 ;
    popOut(); 
    setTimeout(() => {
        timeup = true; 
    }, timelimit);
    let startcountdown = setInterval(() => {
         countdown -= 1 ; 
         countdownboard.textContent = countdown;
         if(countdown < 0 ){
             countdown = 0 ;
             clearInterval(startcountdown);
             checkHighScore();
             countdownboard.textContent = 'Time up' ;
         }
    }, 1000);
}
startbuttom.addEventListener("click", startGame);

function whack(e){
    score++ ;
    this.style.backgroundImage = 'url("https://www.frankslaboratory.co.uk/downloads/54/yoda2.png")'
    this.style.pointerEvents = 'none'
    setTimeout(() => {
        this.style.backgroundImage ='url("https://www.frankslaboratory.co.uk/downloads/54/yoda1.png")'
        this.style.pointerEvents = 'all'
    }, 800);
    scoreBoard.textContent = score; 
}
moles.forEach(mole => mole.addEventListener("click" , whack));

function checkHighScore(){
    if(score > localStorage.getItem('game1HighScore')){ // 14 > 13 
        localStorage.setItem('game1HighScore' , score); // 14 
        highscore = score;  // 14  
        highscoreBoard.textContent = 'High Score:' + highscore; //14 
    }
}