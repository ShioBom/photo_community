import React, { Component } from "react";
import "./index.css";
import {Toast} from 'antd-mobile';
class MyFollow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: JSON.parse(JSON.stringify(this.props.Props.FollowList))
    };
  }
   //点击关注
  follow(obj) {
    console.log(obj);
    let self = this;
    if (JSON.stringify(this.props.login) === "{}") {
      //轻提示
      Toast.info("你还没有登录!", 1);
    } else {
      //点击关注,粉丝表里添加该粉丝id
      this.$axios({
        method: "post",
        url: "http://192.168.56.1:3001/admin/Follow",
        data: {
          uid: this.props.login.id,
          fid: obj.u_id
        }
      }).then(res => {
        if (res.data.status === 1) {
          let followData = {
            following: obj.u_id,
            u_portrait: obj.u_portrait
          };
          console.log(followData);
          //添加redux中state的数据
          self.props.addFollow(followData);
          self.setState(state => {
            state.FollowList = self.props.FollowList;
            return state;
          });
        }
      });
    }
  }
  //取消关注,完成
  unfollow(obj) {
    let self = this;
    self.props = this.props.Props;
    console.log(obj);
    console.log(this.props);
    console.log(this.state.data);
    this.$axios({
      method: "post",
      url: "http://localhost:3001/admin/unFollow",
      data: {
        fid: obj.following,
        uid: this.props.login.id
      }
    }).then(res => {
      if (res.data.status === 1) {
        let ind = self.state.data.findIndex(ele => {
          return ele.following === obj.following;
        });
        console.log(self.props);
        self.props.removeFollow(ind);
        self.setState(state => {
          state.data = self.props.FollowList;
          return state;
        });
      }
    });
  }
  //关注状态显示
  followStatus(obj) {
    let flag = false; //
    //如果登录了,关注列表已经初始化
    if (this.state.data.length > 0) {
      for (let i = 0; i < this.state.data.length; i++) {
        if (this.state.data[i].following === obj.u_id) {
          flag = true; //已关注
          break;
        }
      }
      return flag;
    }
  }
  //解决更新redux的state之后,页面不刷新的问题,props改变时触发
  componentWillReceiveProps(nextProps) {
    // console.log("oldProps", this.props);
    // console.log("newProps", nextProps);
    //判断有没有更新数据
    if (this.props !== nextProps) {
      this.props = nextProps;
    }
  }

  componentDidMount(){
      console.log(this.props.Props);
  }
  render() {
    return (
      <div className="myFollow">
        <ul>
          {this.state.data.map((obj,ind)=>{
            return( <li className="title" key={ind}>
                  <div className="portrait">
                        <img src={obj.u_portrait} alt="头像" />
                  </div>
                  <p>{obj.u_name}</p>
              {this.followStatus(obj) ? (
                    <span
                      onTouchEnd={() => {
                    this.follow(obj);
                      }}
                    >
                      {" "}
                      + 关注
                    </span>
                  ) : (
                    <span
                      className="followed"
                      onTouchEnd={() => {
                        this.unfollow(obj);
                      }}
                    >
                      已关注
                    </span>
                  )}
                </li>)
          })}
        </ul>
      </div>
    );
  }
}

export default MyFollow;