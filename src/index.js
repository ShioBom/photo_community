import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/theme_default.scss';
import './index.css';
import './assets/css/animate.css';
import './modules/bus.js';
import './modules/axios'
import './modules/antd'
import './assets//js/rem.js';
import './assets/css/style.css'
import './assets/css/base.css';
import store from './store';
import {Provider} from 'react-redux';

import App from './App';
// import * as serviceWorker from './serviceWorker';
let theme = sessionStorage.getItem("theme");
console.log(theme);
switch (theme) {
    case '0':
        require("./assets/css/theme_default.scss");
        break;
    case '1':
        require("./assets/css/theme_first.scss");
        break;
    case '2':
        require("./assets/css/theme_second.scss");
        break;
    case '3':
        require("./assets/css/theme.third.scss");
        break;
    case '4':
        require("./assets/css/theme_fourth.scss");
        break;
    default:
        break;
}
//Provider提供了一个空间,存储redux中的所有数据,然后使用react-redux中的connect方法,
//能够直接连接这个空间,操作里面的数据
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
