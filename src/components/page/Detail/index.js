import React, { Component } from "react";
import Top from "../../common/top";
import IScroll from "iscroll/build/iscroll-probe.js";
import Card from "antd-mobile/lib/card"; // 加载 JS
import "antd-mobile/lib/card/style/css";
import WhiteSpace from "antd-mobile/lib/white-space"; // 加载 JS
import "antd-mobile/lib/white-space/style/css";

import "./index.scss";
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "作品详情",
      work: [{ w_content: "", w_title: "" }],
      comment:[]
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
      url: "http://192.168.56.1:3001/admin/getWorkDetail",
      data: obj
    }).then(res => {
      self.setState(state => {
        state.work = res.data.result;
        return state;
      });
      console.log(this.state.work);
    });
  }
  requestComment(data){
    this.$axios({
      method: "post",
      url: "http://192.168.56.1:3001/admin/getComments",
      data: data
    }).then((res)=>{
      this.setState(state => {
        state.comment = res.data.result;
        return state;
      });
      console.log("comment",this.state.comment);
    });
  }
  releaseComment(e){
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
      method:"post",
      url:"http://192.168.56.1:3001/admin/addComment",
      data:obj,
    })
    //评论成功，则清除输入框数据
    e.target.previousSibling.value = "";
  }
  componentDidMount() {    
    let data = JSON.parse(this.props.match.params.id);
    console.log("id",data);
    //请求作品数据
    this.requestWork(data);
    this.requestComment(data);
    //请求评论数据
    let target = document.querySelector(".scroll-part");
    target.addEventListener("touchmove", function (e) {
      e.preventDefault();
    });
   setTimeout(() => {
     let scroll = new IScroll(".scroll-part", {
       mouseWheel: true,
       probeType: 1 //隔几秒钟监听一次滚动事件,没有这个属性,iscroll事件不生效
     });
     console.log(scroll);

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
              <div className="pic-area">
                {this.state.work.map((item, ind) => (
                  <img key={ind} src={item.p_path} alt="作品图片" />
                ))}
              </div>
              <h3>{this.state.work[0].w_title}</h3>
              <p>{this.state.work[0].w_content}</p>
            </article>
            <ul>
             {this.state.comment.map((item,ind)=>
               (<li key={ind}>
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
               </li>)
             )}
            </ul>
          </section>
        </div>
        <div className="review-box">
          <input
            type="text"
            placeholder="写评论"
            
          />
          <span onClick={(e) => {
            this.releaseComment(e)
          }}>发送</span>
        </div>
      </div>
    );
  }
}
export default Detail;
