# task-flex1说明：

### 布局思路：

页面包含header和main两个盒子。header盒子为flex布局，其中包含一个子盒子。main盒子包含三个子盒子分别为recommend、new_song、MV。recommend盒子为flex布局。包含三个子盒子。第三个子盒子利用grid布局，其子盒子有利用了flex布局，其余new_song、MV盒子同理。

### css样式（重点）：

display：grid布局

display：flex布局

css变换，过度的用法：

.cover_wrap {

  display: flex;

  position: relative;

  overflow: hidden;

  width: 100%;

  margin-bottom: 15px;

  align-items: center;

  justify-content: center;

  cursor: pointer;

}



.cover_mask {

  position: absolute;

  left: 0;

  top: 0;

  right: 0;

  bottom: 0;

  background: #000;

  opacity: 0;

  transition: all 0.5s;

}



.cover_play {

  position: absolute;

  left: 15%;

  top: 15%;

  /* transform: translate(-50%, -50%); */

  margin-left: -35px;

  margin-top: -35px;

  opacity: 0;

  transform: scale(0.7);

  transition: all 0.5s;

  width: 40px;

  height: 40px;

}



.cover_wrap:hover .cover_mask {

  opacity: 0.2;

}



.cover_wrap:hover .cover_play {

  opacity: 1;

  transform: scale(1);

}

### 问题以及解决方法：

背景色的渐变并未加入到页面之中

 background: -webkit-linear-gradient(#ddd, #ccc);

  background: -o-linear-gradient(#ddd, #ccc);

  background: -moz-linear-gradient(#ddd, #ccc);

  background: linear-gradient(#ddd, #ccc); 

可能是由于自己设置盒子宽度高度出现问题，导致盒子背景的渐变不能够与body的渐变同步

### 注意事项：

无。

