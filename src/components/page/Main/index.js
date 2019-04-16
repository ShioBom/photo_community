import React, { Component } from 'react';
import Footer from '../../common/footer';
import Header from '../../common/header';
import Index from '../../../container/page/Main/Index/index.js';
import "./index.css";


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
        <div className="main">
           <Header navs ={this.state.index_nav}></Header>
          <Index></Index>
           <Footer></Footer>
        </div>
      )
    };
    
}
export default Main;