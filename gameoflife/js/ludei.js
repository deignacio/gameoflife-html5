requirejs(['world'],
function (startWorld) {
    console.log("ludei_init");
    var parent = document.getElementById("gol") || document.body;
    startWorld("large", parent);
});
