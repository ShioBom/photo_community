import React, { Component } from "react";
import IScroll from "iscroll/build/iscroll-probe.js";
import "./index.css";
import Swiper from "swiper/dist/js/swiper.js";
import "swiper/dist/css/swiper.min.css";
import { withRouter } from "react-router-dom";
import Toast from "antd-mobile/lib/toast";// 加载 CSS
import "antd-mobile/lib/toast/style/css"; 
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      works: [],
      FollowList: []
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
        url: "/admin/Follow",
        data: {
          uid: this.props.login.id,
          fid: obj.u_id
        }
      }).then(res => {
        if (res.data.status === 1) {
          let followData = {
            following: obj.u_id,
            u_portrait: obj.u_portrait,
            u_name: obj.u_name
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
    this.$axios({
      method: "post",
      url: "/admin/unFollow",
      data: {
        fid: obj.u_id,
        uid: this.props.login.id
      }
    }).then(res => {
      if (res.data.status === 1) {
        let ind = self.state.FollowList.findIndex(ele => {
          return ele.following === obj.u_id;
        });
        self.props.removeFollow(ind);
        console.log(this.props.FollowList);
        self.setState(state => {
          state.FollowList = self.props.FollowList;
          return state;
        });
      }
    });
  }
  //关注状态显示
  followStatus(obj) {
    let flag = false; //
    //如果登录了,关注列表已经初始化
    if (this.state.FollowList.length > 0) {
      for (let i = 0; i < this.state.FollowList.length; i++) {
        if (this.state.FollowList[i].following === obj.u_id) {
          flag = true; //已关注
          break;
        }
      }
      return flag;
    }
  }
  //初始化轮播图
  createSwiper() {
    new Swiper(".swiper-container", {
      autoplay: true, //可选选项，自动滑动
      loop: true, //循环
      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination"
      }
    });
  }
  //懒加载
  lazyload(myScroll, oContent) {
    //自定义滚动事件
    let oImg = document.querySelectorAll(".work_img");
    //前两张图片不需要懒加载;
   if(oImg.length>0){
     oImg[0].setAttribute("src", oImg[0].getAttribute("data_src"));
     oImg[1].setAttribute("src", oImg[1].getAttribute("data_src"));
     //后续图片懒加载
     myScroll.on("scroll", function () {
       for (let i = 2; i < oImg.length; i++) {
         if (
           Math.abs(oImg[i].offsetTop < Math.abs(this.y) + oContent.offsetHeight)
         ) {
           setTimeout(() => {
             oImg[i].setAttribute("src", oImg[i].getAttribute("data_src"));
           });
         }
       }
     });
   }
   
  }
  //进入详情页面
  goDetail(data) {
    let obj = { 'u_id': data.u_id, 'w_id': data.w_id};
    console.log(obj);
    this.props.history.push("/Detail/" +JSON.stringify(obj));
  }
  render() {
    return (
      <div className="index_body body">
        <dl>
          <dt className="swiper">
            <div className="swiper-container">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <img
                    src="http://192.168.137.1:3001/img/swiper/swiper01.jpg"
                    alt="轮播图1"
                  />
                </div>
                <div className="swiper-slide">
                  <img
                    src="http://192.168.137.1:3001/img/swiper/swiper02.jpg"
                    alt="轮播图2"
                  />
                </div>
                <div className="swiper-slide">
                  <img
                    src="http://192.168.137.1:3001/img/swiper/swiper03.jpg"
                    alt="轮播图3"
                  />
                </div>
                <div className="swiper-slide">
                  <img
                    src="http://192.168.137.1:3001/img/swiper/swiper04.jpg"
                    alt="轮播图4"
                  />
                </div>
              </div>
            </div>
          </dt>
          {this.state.works.map((obj, ind) => {
            return (
              <dd key={ind}>
                <div className="title">
                  <div className="portrait">
                    <img src={obj.u_portrait} alt="头像" />
                  </div>
                  <p>{obj.u_name}</p>
                  {!this.followStatus(obj) ? (
                    <span
                      onClick={() => {
                        this.follow(obj);
                      }}
                    >
                      {" "}
                      + 关注
                    </span>
                  ) : (
                    <span
                      className="followed"
                      onClick={() => {
                        this.unfollow(obj);
                      }}
                    >
                      已关注
                    </span>
                  )}
                </div>
                <img
                  className="work_img"
                  src="http://192.168.137.1:3001/img/icon/loading.jpg"
                  data_src={obj.w_img}
                  alt="图片迷路了!!!"
                  onClick={() => {
                    this.goDetail(obj);
                  }}
                />
              </dd>
            );
          })}
        </dl>
      </div>
    );
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

  //页面第一次挂载时触发
  componentDidMount() {
    console.log("index mounted", this.props);
    //轮播图
    this.setState(state => {
      state.FollowList = this.props.FollowList;
      return state;
    });
    this.createSwiper();
    //定义滚动条
    let myScroll,
      self = this;
    //所有需要懒加载的图片
    let oContent = document.querySelector(".index_body");
    //阻止默认事件
    let target = document.querySelector(".index_body");
    target.addEventListener("touchmove", function(e) {
      e.preventDefault();
    });
    this.$axios
      .get("/admin/getWorks")
      .then(res => {
        this.setState(state => {
          state.works = res.data.result;
          return state;
        });
      })
      .then(() => {
        //初始化滚动条
        myScroll = new IScroll(".index_body", {
          mouseWheel: true,
          probeType: 2 //隔几秒钟监听一次滚动事件,没有这个属性,iscroll事件不生效
        });
      })
      .then(() => {
        //图片懒加载
        self.lazyload(myScroll, oContent);
      });
  }
}
export default withRouter(Index);
