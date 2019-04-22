import React, { Component } from "react";
import Grid from "antd-mobile/lib/grid";
import "antd-mobile/lib/grid/style/css";
import "./index.scss";
import {withRouter} from 'react-router-dom';

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
     
    };
  }
  //进入详情页面
  goDetail(data) {
    console.log(data)
    let obj = { 'u_id': data.u_id, 'w_id': data.w_id };
    console.log(obj);
    this.props.history.push("/Detail/" + JSON.stringify(obj));
  }
  componentDidMount(){
    let u_id = JSON.parse(sessionStorage.getItem("userInfo")).id;
    this.$axios({
      method: "post",
      url: "http://192.168.56.1:3001/admin/getOwnWorks",
      data: { u_id }
    }).then((res)=>{
      console.log(res.data.result);
      this.setState((state)=>{
        state.work=res.data.result;
        return state;
      })
    });
  }
  render() {
    return (
      <div className="mywork">
        <div className="sub-title">我的作品</div>
        <Grid
          data={this.state.work}
          columnNum={2}
          hasLine={false}
          onClick={(el,ind)=>{this.goDetail(this.state.work[ind])}}
          renderItem={dataItem => (
            <div style={{ padding: ".3rem" }}>
              <img
                src={dataItem.w_img}
                style={{ width: "2.5rem", height: "2.5rem" }}
                alt=""
              />
              <div
                style={{ color: "#666", fontSize: "14px", marginTop: "12px" }}
              >
                <span className="work-title">{dataItem.w_title}</span>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default withRouter(GridExample);
