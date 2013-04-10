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

function bubbleUpToClass(target, cls, maxLevels) {
	if (maxLevels == undefined) {
		maxLevels = 5;
	}
	var i = 0;
	var classes;
	while (i <= maxLevels) {
		classes = target.getAttribute("class");
		if (classes != null) {
			classes = classes.split(" ");
			if (classes.indexOf(cls) >= 0) {
				return target;
			}
		}
		target = target.parentElement;
		i++;
	}
	return null;
}
