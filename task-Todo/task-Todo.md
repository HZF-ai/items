# reademe：

思路：根据domo里面的todojs代码，看懂逻辑后去进行react的编写，在render（）里面返回的是整个页面的渲染，通过id取得main元素，将header里面的元素进行渲染的同时，及时获取到input输入框里面的内容，然后通过addItem函数将input的内容进行写入，并且在写入的同时存在localstorage，然后是对section标签里面的元素进行渲染，将存到loaclstorage里面的内容通过鼠标点击事件显示在包裹有i、span标签的div盒子里面。

### 反思与总结：

第一点就是此次作业在环境配置方面总是出错，用tsc编译时有错误，上网查询后了解到可以在带有node的环境下使用npx tsc可以进行tsx文件编译成js文件，

第二个点就是typescript的使用觉得自己还是存在问题，在编写的时候总时报错，这一点课后要继续巩固typescript的使用

第三点就是react中state和setstate的概念用法的理解，state浅显的理解就是用来定义组件的初始化状态，setstate能够改变其中的值。

第四点就是react中this指向的问题，一直很蒙

总结：在此次作业中，自己暴露出来的问题也是很多，短时间内并未能够很好的掌握react 、typescript。导致此次作业写的磕磕碰碰，都是在不断地请教同学，以及上网查阅资料进行编写。自己一定要利用周末的时间把自己的查缺补漏，现在继续进行课程的学习。
