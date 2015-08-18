
function navScrollEffects() {
  // check if the scroll magic object exists
  if ( typeof ScrollMagic !== "undefined" ) {
    var controller = new ScrollMagic.Controller();
    // code base raise 
    var raiseBase = TweenMax.to(".block--bottom", 1, {className: "+=in-place"});
    // bring css text in from the right at an arc
    var swipeIn = TweenMax.to(".block--middle", 1, {className: "+=in-place"});
    // drops the javascript text down from the top
    var dropDown = TweenMax.to(".block--top", 1.5, {className: "+=in-place"});

    // sidebar link visibility toggle when entering different sections
    new ScrollMagic.Scene( {triggerElement: "#section1"} )
        .setClassToggle("#link1", "active")
        .addTo(controller);

    // first section pinning 
    new ScrollMagic.Scene({ offset:0, duration:500 })
        .setPin(".wrapper")
        .addTo(controller)
        .addIndicators();

    new ScrollMagic.Scene({ offset: 20, duration: 80 })
        .setTween(raiseBase)
        .addTo(controller)
        .addIndicators();

    new ScrollMagic.Scene({ offset: 100, duration: 100 })
        .setTween(swipeIn)
        .addTo(controller)
        .addIndicators();

    new ScrollMagic.Scene({ offset: 200, duration: 150 })
        .setTween(dropDown)
        .addTo(controller)
        .addIndicators();
  }

}//End navScrollEffects

$(document).ready(function() {
  navScrollEffects();
});