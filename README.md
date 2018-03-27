# slide
Customize the slide plug-in

插件说明：

此插件slide基于jQuery库编写，可通过参数hasArrow控制是否有箭头点击功能,参数hasBtn控制是否有切换按钮

效果说明：

点击左箭头，显示左侧不可见元素

点击右键头，显示右侧不可见元素

切换按钮

使用方法：

使用前确认已经引入jQuery库文件，在引入slide.js文件，最后再调用。

引入轮播样式：

    //样式中的宽度和高度可按实际需求更改

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

        height: 100%;

        position: absolute;

        top: 0;

    }

    .clear-float:after {//消去浮动给父元素高度的影响

        conotent: ";

        display: block;

        clear: both;

    }
    
    .switch-btn{
    
        width: 13px;
	
        height: 13px;
	    
        border-radius: 50%;
	    
        background-color: #808080;
	    
        float: left;
	    
        margin: 0 5px;
    }

    .btn-active{
	    
        background-color: #eee;

    }

引用html结构：

    <div class="collect-list">

        <div class="box-parent">

            <ul class="collect-box clear-float">
            
                <!-- 此处添加轮播子元素 -->

            </ul>

        </div>
        
        <div class="prev-arrow"></div><!-- 左移按钮 -->
       
        <div class="next-arrow"></div><!-- 右移按钮 -->
        
        <ul class="btn-box"></ul><!-- 切换按钮父元素，切换按钮类名为"switch-btn"，由slide-custome.js文件动态添加 --> 
    </div>

调用方法：

参数说明：

moveStep: 轮播移动轮播子元素个数，默认为1

showIndex: 显示区显示的个数，默认为null,必选

imgQuantity: 轮播实际个数，默认为null，必选

slideStep: 轮播移动步长，等于轮播子元素宽度，默认为null，必选

slideInterval: 轮播时间间隔，默认为2000，注意slideInterval参数要大于slideDuration参数

slideDuration: 动画滑动时间，默认为1000

prevClassName: 左移按钮类名，默认为“prev-arrow”

nextClassName: 右移按钮类名，默认为“next-arrow”

slideEleClassName: 轮播元素类名,默认为“collect-box”

slideParentClassName: 轮播父元素类名,默认为“box-parent”

hasArrow: 控制是否有箭头点击功能，默认为false

hasBtn: 控制是否有切换按钮，默认为true

例如：

    //.collect-lsit为可视区类名

    $(".collect-list").slide_custom({ 
    
        showIndex: 5,
        
        imgQuantity: 10,
        
        slideStep: null,
        
        hasArrow: true
        
    });

    注意：一下html通过js动态添加效果相同，需动态添加调用改轮播插件需在js动态添加html之后调用
    
    <div class="collect-list">
    
        <div class="box-parent">
        
            <div class="collect-box clear-float">
        
                <dl class="collect-item left">
                
                    <dt class="collect-item-img">
                        
                        <img src="../images/product_images/product01.png" alt="收藏图片">
                        
                    </dt>
                    
                    <dd class="collect-item-title">潮流阁化妆技巧0</dd>
                    
                    <dd class="collect-item-price">￥120.00</dd>
                    
                </dl>
                
                <dl class="collect-item left">
                
                    <dt class="collect-item-img">
                    
                        <img src="../images/product_images/product01.png" alt="收藏图片">
                        
                    </dt>
                    
                    <dd class="collect-item-title">潮流阁化妆技巧1</dd>
                    
                    <dd class="collect-item-price">￥120.00</dd>
                    
                </dl>
                
                <!-- 此处省略dl轮播子元素 --> 
                        
                <dl class="collect-item left">
                
                    <dt class="collect-item-img">
                    
                        <img src="../images/product_images/product01.png" alt="收藏图片">
                        
                    </dt>
                    
                    <dd class="collect-item-title">潮流阁化妆技巧9</dd>
                    
                    <dd class="collect-item-price">￥120.00</dd>
                    
                </dl>
                
            </div>
            
        </div>
        
        <div class="prev-arrow"></div>
        
        <div class="next-arrow"></div>
        
        <ul class="btn-box"></ul>
        
    </div>
