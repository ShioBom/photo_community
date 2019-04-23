import React, { Component } from "react";
import "./index.scss";
import Footer from "../../common/footer";
class MyInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title:"作品详情",
      str: "登录/注册",
      portrait_src: "/img/portrait/default.jpg",
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
     this.setState((state)=>{
       state.arr[1].num=res.data.result;
       return state;
     })
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
            <img src="./img/photograph/work(1).jpg" alt="信息页图片" />
          </div>
          <div className="userInfo">
            <div className="log_img">
              <img src={this.state.portrait_src} alt="头像呢!" />
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
            <li>主题</li>
            <li>设置</li>
          </ul>
        </section>
        <Footer />
      </div>
    );
  }
}
export default MyInfo;
