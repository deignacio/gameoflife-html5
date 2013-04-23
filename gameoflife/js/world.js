define(function(require) {
    var GameOfLife = require("gameoflife");
    function startWorld(worldSize, RendererFactory) {
        if (this.running) {
            return;
        } else {
            this.running = true;
        }
        var runLineage = true;
        var gol = null;
        var stats = {};
        var renderer = null;
        var killLineageId = -1;
        var generationId = -1;
        var minPopulation = -1;
        var maxLineageRuntime = 10000;
        var maxWorldRuntime = 30000;
        var oneLineage = function() {
            killLineageId = setTimeout(function() {
                if (generationId != -1) {
                    clearTimeout(generationId);
                }
                if (runLineage) {
                    renderer.clear();
                    oneLineage();
                }
            }, maxLineageRuntime);
            gol = new GameOfLife({"size": worldSize});
            renderer = new RendererFactory({world: gol, divId: "gol"});
            stats = {"genCount": 0, "cellCount": gol.populationSize};
            minPopulation = gol.cellCount * 0.01;
            var oneGeneration = function() {
                gol.nextGeneration();
                renderer.render();
                stats.genCount++;
                stats.cellCount = gol.populationSize;
                if (runLineage) {
                    if (gol.populationSize > minPopulation) {
                        generationId = setTimeout(oneGeneration, 50);
                    } else {
                        if (killLineageId != -1) {
                            clearTimeout(killLineageId);
                        }
                        renderer.clear();
                        oneLineage();
                    }
                }
            }
            oneGeneration();
        }
        setTimeout(function() {
            runLineage = false;
            this.running = false;
        }, maxWorldRuntime);
        oneLineage();
    }
    return startWorld;
});
