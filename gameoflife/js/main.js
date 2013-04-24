requirejs(['helpers', 'world'],
function (helpers, startWorld) {
    console.log("regular init");
    function startWorldDom(data) {
        var dataset = helpers.bubbleUpToClass(data.target, "gol-start").dataset;
        var worldSize = (dataset && ("worldSize" in dataset)) ? dataset.worldSize : "large";
        var canvas = document.getElementById("gol");
        startWorld(worldSize, canvas);
    }

    // var sizes = document.getElementsByClassName("gol-start");
    // for (var i = 0; i < sizes.length; i++) {
    //     sizes[i].addEventListener("click", startWorldDom);
    // }
    var canvas = document.getElementById("gol");
    startWorld("large", canvas);
});
