import { ImagePicker, WingBlank } from 'antd-mobile';
import React from 'react'
const data = [];

class ImagePickerExample extends React.Component {
  state = {
    files: data,
    multiple: 1
  };
  onChange = (files,type,index) => {
    this.setState({
      files
    });
      var formData = new FormData();
      if (files.length > 0) {
          for (let i = 0; i < files.length; i++) {
              formData.append('files', files[i].file);
          }
      }
      console.log(formData.getAll("files"));
      this.postData(formData);
  };
  onSegChange = e => {
    const index = e.nativeEvent.selectedSegmentIndex;
    this.setState({
      multiple: index === 1
    });
  };
  postData(formData){
      this.$axios({
        method: "post",
        url: "http://localhost:3001/admin/upload",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => {
        console.log(res);
      });
  }
  render() {
    const { files } = this.state;
    return (
      <WingBlank>
        <ImagePicker
                    files={files}
                    onChange={this.onChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={files.length < 7}
                    multiple={this.state.multiple}
                />
      </WingBlank>
    );
  }
}
export default ImagePickerExample;