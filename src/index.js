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

const playerBoard = Gameboard();
const computerBoard = Gameboard();
playerBoard.placeShip(5,5,3,"horizontal")
computerBoard.placeShip(5,5,3,"vertical")

const main = document.querySelector('main')
main.textContent = ""
const player = document.createElement('div')
player.classList.add('board')
playerBoard.board.forEach(item => {
    const div = document.createElement('div')
    div.textContent = item
})
const computer = document.createElement('div')
computer.classList.add('board')

main.appendChild(player)
main.appendChild(player)
// main.textContent = "weee"