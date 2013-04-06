function dumpStats(stats) {
    if (this.genCount === undefined) {
        this.genCount = 0;
    }
    this.genCount += stats.genCount;
    var d = $("<div>");
    d.html("stopped after " + stats.genCount + " generations, " + this.genCount + "  generations total");
    $("#stats").append(d);
}

function dumpWorld(cells) {
    $("#gol").html(cells.join(", "));
}

function init() {
    var runLineage = true;
    var gol = null;
    var cells = [];
    var stats = {};
    var killLineageId = -1;
    var generationId = -1;
    var oneLineage = function(size) {
        killLineageId = setTimeout(function() {
            console.log("lineage short circuited");
            if (generationId != -1) {
                clearTimeout(generationId);
            }
            if (runLineage) {
                dumpStats(stats);
                oneLineage(size);
            }
        }, 2500);
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
                console.log("simulation short circuited");
                dumpStats(stats);
            }
        }
        oneGeneration();
    }
    setTimeout(function() {
        runLineage = false;
        console.log("stopping");
    }, 10000);

    oneLineage("small");
}

window.onload = init;
