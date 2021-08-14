import * as React from 'react';
import style from './style.less';

export default class Order extends React.Component{
    render(){
        return(
            <React.Fragment>
                {
                    JSON.parse(localStorage.getItem("order")).map((item) => {
                        let money ;
                        if(item.moneySingle > 1000 && item.moneySingle < 1000000){
                            money = item.moneySingle / 1000 + 'k';
                        }
                        else if(item.moneySingle > 1000000 && item.moneySingle < 1000000000){
                            money = item.moneySingle / 1000000 + 'm';
                        }
                        else if(item.moneySingle > 1000000000 ){
                            money = item.moneySingle / 1000000000 + 'b';
                        }
                        return(
                            <div className={style.orderSingle}>
                                <span className={style.orderTitle}>{item.title}</span>
                                <span className={style.orderCount}>x{item.count}</span>
                                <span className={style.orderMoney}>${money}</span>
                            </div>
                        )
                    })
                }
            </React.Fragment>
        )
    }
}
