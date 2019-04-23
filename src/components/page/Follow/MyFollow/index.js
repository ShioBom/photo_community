import React, { Component } from "react";
import "./index.css";
import { Toast } from "antd-mobile";
const followList = [];
class MyFollow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: followList
    };
  }
  //点击关注
  follow(obj) {
    console.log("follow",obj);
    let self = this;
    if (JSON.stringify(this.props.login) === "{}") {
      //轻提示
      Toast.info("你还没有登录!", 1);
    } else {
      //点击关注,粉丝表里添加该粉丝id
      this.$axios({
        method: "post",
        url: "/admin/Follow",
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
    let this_props = this.props.Props;
    this.$axios({
      method: "post",
      url: "/admin/unFollow",
      data: {
        fid: obj.following,
        uid: this_props.login.id
      }
    }).then(res => {
      if (res.data.status === 1) {
        let ind = self.state.data.findIndex(ele => {
          return ele.following === obj.following;
        });
        console.log(ind);
        this_props.removeFollow(ind);
        self.setState(state => {
          state.data = JSON.parse(JSON.stringify(self.props.Props.FollowList));
          return state;
        });
      }
    });
  }
  //关注状态显示
  followStatus(obj) {
    let flag = false; 
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
  componentDidMount() {
    this.setState(state => {
      state.data = JSON.parse(JSON.stringify(this.props.Props.FollowList));
      return state;
    });

    console.log(this.props.Props);
  }
  render() {
    return (
      <div className="myFollow">
        <ul>
          {this.state.data.map((obj, ind) => {
            return (
              <li className="title" key={ind}>
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
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default MyFollow;
