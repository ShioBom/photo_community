import React, { Component } from "react";
import {withRouter } from 'react-router-dom';
import "./index.css";
class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  //跳转到图片分享页面
  sharePic(){
    console.log("跳转到图片分享页面");
    this.props.history.push("/SharePic");
    this.exit();
  }
  shareArticle(){
    
  }
  exit() {
    this.$bus.emit("shareHidden");
    let share = document.querySelector(".share");
    share.classList.add("hidden");
  }
  render() {
    return (
      <div className="share hidden">
        <div
          onClick={() => {
            this.sharePic();
          }}
        >
          <dl>
            <dt>
              <i className="icon-image" />
            </dt>
            <dd>
              <span>作品</span>
              <span>图片陈列模式</span>
            </dd>
          </dl>
        </div>
        <div
          onClick={() => {
            this.shareArticle();
          }}
        >
          <dl>
            <dt>
              <i className="icon-file-text" />
            </dt>
            <dd>
              <span>博文</span>
              <span>音频图文混排</span>
            </dd>
          </dl>
        </div>
        <span
          className="exit_create"
          onClick={() => {
            this.exit();
          }}
        >
          <i className="icon-cross" />
        </span>
      </div>
    );
  }
}
export default withRouter(Create);
