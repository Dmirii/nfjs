

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
}

// start the game
start.addEventListener('click', () => { 
    start.classList.add('hide');
    settings.start= true;
    area.appendChild(car);
    requestAnimationFrame(playGame);
});

//
function playGame(){
    console.log('play');
    if(settings.start){
         requestAnimationFrame(playGame);
    }
}

function startRunCar(event){ 
    event.preventDefault();
    keys[event.keys]= true;    
}

function stopRunCar(event){
    event.preventDefault();
    keys[event.keys]= false;
}

//
document.addEventListener('keydown', startRunCar);
document.addEventListener('keyup', stopRunCar)
