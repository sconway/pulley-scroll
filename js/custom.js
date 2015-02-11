
(function($,sr){

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // smartresize 
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');


/*
* Function to be used to add a given class name to a given element,
* after a specified delay
*/
function addAfterTimeout($el, className, delay) {
    setTimeout(function() {
        $el.addClass(className);
    }, delay);
}

function coverContainer(delay) {
    setTimeout(function() {
        $(".overlay").show(1000);
    }, delay);
}

function initAnimation() {
    if ($(window).width() < 768) {
        addAfterTimeout($(".piece1"), "in-place", 50);
        addAfterTimeout($(".piece4"), "in-place", 1500);
        addAfterTimeout($(".piece13"), "in-place", 3500);
        addAfterTimeout($(".piece16"), "in-place", 2500);
        coverContainer(5000);
        addAfterTimeout($(".home-nav"), "in-place", 6000);
    }else{
        addAfterTimeout($(".piece1"), "in-place", 50);
        addAfterTimeout($(".piece2"), "in-place", 1000);
        addAfterTimeout($(".piece4"), "in-place", 1500);
        addAfterTimeout($(".piece5"), "in-place", 2000);
        addAfterTimeout($(".piece3"), "in-place", 2500);
        addAfterTimeout($(".piece6"), "in-place", 4500);
        addAfterTimeout($(".piece7"), "in-place", 3500);
        addAfterTimeout($(".piece8"), "in-place", 4000);
        addAfterTimeout($(".piece9"), "in-place", 3000);
        addAfterTimeout($(".piece10"), "in-place", 8000);
        addAfterTimeout($(".piece11"), "in-place", 5500);
        addAfterTimeout($(".piece12"), "in-place", 7000);
        addAfterTimeout($(".piece13"), "in-place", 6500);
        addAfterTimeout($(".piece14"), "in-place", 6000);
        addAfterTimeout($(".piece15"), "in-place", 7500);
        addAfterTimeout($(".piece16"), "in-place", 5000);
        coverContainer(9500);
        addAfterTimeout($(".home-nav"), "in-place", 10500);
    }

}


/*
*  Function to handle events occurring on smaller screen devices
*/
function initMobileEffects () {

    var middle = $(window).height() / 2;
    var leeway = $(window).height() / 6;
    console.log(middle);

    // $(".full-height").css("height", $(window).height());
    $(".highlight-window").css("position", "fixed");
    
    // check if the scroll magic object exists
    if ( typeof ScrollMagic !== "undefined" ) {

        // init controller
        var controller = new ScrollMagic(),
            slideImageLeft1 = TweenMax.to("#slide-left-1", 1, {className: "+=offscreen-left"}),
            slidePrismLeft1 = TweenMax.to("#slide-in-right-1", 1, {left: 50, rotationX: 360}),
            slidePrismRight1 = TweenMax.to("#slide-in-right-1", 1, {left: 800, rotationX: 360}),
            slideImageRight1 = TweenMax.to("#slide-in-left-1", 1, {className: "-=offscreen-left"}),
            slideImageLeft2 = TweenMax.to("#slide-in-left-1", 1, {className: "+=offscreen-left"}),
            slidePrismLeft2 = TweenMax.to("#slide-in-right-2", 1, {left: 50, rotationX: 360, className: "-=offscreen-right"}),
            slidePrismRight2 = TweenMax.to("#slide-in-right-2", 1, {left: 800, rotationX: 360}),
            slideImageRight2 = TweenMax.to("#slide-in-left-2", 1, {className: "-=offscreen-left"}),
            slideImageLeft3 = TweenMax.to("#slide-in-left-2", 1, {className: "+=offscreen-left"}),
            slidePrismLeft3 = TweenMax.to("#slide-in-right-3", 1, {left: 50, rotationX: 360, className: "-=offscreen-right"});


        // build scene to slide the first image left
        var scene = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: middle + leeway})
                        .setTween(slideImageLeft1)
                        .addTo(controller);

        // build scene to slide the first prism in from the right
        var scene2 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: middle * 1.25})
                        .setTween(slidePrismLeft1)
                        .addTo(controller); 

        // build scene to slide the prism out to the right
        var scene3 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: middle * 2.5})
                        .setTween(slidePrismRight1)
                        .addTo(controller);               

        // build scene to slide the second image in from the left
        var scene4 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: middle * 2.6})
                        .setTween(slideImageRight1)
                        .addTo(controller);                

        // build scene to slide the second image out to the left
        var scene5 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: middle * 3.5})
                        .setTween(slideImageLeft2)
                        .addTo(controller);

        // build scene to slide the second prism in from the right
        var scene6 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: middle * 3.5})
                        .setTween(slidePrismLeft2)
                        .addTo(controller);    

        // build scene to slide the second prism out to the right 
        var scene7 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: middle * 4.4})
                        .setTween(slidePrismRight2)
                        .addTo(controller);     

        // build scene to slide the second prism out to the right 
        var scene8 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: middle * 4.4})
                        .setTween(slideImageRight2)
                        .addTo(controller);                

        // build scene to slide the third image in from the left
        var scene9 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: middle * 5.25})
                        .setTween(slideImageLeft3)
                        .addTo(controller);                

        var scene10 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: middle * 5})
                        .setTween(slidePrismLeft3)
                        .addTo(controller);                     

        // show indicators (requires debug extension)
        scene.addIndicators();
    }
}


