var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");

var contentScr = pageMod.PageMod({
    include: ["http://www.youtube.com/*"],
    contentScriptFile: data.url("content.js"),
    contentScriptWhen: "ready"
});