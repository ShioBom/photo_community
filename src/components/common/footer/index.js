import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import "./index.scss";

class Footer extends Component{
    constructor(props) {
      super(props)
    
      this.state = {
         show:true,
         hidden:false
      };
    };
    show(){
      this.$bus.emit("shareShow");
      let share = document.querySelector('.share');
      console.log(share);
      share.classList.remove("hidden");
      share.classList.add("show");
    }
    render() {
      return (
        <footer>
          <ul>
            <li>
              <NavLink exact to={{pathname:"/"}} activeClassName="selected">
                <i className="icon-uniE021"></i><span>发现</span>
              </NavLink>
            </li>
            {/* <li>
              <NavLink exact to="/Follow/0" activeClassName="selected">
                <i className="icon-uniE007"></i><span>关注</span>
              </NavLink>
            </li> */}
            <li onClick = {()=>{this.show()}}>
              < NavLink exact to = "" >
                <i className="icon-plus"></i>
              </NavLink>
            </li>
            {
             sessionStorage.getItem("userInfo")?
            <li>
              < NavLink exact to = "/Statistic" activeClassName="selected">
                <i className="icon-uniE123"></i><span>统计</span>
              </NavLink>
            </li>:null
            }
            <li>
              <NavLink exact to="/MyInfo" activeClassName="selected">
                <i className="icon-uniE008"></i><span>我的</span>
              </NavLink>
            </li>
          </ul>
        </footer>
      )
    };
}
export default Footer;
