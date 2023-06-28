$(document).ready(function(){
    $(function() {
        var $camp_header=$('.camp_header');
        $camp_header.find('.sch_btn').click(function(){
            $camp_header.find('.sch_box').addClass('visible');
        })
        $camp_header.find('.btn_close').click(function(){
            $camp_header.find('.sch_box').removeClass('visible');
        });
        $click_sort_sns=$('.click_sort.sns');
        /*sns*/
        var windowWidth;
        $(window).resize(function() {
            windowWidth = $(window).width();
            if (windowWidth <= 1023) {
                $click_sort_sns.removeClass('pc');
            } else {
                $click_sort_sns.addClass('pc');
            }
        });
        windowWidth = $(window).width();
        if (windowWidth <= 1023) {
            $click_sort_sns.removeClass('pc');
        } else {
            $click_sort_sns.addClass('pc');
        }

        $sort_box=$('.click_sort button');
        $sort_box.click(function(){
            $(this).toggleClass('active');
            $(this).next().toggleClass('active');
        })
        /*top button */
        var windowHeight= $(window).height();
        var $togoBtn= $('.fix_right .togo_top');
        $(window).scroll(function(){
            var scrollT = $(this).scrollTop();
            if(scrollT>300){
                $togoBtn.addClass('active');
            }else{
                $togoBtn.removeClass('active');
            }
        });
        $togoBtn.click(function(){
            $('html, body').animate({scrollTop: 0}, );
        })
        //mobile menu pop
        $mb_add_footer=$('.mb_add_footer');
        $mobile_pop=$('.mobile_pop_wrap');
        $mb_add_footer.click(function(){    
            $mobile_pop.addClass('visible');
        });
        $mobile_pop.find('.close').click(function(){
            $mobile_pop.removeClass('visible');
        });
        
    })
});