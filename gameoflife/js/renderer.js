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
    setMsg(this._divId, this._cells);
};
TextDumpWorldRenderer.prototype.clear = function() {
    this._cells = [];
}
