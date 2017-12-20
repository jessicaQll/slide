# slide
Customize the slide plug-in

插件说明：
此插件slide基于jQuery库编写，默认显示5个轮播子元素，实际轮播子元素个数为10，每次移动距离为1个轮播子元素

效果说明：

点击左箭头，显示左侧不可见元素

点击右键头，显示右侧不可见元素

使用方法：

使用前确认已经引入jQuery库文件，在引入slide.js文件，最后再调用。

引入轮播样式：

.collect-list {//轮播可视区样式

    width: 1200px;
    
    height: 300px;
    
    overflow: hidden;
    
    position: relative;

}

.box-parent {//轮播元素父元素，高度height设置可选，宽度width无需设置，插件通过js给width赋值
 
    position: relative;
  
}

.collect-box {//轮播元素

    height: 300px;
    
    position: absolute;
    
    top: 0;

}

.clear-float:after {//消去浮动给父元素高度的影响

    conotent: ";
    
    display: block;
    
    clear: both;
    
}

引用html结构：

<!-- 

 <div class="collect-list">

  <div class="box-parent">

   <ul class="collect-box clear-float">

    //此处添加轮播子元素

   </ul>

  </div>
  
-->

 </div>
