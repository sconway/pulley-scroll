function handleSectionScroll() {
  $("#sideNav ul li a").click(function(e){
    e.preventDefault();// prevents auto jump

    var href = $(this).attr("href"),
        scrollPoint = $( "" + href ).offset().top;

    $("html, body").animate({ scrollTop: scrollPoint});
    
  });
}


function navScrollEffects() {
    var winHeight = window.innerHeight,
        sectionIndex = 0,
        cutoffIndex = 1;

    // check if the scroll magic object exists
    if ( typeof ScrollMagic !== "undefined" ) {

        var controller = new ScrollMagic.Controller({
            globalSceneOptions: {
              triggerHook: "onLeave"
            }
        });

        // sidebar link visibility toggle when entering different sections
        new ScrollMagic.Scene( {offset: $("#sideNav").position().top + 75} )
            .setClassToggle("#link1", "active")
            .addTo(controller);

        new ScrollMagic.Scene( {offset: $("#sideNav").position().top + 75 + winHeight} )
            .setClassToggle("#link2", "active")
            .addTo(controller);

        // section pinning for page wipe effect
        $(".page-section").each(function() {
            var curSection = ".section-" + sectionIndex;

            // pins main sections
            new ScrollMagic.Scene({
                triggerElement: curSection
            })
            .setPin(curSection)
            .addTo(controller);

            // wipes the bottom rope cutoff up with the next section
            new ScrollMagic.Scene({
                offset: (winHeight * cutoffIndex - 100),
                duration: $(".wrapper--rope-cutoff").height()
            })
            .setTween(".rope-cutoff-wipe", {top: "-=100%", ease: Linear.easeNone})
            .addTo(controller);

            // wipes the top rope cutoff up with the next section
            new ScrollMagic.Scene({
                offset: (winHeight * cutoffIndex - 150),
                duration: $(".wrapper--bottom-cutoff").height()
            })
            .setTween(".cutoff-wipe", {top: "-=100%", ease: Linear.easeNone})
            .addTo(controller);

            sectionIndex += 1;
            cutoffIndex += 1;
        });

        // moves the left rope down on scroll to
        // give the effect of it being pulled.
        new ScrollMagic.Scene({ 
                offset: 0,
                duration: "300%" 
            })
            .setTween("#leftRope", {top: "0%"})
            .addTo(controller);

        // moves the weight on the left rope down,
        // with the rope when scrolling
        new ScrollMagic.Scene({ 
                offset: 0,
                duration: "300%" 
            })
            .setTween("#ropeWeight", {top: "200%"})
            .addTo(controller);

        // spins the pulley wheel when the page is 
        // scrolled to emulate a rope being pulled
        new ScrollMagic.Scene({
                offset: 0,
                duration: "300%"
            })
            .setTween(".wheel-part", {rotation: -1080})
            .addTo(controller);

        new ScrollMagic.Scene({
                offset: winHeight - (
                        ($(".rope--hook").height() / 2) + 
                        $(".pulley-wheel").offset().top +
                        $(".pulley-wheel").height() 
                        ) ,
                duration: $(".pulley-wheel").height() / 2
            })
            .setTween("#ropeHook0", {height: 0})
            .addIndicators()
            .addTo(controller);

        new ScrollMagic.Scene({
                offset: (winHeight * 2) - (
                        ($(".rope--hook").height() / 2) + 
                        $(".pulley-wheel").offset().top +
                        $(".pulley-wheel").height() 
                        ) ,
                duration: $(".pulley-wheel").height() / 2
            })
            .setTween("#ropeHook1", {height: 0})
            .addIndicators()
            .addTo(controller);

    } // END If
} // End navScrollEffects

$(document).ready(function() {
    handleSectionScroll();
    navScrollEffects();
});