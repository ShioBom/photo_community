import React, { Component } from "react";
import Footer from "../../common/footer";
import { Tabs, Badge } from "antd-mobile";
import MyFollow from './MyFollow';
import "./index.css";
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
    return <div className="follow_list">
        <div className="content">
          <Tabs tabs={tabs} initialPage={this.state.initialPage} onChange={(tab, index) => {
              console.log("onChange", index, tab);
            }} onTabClick={(tab, index) => {
              console.log("onTabClick", index, tab);
          }} tabBarBackgroundColor={"#373640"} tabBarInactiveTextColor={"#fff"} tabBarActiveTextColor={"yellowgreen"}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", backgroundColor: "#fff" }}>
              <MyFollow Props={this.props} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", backgroundColor: "#fff" }}>
              动态
            </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", backgroundColor: "#fff" }}>
            作品
            </div>
            />
          </Tabs>
        </div>
        <Footer />
      </div>;
  }
  componentDidMount() {
    
  }
}
export default Follow;
