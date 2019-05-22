import React, { Component } from "react";
import Grid from "antd-mobile/lib/grid";
import "antd-mobile/lib/grid/style/css";
import "./index.scss";
import {withRouter} from 'react-router-dom';

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
     pageUpdate:false
    };
  }
  //进入详情页面
  goDetail(data) {
    console.log(data)
    let obj = { 'u_id': data.u_id, 'w_id': data.w_id };
    this.props.history.push("/Detail/" + JSON.stringify(obj));
  }
  //删除作品
  deleteWork(e,data){
    e.stopPropagation();//阻止事件冒泡
    console.log("删除作品");
    let params={w_id:data.w_id};
    this.$axios.post("/admin/DeleteWork",params).then(res=>{
      if(res.data.status===1){
        this.Toast.info(res.data.msg);
        this.requestWorks();
      }else{
        this.Toast.info(res.data.msg);
      }
    })
  }
  requestWorks(){
    let u_id = JSON.parse(JSON.stringify(this.props.Props.login)).id;
    this.$axios({
      method: "post",
      url: "/admin/getOwnWorks",
      data: { u_id }
    }).then((res) => {
      this.setState((state) => {
        state.work = res.data.result;
        return state;
      })
    });
  }
  componentDidMount(){
   this.requestWorks();
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
            <div className="work_item" style={{ padding: ".3rem" }}>
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
              <span className="del_btn" onClick={(e)=>{this.deleteWork(e,dataItem)}}>×</span>
            </div>
          )}
        />
      </div>
    );
  }
}

export default withRouter(GridExample);
