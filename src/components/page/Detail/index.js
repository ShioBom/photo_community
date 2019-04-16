import React, { Component } from "react";
import Top from "../../common/top";
import "./index.scss";
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "作品详情",
      work:[{w_content:"",w_title:""}]
    };
  }
  postRequest(data) { 
    let obj = {
      u_id: data.u_id,
      w_id: data.w_id
    };
    let self=this;
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
  componentDidMount() {
      //请求作品数据的参数
      let data = JSON.parse(this.props.match.params.id);
      console.log(data);
      //请求数据
      this.postRequest(data);
  }
  render() {
    return (
      <div className="detail">
        <Top title={this.state.title} />
        <section>
          <div className="user-area">
            <span className="portrait">
              <img src={this.state.work[0].u_portrait} alt="头像" />
            </span>
            <span>{this.state.work[0].u_name}</span>
          </div>
          <article>
            <div className="pic-area">
                {this.state.work.map((item,ind)=>(
                        <img  key={ind} src={item.p_path} alt="作品图片"></img>
                    ))
                }
            </div>
            <h3>{this.state.work[0].w_title}</h3>
            <p>{this.state.work[0].w_content}</p>
          </article>
          {/* <ul>
            <li>评论1</li>
            <li>评论1</li>
            <li>评论1</li>
          </ul> */}
        </section>
        <div className="review">
          <div></div>
        </div>
      </div>
    );
  }
}
export default Detail;
