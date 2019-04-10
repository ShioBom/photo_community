import React, { Component } from "react";
import Footer from "../../common/footer";
import { Tabs, Badge } from "antd-mobile";
import MyFollow from './MyFollow';
import "./index.css";
class Follow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const tabs = [
      { title: <Badge>我的关注</Badge> },
      { title: <Badge text={"3"}>动态</Badge> }
    ];
    return <div className="follow_list">
        <div className="content">
          <Tabs tabs={tabs} initialPage={1} onChange={(tab, index) => {
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
