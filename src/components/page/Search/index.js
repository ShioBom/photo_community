import React, { Component } from 'react';
import Tabs from "antd-mobile/lib/tabs"; // 加载 JS
import "antd-mobile/lib/tabs/style/css";
import Card from "antd-mobile/lib/card"; // 加载 JS
import "antd-mobile/lib/card/style/css";
import "./index.scss";

class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tabs: [
                { title: '用户', sub: '1' },
                { title: '作品', sub: '2' },
            ],
            inputValue:"",
            currentPage:0,
            queryUserData:[],
            queryWorkData:[]
        };
    };
    getInputValue(e) {
        let val = e.target.value;
        this.setState((state) => {
            state.inputValue = val;
            return state;
        })
    }
    SearchUser() {
       this.$axios({
           method:"post",
           url:"/admin/queryUserByStr",
           data:{keyword:`%${this.state.inputValue}%`},
       }).then(res=>{
           if(res.data.status===1){
               this.setState((state)=>{
                   state.queryUserData=res.data.result;
                   return state;
               })
           }else if(res.data.status===-1){
               this.Toast.info(res.data.msg);
           }else{
               this.Toast.info(res.data.msg);
           }
       })
    }
    
    SearchWork() {
        this.$axios({
            method: "post",
            url: "/admin/queryWorks",
            data: { keyword: `%${this.state.inputValue}%`},
        }).then(res => {
            if (res.data.status === 1) {
                this.setState((state) => {
                    state.queryWorkData = res.data.result;
                    return state;
                })
            } else if (res.data.status === -1) {
                this.Toast.info(res.data.msg);
            } else {
                this.Toast.info(res.data.msg);
            }
        })
    }
    tabChange(tab, index) {
        this.setState({currentPage:index});
    }
    Search(e){
        //如果按下了回车键
        if(e.keyCode===13){
            this.state.currentPage===0?this.SearchUser():this.SearchWork();
        }
    }
    render() {
        return (
            <div className="item_page">
                <div className="inputbox"><input type="text" onChange={(e)=>{this.getInputValue(e)}} onKeyUp={(e) => { this.Search(e)}}></input></div>
                <div className="tabs_content">
                    <Tabs tabs={this.state.tabs}
                        initialPage={0}
                        onChange={(tab, index) => { this.tabChange(tab, index) }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'flex-start', height: '11.59rem', backgroundColor: '#fff' }}>
                            {this.state.queryUserData.map((item,ind)=>{
                                return (<Card key={ind}>
                                    <Card.Header
                                        title={item.u_name}
                                        thumb={item.u_portrait}
                                        extra={false ? (
                                            <span
                                                onTouchEnd={() => { }}
                                            >
                                                + 关注
                                        </span>
                                        ) : (
                                                <span
                                                    className="followed"
                                                    onTouchEnd={() => { }}
                                                >
                                                    已关注
                                          </span>
                                            )}
                                    />
                                </Card>)
                            })}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center',flexDirection:'column', justifyContent: 'flex-start', height: '11.59rem', backgroundColor: '#fff' }}>
                            {this.state.queryWorkData.map((item,index)=>{
                            return <Card key={index}>
                                <Card.Header
                                    title={item.u_name}
                                    thumb={item.u_portrait}
                                    extra={<i>{item.w_time}</i>}
                                />
                                <Card.Body>
                                    <img src={item.w_img} alt="图片失踪了"/>
                                </Card.Body>
                                <Card.Footer content={item.w_title}/>
                            </Card>
                        })}
                        </div>
                    </Tabs>
                </div>

            </div>
        )
    };

}
export default Main;