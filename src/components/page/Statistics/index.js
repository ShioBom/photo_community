import React, { Component } from "react";
import Footer from '../../common/footer';
import "./index.scss";
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/pie');
// 引入折现图
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

class Login extends Component {
    constructor(props) {
        super(props);
        //这里的state存放的暂时的数据,例如窗口的打开关闭状态,表单的输入等
        this.state = {
            data1: [],
            LikeNumArr: [],
            CommentNumArr: [],

        };
    }
    requestPieData(id) {
        let data = [];
        let valueArr = [];
        this.$axios.post("/admin/queryWorkType", { u_id: id }).then(res => {
            if (res.data.status === 1) {
                valueArr = res.data.data;
                this.$axios.post("/admin/queryWorkNum", { u_id: id }).then(res => {
                    if (res.data.status === 1) {
                        res.data.data.forEach((ele, ind) => {
                            data.push({ value: ele, name: valueArr[ind] });
                        });
                        this.setState(state => {
                            state.data1 = data;
                            return state;
                        });
                        this.createPie();

                    }
                })
            } else {
                this.Toast.info(res.data.msg);
            }
        })
    }
    getDate(num) {
        let date1 = new Date();
        if (num) {
            let date2 = new Date(date1);
            date2.setDate(date1.getDate() + num);
            if(date2.getMonth()+1<=10){
                return `${date2.getFullYear()}-0${date2.getMonth() + 1}-${date2.getDate()}`
            }
            return `${date2.getFullYear()}-${date2.getMonth() + 1}-${date2.getDate()}`
        }
        if (date1.getMonth() + 1 <= 10) {
            return `${date1.getFullYear()}-0${date1.getMonth() + 1}-${date1.getDate()}`
        }
        return `${date1.getFullYear()}-${date1.getMonth() + 1}-${date1.getDate()}`;
    }
    requestLineData(id) {
        let week = [
            this.getDate(-6),
            this.getDate(-5),
            this.getDate(-4),
            this.getDate(-3),
            this.getDate(-2),
            this.getDate(-1),
            this.getDate()
        ]
        let commentData = [0,0,0,0,0,0,0];
        let likeData = [0,0,0,0,0,0,0]
        let params = {
            u_id: id,
            date1: this.getDate(-6),
            date2: this.getDate()
        }
        this.$axios.post("/admin/queryCommentNum", params).then(res => {
            if (res.data.status === 1) {
                res.data.result.forEach(ele => {
                    console.log(ele);
                    let ind = week.indexOf(ele.c_time.slice(0,10));
                    console.log(ind);
                    if(ind!==-1){
                        commentData[ind]=ele.num;
                    }
                })
               this.setState(state=>{
                   state.CommentNumArr = commentData;
                   return state;
               })
            }
        })
        this.$axios.post("/admin/queryLikeNum", params).then(res => {
            if (res.data.status === 1) {
                console.log(res.data.result);
                res.data.result.forEach(ele => {
                    console.log(ele);
                    let ind = week.indexOf(ele.l_time.slice(0, 10));
                    console.log(ind);
                    if (ind !== -1) {
                        likeData[ind] = ele.num;
                    }
                })
                this.setState(state => {
                    state.LikeNumArr = likeData;
                    return state;
                })
            }
        })
        setTimeout(() => {
            this.createLine();            
        }, 200);        
    }
    createPie() {
        var myChart = echarts.init(document.getElementById('pie_pic'));
        myChart.setOption({
            title: {
                text: "作品类型分布"
            },
            series: [
                {
                    name: '作品类型',
                    type: 'pie',
                    radius: '60%',
                    data: this.state.data1
                }
            ],
            roseType: 'angle'
        })
    }
    createLine() {
        var myChart2 = echarts.init(document.getElementById('line_pic'));
        myChart2.setOption({
            title: {
                text: '最近七天关注度变化',
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['评论数', '点赞数']
            },
            toolbox: {
                show: true,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: { readOnly: false },
                    magicType: { type: ['line', 'bar'] },
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['第一天', '第二天', '第三天', '第四天', '第五天', '第六天', '第七天'],
                axisLabel: {
                    formatter: '{value} '
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} '
                }
            },
            series: [
                {
                    name: '评论数',
                    type: 'line',
                    data: this.state.CommentNumArr,
                    markPoint: {
                        data: [
                            { type: 'max', name: '最大值' },
                            { type: 'min', name: '最小值' }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: '平均值' }
                        ]
                    }
                },
                {
                    name: '点赞数',
                    type: 'line',
                    data: this.state.LikeNumArr,
                    markPoint: {
                        data: [
                            { name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: '平均值' },
                            [{
                                symbol: 'none',
                                x: '90%',
                                yAxis: 'max'
                            }, {
                                symbol: 'circle',
                                label: {
                                    normal: {
                                        position: 'start',
                                        formatter: '最大值'
                                    }
                                },
                                type: 'max',
                                name: '最高点'
                            }]
                        ]
                    }
                }
            ]
        });
    }
    componentDidMount() {
        let id = JSON.parse(sessionStorage.getItem("userInfo")).id;
        this.requestPieData(id)
        this.requestLineData(id);
    }
    render() {
        return (
            <div className="Statistic">
                <div className="statistic_wrapper">
                    <div id="pie_pic"></div>
                    <div id="line_pic"></div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default Login;