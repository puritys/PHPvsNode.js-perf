var Canvas = require('canvas');

function paint() {

}

var o = paint.prototype;

//The context of canvas
o.ctx = "";

//There are many records will display in the image, every record has the different color, this array will define all colors.
o.recordColorSets = [
    "#FF0000", //red
    "#00FF00", //green
    "#0000FF", //blue
    "#000",    //black
    "#FFFF00", //yellow
    "#999"     //gray
];

/**
 *
 * @param object info {filepath: "", width, height,}
 * @param object data 
 */
o.draw = function (info, data) {
    if (!info.filepath || info.filepath === "") {
        console.log("The filepath of keys is missing.");
        return "";
    }
    var canvas, fs, out, stream;
    var width = 550, height = 550;

    data.canvasInfo = {
        height: height,
        width: width
    };
    canvas = new Canvas(width, height);
    this.ctx = canvas.getContext('2d');
    fs = require('fs');
    out = fs.createWriteStream(info.filepath);
    stream = canvas.createPNGStream();
 
    stream.on('data', function(chunk){
      out.write(chunk);
    });

    if (!data.type) {
        data.type = "group";
    }

//    this.calculateAverage(data);

    switch (data.type) {
        case 'group':
            this.drawGroupData(data);
            break;
        default:
            break;
    }

};

/**
 * Find the average from value.
 */
o.calculateAverage = function (data) {
    var records = data.records, record;
    records.forEach(function(record) {
console.log(record);

    });

};


/**
 * We need the gap of coordinate.
 */
o.getCoordinateInfo = function (data) {//{{{
    var records = data.records, record, scale = 1;
    var max = 0, min = 0, gap = 10;
    records.forEach(function(record) {
        record.average.forEach(function (avg) {
            if (avg < min) {
                min = avg;
            }
            if (avg > max) {
                max = avg;
            }
        });
    });

    gap = Math.round((max - min ) / 10);
    if (gap <= 5) {
        scale = (data.canvasInfo.height - 100) / max;
    }
    return {
        "recordScale": scale,
        "recordMin": min * scale, 
        "recordMax": Math.round(max * scale),
        "recordGap": Math.round(gap * scale)
    };
};//}}}


/**
 * The image will have multi group data.
 */
o.drawGroupData = function (data) {
    this.drawTitle(data.title);
    this.drawCoordinate(data);
};

o.drawTitle = function (title) {
    this.ctx.fillStyle = "black";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(title, 0, 20);
};

o.drawGroupInfo = function (title) {

};

o.drawCoordinate = function (data) {
    var i, x , y, shift = 0;
    var canvasInfo = data.canvasInfo; 
    var padding = 50, originPoint, strGapHeight = 11, strGapWidth = -14;
    var cInfo = this.getCoordinateInfo(data);
    this.ctx.fillStyle = "black";

console.log(cInfo);
    //Origin Point
    originPoint = {x: padding, y: canvasInfo.height - padding};
    this.ctx.font = "14px Arial";
    this.ctx.fillText("0", originPoint.x + strGapWidth, originPoint.y + strGapHeight);

    //X-axle 
    this.ctx.beginPath();
    this.ctx.moveTo(padding, canvasInfo.height - padding);
    this.ctx.lineTo(canvasInfo.width, canvasInfo.height - padding);
    this.ctx.stroke();
    for (i = 0; i < cInfo.recordMax; i+= cInfo.recordGap) {
        if (i > cInfo.recordMax) {
            i = cInfo.recordMax;
        }

        this.ctx.beginPath();
        x = originPoint.x + i;
        y = originPoint.y - 5;
        this.ctx.moveTo(x, y);


        y = originPoint.y + 5;
        this.ctx.lineTo(x, y);
        this.ctx.stroke();

    }



    //Y-axle, record
    this.ctx.beginPath();
    this.ctx.moveTo(padding, canvasInfo.height - padding);
    this.ctx.lineTo(padding, padding);
    this.ctx.stroke();
    for (i = 0; i < cInfo.recordMax; i+= cInfo.recordGap) {
        if (i > cInfo.recordMax) {
            i = cInfo.recordMax;
        }
        this.ctx.beginPath();
        x = originPoint.x - 5;
        y = originPoint.y - i;
        this.ctx.moveTo(x, y);


        this.ctx.lineTo(x + 5, y);
        this.ctx.stroke();

        if (i > 0) {
            shift = (Math.floor(Math.log(i) / Math.log(10)) - 1) * 10;
            this.ctx.fillText(i, x + strGapWidth - shift, y + strGapHeight);
        }

    }



};



module.exports = paint;


