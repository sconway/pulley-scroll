/*
*  This function is used to set the width of the site description 
*  text container on the portfolio page. 
*/
function setContainerWidth() {
    var descWidth = window.innerWidth/2 - 40;
    $(".site-description").css("width", descWidth);
}


/*
* Function to check whether the supplied element is visible in the 
* current view-port. It returns true for elements that are partially 
* visible as well
*/
function inViewPort(el) {
    var top = el.offset().top,
        left = el.offset().left,
        height = el.height();

    return  (
                top < (window.pageYOffset + window.innerHeight) && 
                (top + height) > window.pageYOffset && 
                (left > 0 && left < window.innerWidth)
                
            ); 
}


/*
*  Function to handle the scroll effects and events that occur
*  on smaller screen devices (768px or less).
*/
function initMobileEffects () {

    var deviceHeight = $(window).height(),
        scrollPoints = $(".scroll-point"),
        stopPoint = null,
        nthType = 0,
        pointCount = 0,
        clickCount = 0,
        scrollEnd = false;
        

    $(".full-height-mobile").css("height", deviceHeight);
    
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


        // build scene to slide the first image left, out of view
        var scene = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: deviceHeight * 0.5})
                        .setTween(slideImageLeft1)
                        .addTo(controller)
                        .addIndicators();

        // build scene to slide the first prism in from the right
        var scene2 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: deviceHeight * 0.55})
                        .setTween(slidePrismLeft1)
                        .addTo(controller)
                        .addIndicators(); 

        // build scene to slide the prism out to the right
        var scene3 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: deviceHeight * .95})
                        .setTween(slidePrismRight1)
                        .addTo(controller)
                        .addIndicators();               

        // build scene to slide the second image in from the left
        var scene4 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: deviceHeight})
                        .setTween(slideImageRight1)
                        .addTo(controller)
                        .addIndicators();                

        // build scene to slide the second image out to the left
        var scene5 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: deviceHeight * 1.4})
                        .setTween(slideImageLeft2)
                        .addTo(controller)
                        .addIndicators();

        // build scene to slide the second prism in from the right
        var scene6 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: deviceHeight * 1.45})
                        .setTween(slidePrismLeft2)
                        .addTo(controller)
                        .addIndicators();    

        // build scene to slide the second prism out to the right 
        var scene7 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: deviceHeight * 1.85})
                        .setTween(slidePrismRight2)
                        .addTo(controller)
                        .addIndicators();     

        // build scene to slide the third image in from the left
        var scene8 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: deviceHeight * 1.9})
                        .setTween(slideImageRight2)
                        .addTo(controller)
                        .addIndicators();                

        // build scene to slide the third image in from the left
        var scene9 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: deviceHeight * 2.3})
                        .setTween(slideImageLeft3)
                        .addTo(controller)
                        .addIndicators();                

        var scene10 = new ScrollScene({triggerElement: "#trigger-1", duration: 200, offset: deviceHeight * 2.35})
                        .setTween(slidePrismLeft3)
                        .addTo(controller)
                        .addIndicators();                   
    }// END IF
    
    var hookPosn = $(".ScrollSceneIndicators:first").find(".hook").offset().top;

     // listens for a click event on the page Up scroll button
    $("#scrollArrowUp").click( function(event) {
        console.log("up click");

        var scrollPoint = 0,
            newSelector = null;

        if (scrollEnd) {scrollEnd = false;}
        
        // if there have been no clicks, we can't go up
        if (clickCount === 0) {
            console.log("no count, returning");
            return;
        }else {
            clickCount -= 1;
            newSelector = ".ScrollSceneIndicators:nth-of-type(" +(clickCount*2+2)+ ")";
            stopPoint = $(newSelector).find(".start").offset().top;
            scrollPoint = stopPoint - hookPosn;
        }

        console.log("hook position: ", hookPosn);
        console.log("stop point: ", stopPoint);
        console.log("scroll point: ", scrollPoint);
        console.log("click count: ", clickCount);

        // scroll to the next element with a scroll point ID
        $('html, body').stop().animate({
            scrollTop: scrollPoint
        }, 1500, 'linear');

        event.preventDefault();
    });

    // listens for a click event on the page Down scroll button
    $('#scrollArrowDown').click( function(event) {
        event.preventDefault();
        console.log("down click");

        var scrollPoint = 0,
            newSelector = null;

        // only increment the click count and construct the new 
        // selector if we are not at the end of the scroll items
        if (!scrollEnd) {
            clickCount += 1;
            // grabs the element with the next stopping point    
            newSelector = ".ScrollSceneIndicators:nth-of-type(" +(clickCount*2+2)+ ")";
            console.log(newSelector);   
        }
        
        // make sure that the next stopping indicator actually exists,
        // and get its current offset from the top of the document.
        // This allows us to scroll to the location just before 
        // the next animation starts.
        if ($(newSelector).find(".start").length > 0) {
            console.log("next element exists");
            stopPoint = $(newSelector).find(".start").offset().top;
            scrollPoint = stopPoint - hookPosn;
        } else if (!scrollEnd) {
            console.log("last scroll");
            scrollEnd = true;
            newSelector = ".ScrollSceneIndicators:nth-of-type(" +(clickCount*2+1)+ ")";
            stopPoint = $(newSelector).find(".end").offset().top;
            scrollPoint = stopPoint - hookPosn;
        } else {
            console.log("Out of scrolls");
            return;
        }

        console.log("hook position: ", hookPosn);
        console.log("stop point: ", stopPoint);
        console.log("scroll point: ", scrollPoint);
        console.log("click count: ", clickCount);

        // scroll to the next element with a scroll point ID
        $('html, body').stop().animate({
            scrollTop: scrollPoint
        }, 1500, 'linear');
    }); // end scrollDownClick

    // Used on the portfolio page to find the elements in 
    // the viewport, so the handlers for the clicks to scroll
    // between elements will know which element to scroll to
    $(window).scroll(function() {
        clearTimeout($.data(this, 'scrollTimer'));
        $.data(this, 'scrollTimer', setTimeout(function() {
            scrollPoints.each(function() {
                if( inViewPort($(this)) ) {
                    var elementInView = $(this).attr("id"),
                        elementIndex = parseInt(scrollPoints.index($(this)), 10);
                    clickCount = elementIndex;
                    console.log("element in view: ", elementInView);
                    console.log("element index: ", elementIndex);
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
    var clickCount = 0;

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
    $("#scrollArrowUp").click( function(event) {
        console.log("clicked");
        var nextScrollPoint = $("#scroll-point-" + clickCount-2);
        
        if (clickCount === 0) {
            console.log("returning");
            return;
        }

        // scroll to the next element with a scroll point ID
        $('html, body').stop().animate({
            scrollTop: nextScrollPoint.offset().top
        }, 1500, 'linear');

        event.preventDefault();
        clickCount += 2;
    });

    // listens for a click event on the page scroll button
    $("#scrollArrowDown").click( function(event) {
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

    setContainerWidth();
} // END initScrollEffects
