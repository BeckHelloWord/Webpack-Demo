import _ from 'lodash';
import './style.css';
import icon from './assets/three_fat.jpeg';
import printMe from './print.js';
import { cube } from './math.js';

if (process.env.NODE_ENV == 'production') {
    console.log('通过生产环境打包');
} else {
    console.log('通过开发环境打包');
}

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

    if (process.env.NODE_ENV == 'production') {
        var pre = document.createElement('pre');
        pre.innerHTML = [
            'Hello webpack!',
            '5 cubed is equal to ' + cube(5)
        ].join('\n\n');
        element.appendChild(pre);
    }


    return element;
}

document.body.appendChild(component());

if (module.hot) {
    module.hot.accept('./print.js', function () {
        console.log('Accepting the updated printMe module!');
        printMe();
    })
}