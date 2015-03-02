var php = require("phplike/module");
var paintMod = require("./../paint.js");
var paint = new paintMod();


var data = php.file_get_contents(__dirname + "/groups.json");
data = php.json_decode(data, true);
var info = {
    filepath: __dirname + "/test.png"
};
paint.draw(info, data);
