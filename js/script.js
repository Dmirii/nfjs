
const MAX_ENEMY = 2
const score = document.querySelector('.score');
const start = document.querySelector('.game__start');
const area = document.querySelector('.game__area');

const car = document.createElement('div');
car.classList.add('car');

//
const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft:false,
};

//
const settings ={
    start:false,
    score:0,
    speed:3,
    traffic:3,  
}
function getQuantityElements(heightLines){
    return document.documentElement.clientHeight/heightLines +1

}
// start the game
start.addEventListener('click', event => { 
    start.classList.add('hide');
    area.innerHTML='';
    car.style.left='125px';
    car.style.bottom='10px';
    car.style.top='auto';
    for(let i=0; i<getQuantityElements(100); i++){
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i*100) +'px';
        line.y = i * 100;
        area.appendChild(line); 
    }

    for(let i=0; i<getQuantityElements(100 *settings.traffic); i++ ){
        const enemy =document.createElement('div');
        const randomEnemy = Math.floor(Math.random() * MAX_ENEMY) +1;
        enemy.classList.add('enemy');
        enemy.y = -100*settings.traffic *(i +1);
        enemy.style.top = enemy.y+'px';
        enemy.style.background = ` transparent url("./image/enemy${randomEnemy}.png") center /cover no-repeat`;
        enemy.style.left = Math.floor(( Math.random() *( area.offsetWidth -50 ))) + 'px';
        area.appendChild(enemy);
    }

    settings.start= true;
    settings.score=0;
    area.appendChild(car);
    settings.x = car.offsetLeft;
    settings.y = car.offsetTop;

    requestAnimationFrame(playGame);
});

//
function playGame(){

   moveRoad();
   moveEnemy();
    if(settings.start){
        settings.score += settings.speed;
        score.textContent= 'SCORE:'+settings.score;
        if(keys.ArrowLeft && settings.x > 0){
            settings.x-= settings.speed;
  
        }
      
        if(keys.ArrowRight  && settings.x <(area.offsetWidth - car.offsetWidth)){
            settings.x+= settings.speed;
           
        }
        if(keys.ArrowUp && settings.y > 0){
            settings.y-= settings.speed;
           
        }
        if(keys.ArrowDown && settings.y <(area.offsetHeight - car.offsetHeight-5)){
            settings.y+= settings.speed;
           
        }

        //
        car.style.left = settings.x+'px';
        car.style.top = settings.y+'px';

         requestAnimationFrame(playGame);
    }
}

function startRunCar(event){ 
    event.preventDefault();
    keys[event.code]= true;       
}

function stopRunCar(event){
    event.preventDefault();
    keys[event.code]= false;   
}
//
function moveRoad(){
    let lines = document.querySelectorAll('.line');
    lines.forEach((line)=>{
        line.y += settings.speed;
        line.style.top =line.y+ 'px';
        if(line.y > document.documentElement.clientHeight){
            line.y= -100 ;
        }

    })
}

//
function moveEnemy(){
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach((item)=>{
        let carRect = car.getBoundingClientRect();
        let enemyRect = item.getBoundingClientRect();

        if(carRect.top <= enemyRect.bottom && 
           carRect.right >= enemyRect.left &&
           carRect.left <= enemyRect.right &&
           carRect.bottom >= enemyRect.top) {

            console.warn('lng');
            start.classList.remove('hide');
            settings.start=false;
            start.style.top =score.offsetHeight;
        }

        item.y += settings.speed /2 ;
        item.style.top = item.y+'px';
        if(item.y >= document.documentElement.clientHeight){
            item.y = -100 * settings.traffic;
            item.style.left = Math.floor(( Math.random() *( area.offsetWidth -50 ))) + 'px';
            
        }
    })
 
}

//
document.addEventListener('keydown', startRunCar);
document.addEventListener('keyup', stopRunCar)
