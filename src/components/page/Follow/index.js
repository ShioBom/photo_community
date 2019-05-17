import React, { Component } from "react";
import Footer from "../../common/footer";
import Tabs from "antd-mobile/lib/tabs"; // 加载 JS
import "antd-mobile/lib/tabs/style/css"; 
import Toast from "antd-mobile/lib/toast"; // 加载 JS
import "antd-mobile/lib/toast/style/css"; 
import Badge from "antd-mobile/lib/badge"; // 加载 JS
import "antd-mobile/lib/badge/style/css"; 
import MyFollow from './MyFollow';
import MyFans from "./MyFans";
import MyWork from "./MyWork";
import "./index.scss";
class Follow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPage: parseInt(this.props.match.params.page) || 0
    };
  }
  render() {
    const tabs = [
      { title: <Badge>关注</Badge> },
      { title: <Badge text={"1"}>粉丝</Badge> },
      { title: <Badge text={"3"}>作品</Badge> }
    ];
    return (
      <div className="follow_list">
        <div className="content">
          <Tabs
            tabs={tabs}
            initialPage={this.state.initialPage}
            onChange={(tab, index) => {
              console.log("onChange", index, tab);
            }}
            onTabClick={(tab, index) => {
              console.log("onTabClick", index, tab);
            }}
            tabBarBackgroundColor={"#373640"}
            tabBarInactiveTextColor={"#fff"}
            tabBarActiveTextColor={"yellowgreen"}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                backgroundColor: "#fff"
              }}
            >
              <MyFollow Props={this.props} />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                backgroundColor: "#fff"
              }}
            >
              <MyFans Props={this.props} />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                backgroundColor: "#fff"
              }}
            >
              <MyWork Props={this.props}/>
            </div>
            />
          </Tabs>
        </div>
        <Footer />
      </div>
    );
  }
  componentDidMount() {
    console.log(this.props.login);
    
    if (!this.props.login.id){
      Toast.info("你还没有登录哦！");
    }
  }
}
export default Follow;
