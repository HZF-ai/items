# task-todo #

## 思路 ##

1. 构建type.ts定义iTodo类以及创建todo对象的方法。
2. 主要是如何通过react更新todo的问题，刚开始不知道如何写，后来去看了官网的游戏教程，对react的组件以及父子组件有了一定的了解，对组件之间以及通过state传参也有了一定的理解。
3. todo页面主要是通过建立state传参
```
   state:State = {
       todos:[]  //todo的数组
       todo:null //单个todo
       value: ""//获取input的值
   }
```
4. 通过`this.state.todos.map( todo => {})` 遍历todo元素，如果发生改变则通过setState更新，再写入本地数据库
5. 关于读取本地数据库的数据。

## 遇到的问题 ##

1. 在获取input的value时，遇到`e.target.value` 无法获取数据，因为报错target不存在value这个属性。后来通过给state设置value值，获取数据。
2. 刚开始点击和删除条目没有效果，因为没有在切换状态和删除函数里没有setState更新todo的数组信息。在每个函数里更新一下就可以。
3. 每次刷新页面todo消失，在赋初值的时候给todo赋予localStorage中的数据即可。

