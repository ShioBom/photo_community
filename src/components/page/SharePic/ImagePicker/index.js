import { ImagePicker, WingBlank } from "antd-mobile";
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
          selectable={files.length < 7}
          multiple={this.state.multiple}
        />
      </WingBlank>
    );
  }
}
export default ImagePickerExample;
