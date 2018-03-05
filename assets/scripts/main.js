$(document).ready(function() {

  $(window).scroll(function() {
    if ($(this).scrollTop() > 300) {
      $('#scroll-top').fadeIn('slow');
    } else {
      $('#scroll-top').fadeOut('slow');
    }
  });

  $('#menu-icon').click(function() {
    $('nav').animate({width: ["toggle", "swing"]}, 300);
  });

  $('#scroll-top').click(function() {
    $('html').animate({scrollTop:0}, 500, 'swing');
  });

  $('.print-me').click(function() {
    window.print();
  });

  $('.showcase-content').click(function() {
    src = $(this).attr('src');
    $('.lightbox').css('background-image', 'url(' + src + ')');
    $('.lightbox').fadeIn();
  });

  $('.lightbox-close').click(function() {
    $('.lightbox').fadeOut();
  });

  $(window).keydown(function(event) {
    if ( event.which == 27 ) {
      $('.lightbox').fadeOut();
    }
  });

});
