$(function () {


    //$(".flashBanner .bigImg").attr("src", $($(".flashBanner .mask a")[0]).attr("uri"));
    $($(".flashBanner .mask a")[0]).addClass("show");
    $(".flashBanner .bigImg").css("opacity", "0")
    $($(".flashBanner .bigImg")[0]).css("opacity", "1")

    $(".flashBanner").each(function () {
        var timer;
        $(".flashBanner .mask a").click(function () {
            var index = $(".flashBanner .mask a").index($(this));


            changeImg(index);

        }).eq(0).click(function () {

            //第一张
            var _count = $(".flashBanner .mask a").length;

            $($(".flashBanner .mask a")[0]).addClass("show");

            $(".flashBanner .bigImg").attr("src", $(".flashBanner .mask a").eq(index).attr("uri")).fadeIn("slow");

        });

        $(this).find(".mask").animate({ "bottom": "0" }, 0);

        //        $(".flashBanner").hover(function () {
        //            clearInterval(timer);
        //        }, function () {
        //            timer = setInterval(function () {
        //                var show = $(".flashBanner .mask a.show").index();
        //                if (show >= $(".flashBanner .mask a").length - 1)
        //                    show = 0;
        //                else
        //                    show++;

        //                changeImg(show);
        //            }, 3000);
        //        });
        function changeImg(index) {

            var _index2 = $(".mask a").index($(".show"));
            //左右箭头的指示
            var _count = $(".flashBanner .mask a").length;

        
            $(".flashBanner .mask a").removeClass("show").eq(index).addClass("show");



            //$(".flashBanner .bigImg").css("opacity", "0");

            
                var _bimgurl = $($(".flashBanner .mask a")[0]).attr("uri");


                setTimeout("ImgClose(" + _index2 + ")", 0);

                setTimeout("ImgClose2(" + (index) + ")", 1);
          
        }

        //自动轮播
        //        timer = setInterval(function () {
        //            var show = $(".flashBanner .mask a.show").index();
        //            if (show >= $(".flashBanner .mask a").length - 1)
        //                show = 0;
        //            else
        //                show++;
        //            changeImg(show);
        //        }, 3000);
    });


});




//上一条
function changeImg2() {

    var _count = $(".flashBanner .mask a").length;

    var bigimgIndex = $(".flashBanner .mask a").index($(".show"));

    if (bigimgIndex==0) {

        $(".flashBanner .mask a").removeClass("show");
        $($(".flashBanner .mask a")[_count-1]).addClass("show");
       

        setTimeout("ImgClose(" + bigimgIndex + ")", 0);

        setTimeout("ImgClose2(" + (_count - 1) + ")", 1);
    } else {

        $(".flashBanner .mask a").removeClass("show");
        $($(".flashBanner .mask a")[bigimgIndex - 1]).addClass("show");
      
        setTimeout("ImgClose(" + bigimgIndex + ")", 0);

        setTimeout("ImgClose2(" + (bigimgIndex - 1) + ")", 1);
    }


}

function ImgClose(num) {

    $($(".flashBanner .bigImg")[num]).animate({ opacity: 0 }, 2000);


}

function ImgClose2(num) {

//    for (var i = 0; i < 1000; i++) {
//        $($(".flashBanner .bigImg")[num]).css("opacity", i * (0.001));
//    }


    $($(".flashBanner .bigImg")[num]).animate({ opacity: 1 }, 2000);

}

//下一条
function changeImg3() {

    var _count = $(".flashBanner .mask a").length;

    var bigimgIndex = $(".flashBanner .mask a").index($(".show"));

    if (bigimgIndex == _count - 1) {

        $(".flashBanner .mask a").removeClass("show");
        $($(".flashBanner .mask a")[0]).addClass("show");
        var _bimgurl = $($(".flashBanner .mask a")[0]).attr("uri");


        setTimeout("ImgClose(" + bigimgIndex + ")", 0);

        setTimeout("ImgClose2(" + (0) + ")", 1);
    } else {

        $(".flashBanner .mask a").removeClass("show");
        $($(".flashBanner .mask a")[bigimgIndex + 1]).addClass("show");
        var _bimgurl = $($(".flashBanner .mask a")[bigimgIndex + 1]).attr("uri");
        setTimeout("ImgClose(" + bigimgIndex + ")", 0);

        setTimeout("ImgClose2(" + (bigimgIndex + 1) + ")", 1);
    }

   

}