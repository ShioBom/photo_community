import React, { Component } from "react";
import "./index.scss";
import Footer from "../../common/footer";
import Modal from 'antd-mobile/lib/modal';
import "antd-mobile/lib/modal/style/css";
const alert = Modal.alert;
class MyInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "作品详情",
      str: "登录/注册",
      portrait_src: "",
      isExit: false,
      arr: [
        { name: "关注", num: 0, page: 0, className: "follow-info" },
        { name: "粉丝", num: 0, page: 1, className: "fans-info" },
        { name: "作品", num: 0, page: 2, className: "work-info" }
      ]
    };
  }
  //登录
  login() {
    //如果未登录,点击则跳转到登录页面
    if (!this.state.isExit) {
      this.props.history.push("/Login");
    }
  }
  //退出登录
  logout() {
    //清除缓存
    sessionStorage.removeItem("userInfo");
    sessionStorage.removeItem("FollowList");
    //清空redux的state
    this.props.remove();
    //清除state
    this.setState(state => {
      state.str = "登录/注册";
      state.portrait_src = "/img/portrait/default.jpg";
      state.isExit = false;
      return state;
    });
  }
  onTouch(page) {
    this.props.history.push(`/Follow/${page}`);
  }
  postFollowerNum(id){
    this.$axios({
      method: "post",
      url: "/admin/getFollowerNum",
      data: {id}
    }).then(res => {
      this.setState((state) => {
        state.arr[0].num = res.data.result;
        return state;
      })
    });
  }
  postFansNum(id) {
    this.$axios({
      method: "post",
      url: "/admin/getFansNum",
      data: { id }
    }).then(res => {
      this.setState(state => {
        state.arr[1].num = res.data.result;
        return state;
      });
      console.log(this.state.arr);
    });
  }
  postWorkNum(id) {
    this.$axios({
      method: "post",
      url: "/admin/getWorkNum",
      data: { id }
    }).then(res => {
      this.setState((state) => {
        state.arr[2].num = res.data.result;
        return state;
      })
    });
  }
  takePhoto(){
    console.log("拍照")
  }
  //上传图片处理图片
  addImg(e){
    let self;
    const file = e.target.files[0];
    let param = new FormData(); //创建form对象
    param.append('file', file);
    this.$axios({
      method: "post",
      url: "/admin/uploadPortrait",
      data: param,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(res=>{
      let {status,path}=res.data;
      let u_id = JSON.parse(sessionStorage.getItem("userInfo")).id
      let param = { path, u_id}
      console.log(param);
      if(status===1){
        console.log(path);
        this.$axios({
          method:"post",
          url:"/admin/storePortrait",
          data: param
        })
        this.setState((state)=>{
          state.portrait_src = path;
          return state;
        });
        sessionStorage.setItem("userInfo",JSON.stringify({id:u_id,portrait:path}));
      }
    })
  }
  showAlert(){
    const alertInstance=alert('选择方式', <div>
      <input
        style={{
          display: 'display'
        }}
        ref={(ref) => { this.addportrait = ref }}
        type='file'
        accept='image/*'
        onChange={(e) => { this.addImg(e) }}
      />
    </div>, [
        { text: '拍照', onPress: () => { this.takePhoto() } },
        { text: '取消', onPress: () => { alertInstance.close()} },
      ])
  }
  componentDidMount() {
    let data = this.props.login;
    //判断login存在与否
    if (Object.keys(data).length !== 0) {
      this.setState(state => {
        state.str = data.uname;
        state.portrait_src = data.portrait;
        state.isExit = true;
        return state;
      });
    this.postFollowerNum(data.id);
    this.postFansNum(data.id);
     this.postWorkNum(data.id);
    }
  }
  render() {
    return (
      <div className="Info">
        <section>
          <div>
            <img
              src="http://192.168.137.1:3001/img/photograph/work(1).jpg"
              alt="信息页图片"
            />
          </div>
          <div className="userInfo">
            <div className="log_img">
              <img src={this.state.portrait_src} alt="头像呢!" 
                onClick={() =>{this.showAlert()}
                 }
              />
            </div>
            <span
              className="log_menu"
              onClick={() => {
                this.login();
              }}
            >
              {this.state.str}
            </span>
            {this.state.isExit && (
              <span
                className="exit"
                onClick={() => {
                  this.logout();
                }}
              >
                退出登录
              </span>
            )}
          </div>
          <ul className="main-info">
            {this.state.arr.map((item, ind) => (
              <li
                className={item.className}
                key={ind}
                onTouchEnd={() => {
                  this.onTouch(item.page);
                }}
              >
                <span>{item.num}</span>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
          <ul className="options">
            <li>修改主题</li>
            <li>我的资料</li>
          </ul>
        </section>
        
        <Footer />
      </div>
    );
  }
}
export default MyInfo;
