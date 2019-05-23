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
      portrait_src: JSON.parse(sessionStorage.getItem("userInfo")) === null ? "http://192.168.137.1:3001/img/portrait/default.jpg" : JSON.parse(sessionStorage.getItem("userInfo")).portrait,
      isExit: false,
      loginStatus: sessionStorage.getItem("userInfo")!==null?true:false,
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
      state.portrait_src = "http://192.168.137.1:3001/img/portrait/default.jpg";
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
    //跳转到拍照页面
    this.props.history.push("/TakePhote");
  }
  //上传图片处理图片
  addImg(e){
    // e.preventDefault=true;
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
      }).then(res => {
        let { status, path } = res.data;
        let u_id = JSON.parse(sessionStorage.getItem("userInfo")).id
        let param = { path, u_id }
        if (status === 1) {
          this.$axios({
            method: "post",
            url: "/admin/storePortrait",
            data: param
          })
          this.setState((state) => {
            state.portrait_src = path;
            return state;
          });
          sessionStorage.setItem("userInfo", JSON.stringify({ id: u_id, portrait: path }));
        }
      })
  }
  //弹出头像选择框
  showAlert(){
    if(this.state.loginStatus){
      const alertInstance = alert('', <div className="inp-file">
        <div>从手机选择</div>
        <input
          style={{
            display: 'display'
          }}
          type='file'
          accept='image/*'
          onChange={(e) => { this.addImg(e) }}
        />
      </div>, [
          { text: '拍照', onPress: () => { this.takePhoto() } },
          { text: '退出', onClick: () => { alertInstance.close() } },
        ])
    }else{
      this.Toast.info("你还没有登录哦！");
    }

  }
  editInfo(){
    if(this.state.loginStatus){
      this.props.history.push("/EditInfo/true");
    }else{
      this.Toast.info("请登录！");
    }
  }
  updateColor(){
    this.props.history.push("/EditInfo/false");
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
            <li onClick={() => {this.updateColor()}}>修改主题</li>
            <li onClick={()=>{this.editInfo()}}>我的资料</li>
          </ul>
        </section>
        
        <Footer />
      </div>
    );
  }
}
export default MyInfo;
