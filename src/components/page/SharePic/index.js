import React, { Component } from "react";
import Top from "../../common/top";
import ImagePicker from "./ImagePicker";

import "./index.scss";

export default class SharePic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      work: {
        w_id: Date.now(), //作品id
        w_title: "", //作品标题
        w_content: "", //作品描述
        w_sort: "",//作品类别},
      },
      sorts:[]
    };
  }
  titleChange(e) {
    let val = e.target.value;
    this.setState((state)=>{
      state.work.w_title = val;
      return state;
    });
    console.log(this.state.work);
  }
  contentChange(e) {
    let val = e.target.value;
    this.setState((state) => {
      state.work.w_content =val;
      return state;
    });
    console.log(this.state.work);
  }
  getSort(e) {
    let val = e.target.innerHTML;
    this.setState(state => {
      state.work.w_sort = val;
      return state;
    });
    console.log(e.target.innerHTML);
  }
  componentDidMount() {
    this.$axios.get("http://localhost:3001/admin/getType").then(res => {
      let result = res.data;
      this.setState({sorts:result});
      console.log(this.state.sorts);
    });
  }
  render() {
    return (
      <div className="sharePic">
        <Top work={this.state.work}/>
        <section>
          <ul className="photo-domain">
            <li>
              <ImagePicker />
            </li>
          </ul>
          <ul className="title-brief">
            <li>
              <span>作品标题</span>
              <input
                type="text"
                onChange={e => {
                  this.titleChange(e);
                }}
                placeholder="请输入"
              />
            </li>
            <li>
              <span>作品简介</span>
              <textarea
                onChange={e => {
                  this.contentChange(e);
                }}
                placeholder="请输入"
              />
            </li>
          </ul>
          <dl className="classify">
            <dt>
              <span>选择分类</span>
            </dt>
            <dd>
              <ul>
               {
                 this.state.sorts.map((ele,ind)=>{
                   return (
                     <li key={ind}
                       onClick={e => {
                         this.getSort(e);
                       }}
                     >
                       {ele.s_type}
                </li>
                   )
                 })
               }
              </ul>
            </dd>
          </dl>
        </section>
      </div>
    );
  }
}
