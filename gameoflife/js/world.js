define(function(require) {
    var GameOfLife = require("gameoflife");
    function startWorld(worldSize, RendererFactory) {
        if (this.running) {
            return;
        } else {
            this.running = true;
        }
        var generationId = -1;
        var populationThreshold = 0.01;
        var maxWorldRuntime = 300000;
        var generationDelay = 50;
        var gol = new GameOfLife({"size": worldSize});
        var renderer = new RendererFactory({world: gol, divId: "gol"});
        var minPopulation = gol.cellCount * populationThreshold;
        var oneGeneration = function() {
            gol.nextGeneration();
            renderer.render();
            if (this.running) {
                if (gol.populationSize < minPopulation) {
                    gol.initialize();
                }
                generationId = setTimeout(oneGeneration, generationDelay);
            }
        }
        setTimeout(function() {
            this.running = false;
        }, maxWorldRuntime);
        oneGeneration();
    }
    return startWorld;
});
