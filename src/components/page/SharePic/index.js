import React, { Component } from "react";
import Top from '../../common/top';
import ImagePicker from "./ImagePicker";

import './index.scss';

export default class SharePic extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  Click(){
   
  }
  render() {
    return (
      <div className="sharePic">
        <Top />
        <section>
          <ul className="photo-domain">
            <li>
              <ImagePicker></ImagePicker>
            </li>
          </ul>
          <ul className="title-brief">
            <li>
              <span>作品标题</span>
              <input type="text" placeholder="请输入" />
            </li>
            <li>
              <span>作品简介</span>
              <textarea placeholder="请输入" />
            </li>
          </ul>
          <dl className="classify">
            <dt>
              <span>选择分类</span>
              <input type="text"/>
            </dt>
            <dd>
              <ul>
                <li>动画</li>
              </ul>
            </dd>
          </dl>
        </section>
      </div>
    );
  }
}
