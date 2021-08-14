# task-flex1说明：

### 布局思路：

所有内容由一个biggest_box包围，，宽度100%，高度随内容变化而自适应。biggest_box盒子里面包含两个header和center盒子。header盒子里包含top和bottom两个盒子。header包含两个子盒子。center盒子为flex布局，包含五个子盒子，每个子盒子又包含三个子盒子，最后一个子盒子采用flex布局，又又包含四个子盒子。

### css样式（重点）：



display：flex布局

文本内容溢出与隐藏：

text-overflow: -o-ellipsis-lastline;

  overflow: hidden;

  text-overflow: ellipsis;

  display: -webkit-box;

  -webkit-line-clamp: 2;

  -webkit-box-orient: vertical;

### 问题以及解决方法：

给盒子设置圆角边框时盒子中的图片边框没有发生变化，解决办法：让盒子中的图片也设置圆角边框

未解决问题：页面最上端一直有一条黑线无法消除

### 注意事项：

暂时无。

