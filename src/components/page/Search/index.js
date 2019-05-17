import React, { Component } from 'react';
import Footer from '../../common/footer';
import Header from '../../common/header';
// import Index from '../../../container/page/Main/Index/index.js';
import Tabs from "antd-mobile/lib/tabs"; // 加载 JS
import "antd-mobile/lib/tabs/style/css";
import Badge from "antd-mobile/lib/badge"; // 加载 JS
import "antd-mobile/lib/badge/style/css"; 
import "./index.scss";


class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            index_nav: [
                { path: "/", title: "首页" },
            ],
        };
    };
    render() {
        return (
            <div className="item_page">
            <Header></Header>
                <div className="tabs_content">
                    111
                </div>
            </div>
        )
    };

}
export default Main;