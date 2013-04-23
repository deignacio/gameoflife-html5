define(function(require) {
    var GameOfLife = require("gameoflife");
    var CanvasWorldRenderer = require("canvasrenderer");
    var generationId = -1;
    var populationThreshold = 0.01;
    var generationDelay = 50;
    var running = false;

    function is_touch_device() {
      return !!('ontouchstart' in window);
    }

    function startWorld(worldSize, parent) {
        if (running) {
            return;
        } else {
            running = true;
        }
        var gol = new GameOfLife({"size": worldSize});
        var renderer = new CanvasWorldRenderer({world: gol, parent: parent});
        var minPopulation = gol.cellCount * populationThreshold;
    
        var toggleRunning = function() {
            running = !running;
            console.log("toggle to " + running);
            if (running) {
                gol.initialize();
                generationId = setTimeout(oneGeneration, generationDelay);
            }
        };
        if (is_touch_device()) {
           parent.ontouchstart = toggleRunning;
        } else {
            parent.onclick = toggleRunning;
        }

        var oneGeneration = function() {
            gol.nextGeneration();
            renderer.render();
            if (running) {
                if (gol.populationSize < minPopulation) {
                    gol.initialize();
                }
                generationId = setTimeout(oneGeneration, generationDelay);
            }
        };
        oneGeneration();
    }
    return startWorld;
});
