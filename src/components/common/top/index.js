import React, { Component } from 'react';
import "./index.scss"
import { withRouter } from 'react-router-dom'

class Nav extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       title:this.props.title
    }
  }
  onBack(){
    this.props.history.goBack();
    console.log(this.props);
  }
  render() {
    return (
        <header className="top">
            <span onClick={()=>{
          this.onBack()
            }}>×</span>
            <span>{this.state.title}</span>
            <span onTouchEnd={this.props.releaseWork}>发布</span>
        </header>
    )
  }
}
export default withRouter(Nav);

