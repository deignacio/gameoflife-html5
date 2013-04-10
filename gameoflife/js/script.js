function dumpStats(stats) {
    if (this.genCount === undefined) {
        this.genCount = 0;
    }
    this.genCount += stats.genCount;
    appendMsg("stats", "stopped after " + stats.genCount + " generations, " + this.genCount + "  generations total");
}

function dumpWorld(cells) {
    setMsg("gol", cells);
}

function startWorld(data) {
    if (this.running) {
        appendMsg("stats", "already running, ignoring start request");
        return;
    } else {
        this.running = true;
    }
    var runLineage = true;
    var gol = null;
    var cells = [];
    var stats = {};
    var killLineageId = -1;
    var generationId = -1;
    var maxLineageRuntime = 10000;
    var maxWorldRuntime = 30000;
    var oneLineage = function(size) {
        killLineageId = setTimeout(function() {
            appendMsg("stats", "killing, most likely found a cycle");
            if (generationId != -1) {
                clearTimeout(generationId);
            }
            if (runLineage) {
                dumpStats(stats);
                oneLineage(size);
            }
        }, maxLineageRuntime);
        gol = new GameOfLife({"size": size});
        cells = [];
        stats = {"genCount": 0, "cellCount": cells.length};
        var oneGeneration = function() {
            gol.nextGeneration();
            gol.dumpGeneration(function(val, x, y) {
                cells.push("(" + x + ", " + y + ")");
            });
            dumpWorld(cells);
            stats.genCount++;
            stats.cellCount = cells.length;
            if (runLineage) {
                if (cells.length > 0) {
                    cells = [];
                    generationId = setTimeout(oneGeneration, 0);
                } else {
                    if (killLineageId != -1) {
                        clearTimeout(killLineageId);
                    }
                    dumpStats(stats);
                    oneLineage(size);
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

    var dataset = bubbleUpToClass(data.target, "gol-start").dataset;
    if (!dataset || !("worldSize" in dataset)) {
        oneLineage("small");
    } else {
        oneLineage(dataset.worldSize);
    }
}

function init() {
    var sizes = document.getElementsByClassName("gol-start");
    for (var i = 0; i < sizes.length; i++) {
        sizes[i].addEventListener("click", startWorld);
    }
}
window.onload = init;
