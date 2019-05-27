import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom'
import Modal from 'antd-mobile/lib/modal';
import "antd-mobile/lib/modal/style/css";
import "./index.scss";
import Top from '../../common/top';
const prompt = Modal.prompt;

class EditInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            u_name: "",
            u_birthday: "",
            u_email: "",
            u_sex: "",
            u_signature: "",
            pageStatus: JSON.parse(this.props.match.params.flag) || false,
            colorupdate:false,
        };
    };
    updateBirthVal(e) {
        let val = e.target.value.substr(0, 10);
        this.setState((state) => {
            state.u_birthday = val;
            return state;
        })
        setTimeout(() => {
            this.requestUpdate();
        }, 200);
    }
    //发送修改请求
    requestUpdate() {
        let params = {
            u_id: JSON.parse(sessionStorage.getItem("userInfo")).id,
            u_name: this.state.u_name,
            u_sex: this.state.u_sex === '女' ? 0 : 1,
            u_birthday: new Date(this.state.u_birthday),
            u_signature: this.state.u_signature,
            u_email: this.state.u_email,
        }
        console.log(params)
        this.$axios.post("/admin/updateUserByID", params).then(res => {
            if (res.data.status === 1) {
                this.Toast.info(res.data.msg);
            } else {
                this.Toast.info(res.data.msg);
            }
        })
    }
    //请求用户数据
    requestUserInfo() {
        let u_id = JSON.parse(sessionStorage.getItem("userInfo")).id;
        this.$axios.post("/admin/queryUserByID", { u_id }).then(res => {
            if (res.data.status === 1) {
                console.log(res.data.result);
                this.setState((state) => {
                    state.u_name = res.data.result.u_name;
                    if (res.data.result.u_sex === 2) {
                        state.u_sex = '性别不明'
                    } else {
                        state.u_sex = res.data.result.u_sex === 1 ? '男' : '女';
                    }
                    if (res.data.result.u_birthday) {
                        state.u_birthday = res.data.result.u_birthday.substr(0, 10);
                    }
                    state.u_signature = res.data.result.u_signature;
                    state.u_email = res.data.result.u_email;
                    return state;
                })
            } else {
                this.Toast.info(res.data.msg);
            }
        })
    }
    //修改事件
    updateValue(str, val) {
        switch (str) {
            case 'u_name':
                this.setState((state) => {
                    state.u_name = val;
                    return state;
                })
                break;
            case 'u_sex':
                this.setState((state) => {
                    state.u_sex = val;
                    return state;
                })
                break;
            case 'u_email':
                this.setState((state) => {
                    state.u_email = val;
                    return state;
                })
                break;
            case 'u_signature':
                this.setState((state) => {
                    state.u_signature = val;
                    return state;
                })
                break;
            default:
                break;
        }
        //解决异步问题
        setTimeout(() => {
            this.requestUpdate();
        }, 200);
    }
    updateColor(e,ind) {
        sessionStorage.setItem("theme",JSON.stringify(ind));
        //打钩
        window.location.reload(true);
        var p = e.target.parentNode.children; //获取父级的所有子节点
        for (var i = 0; i < p.length; i++) {  //循环
            p[i].classList.remove("selected");
        }
        e.target.classList.add("selected");
    }
    componentWillMount() {
        if (JSON.parse(this.props.match.params.flag)){
            this.requestUserInfo();
        }
    }
    render() {
        return (
            <div className="userDetail">
                <Top title={this.state.pageStatus ? '用户资料' : '主题颜色'}></Top>
                {this.state.pageStatus ? (<ul>
                    <li><span className="right">昵称</span><span onClick={() => prompt('修改昵称', '', [
                        { text: '取消' },
                        { text: '确定', onPress: (value) => { this.updateValue('u_name', value) } },
                    ], 'default', this.state.u_name)}>{this.state.u_name}　〉</span></li>
                    <li><span className="right">出生年月</span>
                        <input type="date" value={this.state.u_birthday}
                            onChange={(e) => { this.updateBirthVal(e) }}></input>
                    </li>
                    <li><span className="right">性别</span><span onClick={() => prompt('修改性别', '', [
                        { text: '取消' },
                        { text: '确定', onPress: value => this.updateValue('u_sex', value) },
                    ], 'default', this.state.u_sex)}>{this.state.u_sex}　〉</span></li>
                    <li><span className="right">邮箱</span><span onClick={() => prompt('修改邮箱', '', [
                        { text: '取消' },
                        { text: '确定', onPress: value => this.updateValue('u_email', value) },
                    ], 'default', this.state.u_email)}>{this.state.u_email}　〉</span></li>
                    <li><span className="right">个性签名</span><span onClick={() => prompt('修改个性签名', '', [
                        { text: '取消' },
                        { text: '确定', onPress: value => this.updateValue('u_signature', value) },
                    ], 'default', this.state.u_signature)}>{this.state.u_signature}　〉</span></li>
                </ul>) :
                    (<dl>
                        <dt>主题颜色</dt>
                        <dd  onClick={(e) => { this.updateColor(e,0) }}><span className="color" style={{ background: '#505050' }}></span><span>系统默认</span></dd>
                        <dd onClick={(e) => { this.updateColor(e,1) }}><span style={{ background: '#f68787' }} className="color"></span><span>死亡芭比粉</span></dd>
                        <dd onClick={(e) => { this.updateColor(e,2) }}><span className="color" style={{ background: '#6fc2d0' }}></span><span>天空蓝</span></dd>
                        <dd onClick={(e) => { this.updateColor(e,3) }}><span className="color" style={{ background: '#a7d129' }}></span><span>早苗绿</span></dd>
                        <dd onClick={(e) => { this.updateColor(e,4) }}><span className="color" style={{ background: '#ffe26f' }}></span><span>咸蛋黄</span></dd>

                    </dl>)}

            </div>
        )
    };

}
export default EditInfo;