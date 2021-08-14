import * as React from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import style from './style.less'
import { Layout, Menu, Button, Input,Modal,Table } from 'antd'
import Header from '../../compontent/Header'
import SMenu from '../../compontent/Menu'
import { useState } from 'react'
import setlist from '../../mobx/setlist'
const { Content, Sider } = Layout;
interface IGoods {
    title: string,
    price: number,
    cover: string,
    limit: number
    ctime: string,
    weight: number,
    status: number,
    id:string
}

interface good {
    inputvalue: string,
    dataSource: IGoods[],
    weight: number,
    setweightvalue: string,
    isupdate: boolean,
    searchvalue: string,
    
    
}
export default class Goods extends React.Component<RouteComponentProps,good> {
    constructor(props) {
        super(props)
        this.state = ({
            inputvalue: '',
            dataSource: [],
            weight: 0,
            setweightvalue: '0',
            isupdate: true,
            searchvalue: '',
            
            
        })
        this.handlesearch = this.handlesearch.bind(this);
        this.reSet = this.reSet.bind(this);
    }
    search = async() => {
        let url = '/api/console/goods/search'
        let obj = {}
        obj["pageIndex"] = 0;
        obj["pageSize"] = 0;
        obj["keyword"] = this.state.searchvalue;
        try {
            let response = await fetch(url,{
                method:'POST',
                mode:'cors',
                headers: {//请求头
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(obj),
            });
            let res= await response.json();
            let r = []
            if (r.length > 0)
                r = []

            if(res.stat === 'ok'){
                res.data.items.map(data => {
                    let goods:IGoods = {
                        title: data.title,
                        price : data.price,
                        cover: data.cover,
                        limit: data.limit,
                        ctime: data.ctime,
                        weight: data.weight,
                        status: data.status,
                        id:data.id
                    }
                    r.push(goods)
                })
                this.setState({
                    dataSource : r
                })
            }
            else{
                alert(res.msg)
            }
        }
        catch(error){
            console.log(error);
        }
    }
    reSet = async (e) => {
        this.setState({
            searchvalue:e.target.value
        })
        let url = '/api/console/goods/search'
        let obj = {}
        obj["pageIndex"] = 0;
        obj["pageSize"] = 0;
        obj["keyword"] = this.state.inputvalue;
        try {
            let response = await fetch(url,{
                method:'POST',
                mode:'cors',
                headers: {//请求头
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(obj),
            });
            let res= await response.json();
            let r = []
            if (r.length > 0)
                r = []
           
            if(res.stat === 'ok'){
                res.data.items.map(data => {
                    let goods:IGoods = {
                        title: data.title,
                        price : data.price,
                        cover: data.cover,
                        limit: data.limit,
                        ctime: data.ctime,
                        weight: data.weight,
                        status: data.status,
                        id:data.id
                    }
                    r.push(goods)
                })
                this.setState({
                    dataSource : r
                })
            }
            else{
                alert(res.msg)
            }
        }
        catch(error){
            console.log(error);
        }
    }
    handlesearch = async (event) => {
        this.setState({
            searchvalue: event.target.value
        });

    }
    componentDidMount = async () => {
        let url = '/api/console/goods/search'
        let obj = {}
        obj["pageIndex"] = 0;
        obj["pageSize"] = 0;
        obj["keyword"] = this.state.inputvalue;
        try {
            let response = await fetch(url,{
                method:'POST',
                mode:'cors',
                headers: {//请求头
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(obj),
            });
            let res= await response.json();
            let r = []
            if (r.length > 0)
                r = []
           
            if(res.stat === 'ok'){
                res.data.items.map(data => {
                    let goods:IGoods = {
                        title: data.title,
                        price : data.price,
                        cover: data.cover,
                        limit: data.limit,
                        ctime: data.ctime,
                        weight: data.weight,
                        status: data.status,
                        id:data.id
                    }
                    r.push(goods)
                })
                this.setState({
                    dataSource : r
                })
            }
            else{
                alert(res.msg)
            }
        }
        catch(error){
            console.log(error);
        }
    }
     columns = [
        {
            title: '商品名称',
            dataIndex: 'title',
            width:'10%',
          },
          {
            title: '价格',
            dataIndex: 'price',
              render: (a) => { return ("$"+ a )},
            width:'10%'
          },
          {
            title: '图片',
            dataIndex: 'cover',
            width:'10%',
              render:(cover)=>{
                  return (<>
                      <img style={{width:'16px',height:'16px'}} src={`http://127.0.0.1:3000${cover}`}/>
                  </>)
              },
        },
        {
            title: '购买上限',
            dataIndex: 'limit',
            render: (limit) => {
                if (limit == 1)
                    return 1
                else
                    return limit
            },
            width:'10%'
        },
        {
            title: '创建时间',
            dataIndex: 'ctime',
            render: (mss) => {                
                return (
                    this.countDown(mss)
            )},
            width:'10%'
        },
        {
            title: '权重',
            dataIndex: 'weight',
            width:'10%'
        },
        {
            title: '状态',
            dataIndex: 'status',
            width:'10%'
        },
        {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            width: '30%',
            
            render: (text, record) => {
                const [isSetWeightModalVisible, isUnSetWeightModalVisible] = useState(false);
                const [isDeleteModalVisible, isUnDeleteModalVisible] = useState(false);
                const [isUpdateModalVisible, isUnUpdateModalVisible] = useState(false);
                const [isDownModalVisible, isUnDownModalVisible] = useState(false);
                const showWeightModal = () => {
                    isUnSetWeightModalVisible(true);
                };
                const handleOkWeight = () => {
                    isUnSetWeightModalVisible(false);
                };
                
                const handleCancelWeight = () => {
                    isUnSetWeightModalVisible(false);
                };

                const showDeletdModal = () => {
                    isUnDeleteModalVisible(true);
                }
                const handleOkDelete = async () => {
                     
                    let url = '/api/console/goods/delete';
                    try {
                        let response = await fetch(url, {
                            method: 'POST',
                            mode: 'cors',
                            headers: {//请求头
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                id: record.id
                            }),
                        });
                        let res = await response.json();
                        if (res.stat === 'ok') {
                            // const { history } = this.props;
                            // history.push('/goods')
                            // window.opener.location.href=window.opener.location.href;
                        }
                        else {
                            alert(res.msg)
                        }
                    }
                    catch (error) {
                        console.log(error);
                    }
                    
                    isUnDeleteModalVisible(false);
                }
                const handleCancelDelete = () => {
                    isUnDeleteModalVisible(false)
                }
                 
                const showUpdateModal = () => {
                    isUnUpdateModalVisible(true);
                }
                const handleOkUpdate = () => {
                    
                    isUnUpdateModalVisible(false);
                }
                const handleCancelUpdate = () => {
                    isUnUpdateModalVisible(false)
                }
                const showDowndateModal = () => {
                    isUnDownModalVisible(true);
                }
                const handleDown = () => {
                    isUnDownModalVisible(false);
                }
                const handleCancelDown = () => {
                    isUnDownModalVisible(false);
                }
                const isupdate = this.state
                function Upbutton  ()  {
                    return (<button onClick={showUpdateModal} style={{ marginRight: '10px', backgroundColor: 'white', border: 'white',cursor:'pointer' }} className={style.buttonstyle}>上架</button>);
                }
                function Downbutton  () {
                    return (<button onClick={showDowndateModal} style={{ marginRight: '10px', backgroundColor: 'white', border: 'white',cursor:'pointer' }} className={style.buttonstyle}>下架</button>);
                }
                return (
                    <>  <button onClick={async () => {
                        let url = "/api/console/goods/search";
                        try { 
                            let response = await fetch(url,{
                                method:'POST',
                                mode:'cors',
                                headers: {//请求头
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    pageIndex: 0,
                                    pageSize: 0,
                                    keyword: record.title,
                                }),
                            });
                            let res= await response.json();
                            if(res.stat === 'ok'){
                                res.data.items.map(data => {
                                    setlist.setId(data.id);
                                    setlist.setTitle(data.title);
                                    setlist.setPrice(data.price);
                                    setlist.setCover(data.cover);
                                    setlist.setLimit(data.limit);
                                })
                                this.props.history.push('/goods/set')
                            }
                            else{
                                alert(res.msg)
                            }
                        }
                        catch(error){
                            console.log(error);
                        }
                        // window.setInterval(,3000)
                     }} style={{ marginRight: '10px', backgroundColor: 'white', border: 'white',cursor:'pointer' }} className={style.buttonstyle} >
                            编辑
                        </button>
                        
                        {/* {isupdate? <Upbutton/>:<Downbutton/>} */}
                        {(()=> {
                        if (record.status == 0 || record.status == 1) {
                            return <Downbutton/>;
                        } if(record.status == 2) {
                            return <Upbutton/>;
                        }
                        })()}
                        
                        <button onClick={showDeletdModal} style={{marginRight:'10px',backgroundColor:'white',border:'white',cursor:'pointer'}} className={style.buttonstyle}>
                            删除
                        </button>
                        <button onClick={() => {
                            showWeightModal();                                                        
                        }}  style={{backgroundColor:'white',border:'white',cursor:'pointer'}} className={style.buttonstyle}>
                            设置权重
                        </button>
                            <Modal
                                title="设置权重"
                                centered
                                visible={isSetWeightModalVisible}
                            onOk={async () => {
                                handleOkWeight()
                                let url = '/api/console/goods/setweight';
                                try { 
                                    let response = await fetch(url,{
                                        method:'POST',
                                        mode:'cors',
                                        headers: {//请求头
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            id: record.id,
                                            weight:this.state.setweightvalue
                                        }),
                                    });
                                    let res= await response.json();
                                    if(res.stat === 'ok'){
                                      
                                            const {history} = this.props;
                                        history.push('/goods')
                                        this.search()
                                        
                                        // window.opener.location.href=window.opener.location.href;
                                    }
                                    else{
                                        alert(res.msg)
                                    }
                                }
                                catch(error){
                                    console.log(error);
                                }
                            }} onCancel={handleCancelWeight}
                                width={600}
                            >
                            <p style={{ display: "inline-block", marginRight: "30px" }}>权重</p>  <input type="text" style={{ width: "350px", border: "1px solid rgb(185, 182, 182)" }}
                                value={this.state.setweightvalue}
                                onChange={ (e) => this.setState({
                                    setweightvalue : e.target.value
                                })}
                               
                            />
                            </Modal>
                            {/* 删除对话框 */}
                            <Modal title="删除商品" visible={isDeleteModalVisible} onOk={()=>{handleOkDelete()
                                this.search()
                            }} onCancel={handleCancelDelete} centered>
                                <p>确定删除该商品吗</p>
                            </Modal>
                            {/* 上架对话框 */}
                        <Modal title="上架商品" visible={isUpdateModalVisible} onOk={async () => {
                            handleOkUpdate();
                            let url = '/api/console/goods/up';
                        try { 
                            let response = await fetch(url,{
                                method:'POST',
                                mode:'cors',
                                headers: {//请求头
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                   id:record.id
                                }),
                            });
                            let res= await response.json();
                            if (res.stat === 'ok') {
                                const isupdate = this.state.isupdate;
                                this.setState({isupdate:!isupdate})
                                const {history} = this.props;
                                history.push('/goods')
                                this.search()
                                // window.opener.location.href=window.opener.location.href;
                                
                            }
                            else{
                                alert(res.msg)
                            }
                        }
                        catch(error){
                            console.log(error);
                        }
                           
                        }} onCancel={handleCancelUpdate} centered>
                                <p>确定上架该商品吗</p>
                        </Modal>
                            {/* 下架对话框 */}
                        <Modal title="下架商品" visible={isDownModalVisible} onOk={async () => {
                            handleDown();
                             let url = '/api/console/goods/down';
                             try { 
                                 let response = await fetch(url,{
                                     method:'POST',
                                     mode:'cors',
                                     headers: {//请求头
                                         'Content-Type': 'application/json'
                                     },
                                     body: JSON.stringify({
                                        id:record.id
                                     }),
                                 });
                                 let res= await response.json();
                                 if (res.stat === 'ok') {
                                     const {history} = this.props;
                                     history.push('/goods')
                                     this.search()
                                 }
                                 else{
                                     alert(res.msg)
                                 }
                             }
                             catch(error){
                                 console.log(error);
                             }
                                }} onCancel={handleCancelDown} centered>
                                <p>确定下架该商品吗</p>
                            </Modal>

                    </>
                )
            }                            
          },
    ]
    
    addgoods  ()  {
        this.props.history.push('/goods/add')

    }
     countDown(time) {
        // let inputtime = +new Date(time);
         let now = new Date(time);
         let year = now.getFullYear();
         let month = now.getMonth() + 1;
         let day = now.getDate();
        //  let hour = now.getHours;
         return year + '年' + month + '月' + day + '日';
        
    
    }
    render(){
        return(
            <React.Fragment>
                <div className={style.box}>
                    <Header />
                    <Layout style={{ height:'100%'}}>
                        <Sider >
                            <SMenu />
                        </Sider>
                        <Layout style={{padding: '20px 30px 0 30px' ,backgroundColor:'#ffffff'}}>
                            <Content>
                                <div className={style.content_title}>
                                    <div>
                                        <Button onClick={() => this.addgoods()}>添加商品</Button>
                                    </div>
                                    <div className={style.content_title_right}>
                                        <Input className={style.content_input}
                                            value={this.state.searchvalue}
                                            onChange={ this.handlesearch}
                                        />
                                        <Button onClick={this.search} className={style.content_button}>搜索</Button>
                                        <Button onClick={this.reSet}>重置</Button>
                                    </div>
                                </div>
                                
                                <Table 
                                        columns={this.columns} 
                                        size="middle"
                                        dataSource={this.state.dataSource}
                                      />
                            </Content>
                        </Layout>
                    </Layout>
                </div>
            </React.Fragment>
        )
    }
}

