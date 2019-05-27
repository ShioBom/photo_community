import React, { Component } from "react";
import "./index.css";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    //这里的state存放的暂时的数据,例如窗口的打开关闭状态,表单的输入等
    this.state = {
      uname: "",
      upwd: ""
    };
  }
  login() {
    let obj = {
      uname: this.state.uname,
      upwd: this.state.upwd
    };
    let self = this;
    this.$axios({
      method: "post",
      url: "/admin/Login",
      data: obj
    }).then(res => {
      if (res.data.status === 1) {
        //将登录信息保存到state中
        self.props.add({
          id: res.data.id,
          uname: obj.uname,
          portrait: res.data.portrait
        });
        //登录了,获取关注列表,这个判断的目的是为了减少http请求数
        self
          .$axios({
            method: "post",
            url: "/admin/getFollowList",
            params: { u_id: res.data.id }
          })
          .then(res => {
            //然后跳转到首页
            this.props.history.push("/");
            if (res.data.status === 1) {
              self.props.addFollowList(res.data.result);
            }
          });
      } else {
        this.Toast.info(res.data.msg, 1);
      }
    });
  }
  setName(e) {
    let val = e.target.value;
    this.setState(state => {
      state.uname = val;
      return state;
    });
  }
  setPass(e) {
    let val = e.target.value;
    this.setState(state => {
      state.upwd = val;
      return state;
    });
  }
  render() {
    return (
      <div className="login">
        <div className="main">
          <form>
            <div>
              <input
                type="text"
                name="uname"
                onChange={e => {
                  this.setName(e);
                }}
                placeholder="Email/手机号"
              />
            </div>
            <div>
              <input
                type="password"
                name="upwd"
                onChange={e => {
                  this.setPass(e);
                }}
                placeholder="密码"
              />
            </div>
          </form>
          <button
            onClick={() => {
              this.login();
            }}
          >
            登录
          </button>
          <Link to={{ pathname: "/Register" }}>没有账号?注册</Link>
        </div>
      </div>
    );
  }
}
export default Login;
