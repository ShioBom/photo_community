import React, { Component } from 'react';
import './index.css';
import Footer from '../../common/footer';
class MyInfo extends Component{
    constructor(props) {
      super(props)
    
      this.state = {
         str: "登录/注册",
         portrait_src:"/img/portrait/default.jpg",
         isExit:false
      };
    };
    //登录
    login(){
      //如果未登录,点击则跳转到登录页面
      if(!this.state.isExit){
        this.props.history.push("/Login");
      }
    };
    //退出登录
    logout(){
      //清除缓存
      sessionStorage.removeItem("userInfo");
      localStorage.removeItem("FollowList");

      //清空redux的state
      this.props.remove();

      //清除state
      this.setState(state=>{
        state.str = "登录/注册";
        state.portrait_src = "/img/portrait/default.jpg";
        state.isExit=false;
        return state;
      })
    }
    componentDidMount(){
      let data = this.props.login;
      //判断login存在与否
      if (Object.keys(data).length !==0){
        this.setState(state=>{
          state.str=data.uname;
          state.portrait_src = data.portrait;
          state.isExit=true;
          return state;
        })
      }
    };
    render() {
      return (
          <div className="Info">
            <div className="userInfo">
              <div className="log_img">
                  <img src={this.state.portrait_src} alt="头像呢!"></img>
              </div>
              <span className="log_menu" onClick={()=>{this.login()}}>{this.state.str}</span>
              {this.state.isExit && <span className="exit" onClick={()=>{this.logout()}}>退出登录</span>}
              </div>
          <Footer></Footer>
          </div>
      )
    };
    
}
export default MyInfo;