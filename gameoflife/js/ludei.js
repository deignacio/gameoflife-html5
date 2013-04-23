requirejs(['canvasrenderer', 'world'],
function (CanvasWorldRenderer, startWorld) {
    console.log("ludei_init");
    startWorld("large", CanvasWorldRenderer);
});