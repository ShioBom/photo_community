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
         upwd2Msg:"",
         email:"",
         emailMsg:"",
      };
    };
    submit(){
        let obj={
            uname :this.state.uname,
            upwd: this.state.upwd,
            email:this.state.email
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
            this.postEmail();
            self.props.history.push("/Login");
          }
        });
    }
    getName(e){
        let val = e.target.value;
        this.setState((state)=>{
            state.uname = val;
            state.unameMsg = "用户名为字母数字组成";
            return state;
        })
    }
    getPwd(e){
         let val = e.target.value;
         this.setState((state) => {
             state.upwd = val;
             state.upwdMsg="密码为"
             return state;
         })
    }
    getPwd2(e){
         let val = e.target.value;
         if(val===this.state.upwd){
           e.target.nextSibling.style.color = "green";       
            this.setState((state)=>{
                state.upwd2Msg="密码正确";
                return state;
            })
         }else{
             this.setState((state) => {
                 state.upwd2Msg = "两次输入的密码不匹配";
                 return state;
             })
         }
    }
    getEmail(e){
     console.log()
      let val = e.target.value;
      let reg = /^[1]\d{10}$/.test(val) || /^\w+@\w+\.\w+$/;
      if (reg.test(val)){
        e.target.nextSibling.style.color = "green";       
      }
      this.setState((state) => {
        reg.test(val) ? state.emailMsg = "邮箱合法" : state.emailMsg = "邮箱格式错误";
        state.email = val;
        return state;
      })
    }
    postEmail(){
      this.$axios({
        method:"post",
        url:"/admin/send",
        data:{email:this.state.email}
      }).then(res=>{
        console.log(res.data.msg);
      })
    }
    render() {
      return (
        <div className="login">
            <div className="main">
                <div>
                <input type="text" name="uname" onChange={(e)=>{this.getName(e)}} placeholder="用户名" />
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
            <div>
              <input type="email" name="upwd2" onChange={(e) => { this.getEmail(e) }} placeholder="Email" />
              <span>{this.state.emailMsg}</span>
            </div>
            <button onClick={()=>{this.submit()}}>注册</button>
            </div>
        </div>
      )
    };
}
export default Register;