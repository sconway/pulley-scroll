
function createTimeout($el, delay) {
  setTimeout(function() {
    $el.addClass("in-place");
  }, delay)
}

$(document).ready(function() {

    createTimeout($(".piece1"), 50);
    createTimeout($(".piece2"), 1000);
    createTimeout($(".piece4"), 1500);
    createTimeout($(".piece5"), 2000);
    createTimeout($(".piece3"), 2500);
    createTimeout($(".piece6"), 4500);
    createTimeout($(".piece7"), 3500);
    createTimeout($(".piece8"), 4000);
    createTimeout($(".piece9"), 3000);
    createTimeout($(".piece10"), 8000);
    createTimeout($(".piece11"), 5500);
    createTimeout($(".piece12"), 7000);
    createTimeout($(".piece13"), 6500);
    createTimeout($(".piece14"), 6000);
    createTimeout($(".piece15"), 7500);
    createTimeout($(".piece16"), 5000);

});