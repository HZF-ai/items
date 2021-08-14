import * as React from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import style from './style.less'
import { Layout, Menu, Button, Input,Modal,Table,Switch,Upload } from 'antd'
import Header from '../../compontent/Header'
import SMenu from '../../compontent/Menu'
import Avator from "../../compontent/Upload"
import { observer } from 'mobx-react'
import setlist from '../../mobx/setlist'
import richer from '../../mobx/Richer'
// import { Modal, Button } from 'antd';
const { Content, Sider } = Layout;

interface IState {
    id:string
    title: string;
    price: string;
    cover: string;
    limit: string;
   
    
}
@observer
export default class Goods_Set extends React.Component<RouteComponentProps,IState> {
    // const[isModalVisible, setIsModalVisible] = useState(false);
    
        
   
    constructor(props) {
        super(props)
        this.state = {
            id:setlist.id,
            title: setlist.title,
            price: setlist.price,
            cover: setlist.cover,
            limit: setlist.limit,
        }
    }

    onChange(e) {
        this.setState({
            title: e.target.title,
            price: e.target.price,
            cover: e.target.cover,
            limit:e.target.limit,
            })
        }
    async getToken(){
        let lim:string
        if (this.state.limit === ''){
            lim = '0'
        }else {
            lim = this.state.limit
        }
        let url = '/api/console/goods/add';
        try {
            let response = await fetch(url,{
                method:'POST',
                mode:'cors',
                headers: {//请求头
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: this.state.id,
                    title: this.state.title,
                    price: this.state.price,
                    cover: richer.avatar,
                    limit: lim,
                }),
            });
            let res= await response.json();
            console.log(res)
            if(res.stat === 'ok'){
                const {history} = this.props;
                history.push('/goods');
            }
            else{
                alert(res.msg)
            }
        }
        catch(error){
            console.log(error);
        }
    }

    onSubmit(e) {
        e.preventDefault();
        this.getToken()
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
                                        <Button style={{display:'none'}}>编辑商品</Button>
                                    </div>                                    
                                </div>
                                <div className={style.list}>
                                    <form action="" onSubmit = {this.onSubmit.bind(this)}>
                                        <div className={style.listformdiv}>
                                            商品名称 <input   className={style.listformdivinput} type="text"
                                                value={this.state.title}
                                                onChange={ (e) => this.setState({
                                                    title : e.target.value
                                                })}
                                            />
                                            商品价格 <input  className={style.listformdivinput} type="text"
                                                value={this.state.price}
                                                onChange={ (e) => this.setState({
                                                    price : e.target.value
                                                })}
                                            />
                                        </div>
                                        <div className={style.listformdiv}>
                                            是否限购 <div className={style.switch}>                                                                                              
                                                    <Switch defaultChecked />
                                                                                                    
                                            </div> 限购数量 <input  className={style.listformdivinput} type="text"
                                                value={this.state.limit}
                                                onChange={ (e) => {
                                                    this.setState({
                                                    limit : e.target.value
                                                })}}
                                            />
                                        </div>
                                        <div className={style.imglidiv}>
                                            <li className={style.imgli}>图片</li>
                                            <li className={style.imgdiv}>
                                                <Avator ></Avator>
                                            </li>
                                        </div>
                                        <button type="submit" className={style.savebutton}>保存</button>
                                    </form>
                                </div>
                            </Content>
                        </Layout>
                    </Layout>
                </div>
            </React.Fragment>
        )
    }
}

