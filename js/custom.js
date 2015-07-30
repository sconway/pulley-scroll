
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
* Function that is called on the homepage, and used to kick off the 
* puzzle animation. It adds a class name to each element involved, 
* allowing it to take the necessary position on the screen.
*/
function initAnimation() {

    if ($(window).width() < 768) {
        $(".piece").removeClass("in-place");
        addAfterTimeout($(".piece1"), "in-place", 50);
        addAfterTimeout($(".piece4"), "in-place", 1000);
        addAfterTimeout($(".piece13"), "in-place", 2000);
        addAfterTimeout($(".piece16"), "in-place", 1500);
        addAfterTimeout($(".overlay"), "in-place", 2750);
        addAfterTimeout($(".home-nav"), "in-place", 3250);
    }else{
        addAfterTimeout($(".piece6"), "in-place", 500);
        addAfterTimeout($(".piece8"), "in-place", 1000);
        addAfterTimeout($(".piece9"), "in-place", 2000);
        addAfterTimeout($(".piece11"), "in-place", 1500);
        addAfterTimeout($(".piece14"), "in-place", 2500);
        addAfterTimeout($(".overlay"), "in-place", 3250);
        addAfterTimeout($(".home-nav"), "in-place", 3750);
    }

}


/*
*  Handler function for the keypress events on the portfolio page.
*  Used to cycle the carousel when one of the arrow keys are hit.
*/
function handleKeyPress(carousel) {
    console.log("handling key presses");
    $(document).keydown( function(e) {
        switch (e.which) {
            case 37: // left
                carousel.rotation += carousel.theta * -1;
                carousel.transform();
                break;
            case 38: // right
                carousel.rotation += carousel.theta * -1;
                carousel.transform();
                break;
            case 39: // up
                carousel.rotation += carousel.theta;
                carousel.transform();
                break;
            case 40: // down
                carousel.rotation += carousel.theta;
                carousel.transform();
                break;
            default:
                return;
        }
    });

    $("body").on("scroll", function() {
        console.log("swipe!");
        carousel.rotation += carousel.theta * 1 * -1;
        carousel.transform();
    });
}





var init = function() {
    var carousel = new Carousel3D( document.getElementById('carousel') ),
        panelCount = $("#carousel").children().length,
        axisButton = document.getElementById('toggle-axis');

    var transformProp = Modernizr.prefixed('transform');

    // Represents our 3d carousel and associated properties
    function Carousel3D ( el ) {
        this.element = el;
        this.rotation = 0;
        this.panelCount = 0;
        this.totalPanelCount = this.element.children.length;
        this.theta = 0;
        this.isHorizontal = false;
    }

    Carousel3D.prototype.modify = function() {
        var panel, angle, i, spacing;

        

        console.log("outer width: ", window.outerWidth);
        console.log("outer height: ", window.outerHeight);

        if (window.outerWidth > window.outerHeight) {
            console.log("horizontal");
            this.isHorizontal = true;
            spacing = 0.75;
        } else {
            console.log("vertical");
            this.isHorizontal = false;
            spacing = 1.75;
        }

        this.panelSize = this.element[ this.isHorizontal ? 'offsetWidth' : 'offsetHeight' ];
        console.log("panel size: ", this.panelSize);

        this.rotateFn = this.isHorizontal ? 'rotateY' : 'rotateX';
        this.theta = 360 / this.panelCount;

        // do some trig to figure out how big the carousel
        // is in 3D space
        this.radius = Math.round( ( this.panelSize / spacing) / Math.tan( Math.PI / this.panelCount ) );

        for ( i = 0; i < this.panelCount; i++ ) {
            panel = this.element.children[i];
            angle = this.theta * i;
            // rotate panel, then push it out in 3D space
            panel.style[ transformProp ] = this.rotateFn + '(' + angle + 'deg) translateZ(' + this.radius + 'px)';
        }

        // hide other panels
        for (  ; i < this.totalPanelCount; i++ ) {
            panel = this.element.children[i];
            // panel.style.opacity = 0;
            panel.style[ transformProp ] = 'none';
        }

        // adjust rotation so panels are always flat
        this.rotation = Math.round( this.rotation / this.theta ) * this.theta;
        this.transform();
    };


    Carousel3D.prototype.transform = function() {
        // push the carousel back in 3D space,
        // and rotate it
        this.element.style[ transformProp ] = 'translateZ(-' + this.radius + 'px) ' + this.rotateFn + '(' + this.rotation + 'deg)';
    };

    $(".cycle-carousel").click(function(event) {
        var increment = parseInt( event.target.getAttribute('data-increment') );
        carousel.rotation += carousel.theta * increment * -1;
        carousel.transform();
    });

    // populate on startup
    carousel.panelCount = parseInt( panelCount, 10);
    carousel.modify();

    $(window).smartresize(function() {
        carousel.modify();     
    });

    handleKeyPress(carousel);
};


// run this when the document is loaded and a few behind the scene events finish
$(document).ready(function() {

    // var urlLastPart = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
    initAnimation();

    // run this if the portfolio page exists
    if ($("#portfolio").length > 0) {
        init();
    }

});
