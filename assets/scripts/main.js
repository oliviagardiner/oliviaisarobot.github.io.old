$(document).ready(function() {

  $(window).scroll(function() {
    if ($(this).scrollTop() > 150) {
      $('#to-the-top').fadeIn('slow');
    } else {
      $('#to-the-top').fadeOut('slow');
    }
  });

  $('#to-the-top').click(function() {
    $('html').animate({scrollTop:0}, 500, 'swing');
  });

  $('#toggle-social-menu-mobile').click(function() {
    if ($('.social-menu').hasClass('open')) {
      $('.social-menu').removeClass('open');
    } else $('.social-menu').addClass('open');
  });

});
