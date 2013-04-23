var GameOfLifeSizes = {
    "small": {"height": 16, "width": 16},
    "medium": {"height": 64, "width": 64},
    "large": {"height": 128, "width": 128},
    "xlarge": {"height": 256, "width": 256},
}

var GameOfLifeProbabilities = {
    "sparse": 0.25,
    "average": 0.50,
    "crowded": 0.75
}

// args -> {size: }
function GameOfLife(args) {
    this._init(args);
}

GameOfLife.prototype = {
    _init: function(args) {
        args = args || {};

        this._resetRows();
        this._resetNeighbors();
        this.size = ("size" in args) ? args.size : "medium";
        this.height = GameOfLifeSizes[this.size].height;
        this.width = GameOfLifeSizes[this.size].width;
        this._cellCount = this.height * this.width;
        this._initialProbability = ("initialProbability" in args) ? args.initialProbability : "average";
        this.initialize();        
    },

    initialize: function() {
        var initialProbability = GameOfLifeProbabilities[this._initialProbability];
        this._randomize(initialProbability);    
    },

    _resetRows: function() {
        this._rows = [];
        var i;
        for (i = 0; i < this.height; i++) {
            this._rows[i] = [];
        }
    },

    _resetNeighbors: function() {
        this._neighbors = [];
        var i;
        for (i = 0; i < this.height; i++) {
            this._neighbors[i] = [];
        }
    },

    _randomize: function(initialProbability) {
        var i;
        var j;
        for (i = 0; i < this.height; i++) {
            this._rows[i] = [];
            this._neighbors[i] = [];
            for (j = 0; j < this.width; j++) {
                if (Math.random() > initialProbability) {
                    this._rows[i][j] = 1;
                }
            }
        }
    },

    nextGeneration: function() {
        this.populationSize = 0;
        this._resetNeighbors();
        this._doForAll(this._rows, this._impactCellNeighbors);
        this._resetRows();
        this._doForAll(this._neighbors, this._impactFitness);
    },

    _doForAll: function(arr, func) {
        var me = this;
        arr.forEach(function(row, y) {
            row.forEach(function(cell, x) {
                func.call(me, cell, x, y);
            });
        });
    },

    _impactCellNeighbors: function(cell, x, y) {
        // up, left
        this._impactCellNeighbor(this._getLeft(x), this._getUp(y));
        // up
        this._impactCellNeighbor(x, this._getUp(y));
        // up, right
        this._impactCellNeighbor(this._getRight(x), this._getUp(y));
        // left
        this._impactCellNeighbor(this._getLeft(x), y);
        // self
        this._impactCellNeighbor(x, y);
        // right
        this._impactCellNeighbor(this._getRight(x), y);
        // down, left
        this._impactCellNeighbor(this._getLeft(x), this._getDown(y));
        // down
        this._impactCellNeighbor(x, this._getDown(y));
        // down, right
        this._impactCellNeighbor(this._getRight(x), this._getDown(y));
    },

    _getLeft: function(x) {
        if (x == 0) {
            return this.width - 1;
        }
        return x - 1;
    },

    _getRight: function(x) {
        x++;
        if (x == this.width) {
            return 0;
        }
        return x;
    },

    _getUp: function(y) {
        if (y == 0) {
            return this.height - 1;
        }
        return y - 1;
    },

    _getDown: function(y) {
        y++;
        if (y == this.height) {
            return 0;
        }
        return y;
    },

    _impactCellNeighbor: function(x, y) {
        if (!(x in this._neighbors[y])) {
            this._neighbors[y][x] = 0;
        }
        this._neighbors[y][x]++;
    },

    _impactFitness: function(cell, x, y) {
        if (cell > 3 && cell < 6) {
            this._rows[y][x] = 1;
            this.populationSize++;
        }
    },

    // cellFunc -> function(args)
    //     args -> {x:, y:, state:}
    dumpGeneration: function(cellFunc) {
        this._doForAll(this._rows, cellFunc);
    }
};
