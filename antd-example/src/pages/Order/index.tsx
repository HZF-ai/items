import * as React from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import style from './style.less'
import { Layout, Button, Input,Table, Modal } from 'antd'
import Header from '../../compontent/Header'
import SMenu from '../../compontent/Menu'
import Order from '../../compontent/Order'
import { useState } from 'react'

const { Content, Sider } = Layout;

interface State{
    keywords: string,
    index: string;
    //从服务器获取的数据
    dataSource:[];
    orderData:[]
}

export default class Nav extends React.Component<RouteComponentProps> {

    //columns是固定不变的,table的列名
    public columns = [
        {
            title: '下单人',
            dataIndex: 'nickname',
            align: 'center',
            width: 120,
        },
        {
            title: '订单价格',
            dataIndex: 'moneySum',
            align: 'center',
            width: 130,
        },
        {
            title: '剩余',
            dataIndex: 'surplus',
            align: 'center',
            width: 130,
        },
        {
            title: '购买时间',
            dataIndex: 'time',
            width:130,
            align: 'center',
        },
        {
            title: '',
            align: 'right',
        },
        {
            title: '操作',
            dataIndex: 'action',
            width: 120,
            align: 'center',
            render :(text,record) => {

                const [isModalVisible, setIsModalVisible] = useState(false);
                const showModal = () =>{
                    setIsModalVisible(true);
                };
                const handleOk = () =>{
                    setIsModalVisible(false);
                };
                const handleCancel = () => {
                    setIsModalVisible(false);
                };
                return (
                    <>
                    {/* 弹窗 */}
                        <Button style={{border: 'white'}}
                            onClick={ () => {
                                showModal();
                                //获取订单数据
                                this.getOrderDetails(record.key);
                            } } 
                        >
                            查看详情
                        </Button>
                        <Modal 
                            title="订单详情" 
                            centered
                            visible={isModalVisible}
                            onOk={handleOk}
                            onCancel={handleCancel}
                        >
                            <div className={style.order_title}>
                                <span>下单人：{record.nickname}</span>
                                <span>下单时间：{record.time}</span>
                            </div>
                            <div className={style.order_title}>
                                <span>总价格：{record.moneySum} 美元</span>
                                <span>剩余：{record.surplus} 美元</span>
                            </div>
                            <div className={style.order_details}>
                                <Order />
                            </div>
                        </Modal>
                    </>
                )
            }
        },
]

    public keyword:string = '';
    public orderDetails = [];
    state:State={
        keywords:'',
        index:'',//获取的页数,
        dataSource:[],
        orderData:[]
    }

    //转换成标准时间格式
    formatDate(date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '年' + m + '月' + d + '日';
    };

    //获取带有keywords的订单
    async getOrder(index,keywords){
        let url = 'api/console/order/search';
        let obj={};
        obj["pageIndex"]=0
        obj["pageSize"]=0
        obj["keyword"]=keywords
        let response = await fetch(url,{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(obj)
        })
        let res = await response.json();
        let data = [];
        let id = 0;
        if(res.stat === 'ok'){
            res.data.items.map((item) =>{
                //订单价格
                let money = 0 ;
                item.goods.map( (items) =>{
                    money += parseInt(items.item.price) * parseInt(items.count);
                } )
                //富豪所剩金额
                let Surplus = item.richer.worth - money;
                //将毫秒数转化为时间
                let Time = this.formatDate(new Date(item.ctime));
                let order = {
                    key: item.id,
                    nickname:item.richer.nickname,
                    moneySum:money,
                    surplus: Surplus,
                    time: Time
                }
                // console.log(order);
                data.push(order);
            })
            this.setState({
                dataSource:data
            })
        }
        else{ 
            alert(res.msg);
            if(res.msg === '用户没有登录' || res.msg === '用户登录超时'){
                const { history } = this.props;
                history.push ( '/login');
            }
        }
    }

    //查看订单详情，传订单的id
    async getOrderDetails(richid){
        let url = 'api/console/order/get';
        let obj={};
        obj["id"] = richid;
        let response = await fetch(url,{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(obj)
        })
        let res = await response.json();
        if(res.stat === 'ok'){
            //订单信息
            this.orderDetails=[];
            res.data.info.goods.map( (items) =>{
                let moneySingle = 0;
                moneySingle += parseInt(items.item.price) * parseInt(items.count);
                let order = {
                    title: items.item.title,
                    count: items.count,
                    moneySingle: moneySingle,
                }
                // localStorage.setItem()
                this.orderDetails.push(order);
            } )
            this.setState({ 
                orderData: this.orderDetails
            })
            localStorage.setItem("order",JSON.stringify(this.orderDetails));
            console.log(this.orderDetails)
            // console.log(JSON.parse(localStorage.getItem("order"))[0].title)
        }
        else{ 
            alert(res.msg);
            if(res.msg === '用户登录超时'){
                const { history } = this.props;
                history.push ( '/login');
            }
        }
    }

    //在组件挂载后请求服务器，加载table的数据；
    componentDidMount(){
        this.getOrder(this.state.index,this.keyword);
    }
    render(){
        return(
            <React.Fragment>
                <div className={style.box}>
                    <Header />
                    <Layout style={{ height:'100%'}}>
                        <Sider style={{ width:'100'}}>
                            <SMenu />
                        </Sider>
                        <Layout style={{padding: '20px 30px 0 30px' ,backgroundColor:'#ffffff'}}>
                            <Content>
                                <div className={style.content_title}>
                                    <div className={style.content_title_right}>
                                        <Input 
                                            className={style.content_input}
                                            value={this.state.keywords}
                                            onChange={(e) => {this.setState({keywords:e.target.value})}}
                                         />
                                        <Button 
                                            className={style.content_button}
                                            onClick={() =>{
                                                    this.getOrder(this.state.index,this.state.keywords);
                                                    //在搜索后清空输入框
                                                    this.setState({keywords:''})
                                                }}
                                        >搜索</Button>
                                        <Button
                                            onClick={() => this.getOrder(this.state.index, this.keyword)}
                                        >重置</Button>
                                    </div>
                                </div>
                                <div className={style.content_table}>
                                    <Table 
                                        columns={this.columns} 
                                        size="small"
                                        dataSource={this.state.dataSource}
                                        // pagination={this.paginationProps}
                                      />
                                </div>
                            </Content>
                        </Layout>
                    </Layout>
                </div>
            </React.Fragment>
        )
    }
}
