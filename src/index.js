import './style.css'
import { deneme } from './module'

const setTheme = (function () {
    const root = document.documentElement;
    const Btn = root.querySelector(".tt");
    return function(){
        root.className === 'dark' ? root.removeAttribute('class') : root.className = 'dark';
        Btn.textContent == "☀️" ? Btn.textContent ="🌙" : Btn.textContent ="☀️"
    }
})();

document.querySelector('.tt').addEventListener('click', setTheme)

deneme()