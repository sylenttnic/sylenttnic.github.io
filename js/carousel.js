$(document).ready(function(){
    $('#carousel-testimonials').slick({
      centerMode: true,
      centerPadding: '0px',
      slidesToShow: 3,
      autoplay: true,
      autoplaySpeed: 3000,
      speed: 800, /* Slow down the slide animation itself to match the fade */
      arrows: true,
      swipe: true, /* Explicitly enable swipe */
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false, /* Hide arrows on mobile */
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 1,
            swipe: true
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false, /* Hide arrows on mobile */
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 1,
            swipe: true
          }
        }
      ]
    });
  });
