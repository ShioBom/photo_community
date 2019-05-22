import React, { Component } from 'react';
import Main from './components/page/Main';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import './App.css';
import MyInfo from './container/page/MyInfo';
import Login from './container/page/Login';
import Register from './components/page/Register';
import Create from './components/page/create';
import Detail from "./components/page/Detail";
import Follow from './container/page/Follow';
import SharePic from "./components/page/SharePic";
import Search from './components/page/Search';
import TakePhote from './components/page/TakePhote';
import EditInfo from './components/page/EditInfo';
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
            <Route exact path="/MyInfo" component={MyInfo} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/Register" component={Register} />
            <Route exact path="/Follow/:page" component={Follow} />
            <Route exact path="/SharePic" component={SharePic} />
            <Route exact path="/Detail/:id" component={Detail} />
            <Route exact path="/Search" component={Search} />
            <Route exact path="/TakePhote" component={TakePhote} />
            <Route exact path="/EditInfo/:flag" component={EditInfo} />
            <Route path="/" component={Main} />
          </Switch>
          <CSSTransition
            in={this.state.isShow}
            timeout={2000}
            classNames={{
              enter: "animated",
              enterActive: "slideInUp",
              enterDone: "animated slideInUp"
            }}
          >
            <Create />
          </CSSTransition>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
