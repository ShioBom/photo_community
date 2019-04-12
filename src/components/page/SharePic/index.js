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
        w_sort: "", //作品类别},
        photos: []
      },
      files:[],
      sorts: []
    };
  }
  //改变作品图片
  photoChange(files,type,index) {
    this.setState({files:files});
    var formData = new FormData();
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i].file);
      }
    }
  }
  //发布作品
  releaseWork(){

  }
  //保存图片到服务器并返回图片路径
  postData(formData) {
    this.$axios({
      method: "post",
      url: "http://localhost:3001/admin/upload",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(res => {
      let data=res.data;
      //status==1表示成功获取到数据
     if(res.status===1){
       console.log(data.path);
     };
    });
  }
  //改变作品标题
  titleChange(e) {
    let val = e.target.value;
    this.setState(state => {
      state.work.w_title = val;
      return state;
    });
    console.log(this.state.work);
  }
  //改变作品内容
  contentChange(e) {
    let val = e.target.value;
    this.setState(state => {
      state.work.w_content = val;
      return state;
    });
    console.log(this.state.work);
  }
  //获取作品类型
  getSort(ele) {
    console.log(ele.s_id);
    this.setState(state => {
      state.work.w_sort = ele.s_id;
      return state;
    });
  }
  //生命周期钩子函数
  componentDidMount() {
    this.$axios.get("http://localhost:3001/admin/getType").then(res => {
      let result = res.data;
      this.setState({ sorts: result });
      console.log(this.state.sorts);
    });
  }
  render() {
    return (
      <div className="sharePic">
        <Top/>
        <section>
          <ul className="photo-domain">
            <li>
              <ImagePicker
                files={this.state.files}
                photoChange={this.photoChange.bind(this)}
              />
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
                {this.state.sorts.map(ele => {
                  return (
                    <li
                      key={ele.s_id}
                      onTouchEnd={() => {
                        this.getSort(ele);
                      }}
                    >
                      {ele.s_type}
                    </li>
                  );
                })}
              </ul>
            </dd>
          </dl>
        </section>
      </div>
    );
  }
}
