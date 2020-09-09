

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
start.addEventListener('click', event => { 
    start.classList.add('hide');
    settings.start= true;
    area.appendChild(car);
    settings.x = car.offsetLeft;
    requestAnimationFrame(playGame);
});

//
function playGame(){
    console.log('play');
    if(settings.start){
        if(keys.ArrowLeft){
            settings.x--;
            console.log('left');
        }
        if(keys.ArrowRight){
            settings.x++;
            console.log('right')
        }

        //
        car.style.left = settings.x+'px';
         requestAnimationFrame(playGame);
    }
}

function startRunCar(event){ 
    event.preventDefault();
    keys[event.code]= true;  
    console.log(event)  
}

function stopRunCar(event){
    event.preventDefault();
    keys[event.code]= false;
    console.log(event)  
}

//
document.addEventListener('keydown', startRunCar);
document.addEventListener('keyup', stopRunCar)
