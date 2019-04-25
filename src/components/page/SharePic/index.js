import React, { Component } from "react";
import Top from "../../common/top";
import ImagePicker from "./ImagePicker";
import Toast from "antd-mobile/lib/toast";
import "antd-mobile/lib/toast/style/css";
import { withRouter } from "react-router-dom";
import "./index.scss";
class SharePic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      work: {
        w_id: parseInt(Date.now() % 1000000), //作品id
        w_title: "", //作品标题
        w_content: "", //作品描述
        w_sort: 0, //作品类别},
        photos: [],
        u_id: 0
      },
      files: [],
      sorts: [],
      widths: [],
      heights:[]
    };
  }
  //改变作品图片并获取上传图片的宽高
  photoChange(files) {
    this.setState({ files: files });
    let self = this;
    let heights = [],
      widths = [];
    let file, img;
    files.forEach((item, i) => {
      img = new Image();
      img.src = item.url;
      img.onload = function() {
        widths.push(parseInt(this.width));
        heights.push(parseInt(this.height));
        self.setState({ widths, heights });
      };
    });
  }
  //发布作品，将作品保存到数据库中去
  releaseWork() {
    let files = this.state.files;
    var formData = new FormData();
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i].file);
      }
    }
    this.postData(formData);
  }
  //保存图片到服务器并返回图片路径
  postData(formData) {
    this.$axios({
      method: "post",
      url: "/admin/upload",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(res => {
      let { status, data } = res.data;
      //status==1表示成功获取到数据
      if (status === 1) {
        let photos = [];
        data.forEach((val, ind) => {
          //拿到图片id
          let p_id = val.path.split(".")[0].split("/")[2];
          //拿到图片路径
          let src = val.path.replace("public/upload/", "");
          photos.push({
            p_id: parseInt(p_id.substring(0, 6)),
            w_id: this.state.work.w_id,
            src,
            width: this.state.widths[ind],
            height: this.state.heights[ind]
          });
        });
        //改变state
        this.setState(state => {
          state.work.photos = Object.assign([], photos);
          state.work.u_id = JSON.parse(sessionStorage.getItem("userInfo")).id;
          return state;
        });
        console.log("work:",this.state.work.photos);
        //将作品信息保存到数据库里面去
        this.$axios({
          method: "post",
          url: "/admin/releaseWork",
          data: this.state.work
        }).then(res => {
          if (res.data.status === 1) {
            Toast.info(res.data.msg);
            window.location.reload();
          }
        });
      }
    });
  }
  //改变作品标题
  titleChange(e) {
    let val = e.target.value;
    this.setState(state => {
      state.work.w_title = val;
      return state;
    });
  }
  //改变作品内容
  contentChange(e) {
    let val = e.target.value;
    this.setState(state => {
      state.work.w_content = val;
      return state;
    });
  }
  //获取作品类型
  getSort(ele, e) {
    this.setState(state => {
      state.work.w_sort = ele.s_id;
      return state;
    });
    //将所有按钮的颜色设置未默认颜色
    let object = e.target.parentNode.children;
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        const element = object[key];
        element.style.background = "#f2efb6";
      }
    }
    //设置选中的按钮的颜色
    e.target.style.background = "#7fe7cc";
  }
  //生命周期钩子函数
  componentDidMount() {
    //获取作品类型，渲染到页面
    this.$axios.get("/admin/getType").then(res => {
      let result = res.data;
      this.setState({ sorts: result });
    });
  }
  render() {
    return (
      <div className="sharePic">
        <Top
          releaseWork={this.releaseWork.bind(this)}
          title={this.state.title}
        />
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
                      onTouchEnd={e => {
                        this.getSort(ele, e);
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

export default withRouter(SharePic);
