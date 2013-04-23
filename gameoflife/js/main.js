requirejs(['helpers', 'canvasrenderer', 'world'],
function (helpers, CanvasWorldRenderer, startWorld) {
    console.log("regular init");
    function startWorldDom(data) {
        var dataset = helpers.bubbleUpToClass(data.target, "gol-start").dataset;
        var worldSize = (dataset && ("worldSize" in dataset)) ? dataset.worldSize : "large";
        startWorld(worldSize, CanvasWorldRenderer);
    }

    var sizes = document.getElementsByClassName("gol-start");
    for (var i = 0; i < sizes.length; i++) {
        sizes[i].addEventListener("click", startWorldDom);
    }
});
