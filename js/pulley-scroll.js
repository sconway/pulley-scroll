var pulleyController = new ScrollMagic.Controller({
            globalSceneOptions: {
              triggerHook: "onLeave"
            }
        });

/**
 * Stuff to run on resize.
 */
$(window).resize(function() {
    waitForFinalEvent(function() {
        pulleyController = pulleyController.destroy(true);
        pulleyController = new ScrollMagic.Controller({
            globalSceneOptions: {
              triggerHook: "onLeave"
            }
        });
        hookScrollEffects();
    }, 200, "");
});

/**
 * Helper function to delay firing resize events until the user actually
 * stops resizing their browser.
 */
var waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
        if (!uniqueId) {
            uniqueId = "Don't call this twice without a uniqueId";
        }
        if (timers[uniqueId]) {
            clearTimeout (timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
    };
})();


function handleSectionScroll() {
  $("#sideNav ul li a").click(function(e){
    e.preventDefault();// prevents auto jump

    var href = $(this).attr("href"),
        scrollPoint = $( "" + href ).offset().top;

    $("html, body").animate({ scrollTop: scrollPoint});
    
  });
}


/*
 * Function that runs on page load and adds the page sections,
 * and the cutoffs for the rope pulley.
 */
function addElements() {
    var sectionNum = 0,
        lastColor = null, 
        colors = [ "#DD0000", "#FF9700", "#0C5AA6", "#00CC00" ];

    // for each page section that we have, add the necessary elements
    $(".page-section").each(function() {
        var red = Math.floor(Math.random() * 255),
            green = Math.floor(Math.random() * 255),
            blue = Math.floor(Math.random() * 255), 
            bgColor = "rgb(" +red+ "," +green+ "," +blue+ ")";

        // add the rope cutoff elements 
        $ropeCutoff = $("<section>", 
            {
                class: "rope-cutoff-wipe rope-cutoff-wipe-" + sectionNum
            }).css("background-color", bgColor);

        $bottomCutoff = $("<section>", 
            {
                class: "cutoff-wipe cutoff-wipe-" + sectionNum
            }).css("background-color", bgColor);

        // add them as children to the respective wrappers
        $(".wrapper--rope-cutoff").append($ropeCutoff);
        $(".wrapper--bottom-cutoff").append($bottomCutoff);

        className = "section-" + sectionNum;
        $(this).addClass(className);
        $(this).css("background-color", bgColor);

        lastColor = bgColor;
        sectionNum += 1;
    });
}




function hookScrollEffects() {
    var winHeight = window.innerHeight,
        sectionIndex = 0,
        cutoffIndex = 1,
        pageSections = $(".page-section").length,
        rotation = pageSections * -360,
        effectDuration = pageSections * 100 + "%",
        ropeHeight = (pageSections - 1) * 100 + "%";

    $(".rope").css("height", ropeHeight);

    // check if the scroll magic object exists
    if ( typeof ScrollMagic !== "undefined" ) {

        // section pinning for page wipe effect
        $(".page-section").each(function() {
            var curSection = ".section-" + sectionIndex;

            // pins main sections
            new ScrollMagic.Scene({
                triggerElement: curSection
            })
            .setPin(curSection)
            .addTo(pulleyController);

            // wipes the bottom rope cutoff up with the next section
            new ScrollMagic.Scene({
                offset: (winHeight * cutoffIndex - 100),
                duration: $(".wrapper--rope-cutoff").height()
            })
            .setTween(".rope-cutoff-wipe", {top: "-=100%", ease: Linear.easeNone})
            .addTo(pulleyController);

            // wipes the top rope cutoff up with the next section
            new ScrollMagic.Scene({
                offset: (winHeight * cutoffIndex - 150),
                duration: $(".wrapper--bottom-cutoff").height()
            })
            .setTween(".cutoff-wipe", {top: "-=100%", ease: Linear.easeNone})
            .addTo(pulleyController);

            sectionIndex += 1;
            cutoffIndex += 1;
        });

        // moves the left rope down on scroll to
        // give the effect of it being pulled.
        new ScrollMagic.Scene({ 
                offset: 0,
                duration: effectDuration 
            })
            .setTween("#leftRope", {top: "0%"})
            .addTo(pulleyController);

        // moves the weight on the left rope down,
        // with the rope when scrolling
        new ScrollMagic.Scene({ 
                offset: 0,
                duration: effectDuration 
            })
            .setTween("#ropeWeight", {top: "200%"})
            .addTo(pulleyController);

        // spins the pulley wheel when the page is 
        // scrolled to emulate a rope being pulled
        new ScrollMagic.Scene({
                offset: 0,
                duration: effectDuration
            })
            .setTween(".spin-part", {rotation: rotation})
            .addTo(pulleyController);


        // Add the hook disappearing effect to all of the page
        // sections. Start at 1 so we don't add it to the top.
        for (var i = 1; i < pageSections; i++) {
            ropeHook = "#ropeHook" + i;

            new ScrollMagic.Scene({
                offset: (winHeight * i) - (
                        ($(".rope--hook").height() / 3) +
                        $(".pulley-wheel").offset().top +
                        $(".pulley-wheel").height()
                        ),
                duration: $(".pulley-wheel").height() / 4
            })
            .setTween(ropeHook, {height: 0})
            .addTo(pulleyController);
        }

    } // END If
} // End hookScrollEffects

$(document).ready(function() {
    addElements();
    handleSectionScroll();
    hookScrollEffects();
});
