import { iTodo , todoObj } from './type.js' 

interface Istate {
  inputvalue: string;
  todo: iTodo;
  todolist: iTodo[];
}
class App extends React.Component<any,Istate> {

  state: Istate = {
    todolist: JSON.parse(localStorage.getItem("todolist")),
    todo: null,
    inputvalue: ""
  }
  dump(todolist: iTodo[]){
    localStorage.setItem("todolist", JSON.stringify(todolist))
  }

  // 添加Todo条目
  addItem(todo: iTodo, isInit = false) {
    //更新react组件的内容
    //this.state.todolist.push(todo)
    this.setState({
      //更新数组，setState有自己的生命周期
      todolist:  [...this.state.todolist,todo]
    })
    this.dump(this.state.todolist)
  }

  //切换todo条目状态
  toggleItem(todo: iTodo,className){
    console.log("切换todo的状态")
    todo.finished = !todo.finished
    if (todo.finished === true) className = "todo-item todo-finished"
    else className = "todo-title"
    //重新更新
    this.setState({
      todolist: this.state.todolist
    })
    this.dump(this.state.todolist)
    return className
  }

  //删除todo条目状态
  delItem(todo: iTodo){
    //获取todo所在的位置
    console.log("删除todo")
    let index = this.state.todolist.indexOf(todo)
    console.log(index)
    this.state.todolist.splice(index,1)
    this.setState({
      todolist: this.state.todolist
    })
    this.dump(this.state.todolist)
  }
  render() {
    return (
      <>
      <header>
      <div className="title">TS Todo</div>
          <input id="input" type="text" className="input" placeholder="What needs to be done?" autoComplete="off"
            value={this.state.inputvalue}
            onChange={ (e) => this.setState({
              inputvalue : e.target.value
            })}
            onKeyDown={ (e) => {
              if(e.key === 'Enter'){
                let todo = new todoObj({content: this.state.inputvalue , finished:false})
                this.addItem(todo)
              }
             }
            }
          />
      </header>
      <section id="todos">
          {
            this.state.todolist.map( todo => {
              let className1 = "todo-item"
              if (todo.finished === true) className1 += " todo-finished"
              let className2 = "todo-title"
              return (
                <div className={className1}>
                  <i 
                    className="iconfont icon-checkbox"
                    onClick={ () => {
                      className2 = this.toggleItem(todo,className2)
                    } }>
                  </i>
                  <span className={className2}>{todo.content}</span>
                  <i 
                    className="iconfont icon-delete" 
                    onClick={() => this.delItem(todo)}>
                  </i>
                </div>
              )
            } )
          }
        </section>
            
        </>
  )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))