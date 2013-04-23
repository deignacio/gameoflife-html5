function WorldRenderer(args) {
    this._init(args);
}

WorldRenderer.prototype = {
    _init: function(args) {
        args = args || {};
        if (!("world" in args)) {
            console.error("need to pass a game of life world to World Renderer");
            return;
        }
        this._divId = args.divId || "gol";
        this._gol = args.world;
        this._initialize();
    },

    _initialize: function() {},

    render: function() {
        var me = this;
        this._preRender();
        this._gol.dumpGeneration(function(val, x, y) {
            me._renderCell(val, x, y);
        });
        this._postRender();
    },

    _preRender: function() {},
    _renderCell: function(val, x, y) {},
    _postRender: function() {},
    clear: function() {}
};

function TextDumpWorldRenderer(args) {
    this._init(args);
}

TextDumpWorldRenderer.prototype = WorldRenderer.prototype;

TextDumpWorldRenderer.prototype._preRender = function() {
    this._cells = [];
};
TextDumpWorldRenderer.prototype._renderCell = function(val, x, y) {
    this._cells.push("(" + x + ", " + y + ")");
};
TextDumpWorldRenderer.prototype._postRender = function() {
    var d = document.getElementById(this._divId);
    while (d.hasChildNodes()) {
        d.removeChild(d.childNodes[0]);
    }
    d.appendChild(document.createTextNode(this._cells));    
};
TextDumpWorldRenderer.prototype.clear = function() {
    this._cells = [];
}

function CanvasWorldRenderer(args) {
    this._init(args);
}
CanvasWorldRenderer.prototype = WorldRenderer.prototype;
CanvasWorldRenderer.prototype._initialize = function() {
    var canvas = document.createElement("canvas");
    var me = this;
    canvas.onclick = function() {
        me._gol.initialize();
    };
    canvas.width = 640;
    canvas.height = 640;
    this._cwidth = canvas.width / this._gol.width;
    this._cheight = canvas.height / this._gol.height;
    console.log("canvas:  (" + canvas.width + ", " + canvas.height + ")"); 
    console.log("cells:  (" + this._cwidth + ", " + this._cheight + ")"); 
    document.body
    document.body.appendChild(canvas);
    this._canvas = canvas;
    this._ctx = canvas.getContext('2d');
}; 
CanvasWorldRenderer.prototype._preRender = function() {
    this._ctx.save();
    this._ctx.fillStyle = "white";
    this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
    this._ctx.restore();
};
CanvasWorldRenderer.prototype._renderCell = function(val, x, y) {
    this._ctx.save();
    this._ctx.beginPath();
    this._ctx.moveTo(x * this._cwidth, y * this._cheight);
    this._ctx.lineTo((x+1) * this._cwidth, y * this._cheight);
    this._ctx.lineTo((x+1) * this._cwidth, (y+1) * this._cheight);
    this._ctx.lineTo(x * this._cwidth, (y+1) * this._cheight);
    this._ctx.lineTo(x * this._cwidth, y * this._cheight);
    this._ctx.closePath();
    this._ctx.stroke();
    this._ctx.fillStyle = "teal";
    this._ctx.fill();
    this._ctx.restore();
};
CanvasWorldRenderer.prototype.clear = function() {
    document.body.removeChild(this._canvas);
    this._canvas = null;
    this._ctx = null;
};
