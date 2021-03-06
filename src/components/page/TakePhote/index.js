import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import "./index.scss";
var video = null;
var canvas1 = null;;
var context1 = null;;
class ItemPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            flag: true
        };
    };
    //获得base64编码格式图片转化成图片文件
    imgUrl() {
        let filename = 'file';
        var imgsrc = document.getElementById('canvas1').toDataURL("image/jpg");
        let arr = imgsrc.split(',')
        let mime = arr[0].match(/:(.*?);/)[1]
        let suffix = mime.split('/')[1]
        let bstr = atob(arr[1])
        let n = bstr.length
        let u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([u8arr], `${filename}.${suffix}`, {
            type: mime
        });
    }
    //访问用户媒体设备的兼容方法
    getUserMedia(constraints, success, error) {
        if (navigator.mediaDevices.getUserMedia) {
            //最新的标准API
            navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
        } else if (navigator.webkitGetUserMedia) {
            //webkit核心浏览器
            navigator.webkitGetUserMedia(constraints, success, error)
        } else if (navigator.mozGetUserMedia) {
            //firfox浏览器
            navigator.mozGetUserMedia(constraints, success, error);
        } else if (navigator.getUserMedia) {
            //旧版API
            navigator.getUserMedia(constraints, success, error);
        }
    }
    successFunc(stream) {
        //兼容webkit核心浏览器
        // let CompatibleURL = window.URL || window.webkitURL;
        //将视频流设置为video元素的源
        console.log(stream);
        video.srcObject = stream;
        video.play();
    }
    errorFunc(e) {
        alert('Error！' + e);
    }
    //拍照
    getPhoto() {
        // context.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);
        context1.drawImage(video, 0,0,375,375,0, 0, 100, 100); //将video对象内指定的区域捕捉绘制到画布上指定的区域，实现拍照。
        this.setState({ flag: false });
    }
    storePortrait(img_src){
        let u_id = JSON.parse(sessionStorage.getItem("userInfo")).id;
        this.$axios.post("/admin/storePortrait",{path:img_src,u_id}).then(res=>{
            if(res.data.status===1){
                this.Toast.info(res.data.msg);
            }
        })        
    }
    uploadPortrait(){
        let file = this.imgUrl();
        let param = new FormData(); //创建form对象
        let u_id = JSON.parse(sessionStorage.getItem("userInfo")).id;
        param.append('file', file);
        this.$axios({
            method:"post",
            url:"admin/uploadPortrait",
            data:param
        }).then(res=>{
            if(res.data.status===1){
                let path = res.data.path;
                this.storePortrait(path);
                console.log(u_id);
                sessionStorage.removeItem("userInfo");
                sessionStorage.setItem("userInfo", JSON.stringify({ id: u_id, portrait: path }));
                this.props.history.push("MyInfo");
            }
        })
    }
    componentDidMount() {
        video = document.querySelector('video');
        canvas1 = document.getElementById('canvas1');
        canvas1.height = 100;
        canvas1.width=100;
        context1 = canvas1.getContext('2d');
        context1.fillStyle = "lightgrey";
        context1.fillRect(0, 0, 100, 100);
        if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
            //调用用户媒体设备, 访问摄像头
            this.getUserMedia({ video: { width: 375, height: 375 } }, this.successFunc, this.errorFunc);
        } else {
           this.Toast.info('不支持访问用户媒体');
        }
    }
    render() {
        return (
            <div className="takephoto">
                <video height="80%" width="100%" autoPlay='autoplay'></video>
                <div className="toolbar">
                    <canvas id="canvas1"></canvas>
                    <button className="takephoto_btn" onClick={() => { this.getPhoto() }}>拍照</button>
                    <button className="confirm_btn" onClick={() => {this.uploadPortrait()}}>OK</button>
                </div>

            </div>
        )
    };
}
export default withRouter(ItemPage);