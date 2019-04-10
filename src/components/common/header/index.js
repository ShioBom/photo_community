import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import "./index.css";
class Header extends Component{
    constructor(props) {
      super(props)
      this.state = {
         
      };
    };
    render() {
      return (
        <header>
            <div className="search_wrap" id="search">
              <div className="search">
                <i className=""></i>
                <form>
                  <input type="text" placeholder="搜索"></input>
                </form>
              </div>
            </div>
          <ul className="head_nav">
            {this.props.navs.map((obj, ind)=> 
            <li key={ind}><NavLink exact to={obj.path} activeClassName="selected">{obj.title}</NavLink></li>)
            }
          </ul>
        </header>
      )
    };
    
}
export default Header;