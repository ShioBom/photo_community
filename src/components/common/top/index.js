import React, { Component } from 'react';
import "./index.scss"

export default class index extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  render() {
    return (
        <header className="top">
            <span>×</span>
            <span>发作品</span>
            <span onTouchEnd={this.props.releaseWork}>发布</span>
        </header>
    )
  }
}

