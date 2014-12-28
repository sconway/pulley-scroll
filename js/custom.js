
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

$(document).ready(function() {

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

    

});