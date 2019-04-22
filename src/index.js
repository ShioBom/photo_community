import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import './assets/css/animate.css';
import './modules/bus.js';
import './modules/axios'
import './assets//js/rem.js';
import './assets/css/style.css'
import './assets/css/base.css';
import store from './store';
import {Provider} from 'react-redux';

import App from './App';
// import * as serviceWorker from './serviceWorker';

//Provider提供了一个空间,存储redux中的所有数据,然后使用react-redux中的connect方法,
//能够直接连接这个空间,操作里面的数据
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
