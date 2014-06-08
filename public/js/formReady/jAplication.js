$(function(e) {
    var l = $('#mnu  a').size();
    
    
    
    $('#mnu1').addClass('active');
    $('#mnu1').parent().addClass('active');
    for (var j = 1; j <= l; j++) {
        $('#mnu' + j).click(function(e) {
            e.preventDefault();            
             var ancla = $(this).attr('href');             
                    $('body,html').stop(true, true).animate({
                            scrollTop: $(ancla).offset().top
                    }, 600);
        });
    }

    $(window).scroll(function(e) {
        var inicio = 0;
        var cabeceraHtml = 167;
        var formularioHtml = 526;
        var nuestroJs = 1045;
        var eBlur = 1814;
        var eKey = 2523;
        var p = window.pageYOffset;
        if (p >= inicio && p < cabeceraHtml) {
            $('#mnu a').filter('.active').removeClass('active');
            $('#mnu li').filter('.active').removeClass('active');
            $('#mnu1').parent().addClass('active');
            $('#mnu1').addClass('active');
        }

        if (p >= cabeceraHtml && p < formularioHtml) {
            $('#mnu a').filter('.active').removeClass('active');
            $('#mnu li').filter('.active').removeClass('active');
            $('#mnu2').parent().addClass('active');
            $('#mnu2').addClass('active');
        }

        if (p >= formularioHtml && p < nuestroJs) {
            $('#mnu a').filter('.active').removeClass('active');
            $('#mnu li').filter('.active').removeClass('active');
            $('#mnu3').parent().addClass('active');
            $('#mnu3').addClass('active');
        }

        if (p >= nuestroJs && p < eBlur) {
            $('#mnu a').filter('.active').removeClass('active');
            $('#mnu li').filter('.active').removeClass('active');
            $('#mnu4').parent().addClass('active');
            $('#mnu4').addClass('active');
        }

        if (p >= eBlur && p < eKey) {
            $('#mnu a').filter('.active').removeClass('active');
            $('#mnu li').filter('.active').removeClass('active');
            $('#mnu5').parent().addClass('active');
            $('#mnu5').addClass('active');
        }
        
           if (p >= eKey) {
            $('#mnu a').filter('.active').removeClass('active');
            $('#mnu li').filter('.active').removeClass('active');
            $('#mnu6').parent().addClass('active');
            $('#mnu6').addClass('active');
        }         

    });


});