const Jimp = require('jimp');
const Canvas = require('canvas');
const fs = require('fs');

const imagePath = 'C:/Users/Dell/Desktop/test.jpg';
const charSize = 11;
const minAscii = 33;
const maxAscii = 126;
const imagePercent = 1;

function getOriginalImage(url) {
    Jimp.read(url, (err, image) => {
        if (err) throw err;
        const newWidth = image.getWidth() * imagePercent;
        const newHeight = image.getHeight() * imagePercent;
        const canvas = Canvas.createCanvas(newWidth, newHeight);
        const context = canvas.getContext('2d');
        context.fillStyle = '#fff'
        context.fillRect(0, 0, newWidth, newHeight);

        const gs = image.resize(newWidth, newHeight);
        gs.write(__dirname + '/gs.png');

        const hm = generateUniqueKeysByColor(gs);
        fillNewImage(gs, context, hm);
               
        const out = fs.createWriteStream(__dirname + '/text.png')
        const stream = canvas.pngStream();

        stream.on('data', function(chunk){
        out.write(chunk);
        });

        stream.on('end', function(){
        console.log('saved png');
        });
    });
}

function getNextAsciiCode(current) {
    return (current + 1 > maxAscii) ? minAscii : current + 1;
}

function generateUniqueKeysByColor(image) {
    const hashMapColorsKeys = {};
    const width = image.getWidth();
    const height = image.getHeight();
    let asciiCode = minAscii;

    for (i = 0; i < width; i+=charSize) {
        for (j = 0; j < height; j+=charSize) {
            const pixelColor = image.getPixelColor(i, j);
            if (!hashMapColorsKeys[pixelColor]) {
                asciiCode = getNextAsciiCode(asciiCode)
                hashMapColorsKeys[pixelColor] = asciiCode;
            }
        }
    }
    return hashMapColorsKeys;
}

function fillNewImage(image, context, hashmap) {
    const width = image.getWidth();
    const height = image.getHeight();
    const result = [];

    for (i = 0; i < width; i += charSize) {
        result[i] = "";
        for (j = 0; j < height; j+=charSize) {
            const text = String.fromCharCode(hashmap[image.getPixelColor(i, j)]);
                
            context.font = `bold ${charSize}px Menlo`
            context.textAlign = 'center'
            context.fillStyle = '#000'
            context.fillText(text, i, j)
            result[i] += text;
        }
    }

    fs.writeFile(__dirname + '/txtFile.txt', turnTextImage(result), () => { });
}

function reverse(s) {
    if (s.length < 2)
      return s;
    var halfIndex = Math.ceil(s.length / 2);
    return reverse(s.substr(halfIndex)) +
           reverse(s.substr(0, halfIndex));
}

function turnTextImage(original) {
    const tmp = [];
    let lineSize;
    lineSize = original[0].length;
    let k = 0;
    for (i = 0; i < lineSize; i++) {
        tmp.push("");
        for (j = 0; j < original.length; j++) {
            if(original[j]) tmp[i] += original[j][k];
        }
        k++;
    }
    return tmp.join('\n');
}

getOriginalImage(imagePath);