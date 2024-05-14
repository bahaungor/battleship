import './style.css'
import { Ship, Gameboard, Player } from './logic';

const setTheme = (function () {
    const root = document.documentElement;
    const Btn = root.querySelector(".tt");
    return function(){
        root.className === 'dark' ? root.removeAttribute('class') : root.className = 'dark';
        Btn.textContent == "☀️" ? Btn.textContent ="🌙" : Btn.textContent ="☀️"
    }
})();
document.querySelector('.tt').addEventListener('click', setTheme)

const header = document.querySelector('header');
const main = document.querySelector('main')
main.textContent = ""
const status = document.createElement('div')
status.classList.add('status')
status.textContent = 'Place your carier! (Size is 5)'
header.parentNode.insertBefore(status, main);

let playerShips = []
let computerShips = []

const carier = Ship(5)
const commander = Ship(4)
const assault = Ship(3)
const cruiser = Ship(2)
const frigate = Ship(1)
playerShips.push(carier, commander, assault, cruiser, frigate)
computerShips.push(carier, commander, assault, cruiser, frigate)

const playerBoardContainer = document.createElement('div')
playerBoardContainer.classList.add('boardContainer', 'player')
playerBoardContainer.textContent = "PLAYER"

// const fogOfWar = document.createElement('div')
// fogOfWar.classList.add('fogOfWar')
// fogOfWar.textContent = 'FOG OF WAR'

const computerBoardContainer = document.createElement('div')
computerBoardContainer.classList.add('boardContainer', 'computer')
computerBoardContainer.textContent = "COMPUTER"

const playerBoard = Gameboard();
playerBoard.placeShip(6,6,3,"horizontal")
// console.log(playerBoard.board)
const player = document.createElement('div')
player.classList.add('board')
playerBoard.board.forEach((item,i) => {
    item.forEach((cell,j) => {
        const div = document.createElement('div')
        div.setAttribute("x",i)
        div.setAttribute("y",j)
        // div.textContent = cell
        if (cell === 'ship') div.classList.add('ship')
        player.appendChild(div)
    })
})

const computerBoard = Gameboard();
computerBoard.placeShip(5,5,3,"vertical")
// console.log(computerBoard.board)
const computer = document.createElement('div')
computer.classList.add('board')
computerBoard.board.forEach((item,i) => {
    item.forEach((cell,j) => {
        const div = document.createElement('div')
        div.setAttribute("x",i)
        div.setAttribute("y",j)
        // div.textContent = cell
        div.addEventListener('click', playerMove)
        computer.appendChild(div)
    })
})

function playerMove(e){
    const result = computerBoard.receiveAttack(e.target.attributes.x.value, e.target.attributes.y.value)
    // e.target.textContent = result
    // console.log(playerBoard.board)
    if (result === 'hit' || result === 'missed') {
        if (result === 'hit') e.target.classList.add('hit')
        if (result === 'missed') e.target.classList.add('missed')
        if (computerBoard.allShipSunk() === true){
            console.log("Player wins")
            finishGame("Player")
        } else {
            computerMove()
        }
    }
}

function computerMove(){
    const x = Math.floor(Math.random() * (8 - 0 + 1)) + 0
    const y = Math.floor(Math.random() * (8 - 0 + 1)) + 0
    const result = playerBoard.receiveAttack(x, y)
    if (result === 'hit' || result === 'missed') {
        if (result === 'hit') document.querySelector(`div[x="${x}"][y="${y}"]`).classList.add('hit')
        if (result === 'missed') document.querySelector(`div[x="${x}"][y="${y}"]`).classList.add('missed')
        if (playerBoard.allShipSunk() === true) {
            console.log("Computer wins")
            finishGame("Computer")
        }
        return result
    } else {
        computerMove()
    }
}

function finishGame(winner){
    main.textContent = `${winner} wins!`
    status.textContent = ``
    main.style.fontSize = "3rem"
}

playerBoardContainer.appendChild(player)
computerBoardContainer.appendChild(computer)
main.appendChild(playerBoardContainer)
// main.appendChild(fogOfWar)
main.appendChild(computerBoardContainer)




