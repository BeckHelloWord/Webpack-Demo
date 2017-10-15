import _ from 'lodash';
import './style.css';
import icon from './three_fat.jpeg';
import printMe from './print.js';

function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');

    // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
    element.innerHTML = _.join(['Hello', 'yuwei'], ' ');
    element.classList.add('hello');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;
    element.appendChild(btn);

    var img = new Image();
    img.src = icon;
    element.appendChild(img)

    var logo = document.createElement('div');
    logo.classList.add('logo-img');
    element.appendChild(logo);

    return element;
}

document.body.appendChild(component());