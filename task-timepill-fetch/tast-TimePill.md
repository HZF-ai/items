## HTML、CSS：

页面的设计按照官网的样式颜色进行设置。

包括index.html、open.html、put.html、put_done.html四个页面

### 思路：

将本地存储改为服务器存储通过fetch实现。首先从input获取nane、email、time、content、tip后通过fetch

fetch(`http://localhost:3280/api/add`, {

​      method: 'post',

​      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

​      body: JSON.stringify({

​        name: name,

​        email: ema,

​        time: inputtime,

​        content: content,

​        tip: tipmessage

​      })

​    })传送到服务器，然后通过.then（）操作拿到生成的id，并且id写入胶囊key的input框，用户拿取到id后在打开页面中通过

fetch(`http://localhost:3280/api/get`, {

​    method: 'post',

​    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

​    body: JSON.stringify({

​      id: Id

​    })

  }).获取到时间胶囊对应的id，讲id与先前用户所获得的胶囊key（即id）和时间两个因素作为判断条件，进行结果显示

#### 问题：

1、跨域问题：通过在vscode里面安装live server插件解决。

2http中header的理解

