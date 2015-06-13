
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

          if (timeout) {
              clearTimeout(timeout);
          }
          else if (execAsap) { 
              func.apply(obj, args);
          }
              
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

/* 
* This small helper function is to be used on the homepage to bring 
* in the overlay, after the animation has finished  
*/
function coverContainer(delay) {
    setTimeout(function() {
        $(".overlay").show(1000);
    }, delay);
}

/*
* Function to check whether the supplied element is visible in the 
* current view-port. It returns true for elements that are partially 
* visible as well
*/
function inViewPort(el) {
    var top = el.offset().top,
        height = el.height();

    // console.log(top);
    // console.log(height);
    // console.log(window.pageYOffset);
    // console.log(window.innerHeight);


    return  (
                top < (window.pageYOffset + window.innerHeight) &&
                (top + height) > window.pageYOffset
            ); 
}


/* 
* Function that is called on the homepage, and used to kick off the 
* puzzle animation. It adds a class name to each element involved, 
* allowing it to take the necessary position on the screen.
*/
function initAnimation() {

    if ($(window).width() < 768) {
        addAfterTimeout($(".piece1"), "in-place", 50);
        addAfterTimeout($(".piece4"), "in-place", 1000);
        addAfterTimeout($(".piece13"), "in-place", 2000);
        addAfterTimeout($(".piece16"), "in-place", 1500);
        coverContainer(2500);
        addAfterTimeout($(".home-nav"), "in-place", 3000);
    }else{
        addAfterTimeout($(".piece1"), "in-place", 50);
        addAfterTimeout($(".piece2"), "in-place", 750);
        addAfterTimeout($(".piece4"), "in-place", 1250);
        addAfterTimeout($(".piece5"), "in-place", 1750);
        addAfterTimeout($(".piece3"), "in-place", 2250);
        addAfterTimeout($(".piece6"), "in-place", 3500);
        addAfterTimeout($(".piece7"), "in-place", 2750);
        addAfterTimeout($(".piece8"), "in-place", 3000);
        addAfterTimeout($(".piece9"), "in-place", 2500);
        addAfterTimeout($(".piece10"), "in-place", 6000);
        addAfterTimeout($(".piece11"), "in-place", 3750);
        addAfterTimeout($(".piece12"), "in-place", 5250);
        addAfterTimeout($(".piece13"), "in-place", 4750);
        addAfterTimeout($(".piece14"), "in-place", 4250);
        addAfterTimeout($(".piece15"), "in-place", 5500);
        addAfterTimeout($(".piece16"), "in-place", 3250);
        coverContainer(7250);
        addAfterTimeout($(".home-nav"), "in-place", 8000);
    }

}


/*
*  Function to handle events occurring on smaller screen devices
*/
function initMobileEffects () {

    var deviceHeight = $(window).height();
    var scrollPoints = $(".scroll-point");
    var pointCount = 0;
    var clickCount = 1;

    $(".full-height-mobile").css("height", deviceHeight);
    $(".highlight-window").css("position", "fixed");
    
    // check if the scroll magic object exists
    if ( typeof ScrollMagic !== "undefined" ) {

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
        var scene = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: deviceHeight*0.75})
                        .setTween(slideImageLeft1)
                        .addTo(controller);

        // build scene to slide the first prism in from the right
        var scene2 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: deviceHeight})
                        .setTween(slidePrismLeft1)
                        .addTo(controller); 

        // build scene to slide the prism out to the right
        var scene3 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: deviceHeight*1.5})
                        .setTween(slidePrismRight1)
                        .addTo(controller);               

        // build scene to slide the second image in from the left
        var scene4 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: deviceHeight * 2})
                        .setTween(slideImageRight1)
                        .addTo(controller);                

        // build scene to slide the second image out to the left
        var scene5 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: deviceHeight * 2.5})
                        .setTween(slideImageLeft2)
                        .addTo(controller);

        // build scene to slide the second prism in from the right
        var scene6 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: deviceHeight * 3})
                        .setTween(slidePrismLeft2)
                        .addTo(controller);    

        // build scene to slide the second prism out to the right 
        var scene7 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: deviceHeight * 3.5})
                        .setTween(slidePrismRight2)
                        .addTo(controller);     

        // build scene to slide the second prism out to the right 
        var scene8 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: deviceHeight * 4})
                        .setTween(slideImageRight2)
                        .addTo(controller);                

        // build scene to slide the third image in from the left
        var scene9 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: deviceHeight * 4.5})
                        .setTween(slideImageLeft3)
                        .addTo(controller);                

        var scene10 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: deviceHeight * 5})
                        .setTween(slidePrismLeft3)
                        .addTo(controller);                    
    }// END IF
    
    // add a custom ID to all of the scroll points in the document
    $(".scroll-point").each( function() {
        var scrollId = "scroll-point-" + pointCount;
        $(this).attr("id", scrollId);
        pointCount += 1;
    });

    // listens for a click event on the page scroll button
    $('.page-scroll').click( function(event) {
        var nextScrollPoint = $("#scroll-point-" + clickCount);
        
        // scroll to the next element with a scroll point ID
        $('html, body').stop().animate({
            scrollTop: nextScrollPoint.offset().top
        }, 1500, 'linear');

        event.preventDefault();
        clickCount += 1;
    });

    // Used on the portfolio page to find the elements in 
    // the viewport, so the scroll button will properly
    // go to the next element
    $(window).scroll(function() {
        clearTimeout($.data(this, 'scrollTimer'));
        $.data(this, 'scrollTimer', setTimeout(function() {
            scrollPoints.each(function() {
                if( inViewPort($(this)) ) {
                    var elementInView = $(this).attr("id"),
                        elementIndex = parseInt(elementInView.charAt(elementInView.length - 1), 10);
                    clickCount = elementIndex + 1;
                    console.log(clickCount);
                }
            });
        }, 250));
    });

} // END initMobileEffects


