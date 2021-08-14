import * as React from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import style from './style.less'
import {Layout, Menu, Button, Input, Table, Radio, Modal} from 'antd'
import Header from '../../compontent/Header'
import SMenu from '../../compontent/Menu'
import {useState} from "react";
import {AddButton} from "../../compontent/RichAdd";
import Avatar from "../../compontent/Upload";
const { Content, Sider } = Layout;
import Richer from '../../mobx/Richer/index'

interface rich {
    inputnamevalue : string
    inputworthvaule : string
    inputvalue : string
    dataSoure : richer[]
}

interface richer {
    id : string
    nickname: string
    avatar: string
    worth: number
}

export default class Rich extends React.Component<RouteComponentProps,rich> {

    searef : React.RefObject<HTMLInputElement>

    constructor(props) {
        super(props);
        this.searef = React.createRef()
        this.state = ({
            inputnamevalue : '',
            inputworthvaule : '',
            inputvalue : '',
            dataSoure : []
        })
    }
    columns = [{title: '富豪名称', dataIndex: 'nickname', key: 'nickname',align:'center',width:'150px'},
        {title: '身价', dataIndex: 'worth', key: 'worth',align:'center',width:'150px'},
        {title: '头像', dataIndex: 'avatar', key: 'avatar',align:'center',width:'100px',
            render:(avatar) => {
                return (
                    <>
                        <img style={{width:'16px',height:'16px'}} src={`http://127.0.0.1:3000${avatar}`}/>
                    </>
                )
            }
        },
        {title: '', dataIndex: '', key: '',align:'center'},
        {
            title: '操作', dataIndex: 'action', key: 'action', align: 'center', width: '130px',
            render: (text,record) => {

                const [isModalVisibleSet, setIsModalVisibleSet] = useState(false);
                const [isModalVisibleDel, setIsModalVisibleDel] = useState(false);
                async function showModalSet(str){
                    Richer.setNickname(str.nickname)
                    Richer.setWorth(str.worth.toString())
                    Richer.setAvatar(str.avatar)
                    setIsModalVisibleSet(true);
                };

                const handleOkSet = () => {
                    console.log(123456789)
                    setIsModalVisibleSet(false);
                };

                const handleCancelSet = () => {
                    setIsModalVisibleSet(false);
                };

                const showModalDel = () => {
                    setIsModalVisibleDel(true);
                };

                async function handleOkDel(str:string){
                    let url = '/api/console/rich/delete';
                    let obj = {}
                    obj["id"] = str;
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
                        console.log(res)
                        if(res.stat === 'ok'){

                        }
                        else{
                            alert(res.msg)
                        }
                    }
                    catch(error){
                        console.log(error);
                    }
                    setIsModalVisibleDel(false);
                };

                const handleCancelDel = () => {
                    setIsModalVisibleDel(false);
                };
                return (<>
                    <button style={{marginRight: '10px', backgroundColor: 'white', border: 'white'}} onClick={()=>{
                        showModalSet(record)
                        this.setState({
                            inputworthvaule : Richer.worth.toString(),
                            inputnamevalue : Richer.nickname
                        })
                        }
                    }>
                        编辑
                    </button>
                    <Modal title="编辑富豪" visible={isModalVisibleSet} onOk={()=>{
                        console.log(record);
                        console.log(record.id)
                        this.richset(record.id)
                        handleOkSet()
                        this.richsearch()
                    }} onCancel={handleCancelSet}>
                        <form action="">
                            <div style={{width:'80px'}}>富豪名称</div>
                            <input type="text" style={{width: '320px',
                                height: '40px',
                                border: '1px solid rgb(185, 182, 182)',
                                marginTop: '15px'}} value={this.state.inputnamevalue} onChange={(e) => this.setState({
                                inputnamevalue: e.target.value})}/>
                            <br/>
                            <div style={{width:'80px'}}>身价</div>
                            <input type="text" style={{width: '320px',
                                height: '40px',
                                border: '1px solid rgb(185, 182, 182)',
                                marginTop: '15px'}} value={this.state.inputworthvaule} onChange={(e) => this.setState({
                                inputworthvaule: e.target.value})}/>
                            <br/>

                            <div className={style.add_cover} >
                                <div className={style.add_title}>头像</div>
                                <Avatar/>
                            </div>
                        </form>
                    </Modal>
                    <button style={{backgroundColor: 'white', border: 'white'}} onClick={showModalDel}>
                        删除
                    </button>
                    <Modal title="删除富豪" visible={isModalVisibleDel} onOk={()=>{
                        handleOkDel(record.id)
                        this.richsearch()
                    }} onCancel={handleCancelDel}>
                        <p>确定删除该富豪吗？</p>
                    </Modal>
                </>)
        }
        },]

    componentDidMount() {
        this.richsearch()
    }

    setinput(){
        this.setState({
            inputvalue : ''
        })
    }

    async richsearch(){
        let url = '/api/console/rich/search';
        let obj = {}
        obj["pageIndex"] = 0;
        obj["pageSize"] = 0;
        obj["keyword"] = this.state.inputvalue;
        console.log(this.state.inputvalue)
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
                    let rich:richer = {
                        id : data.id,
                        nickname: data.nickname,
                        avatar : data.avatar,
                        worth :data.worth
                    }
                    r.push(rich)
                })
                this.setState({
                    dataSoure : r
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

    async richset(id:string){
        let url = '/api/console/rich/set';
        let obj = {}
        obj["id"] = id;
        obj["nickname"] = this.state.inputnamevalue;
        obj["worth"] = this.state.inputworthvaule;
        obj["avatar"] = Richer.avatar
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
            console.log(res)
            if(res.stat === 'ok'){

            }
            else{
                alert(res.msg)
            }
        }
        catch(error){
            console.log(error);
        }
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
                        <Layout style={{padding: '20px 30px 0 20px' ,backgroundColor:'#ffffff'}}>
                            <Content>
                                <div className={style.content_title}>
                                    <AddButton />
                                    <div className={style.content_title_right}>
                                        <Input className={style.content_input} type="text" value={this.state.inputvalue}
                                               onChange={(e) => this.setState({
                                            inputvalue: e.target.value})}
                                        />
                                        <Button className={style.content_button} onClick={()=>this.richsearch()}>搜索</Button>
                                        <Button onClick={()=>this.setinput()}>重置</Button>
                                    </div>
                                </div>
                                <Table dataSource={this.state.dataSoure}
                                       // pagination={{ position: ['none'] }}
                                       size="middle"
                                       columns={this.columns} />
                            </Content>
                        </Layout>
                    </Layout>
                </div>
            </React.Fragment>
        )
    }
}
