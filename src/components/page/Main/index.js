import React, { Component } from 'react';
import Footer from '../../common/footer';
import Header from '../../common/header';
import {Route,Switch} from 'react-router-dom';
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
           <Switch>
                <Route exact path="/" component={Index}></Route>
           </Switch>
           <Footer></Footer>
        </div>
      )
    };
    
}
export default Main;