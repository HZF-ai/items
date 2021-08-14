import * as React from 'react'
import { RouteComponentProps, Link, withRouter } from 'react-router-dom'
import style from './style.less'
import { ExportOutlined } from '@ant-design/icons'
class Header extends React.Component<RouteComponentProps> {
    
    loginOut(){
        const { history } = this.props;
        history.push('/login');
    }

    render(){
        return(
            <React.Fragment>
                 <div className={style.header}>
                    <p>花光他们的钱管理后台</p>
                    <div className="login_out">
                        <p>
                            admin&nbsp;&nbsp;
                            <ExportOutlined 
                                onClick={ () => this.loginOut() }
                            />
                        </p>{/*这里应该是login的username,getUserInfo*/}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default withRouter(Header);