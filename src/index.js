import './style.css'
import { Ship, Gameboard } from './logic';

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

let playerShips = []
let computerShips = []

const carier = Ship(5)
const commander = Ship(4)
const assault = Ship(3)
const cruiser = Ship(2)
const frigate = Ship(1)
playerShips.push(carier, commander, assault, cruiser, frigate)
computerShips.push(carier, commander, assault, cruiser, frigate)

let shipAlignment = "vertical"

const status = document.createElement('div')
status.classList.add('status')
status.textContent = `Place your ship! Size is ${playerShips[0].length}, alignment is ${shipAlignment}. Press -c- to change alignment.`
header.parentNode.insertBefore(status, main);

document.addEventListener("keyup", changeAlignment)
function changeAlignment(e){
    if (e.key != 'c') return
    shipAlignment === "vertical" ? shipAlignment = "horizontal" : shipAlignment = "vertical";
    status.textContent = `Place your ship! Size is ${playerShips[0].length}, alignment is ${shipAlignment}. Press -c- to change alignment.`
}


const playerBoardContainer = document.createElement('div')
playerBoardContainer.classList.add('boardContainer', 'player')
playerBoardContainer.textContent = "PLAYER"

const computerBoardContainer = document.createElement('div')
computerBoardContainer.classList.add('boardContainer', 'computer')
computerBoardContainer.textContent = "COMPUTER"

const playerBoard = Gameboard();
// playerBoard.placeShip(6,6,3,"horizontal")
const player = document.createElement('div')
player.classList.add('board')
function renderPlayerBoard(){
    player.innerHTML = ""
    playerBoard.board.forEach((item,i) => {
        item.forEach((cell,j) => {
            const div = document.createElement('div')
            div.setAttribute("x",i)
            div.setAttribute("y",j)
            if (cell === 'ship') div.classList.add('ship')
            player.appendChild(div)
            div.addEventListener('click', shipPlace)
        })
    })
}

const computerBoard = Gameboard();

const computer = document.createElement('div')
computer.classList.add('board')
computerBoard.board.forEach((item,i) => {
    item.forEach((cell,j) => {
        const div = document.createElement('div')
        div.setAttribute("x",i)
        div.setAttribute("y",j)
        // div.classList.add('computerDiv')
        // div.addEventListener('click', playerMove)
        computer.appendChild(div)
    })
})

function placeShipsRandomly(ships, board){
    ships.forEach((ship,i) => placeShip(ship,i))

    function placeShip(ship,i){
        let placed = false;
        while (!placed) {
            const x = Math.floor(Math.random() * (8 - 0 + 1)) + 0
            const y = Math.floor(Math.random() * (8 - 0 + 1)) + 0
            const alignment = Math.random() < 0.5 ? "vertical" : "horizontal"
            // console.log("x: ", x)
            // console.log("y: ", y)
            // console.log("ship length: ", ship.length)
            placed = board.placeShip(x, y, ship.length, alignment)
        }
    }
}

function shipPlace(e){
    if (playerShips.length === 0) return
    let placed = playerBoard.placeShip(e.target.attributes.x.value, e.target.attributes.y.value, playerShips[0].length, shipAlignment)

    if (placed) {
        playerShips.shift()
        renderPlayerBoard()
        if (playerShips.length != 0) status.textContent = `Place your ship! Size is ${playerShips[0].length}, alignment is ${shipAlignment}. Press -c- to change alignment.`
    }

    if (playerShips.length === 0) {
        computer.innerHTML = ""
        status.textContent = "Sink all enemy ships before he does!"
        computerBoard.board.forEach((item,i) => {
            item.forEach((cell,j) => {
                const div = document.createElement('div')
                div.setAttribute("x",i)
                div.setAttribute("y",j)
                div.classList.add('computerDiv')
                div.addEventListener('click', playerMove)
                computer.appendChild(div)
            })
        })
    }

}

placeShipsRandomly(computerShips, computerBoard)
// placeShipsRandomly(playerShips, playerBoard)
renderPlayerBoard()

function playerMove(e){
    const result = computerBoard.receiveAttack(e.target.attributes.x.value, e.target.attributes.y.value)
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
// const fogOfWar = document.createElement('div')
// fogOfWar.classList.add('fogOfWar')
// fogOfWar.textContent = 'FOG OF WAR'
// main.appendChild(fogOfWar)
main.appendChild(computerBoardContainer)




