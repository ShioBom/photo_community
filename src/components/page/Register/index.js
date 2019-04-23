import React, { Component } from 'react';
import './index.css';
class Register extends Component{
    constructor(props) {
      super(props)
      this.state = {
         uname:"",
         unameMsg:"",
         upwd:"",
         upwdMsg:"",
         upwd2Msg:""
      };
    };
    submit(){
        let obj={
            uname :this.state.uname,
            upwd: this.state.upwd,
        }
        let self =this;
        this.$axios({
          method: "post",
          url: "/admin/Register",
          data: obj
        }).then(res => {
          let result = res.data;
          if (result.status === 0) {
            self.setState(state => {
              state.unameMsg = "用户名已经存在";
              return state;
            });
          } else if (result.status === -1) {
            console.log("用户名或密码错误!");
          } else if (result.status === 1) {
            self.props.history.push("/Login");
          }
        });
    }
    getName(e){
        let val = e.target.value;
        this.setState((state)=>{
            state.uname = val;
            return state;
        })
        this.setState(state=>{
            state.unameMsg="";
            return state;
        })
    }
    getPwd(e){
         let val = e.target.value;
         this.setState((state) => {
             state.upwd = val;
             return state;
         })
    }
    getPwd2(e){
         let val = e.target.value;
         if(val===this.state.upwd){
            this.setState((state)=>{
                state.upwd2Msg="";
                return state;
            })
         }else{
             this.setState((state) => {
                 state.upwd2Msg = "两次输入的密码不匹配";
                 return state;
             })
         }
    }
    render() {
      return (
        <div className="login">
            <div className="main">
                <div>
                <input type="text" name="uname" onChange={(e)=>{this.getName(e)}} placeholder="Email/手机号" />
               <span>{this.state.unameMsg}</span>
                </div>
                <div>
                <input type="password" name="upwd" onChange={(e)=>{this.getPwd(e)}} placeholder="密码"/>
                <span>{this.state.upwdMsg}</span>
                </div>
                <div>
                <input type="password" name="upwd2" onChange={(e)=>{this.getPwd2(e)}} placeholder="确认密码"/>
                <span>{this.state.upwd2Msg}</span>
                </div>
            <button onClick={()=>{this.submit()}}>注册</button>
            </div>
        </div>
      )
    };
}
export default Register;