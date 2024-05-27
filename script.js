let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  tie: 0
};

updateScoreElement();
let isAutoPlaying=false;

let intervalId;

function autoPlay(){
  if(!isAutoPlaying){
    intervalId=setInterval(function(){
      const playerMove=pickComputerMove();
      playGame(playerMove);
    },1000);
    isAutoPlaying=true;
    document.querySelector('.autoplay').innerHTML='Stop Playing';
  }
 else{
  clearInterval(intervalId);
  isAutoPlaying=false;
  document.querySelector('.autoplay').innerHTML='Auto Play';
 }
}

document.body.addEventListener('keydown',(event)=>{
  if(event.key==='r'){
    playGame('Rock');
  }else if(event.key==='p'){
    playGame('Paper');
  }else if(event.key==='s'){
    playGame('Scissors');
  }
  else if(event.key==='a'){
    autoPlay();
  }
});
function playGame(playerMove){
const computerMove = pickComputerMove();
 let result =' ';
 if(playerMove==='Scissors')
 {
   if(computerMove==='Rock'){
 result='You Lose.';
}
else if(computerMove==='Paper'){
 result='You Win.';
}
else if(computerMove==='Scissors'){
 result='Tie.';
}

 }
 else if(playerMove==='Rock'){
 if(computerMove==='Rock'){
   result='Tie.';
 }
 else if(computerMove==='Paper'){
   result='You Lose.';
 }
 else if(computerMove==='Scissors'){
   result='You Win.';
 }
}
else if(playerMove==='Paper'){
if(computerMove==='Rock'){
result='You Win.';
}
else if(computerMove==='Paper'){
result='Tie.';
}
else if(computerMove==='Scissors'){
result='You Lose.';
}
}

if(result==='You Win.'){
  score.wins+=1;
}
else if(result==='You Lose.'){
  score.losses+=1;
}
else if(result==='Tie.'){
  score.tie+=1;
}
localStorage.setItem('score',JSON.stringify(score));

updateScoreElement();

document.querySelector('.js-result').innerHTML=result;
document.querySelector('.js-moves').innerHTML=` You
<img class="icons" src="${playerMove}-emoji.png">
<img class="icons" src="${computerMove}-emoji.png">
Computer `;


(`You picked ${playerMove}.Computer picked ${computerMove}.${result}
Wins:${score.wins} , Losses:${score.losses} , Tie:${score.tie}`);

}
function updateScoreElement(){
document.querySelector('.js-score')
.innerHTML=`Wins: ${score.wins} , Losses: ${score.losses} , Tie: ${score.tie}`;
}
function pickComputerMove(){
const randomNumber=Math.random();
let computerMove = ' ';
if(randomNumber>=0 && randomNumber<1/3)
{
computerMove='Rock';
}
else if(randomNumber>=1/3 && randomNumber<2/3)
{
computerMove = 'Paper';
}
else if(randomNumber>=2/3 && randomNumber<1){
computerMove = 'Scissors';
}

return computerMove;
}
