import React, { Component } from 'react';
import './index.css';
class Register extends Component{
    constructor(props) {
      super(props)
      this.state = {
         uname:"",
         unameMsg:"",//用户名提示信息
         upwd:"",
         upwdMsg:"",//密码提示信息
         upwd2Msg:"",
         email:"",
         emailMsg:"",//邮箱提示信息
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
            this.Toast.info("用户名已经存在")
          } else if (result.status === -1) {
            this.Toast.info("用户名或密码错误!");
          } else if (result.status === 1) {
            this.postEmail();
            self.props.history.push("/Login");
          }
        });
    }
    getName(e){
        let val = e.target.value;
      let reg = /^[a-zA-Z0-9]{4,16}$/;
      if(reg.test(val)){
        e.target.nextSibling.style.color = "#7bc67b";       
      }
      this.setState((state)=>{
          state.uname = val;
          reg.test(val) ? state.unameMsg = "用户名合法" : state.unameMsg="用户名由4-16位字母数字下划线组成";
           return state;
      })
    }
    getPwd(e){
         let val = e.target.value;
      let flag = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{6,18}$/.test(val);
         if(flag){
           e.target.nextSibling.style.color = "#7bc67b";       
         }
         this.setState((state) => {
             state.upwd = val;
           flag ? state.upwdMsg = "密码合法" : state.upwdMsg = "密码由6-18位字母数字特殊字符组成";
             return state;
         })
    }
    getPwd2(e){
         let val = e.target.value;
         if(val===this.state.upwd){
           e.target.nextSibling.style.color = "#7bc67b";       
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
        e.target.nextSibling.style.color = "#7bc67b";       
      }
      this.setState((state) => {
        reg.test(val) ? state.emailMsg = "邮箱合法" : state.emailMsg = "请输入正确的邮箱";
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
        this.Toast.info(res.data.msg);
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