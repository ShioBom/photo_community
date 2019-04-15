import React, { Component } from 'react';
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
        </header>
      )
    };
    
}
export default Header;