import React, { Component } from "react";
import Top from "../../common/top";
import IScroll from "iscroll/build/iscroll-probe.js";
import Card from "antd-mobile/lib/card"; // 加载 JS
import "antd-mobile/lib/card/style/css";
import WhiteSpace from "antd-mobile/lib/white-space"; // 加载 JS
import "antd-mobile/lib/white-space/style/css";
import ImageLayout from "../../../assets/js/imageLayout.js";

import "./index.scss";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "作品详情",
      work: [
        {
          u_portrait: "",
          u_name: "",
          w_title: "",
          w_content: ""
        }
      ],
      comment: []
    };
  }
  requestWork(data) {
    let obj = {
      u_id: data.u_id,
      w_id: data.w_id
    };
    let self = this;
    this.$axios({
      method: "post",
      url: "/admin/getWorkDetail",
      data: obj
    }).then(res => {
      let works = JSON.parse(res.data.result);
      let images =[]
      works.forEach(item=>{
        let photo = {src:item.src,width:item.width,height:item.height};
        images.push(photo);
      })
      this.setState(state => {
        state.work = Object.assign([],works);
        return state;
      });
      const $box = document.getElementById("waterfall");
      let layout = new ImageLayout(images, $box.clientWidth,2,1.55);
      layout.completedImages.forEach(item => {
        let $imageBox = document.createElement("div");
        $imageBox.setAttribute("class", "img-box");
        $imageBox.style.width = item.width + "px";
        $imageBox.style.height = item.height + "px";
        let $img = document.createElement("img");
        $img.setAttribute("src", item.src);
        $imageBox.appendChild($img);
        $box.appendChild($imageBox);
      });
    });
  }
  requestComment(data) {
    this.$axios({
      method: "post",
      url: "/admin/getComments",
      data: data
    }).then(res => {
      this.setState(state => {
        state.comment = res.data.result;
        return state;
      });
    });
  }
  releaseComment(e) {
    let comment = e.target.previousSibling.value;
    let time = parseInt(Date.now() / 60);
    let loginInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    let data = JSON.parse(this.props.match.params.id);
    let obj = {
      c_comment: comment,
      u_id: loginInfo.id,
      w_id: data.w_id,
      c_time: time
    };
    this.$axios({
      method: "post",
      url: "/admin/addComment",
      data: obj
    });
    //评论成功，则清除输入框数据
    e.target.previousSibling.value = "";
  }
  componentDidMount() {
    let data = JSON.parse(this.props.match.params.id);
    //请求作品数据
    this.requestWork(data);
    this.requestComment(data);

    //请求评论数据
    let target = document.querySelector(".scroll-part");
    target.addEventListener("touchmove", function(e) {
      e.preventDefault();
    });
    setTimeout(() => {
      new IScroll(".scroll-part", {
        mouseWheel: true,
        probeType: 1 //隔几秒钟监听一次滚动事件,没有这个属性,iscroll事件不生效
      });
    }, 100);
  }
  render() {
    return (
      <div className="detail">
        <Top title={this.state.title} />
        <div className="scroll-part">
          <section>
            <div className="user-area">
              <span className="portrait">
                <img src={this.state.work[0].u_portrait} alt="头像" />
              </span>
              <span>{this.state.work[0].u_name}</span>
            </div>
            <article>
              <div className="pic-area" id="waterfall" />
              <h3>{this.state.work[0].w_title}</h3>
              <p>{this.state.work[0].w_content}</p>
            </article>
            <ul>
              {this.state.comment.map((item, ind) => (
                <li key={ind}>
                  <WhiteSpace size="lg" />
                  <Card full>
                    <Card.Header
                      title={item.u_name}
                      thumb={item.u_portrait}
                      extra={<span>{item.u_time}</span>}
                    />
                    <Card.Body>
                      <div>{item.c_comment}</div>
                    </Card.Body>
                  </Card>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="review-box">
          <input type="text" placeholder="写评论" />
          <span
            onClick={e => {
              this.releaseComment(e);
            }}
          >
            发送
          </span>
        </div>
      </div>
    );
  }
}
export default Detail;
