define(function() {
    function WorldRenderer(args) {
        this._init(args);
    }

    WorldRenderer.prototype = {
        _init: function(args) {
            args = args || {};
            if (!("world" in args) || !("parent" in args)) {
                return;
            }
            this._parent = args.parent;
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
        _postRender: function() {}
    };
    return WorldRenderer;
});
