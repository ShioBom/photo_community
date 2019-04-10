import React, { Component } from 'react';
import Footer from '../../common/footer';
import Header from '../../common/header';
import {Route,Switch} from 'react-router-dom';
import Index from '../../../container/page/Main/Index/index.js';
import Works from './works';
import Articles from './Articles';
import "./index.css";


class Main extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        index_nav: [
          { path: "/", title: "首页" },
          { path: "/Main/Works", title: "作品" },
          { path: "/Main/Articles", title: "文章" }
        ],
      };
    };
    render() {
      return (
        <div className="main">
           <Header navs ={this.state.index_nav}></Header>
           <Switch>
                <Route exact path="/" component={Index}></Route>
                <Route exact path="/Main/works" component={Works}></Route>
                <Route exact path="/Main/Articles" component={Articles}></Route>
           </Switch>
           <Footer></Footer>
        </div>
      )
    };
    
}
export default Main;