define(function() {
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
    return {bubbleUpToClass: bubbleUpToClass};
});
