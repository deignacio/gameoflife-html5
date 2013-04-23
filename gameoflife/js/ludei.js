requirejs(['world'],
function (startWorld) {
    console.log("ludei_init");
    var canvas = document.getElementById("gol");
    startWorld("large", canvas);
});
