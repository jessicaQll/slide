;(function($){
    $.fn.slide_custom = function(options){

        var defaults = {
            moveStep: 1,//元素移动个数
            showIndex: 5, //显示区显示的个数
            imgQuantity : 10,//轮播实际个数
            slideStep : 240,//轮播左移步长
            slideInterval : 2000,//轮播时间间隔
            slideDuration : 1000,//动画滑动时间
            prevClassName: "",//左侧移动按钮类名
            nextClassName: "",//右侧移动按钮类名
            slideEleClassName: "",//轮播元素类名
            slideParentClassName: ""//轮播父元素类名
        };

        var opts = $.extend(defaults, options || {});

        var imgIndex = opts.showIndex;//显示区第一个元素,即显示区显示的个数
        var currentLeft;//当前left值
        var slideTimer = null;//轮播定时器
        var boxWidth = opts.slideStep * (opts.imgQuantity + opts.showIndex *2);//轮播父元素宽度
        var $slideEle = $("." + opts.slideEleClassName);//轮播元素
        var $slideEleParent = $("." + opts.slideParentClassName);//轮播父元素
        var $prevClassName = $("." + opts.prevClassName);//左侧移动按钮
        var $nextClassName = $("." + opts.nextClassName);//右侧移动按钮

        var $slideLists = $slideEle.children();
        //获取轮播item的前showIndex个元素
        var $frontEle = $slideLists.slice(0, opts.showIndex);
        //获取轮播item的后showIndex个元素
        var $backEle = $slideLists.slice(opts.imgQuantity - opts.showIndex, opts.imgQuantity);

        //动态添加轮播前后附属图
        $frontEle.clone().appendTo($slideEle);
        $backEle.clone().prependTo($slideEle);

        //设置.box-parent宽度，是轮播item在一排显示
        $slideEleParent.width(boxWidth);//宽度=imgIndex*2 + slideStep * 元素个数
        //设置初始最左端显示item
        $slideEle.css("left" ,-imgIndex * opts.slideStep );
        //轮播
        function slide(){
            slideTimer = setInterval(function() {
                currentLeft = parseInt($slideEle.css("left"));
                imgIndex = imgIndex + opts.moveStep;
                $slideEle.animate({ "left": currentLeft - opts.slideStep * opts.moveStep }, opts.slideDuration, function(){
                    if(imgIndex >= opts.imgQuantity + opts.showIndex){
                        imgIndex = opts.showIndex;
                        $slideEle.css( "left" , -imgIndex * opts.slideStep    );
                    }
                });
            },opts.slideInterval);
        }
        //箭头点击
        function arrowStep(){
            //左箭头点击事件
            $prevClassName.click(function(){
                if($slideEle.is(":animated")){
                    return;
                }
                currentLeft = parseInt($slideEle.css("left"));
                imgIndex = imgIndex - opts.moveStep;
                $slideEle.animate({ "left" : currentLeft + opts.slideStep * opts.moveStep }, opts.slideDuration, function(){
                    if(imgIndex <= 0){
                        imgIndex = opts.imgQuantity;
                        console.log(imgIndex);
                        $slideEle.css( "left" , -imgIndex * opts.slideStep );
                    }
                } );
            });
            //右箭头点击事件
            $nextClassName.click(function(){
                if($slideEle.is(":animated")){
                    return;
                }
                currentLeft = parseInt($slideEle.css("left"));
                imgIndex = imgIndex + opts.moveStep;
                $slideEle.animate({ "left" : currentLeft - opts.slideStep * opts.moveStep }, opts.slideDuration, function(){
                    if(imgIndex >= opts.imgQuantity + opts.showIndex){
                        imgIndex = opts.showIndex;
                        $slideEle.css( "left" , -imgIndex * opts.slideStep );
                    }
                } );
            });
        }
        //鼠标进出可视区
        this.mouseover(function(){
            clearInterval(slideTimer);
            slideTimer = null;
            $prevClassName.show();
            $nextClassName.show();
        });
        this.mouseout(function(){
            slide();
            $prevClassName.hide();
            $nextClassName.hide();
        });

        slide();
        arrowStep();
    }
})(jQuery);
