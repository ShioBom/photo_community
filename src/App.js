import React, { Component } from 'react';
import Main from './components/page/Main';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import './App.css';
import MyInfo from './container/page/MyInfo';
import Login from './container/page/Login';
import Register from './components/page/Register';
import Create from './components/page/create';
import Follow from './container/page/Follow';
import SharePic from "./components/page/SharePic";
import {CSSTransition} from 'react-transition-group';

class App extends Component {
  constructor(props) {       
    super(props)
  
    this.state = {
       isShow:false
    };
    //这里是利用事件总线显示分享窗口
    this.$bus.on("shareShow", () => {
      this.setState(state=>{
        state.isShow = true;
        return state;
      })
    });
    //这里是利用事件总线隐藏分享窗口
    this.$bus.on("shareHidden", () => {
      this.setState(state => {
        state.isShow = false;
        return state;
      })
    })
  };
  render() {
    return (
      <BrowserRouter>
      <div className="App">
     
        <Switch>
          <Route exact path="/MyInfo" component={MyInfo}></Route>
          <Route exact path="/Login" component={Login}></Route>
          <Route exact path="/Register" component={Register}></Route>
          <Route exact path ="/Follow" component = {Follow}></Route>
          <Route exact path="/SharePic" component={SharePic}></Route>
           
          <Route path="/" component={Main}></Route>
        </Switch>
          <CSSTransition in={this.state.isShow} timeout={2000} classNames={
            {
              enter: "animated",
              enterActive: "slideInUp",
              enterDone: "animated slideInUp",
            }
          }>
            <Create></Create>
          </CSSTransition>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
