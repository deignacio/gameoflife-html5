function dumpStats(stats) {
    if (this.genCount === undefined) {
        this.genCount = 0;
    }
    this.genCount += stats.genCount;
    appendMsg("stats", "stopped after " + stats.genCount + " generations, " + this.genCount + "  generations total");
}

function startWorld(worldSize, CreateRenderer) {
    if (this.running) {
        appendMsg("stats", "already running, ignoring start request");
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
    var maxLineageRuntime = 10000;
    var maxWorldRuntime = 30000;
    var oneLineage = function(size, createRenderer) {
        killLineageId = setTimeout(function() {
            appendMsg("stats", "killing, most likely found a cycle");
            if (generationId != -1) {
                clearTimeout(generationId);
            }
            if (runLineage) {
                renderer.clear();
                dumpStats(stats);
                oneLineage(size, createRenderer);
            }
        }, maxLineageRuntime);
        gol = new GameOfLife({"size": size});
        renderer = createRenderer({"world": gol, "divId": "gol"});
        stats = {"genCount": 0, "cellCount": gol.populationSize};
        var oneGeneration = function() {
            gol.nextGeneration();
            renderer.render();
            stats.genCount++;
            stats.cellCount = gol.populationSize;
            if (runLineage) {
                if (gol.populationSize > 0) {
                    generationId = setTimeout(oneGeneration, 50);
                } else {
                    if (killLineageId != -1) {
                        clearTimeout(killLineageId);
                    }
                    renderer.clear();
                    dumpStats(stats);
                    oneLineage(size, createRenderer);
                }
            } else {
                appendMsg("stats", "simulation short circuited");
                dumpStats(stats);
            }
        }
        oneGeneration();
    }
    setTimeout(function() {
        runLineage = false;
        appendMsg("stats", "stopping");
        this.running = false;
    }, maxWorldRuntime);
    oneLineage(worldSize, CreateRenderer);
}

function startWorldDom(data) {
    var dataset = bubbleUpToClass(data.target, "gol-start").dataset;
    var createRenderer = function(args) {
        return new TextDumpWorldRenderer(args);
    };
    var worldSize = (dataset && ("worldSize" in dataset)) ? dataset.worldSize : "large";
    startWorld(worldSize, createRenderer);
}

function init() {
    var sizes = document.getElementsByClassName("gol-start");
    for (var i = 0; i < sizes.length; i++) {
        sizes[i].addEventListener("click", startWorldDom);
    }
}
