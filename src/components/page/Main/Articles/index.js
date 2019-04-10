import React, { Component } from 'react';
import './index.css';
class Article extends Component{
    constructor(props) {
      super(props)
    
      this.state = {
         
      };
    };
    render() {
      return (
        < div className = "article_body body">
          Article组件
        </div>
      )
    };
    
}
export default Article;