/*
*  Function to be called on devices with a small screen(768px) or larger
*/
function initScrollEffects() {

    var middle = $(window).height() / 2;
    var leeway = $(window).height() / 6;

    // check if the scroll magic object exists
    if ( typeof ScrollMagic !== "undefined" ) {

        // initialize controllers
        var controller = new ScrollMagic(),
            slideImageLeft1 = TweenMax.to("#slide-left-1", 1, {className: "+=offscreen-left"}),
            slidePrismRight1 = TweenMax.to("#slide-in-right-1", 1, {rotationX: 360, className: "+=offscreen-right"}),
            slidePrismLeft1 = TweenMax.to("#slide-in-right-2", 1, {rotationX: 360, className: "-=offscreen-right"}),
            slideImageRight1 = TweenMax.to("#slide-in-left-1", 1, {className: "-=offscreen-left"}),
            slideImageLeft2 = TweenMax.to("#slide-in-left-1", 1, {className: "+=offscreen-left"}),
            slidePrismRight2 = TweenMax.to("#slide-in-right-2", 1, {rotationX: 360, className: "+=offscreen-right"}),
            slideImageRight2 = TweenMax.to("#slide-in-left-2", 1, {className: "-=offscreen-left"}),
            slidePrismLeft2 = TweenMax.to("#slide-in-right-3", 1, {rotationX: 360, className: "-=offscreen-right"});
            // slideImageLeft3 = TweenMax.to("#slide-in-left-2", 1, {className: "+=offscreen-left"}),
            // slidePrismLeft3 = TweenMax.to("#slide-in-right-3", 1, {left: 50, top: -275, rotationX: 360});


        // build scene to slide the first image left
        var scene1 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: middle + leeway})
                        .setTween(slideImageLeft1)
                        .addTo(controller);

        // build scene to slide the first prism right
        var scene2 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: middle + leeway})
                        .setTween(slidePrismRight1)
                        .addTo(controller);

        // build scene to slide the second image right, into view
        var scene3 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: middle*2 })
                        .setTween(slidePrismLeft1)
                        .addTo(controller);

        // build scene to slide the second prism left
        var scene4 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: middle*2})
                        .setTween(slideImageRight1)
                        .addTo(controller);

        // build scene to slide the second prism left
        var scene5 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: 1500})
                        .setTween(slidePrismRight2)
                        .addTo(controller);

        // build scene to slide the second prism left
        var scene6 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: 1500})
                        .setTween(slideImageLeft2)
                        .addTo(controller);

        // build scene to slide the second prism left
        var scene7 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: 1800})
                        .setTween(slideImageRight2)
                        .addTo(controller);

        // build scene to slide the second prism left
        var scene8 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: 1800})
                        .setTween(slidePrismLeft2)
                        .addTo(controller);

        // show indicators (requires debug extension)
        scene1.addIndicators();
    }
}



$(document).ready(function() {

    var urlLastPart = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);

    initAnimation();

    // // if we're on a small screen device, make sure that 
    // // the element's container takes up the full height of the 
    // // device. This is to allow the featured elements to be
    // // centered vertically on smaller devices
    if ( $(window).width() <= 768 ) {
        initMobileEffects();
    } else {
        initScrollEffects();
    }

    $(window).smartresize(function() {
        if (urlLastPart === "portfolio.html") {
            location.reload();
        }
    });
 
});
