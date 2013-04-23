define(function(require) {
    var WorldRenderer = require("renderer");
    function CanvasWorldRenderer(args) {
        this._init(args);
    }
    CanvasWorldRenderer.prototype = new WorldRenderer();
    CanvasWorldRenderer.prototype._initialize = function() {
        var canvas = document.createElement("canvas");
        canvas.width = 640;
        canvas.height = 640;
        this._cwidth = canvas.width / this._gol.width;
        this._cheight = canvas.height / this._gol.height;
        this._parent.appendChild(canvas);
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
    return CanvasWorldRenderer;
});
