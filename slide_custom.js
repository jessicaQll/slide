;(function($){
    $.fn.slide_custom = function(options){

        var defaults = {
            moveStep: 1,//元素移动个数
            showIndex: null, //显示区显示的个数
            imgQuantity : null,//轮播实际个数
            slideStep : null,//轮播左移步长
            slideInterval : 2000,//轮播时间间隔
            slideDuration : 1000,//动画滑动时间
            prevClassName: "prev-arrow",//左侧移动按钮类名
            nextClassName: "next-arrow",//右侧移动按钮类名
            slideEleClassName: "collect-box",//轮播元素类名
            slideParentClassName: "box-parent",//轮播父元素类名
            hasArrow: false//是否有箭头点击效果
        };

        var opts = $.extend(defaults, options || {});
        var imgIndex = opts.showIndex;//显示区第一个元素,即显示区显示的个数
        var currentLeft;//当前left值
        var slideTimer = null;//轮播定时器
        var $slideEle = $("." + opts.slideEleClassName);//轮播元素
        var $slideEleParent = $("." + opts.slideParentClassName);//轮播父元素
        var $prevClassName = $("." + opts.prevClassName);//左侧移动按钮
        var $nextClassName = $("." + opts.nextClassName);//右侧移动按钮
        // var maxIndex = null;//轮播索引临界值

        //计算显示 显示个数与轮播实际个数的最小公倍数
        var virtualQuantity = lowestCommonMultiple(opts.showIndex,opts.imgQuantity,opts.moveStep);

        var $slideLists = $slideEle.children();

        //动态添加轮播子元素
        for(var cycleIndex = 1; cycleIndex<virtualQuantity/opts.imgQuantity; cycleIndex++){
            $slideLists.clone(true).appendTo($slideEle);
        }
        //获取轮播item的前showIndex个元素
        var $frontEle = $slideLists.slice(0,opts.showIndex);
        $frontEle.clone(true).appendTo($slideEle);//继续添加轮播后附属图

        //存在箭头点击事件，则继续补充轮播子元素
        if(opts.hasArrow) {
            if(opts.moveStep != 1){
                for (var cycleIndex = 0; cycleIndex < virtualQuantity / opts.imgQuantity; cycleIndex++) {
                    $slideLists.clone(true).prependTo($slideEle);
                }
            }
            //获取轮播item的后showIndex个元素
            var $backEle = $slideLists.slice(opts.imgQuantity - opts.showIndex, opts.imgQuantity);
            $backEle.clone(true).prependTo($slideEle);//继续添加轮播前附属图
        }

        if(opts.hasArrow){
            imgIndex = virtualQuantity + opts.showIndex;
            // var maxIndex = $slideEle.children().length - opts.showIndex;//轮播索引临界值
        }else{
            // var maxIndex = $slideEle.children().length;//轮播索引临界值
            imgIndex = 0;
        }
        var boxWidth = opts.slideStep * $slideEle.children().length;//轮播父元素宽度
        var maxIndex = $slideEle.children().length - opts.showIndex;//轮播索引临界值
        $slideEle.css("left" , -imgIndex * opts.slideStep);//设置初始最左端显示item

        //设置.box-parent宽度，是轮播item在一排显示
        $slideEleParent.width(boxWidth);//宽度=imgIndex*2 + slideStep * 元素个数

        console.log($slideEle.children().length);

        //计算三个数的最小公倍数
        function lowestCommonMultiple(a,b,c){
            for(var maxVal = Math.max(a,b); maxVal % a || maxVal % b; maxVal++){}
            var arguments = maxVal;
            for( maxVal = Math.max(arguments,c); maxVal % arguments || maxVal % c; maxVal++){}
            return maxVal;
        }
        //轮播
        function slide(){
            slideTimer = setInterval(function() {
                currentLeft = parseInt($slideEle.css("left"));
                // console.log(imgIndex);
                imgIndex = imgIndex + opts.moveStep;
                $slideEle.animate({ "left": currentLeft - opts.slideStep * opts.moveStep }, opts.slideDuration, function(){
                    if(imgIndex >= maxIndex){
                        if(opts.hasArrow){
                            imgIndex = virtualQuantity + opts.showIndex;
                        }else{
                            imgIndex = 0;
                        }
                        $slideEle.css( "left" , -imgIndex * opts.slideStep );
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
                    if(imgIndex <= opts.showIndex){
                        imgIndex = virtualQuantity + opts.showIndex;
                        $slideEle.css("left", -imgIndex * opts.slideStep);
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
                    if(imgIndex >= maxIndex){
                        imgIndex = virtualQuantity + opts.showIndex;
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
        if(!opts.hasArrow){
            $prevClassName.off();
        }
        slide();
        arrowStep();
    }
})(jQuery);