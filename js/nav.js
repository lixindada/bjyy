$(function(){
	var speed = 5000,iNum = 0;	//speed 轮换间隔
	$('.bannerUl').after('<div class=\"tab\"></div>');
	$('.bannerUl li').not($('.bannerUl li:eq(0)')).hide();
	for(i=0;i<$('.bannerUl li').length;i++){
		if(i==0){
			$('.tab').append('<a href=\"#1\" class=\"on\">1</a>');
			}
		else{
			$('.tab').append('<a href=\"#1\">'+(i+1)+'</a>');
			}
		}
	$('.tab a').bind('mouseover',function(){
			var aIndex = $('.tab a').index(this);
			$('.on').removeClass('on');
			$(this).addClass('on');
			$('.bannerUl li').not($('.bannerUl li:eq('+aIndex+')')).hide();
			$('.bannerUl li').eq(aIndex).fadeIn();
			iNum = aIndex;
			})
	var autoPlay = function(){
		iNum++;
		if(iNum == $('.bannerUl li').length){iNum=0;}
		$('.on').removeClass('on');
		$('.tab a').eq(iNum).addClass('on');
		$('.bannerUl li').not($('.bannerUl li:eq('+iNum+')')).hide();
		$('.bannerUl li').eq(iNum).fadeIn();
		}
	var timer = setInterval(autoPlay,speed);
	$('.bannerDiv').hover(function(){clearInterval(timer);},function(){timer = setInterval(autoPlay,speed);});
  })//banner轮换
$(function(){
	var a = $('.top').width();
	if(a<1024){
		$('.logo').css('left',0);
		$('.menu').css('left',80);
		$('.link').css('right',0);
		};
	$('.menu>ul>li').hover(function(){
	    if ($(this).attr('class').indexOf('hover') < 0) {
	        $(this).find('img:not(:animated)').animate({ marginTop:-24}, 200);
			$(this).find('div:not(:animated)').slideDown();
	    }
	},function(){
	    if ($(this).attr('class').indexOf('hover') < 0) {
				$(this).find('div').slideUp();
		        $(this).find('img').animate({marginTop:0},300);
		    }
	});
	$('.menu>ul>li>div>ul>li').hover(function(){
	 	$(this).find('a:not(:animated)').animate({ marginTop:-24}, 200);
	},function(){
		$(this).find('a').animate({marginTop:0},300);	    
	});
	
	$('.link li a').hover(function(){
	$(this).animate({marginTop: -25 }, 200);
	},function(){
	$(this).animate({marginTop: 0 }, 300);
	})
});//导航
$(function(){
	$('.main .mr div.tit a').hover(function(){
		$(this).find('p').animate({ marginTop:-20}, 200);
	},function(){
		$(this).find('p').animate({marginTop:0},300);
});
$('.main .mr div.tit h2').hover(function() {
    $(this).find('ins').animate({ marginTop: -55 }, 200);
}, function() {
    $(this).find('ins').animate({ marginTop: 0 }, 300);
});
});//当前位置
/*$(function(){
		var iNum = 0;
		$('.sub > li > a').bind('mouseover',function(){
			iNum = 0;	
			//alert(iNum);
			})
		$('.sub > li > ul > li > a').bind('mouseover',function(){
			iNum = 1;	
			//alert(iNum);
			})
		$('.sub > li > ul > li > ul > li > a').bind('mouseover',function(){
			iNum = 2;
			//alert(iNum);
			})
		
		//$('.sub > li:first ul:lt(2)').show();
		
		$('.sub li a').bind('click',function(){
				if(iNum == 0){
					//$(this).parents('li').toggleClass('liF');
					$('.sub > li > ul').not($(this).next('ul')).hide();
					//$('.sub > li').not($(this).parents('li')).removeClass('liF');
					$('.sub > li > a').not($(this)).removeClass('hover');
					}
				if(iNum == 1){
					$('.sub > li > ul > li > ul').not($(this).next('ul')).hide();
					$('.sub > li > ul > li > a').not($(this)).removeClass('hover');
					}
				if(iNum == 2){
					$('.sub > li > ul > li > ul > li a').not($(this)).removeClass('hover');
					}
				//$(this).next('ul').slideToggle();
				var ulH = $(this).next('ul').height();
				$(this).next('ul').css("height",0).animate({height:ulH},1000);
				$(this).toggleClass('hover');
				
			});
		$('.sub>ul>li>a').hover(function(){
			$(this).find('p').animate({top:-32},200);
		},function(){
			$(this).find('p').animate({top:0},300);
			//$(this).css('background','images/bg01.jpg');
		});
		$('.sub>ul>li>ul>li>a').hover(function(){
			$(this).find('p').animate({marginTop:-24},200);
		},function(){
			$(this).find('p').animate({marginTop:0},300);
		});
});*///内页左侧导航

$(function() {
   /* $('.case .l div').scrollable({ size: 7, vertical: true, loop: true, items: ".case .l div ul" });*/
   /* $('.case .l div ul li').bind('click', function() {
        $('.case .l div ul li').removeClass('hover');
        $(this).addClass('hover');
        $('.case .r .Img').find('img').attr('src', '' + $(this).find('img').attr('rel') + ''); //大图片切换
       // var aa = $('.case .l div ul li').index(this);
        //$('.case .r .detail li').hide()
        //$('.case .r .detail li').eq(aa).show()
    });*/
   // $('.case .l div ul li').hover(function() {$(this).find('span').show(); }, function() { if($(this).attr('class').indexOf('hover')<1){$(this).find('span').hide();} })
});   //案例

/*$(function(){
	var b = $('.bImg').width();
	$('.bImg').css('margin-left',-b/2);
});*///背景定位

/*$(function(){
	var cc = $('#Map area').length;
	$('#Map area').bind('click',function(){
		var dd = $('#Map area').index(this);
		//alert($('.hd>ul>li').length);
		$('.hd > ul > li').hide();
		$('.hd').fadeIn();
		$('.hd > ul > li').eq(dd).fadeIn();
		$('.hd ul li ul li').show();
		$(".Colse").show();
});
    $(".Colse").bind("click", function() { $('.hd ul li ul li').show(); });
	$(document).click(function(e){
		var cName = $(e.target).attr("class");	//获取点击Dom在ClassName
		var pDiv = $(e.target).parents(".hd").size();	//获取是否为hd在子元素
		var tagName = $(e.target).attr("tagName").toLowerCase();	//获取点击Dom在tagName
		if(cName.indexOf("hd") < 0 && tagName != "area" && pDiv < 1){
		    $(".hd").hide();
		    $(".Colse").hide();
		}
	});
	$('.hd_l div').scrollable({size:1,loop:true,items:".hd_l div ul"});
});*/
/*$(function(){
	$('.case2 ul li a').hover(function(){
		$(this).find('span').animate({bottom:0},200)
	},function(){
		var s= $(this).find('span').height();
		$(this).find('span').animate({bottom:-38},200)
	});
})
$(function(){
	 $("#myDiv1").JSscroll();	
	}
);*/