import React, { Component } from "react";
import "./index.css";


class MyFans extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.$axios({
      method: "post",
      url: "/admin/getFansList",
      data: JSON.parse(JSON.stringify(this.props.Props.FollowList))
    }).then(res => {
      console.log(res.data);
      if (res.data.status === 1) {
        this.setState(state => {
          state.data = res.data.result;
          return state;
        });
      }
    });
  }
  render() {
    return (
      <div className="myFollow">
        <ul>
          {this.state.data.map((obj, ind) => {
            return (
              <li className="title" key={ind}>
                <div className="portrait">
                  <img src={obj.u_portrait} alt="头像" />
                </div>
                <p>{obj.u_name}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default MyFans;
