define(function(require) {
    var WorldRenderer = require("renderer");
    function CanvasWorldRenderer(args) {
        this._init(args);
    }
    CanvasWorldRenderer.prototype = new WorldRenderer();
    CanvasWorldRenderer.prototype._initialize = function() {
        if (!this._parent) {
            var canvas = document.createElement("canvas");
            canvas.width = 640;
            canvas.height = 640;
            document.body.appendChild(canvas);
            this._parent = canvas;
        }
        this._cwidth = this._parent.width / this._gol.width;
        this._cheight = this._parent.height / this._gol.height;
        this._ctx = this._parent.getContext('2d');
    };
    CanvasWorldRenderer.prototype._preRender = function() {
        this._ctx.save();
        this._ctx.fillStyle = "white";
        this._ctx.fillRect(0, 0, this._parent.width, this._parent.height);
        this._ctx.restore();
    };
    CanvasWorldRenderer.prototype._renderCell = function(val, x, y) {
        this._ctx.save();
        this._ctx.fillStyle = "teal";
        this._ctx.fillRect(x * this._cwidth, y * this._cheight,
                          this._cwidth, this._cheight);
        this._ctx.restore();
    };
    return CanvasWorldRenderer;
});
