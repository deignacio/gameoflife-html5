function oneLineage(size) {
    console.log("running a lineage, world size: " + size);
    var gol = new GameOfLife({"size": size});
    var cells = [];
    var stats = {"genCount": 0, "cellCount": cells.length};
    var keepRunning = true;
    var oneGeneration = function() {
        gol.nextGeneration();
        gol.dumpGeneration(function(val, x, y) {
            cells.push("(" + x + ", " + y + ")");
        });
        stats.genCount++;
        stats.cellCount = cells.length;
        console.log(stats.cellCount);
        if (cells.length > 0 && keepRunning) {
            cells = [];
            setTimeout(oneGeneration, 0);
        } else {
            dumpStats(stats);
            console.log("stopped after " + stats.genCount + " generations");
        }
    }
    setTimeout(function() {
        keepRunning = false;
        console.log("stopping");
    }, 5000);
    oneGeneration();
}
function init() {
    oneLineage("small");
}

window.onload = init;
