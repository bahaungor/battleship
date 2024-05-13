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

const main = document.querySelector('main')
main.textContent = ""

const playerBoard = Gameboard();
playerBoard.placeShip(5,5,3,"horizontal")
// console.log(playerBoard.board)
const player = document.createElement('div')
player.classList.add('board')
playerBoard.board.forEach((item,i) => {
    item.forEach((cell,j) => {
        const div = document.createElement('div')
        div.setAttribute("x",i)
        div.setAttribute("y",j)
        div.textContent = cell
        div.addEventListener('click', (e) => {
            playerBoard.receiveAttack(e.target.attributes.x.value, e.target.attributes.y.value)
            console.log(playerBoard.board)
            // console.log("text: ", e.target.textContent)
            // console.log("x: ", e.target.attributes.x.value)
            // console.log("y: ", e.target.attributes.y.value)
        })
        player.appendChild(div)
    })
})

const computerBoard = Gameboard();
computerBoard.placeShip(2,2,3,"vertical")
// console.log(computerBoard.board)
const computer = document.createElement('div')
computer.classList.add('board')
computerBoard.board.forEach((item,i) => {
    item.forEach((cell,j) => {
        const div = document.createElement('div')
        div.setAttribute("x",i)
        div.setAttribute("y",j)
        div.textContent = cell
        div.addEventListener('click', (e) => {
            computerBoard.receiveAttack(e.target.attributes.x.value, e.target.attributes.y.value)
            console.log(computerBoard.board)
            // console.log("x: ", e.target.attributes.x.value)
            // console.log("y: ", e.target.attributes.y.value)
        })

        computer.appendChild(div)
    })
})

main.appendChild(player)
main.appendChild(computer)
// main.textContent = "weee"