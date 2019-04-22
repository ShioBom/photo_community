// import { ImagePicker, WingBlank } from "antd-mobile";
import ImagePicker from "antd-mobile/lib/image-picker";  // 加载 JS
import WingBlank from "antd-mobile/lib/wing-blank";
import 'antd-mobile/lib/image-picker/style/css';        // 加载 CSS
import "antd-mobile/lib/wing-blank/style/css";   
import React from "react";
// const data = [];

class ImagePickerExample extends React.Component {
  state = {
    files: this.props.files,
    multiple: 1 //上传多张图片
  };
  onSegChange = e => {
    const index = e.nativeEvent.selectedSegmentIndex;
    this.setState({
      multiple: index === 1
    });
  };
  render() {
    const { files } = this.state;
    return (
      <WingBlank>
        <ImagePicker
          files={this.props.files}
          onChange={this.props.photoChange}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files.length < 20}
          multiple={this.state.multiple}
        />
      </WingBlank>
    );
  }
}
export default ImagePickerExample;
