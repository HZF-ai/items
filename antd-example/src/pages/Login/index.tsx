import * as React from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import style from './style.less'
import { Form, Input,Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

interface State{
    username: string;
    password: string;
    clicks: number;
}
export default class Main extends React.Component<RouteComponentProps,State> {

    state:State = {
        username: localStorage.getItem('account'),
        password: localStorage.getItem('pwd'),
        clicks:0
    }
    storeData(username, password){
        if(localStorage.getItem('result') === 'true'){
            this.state.clicks = 1;
            // console.log(this.state.clicks)
        }
        this.state.clicks++;
        // console.log(this.state.clicks)
        if(this.state.clicks % 2 === 1){
            localStorage.setItem('account',username);
            localStorage.setItem('pwd',password);
            localStorage.setItem('result','true');
        }
        else{
            localStorage.setItem('account','');
            localStorage.setItem('pwd','');
            localStorage.setItem('result','');
        }
    }
    //上传数据到服务器，并获取状态，返回信息。
    async  getToken(username,password){
        let url = '/api/console/auth/login';
        let obj = {}
        obj["account"] = username;
        obj["pwd"] = password;
        console.log(obj);
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
                const {history} = this.props;
                history.push('/rich');
            }
            else{
                alert(res.msg)
            }
        }
        catch(error){
            console.log(error);
        }
    }
    onFinish = (values: any) =>{
        console.log('收到数据', values)
    }
    render() {
        return (
            <React.Fragment>
                <div className={style.box}>
                    <Form 
                        name="login"
                        className={style.form_login}
                        initialValues={{remember: true}}
                        onFinish={this.onFinish}
                    >
                        <span>花光他们的钱后台</span>
                        <Form.Item 
                            name ="username"
                            // rules={[{ required: true, message: '请输入用户名！'}]}
                            className={style.form_login_input_item}
                        >
                            <Input 
                                prefix={ <UserOutlined  /> }
                                placeholder="Username"
                                defaultValue={localStorage.getItem('account')}
                                value={this.state.username }
                                onChange={ (e) => { this.setState({username: e.target.value})
                                                    localStorage.setItem('account', e.target.value)}}
                            />
                        </Form.Item>
                        <Form.Item 
                            name="password"
                            // rules={[{ required: true, message:'请输入密码'}]}
                            className={style.form_login_input_item}
                        >
                            <Input 
                                prefix={ <LockOutlined  />} 
                                type="password"
                                placeholder="password"
                                defaultValue={localStorage.getItem('pwd')}
                                value={this.state.password }
                                onChange={ (e) => { this.setState({password: e.target.value});
                                                    localStorage.setItem('pwd', e.target.value)}}
                            />
                        </Form.Item>
                        <Form.Item className={style.form_login_checkbox_item}>
                            <Form.Item name="remember" valuePropName="checked" noStyle></Form.Item>
                            <Checkbox 
                                className={style.form_login_checkbox}
                                defaultChecked={Boolean(localStorage.getItem('result'))}
                                onClick={() => this.storeData(this.state.username, this.state.password)}
                            >  记住密码</Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                className={style.form_login_button}
                                onClick={() =>this.getToken(this.state.username, this.state.password)}
                            >
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </React.Fragment>
        )
    }
}
