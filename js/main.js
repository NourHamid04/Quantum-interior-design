(function ($) {
  "use strict";

  // 1) ALWAYS hide loader on load (even if some plugins fail)
  window.addEventListener("load", function () {
    const loader = document.getElementById("ftco-loader");
    if (loader) loader.classList.remove("show");
  });

  // 2) AOS (guarded)
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "slide",
    });
  }

  // 3) Full height (safer for mobile than $(window).height())
  var fullHeight = function () {
    $(".js-fullheight").css("height", window.innerHeight);
    $(window).on("resize", function () {
      $(".js-fullheight").css("height", window.innerHeight);
    });
  };
  fullHeight();

  // 4) Stellar (guarded)
  if ($.fn.stellar) {
    $(window).stellar({
      responsive: true,
      parallaxBackgrounds: true,
      parallaxElements: true,
      horizontalScrolling: false,
      hideDistantElements: false,
      scrollProperty: "scroll",
    });
  }

  // 5) Loader fallback (keep your old one too)
  var loader = function () {
    setTimeout(function () {
      if ($("#ftco-loader").length > 0) {
        $("#ftco-loader").removeClass("show");
      }
    }, 1);
  };
  loader();

  // 6) Scrollax (guarded)
  if ($.Scrollax) {
    $.Scrollax();
  }

  // 7) Carousel (guarded)
  var carousel = function () {
    if ($.fn.owlCarousel) {
      $(".home-slider").owlCarousel({
		touchDrag: false,
		mouseDrag: false,
		pullDrag: false,
		freeDrag: false,

        loop: true,
        autoplay: true,
        margin: 0,
        animateOut: "fadeOut",
        animateIn: "fadeIn",
        nav: false,
        autoplayHoverPause: false,
        items: 1,
        navText: [
          "<span class='ion-md-arrow-back'></span>",
          "<span class='ion-chevron-right'></span>",
        ],
        responsive: {
          0: { items: 1 },
          600: { items: 1 },
          1000: { items: 1 },
        },
      });

      $(".carousel-testimony").owlCarousel({
        center: true,
        loop: false,
        items: 1,
        margin: 30,
        stagePadding: 0,
        nav: true,
        navText: [
          '<span class="ion-ios-arrow-back">',
          '<span class="ion-ios-arrow-forward">',
        ],
        responsive: {
          0: { items: 1 },
          600: { items: 3 },
          1000: { items: 3 },
        },
      });

      $(".single-slider").owlCarousel({
        animateOut: "fadeOut",
        animateIn: "fadeIn",
        autoplay: true,
        loop: true,
        items: 1,
        margin: 0,
        stagePadding: 0,
        nav: true,
        dots: true,
        navText: [
          '<span class="ion-ios-arrow-back">',
          '<span class="ion-ios-arrow-forward">',
        ],
        responsive: {
          0: { items: 1 },
          600: { items: 1 },
          1000: { items: 1 },
        },
      });
    }
  };
  carousel();

  // 8) Dropdown hover (safe)
  $("nav .dropdown").hover(
    function () {
      var $this = $(this);
      $this.addClass("show");
      $this.find("> a").attr("aria-expanded", true);
      $this.find(".dropdown-menu").addClass("show");
    },
    function () {
      var $this = $(this);
      $this.removeClass("show");
      $this.find("> a").attr("aria-expanded", false);
      $this.find(".dropdown-menu").removeClass("show");
    }
  );

  // 9) Scroll navbar effects
  var scrollWindow = function () {
    $(window).scroll(function () {
      var $w = $(this),
        st = $w.scrollTop(),
        navbar = $(".ftco_navbar"),
        sd = $(".js-scroll-wrap");

      if (st > 150) {
        if (!navbar.hasClass("scrolled")) navbar.addClass("scrolled");
      }
      if (st < 150) {
        if (navbar.hasClass("scrolled")) navbar.removeClass("scrolled sleep");
      }
      if (st > 350) {
        if (!navbar.hasClass("awake")) navbar.addClass("awake");
        if (sd.length > 0) sd.addClass("sleep");
      }
      if (st < 350) {
        if (navbar.hasClass("awake")) {
          navbar.removeClass("awake");
          navbar.addClass("sleep");
        }
        if (sd.length > 0) sd.removeClass("sleep");
      }
    });
  };
  scrollWindow();

  // 10) Counter (guarded: waypoint + animateNumber)
  var counter = function () {
    if ($.fn.waypoint && $.animateNumber) {
      $("#section-counter").waypoint(
        function (direction) {
          if (
            direction === "down" &&
            !$(this.element).hasClass("ftco-animated")
          ) {
            var comma = $.animateNumber.numberStepFactories.separator(",");
            $(".number").each(function () {
              var $this = $(this),
                num = $this.data("number");
              $this.animateNumber(
                { number: num, numberStep: comma },
                7000
              );
            });
          }
        },
        { offset: "95%" }
      );
    }
  };
  counter();

  // 11) Content animation (guarded: waypoint)
  var contentWayPoint = function () {
    if (!$.fn.waypoint) return;

    var i = 0;
    $(".ftco-animate").waypoint(
      function (direction) {
        if (
          direction === "down" &&
          !$(this.element).hasClass("ftco-animated")
        ) {
          i++;
          $(this.element).addClass("item-animate");
          setTimeout(function () {
            $("body .ftco-animate.item-animate").each(function (k) {
              var el = $(this);
              setTimeout(function () {
                var effect = el.data("animate-effect");
                if (effect === "fadeIn") el.addClass("fadeIn ftco-animated");
                else if (effect === "fadeInLeft")
                  el.addClass("fadeInLeft ftco-animated");
                else if (effect === "fadeInRight")
                  el.addClass("fadeInRight ftco-animated");
                else el.addClass("fadeInUp ftco-animated");
                el.removeClass("item-animate");
              }, k * 50);
            });
          }, 100);
        }
      },
      { offset: "95%" }
    );
  };
  contentWayPoint();

  // 12) One page nav
  var OnePageNav = function () {
    $(".smoothscroll[href^='#'], #ftco-nav ul li a[href^='#']").on(
      "click",
      function (e) {
        e.preventDefault();
        var hash = this.hash,
          navToggler = $(".navbar-toggler");

        $("html, body").animate(
          { scrollTop: $(hash).offset().top },
          700,
          "easeInOutExpo",
          function () {
            window.location.hash = hash;
          }
        );

        if (navToggler.is(":visible")) navToggler.click();
      }
    );
  };
  OnePageNav();

  // 13) Magnific popup (guarded)
  if ($.fn.magnificPopup) {
    $(".image-popup").magnificPopup({
      type: "image",
      closeOnContentClick: true,
      closeBtnInside: false,
      fixedContentPos: true,
      mainClass: "mfp-no-margins mfp-with-zoom",
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 1],
      },
      image: { verticalFit: true },
      zoom: { enabled: true, duration: 300 },
    });

    $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
      disableOn: 700,
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false,
    });
  }

  // 14) Datepicker (guarded)
  if ($.fn.datepicker) {
    $(".checkin_date, .checkout_date").datepicker({
      format: "m/d/yyyy",
      autoclose: true,
    });
  }



$(".home-slider").owlCarousel({
  loop: true,
  items: 1,

  // ✅ manual only
  autoplay: false,
  autoplayHoverPause: false,

  // ✅ show navigation buttons
  nav: true,
  dots: true,

  // optional: keep your fade design
  animateOut: "fadeOut",
  animateIn: "fadeIn",

  // optional: allow drag (or keep disabled)
  touchDrag: true,
  mouseDrag: true,
  pullDrag: true,
  freeDrag: false,

  navText: [
    "<span class='ion-ios-arrow-back'></span>",
    "<span class='ion-ios-arrow-forward'></span>",
  ],

  responsive: {
    0: { items: 1 },
    600: { items: 1 },
    1000: { items: 1 },
  },
});






})(jQuery);
