import {useState} from "react";
import {Button, message, Modal} from "antd";
import * as React from "react";
import style from "../../pages/Rich/style.less";
import Avatar from "../Upload";
import richer from '../../mobx/Richer/index'

export function AddButton() {
    const [isModalVisibleAdd, setIsModalVisibleAdd] = useState(false);

    let nameref:React.RefObject<HTMLInputElement> = React.createRef()
    let worthref:React.RefObject<HTMLInputElement> = React.createRef()

    const showModalAdd = () => {
        setIsModalVisibleAdd(true);
    };

    const handleOkAdd = () => {
        richer.setNickname(nameref.current.value)
        richer.setWorth(parseInt(worthref.current.value))
        if (richer.nickname !== ''){
            richadd()
        }else {
            message.error('用户名为空')
        }
        setIsModalVisibleAdd(false);
    };

    async function richadd(){
        let url = '/api/console/rich/add';
        let obj = {}
        obj["nickname"] = richer.nickname;
        obj["worth"] = richer.worth;
        obj["avatar"] = richer.avatar;
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
                window.location.href = '/rich'
                // const {history} = this.props;
                // history.push('/rich');
            }
            else{
                alert(res.msg)
            }
        }
        catch(error){
            console.log(error);
        }
    }

    const handleCancelAdd = () => {
        setIsModalVisibleAdd(false);
    };

    return (<div>
        <Button onClick={showModalAdd}>添加富豪</Button>
        <Modal title="添加富豪" visible={isModalVisibleAdd} onOk={handleOkAdd} onCancel={handleCancelAdd}>
            <form action="">
                <div  style={{width:'80px'}}>富豪名称</div>
                <input style={{width: '320px',
                    height: '40px',
                    border: '1px solid rgb(185, 182, 182)',
                    marginTop: '15px'}} ref={nameref} type="text"  />
                <br/>
                <div style={{width:'80px'}}>身价</div>
                <input style={{width: '320px',
                    height: '40px',
                    border: '1px solid rgb(185, 182, 182)',
                    marginTop: '15px'}} ref={worthref} type="text" />
                <br/>
                <div className={style.add_cover} >
                    <div className={style.add_title}>头像</div>
                    <Avatar/>
                </div>
            </form>
        </Modal>
    </div>)
}