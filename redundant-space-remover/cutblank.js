"use strict";
String.prototype.greet = function () {
    return "Hello, " + this + "!";
};
String.prototype.cutRedundantSpaces = function () {
    return this.replace(/ +/g, " ").trim();
};
function go() {
    document.getElementById("txaOutput").value =
        document.getElementById("txaInput").value
            .replace(/\n/g, " ")
            .cutRedundantSpaces()
            .replace(/- /g, "");
}
/* document.body.innerHTML = "Tarou".greet();*/
