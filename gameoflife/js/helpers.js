function appendMsg(divId, msg) {
    var d = document.createElement("div");
    d.appendChild(document.createTextNode(msg));
    document.getElementById(divId).appendChild(d);
    // console.log(msg);
}
function setMsg(divId, msg) {
    var d = document.getElementById(divId);
    while (d.hasChildNodes()) {
        d.removeChild(d.childNodes[0]);
    }
    d.appendChild(document.createTextNode(msg));
}
