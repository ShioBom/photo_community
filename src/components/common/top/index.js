import React, { Component } from 'react';
import "./index.scss"
import { withRouter } from 'react-router-dom'

class Nav extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       title:this.props.title,
       right:this.props.releaseWork!==undefined?true:false,
    }
  }
  onBack(){
    this.props.history.goBack();
  }
  render() {
    return (
        <header className="top">
            <span onClick={()=>{
          this.onBack()
            }}>×</span>
            <span>{this.props.title}</span>
        {this.state.right ? <span onTouchEnd={this.props.releaseWork}>发布</span> : <span></span>}
        </header>
    )
  }
}
export default withRouter(Nav);