/*
*  Function to be called on devices with a small screen(768px) or larger
*/
function initScrollEffects() {

    var deviceHeight = $(window).height();
    var scrollPoints = $(".scroll-point");
    var pointCount = 0;
    var clickCount = 1;

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


        // build scene to slide the first image left
        var scene1 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: deviceHeight})
                        .setTween(slideImageLeft1)
                        .addTo(controller);

        // build scene to slide the first prism right
        var scene2 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: deviceHeight})
                        .setTween(slidePrismRight1)
                        .addTo(controller);

        // build scene to slide the second image right, into view
        var scene3 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: deviceHeight*1.5})
                        .setTween(slidePrismLeft1)
                        .addTo(controller);

        // build scene to slide the second prism left
        var scene4 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: deviceHeight*1.5 })
                        .setTween(slideImageRight1)
                        .addTo(controller);

        // build scene to slide the second prism left
        var scene5 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: deviceHeight*2.5})
                        .setTween(slidePrismRight2)
                        .addTo(controller);

        // build scene to slide the second prism left
        var scene6 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: deviceHeight*2.5})
                        .setTween(slideImageLeft2)
                        .addTo(controller);

        // build scene to slide the second prism left
        var scene7 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: deviceHeight*3})
                        .setTween(slideImageRight2)
                        .addTo(controller);

        // build scene to slide the second prism left
        var scene8 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: deviceHeight*3})
                        .setTween(slidePrismLeft2)
                        .addTo(controller);
    }// END IF
    

    // add a custom ID to all of the scroll points in the document
    $(".scroll-point").each( function() {
        var scrollId = "scroll-point-" + pointCount;
        $(this).attr("id", scrollId);
        pointCount += 1;
    });

    // listens for a click event on the page scroll button
    $('.page-scroll').click( function(event) {
        var nextScrollPoint = $("#scroll-point-" + clickCount);
        
        // scroll to the next element with a scroll point ID
        $('html, body').stop().animate({
            scrollTop: nextScrollPoint.offset().top
        }, 1500, 'linear');

        event.preventDefault();
        clickCount += 2;
    });

    // listens for a scroll event and once it has been 
    // a given amount of time, it executes the code in 
    // the function body
    $(window).scroll(function() {
        clearTimeout($.data(this, 'scrollTimer'));
        $.data(this, 'scrollTimer', setTimeout(function() {
            scrollPoints.each(function() {
                if( inViewPort($(this)) ) {
                    var elementInView = $(this).attr("id"),
                        elementIndex = parseInt(elementInView.charAt(elementInView.length - 1), 10);
                    clickCount = elementIndex + 1;
                    console.log(clickCount);
                }
            });
        }, 250));
    });
} // END initScrollEffects



// run this when the document is loaded and a few behind the scene events finish
$(document).ready(function() {

    var urlLastPart = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
    
    initAnimation();

    
    if (urlLastPart === "portfolio.html") {
        
        if ( $(window).width() <= 768 ) {
            initMobileEffects();
        } else {
            initScrollEffects();
        }


        $(window).smartresize(function() {
            location.reload();
        });
    }
    

    

    

 
});
