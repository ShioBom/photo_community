import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import "./index.scss";
class Header extends Component{
    constructor(props) {
      super(props)
      this.state = {
         
      };
    };
    Search(){
      console.log("toSearch")
      this.props.history.push("/Search");
    }
    render() {
      return (
        <header>
            <div className="search_wrap" id="search">
              <div className="search">
                <i className=""></i>
                <form>
                <input type="text" placeholder="搜索" onFocus={() => { this.Search()}}></input>
                </form>
              </div>
            </div>
        </header>
      )
    };
    
}
export default withRouter(Header);