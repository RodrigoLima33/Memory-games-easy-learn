const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player')
const timer = document.querySelector('.timer')

let quantDisabledCards = 0


const characters = [
    'arara',
    'cachorro',
    'coruja',
    'elefante',
    'gato',
    'leao',
    'macaco',
    'tigre',
    'vaca',
    'zebra',
    
];
     
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if(quantDisabledCards == 20){
        clearInterval(this.loop);
        alert (`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML}`);
        quantDisabledCards = 0;
    } 

}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter == secondCharacter){

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');
        
        firstCard = '';
        secondCard = '';
        quantDisabledCards +=2;


        checkEndGame();

    } else {
        setTimeout(() => {

        firstCard.classList.remove('reveal-card');
        secondCard.classList.remove('reveal-card');

        firstCard = '';
        secondCard = '';

        }, 500);
    }
}


const revealCard = ({target}) => {

    if (target.parentNode.className.includes('reveal-cards')){
        return;
    }

    if (firstCard == ''){

        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;

    } else if (secondCard == '') {

        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode

        checkCards();
        
    }  

}

const createCard = (character) => {

    const card = createElement('div', 'card');
    const front =createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../imagens/${character}.png')`

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);
    return card
}

const loadGame = () => {

    const duplicateCharacter = [...characters, ...characters]

    const shuffledArray = duplicateCharacter.sort(() => Math.random() - 0.5);


    shuffledArray.forEach((character)=> {
        const card = createCard(character);
        grid.appendChild(card);
    })
} 

const startTimer = () => {

    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);

}

window.onload = () => {

spanPlayer.innerHTML =localStorage.getItem('player');
startTimer(); 
loadGame();
}




