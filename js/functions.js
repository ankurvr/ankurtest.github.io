'use strict';

$(function() {
  $('.modal .modal-content').hide();
  $('.modal').hide();

  $('.theme .contact form .notification .close').click(function() {
    $(this).parent().slideUp();
  });

  $('.theme .content .list-expand .more-button').click(function() {
    $(this).parent().siblings('.list').addClass('expanded').children('.item.hidden').slideDown();
    $(this).fadeOut(200).siblings('.less-button').delay(200).fadeIn();
  });

  $('.theme .content .list-expand .less-button').click(function() {
    $(this).parent().siblings('.list').removeClass('expanded').children('.item.hidden').slideUp();
    $(this).fadeOut(200).siblings('.more-button').delay(200).fadeIn();
  });

  var initializeSlick = function(slickEl) {
    slickEl.slick({
      dots: true,
      infinite: true,
      speed: 800,
      slidesToShow: 1,
      adaptiveHeight: true
    });
  };

  var configureModal = function(modalSelector) {
    var initialized;

    $('.theme ' + modalSelector + ' .item').click(function() {
      var index = $('.theme ' + modalSelector + ' .item').index($(this));
      var parent = $(this).parent().parent().parent().parent();
      var selector = '.theme #' + parent.attr('id') + '-modal';
      var slickEl = $(selector + ' .modal-content .modal-content-slider');

      $(selector).fadeIn(300, function() {
        if (!initialized) {
          setTimeout(function() {
            initializeSlick(slickEl);
          }, 10);
          initialized = true;
        }

        setTimeout(function() {
          slickEl.slickGoTo(index, true);
        }, 10);
      })
      .children()
      .children()
      .delay(300)
      .slideDown();

      $('.theme').addClass('modal-open');
    });
  };

  ['.experience', '.education', /*'.portfolio',*/ '.testimonials'].forEach(function(section) {
    configureModal(section);
  });

  $('.theme .close-modal').click(function() {
    $(this).parent().slideUp(300).parent().parent().delay(300).fadeOut();
    $('.theme').removeClass('modal-open');
  });
});
