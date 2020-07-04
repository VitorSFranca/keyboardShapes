# Keyboard Shapes

This application gets an image and creates a new one using only keyboard shapes that exists in ASCII.

## How to run:
Clone the application, change the entry parameters at index.js file.
Run using NodeJs:

    node index.js
## How the application works:
1) Get an image
2) Transform original image into a grayscale image
3) Check every pixel, and according to it colour gives an ascii character that represents that colour
4) Build a new image according to a hashmap of pixel colour and pixel character
5) 3 files are generated at the end:
    1) gs.png -> Original image in grayscale
    2) text.png -> Image using keyboard shapes
    3) txtFile.txt -> Image in a txtFile
    
## Aplication parameters
* imagePath: Path of the original image
* charSize: Pixel size of each caracther that will be used to represent the image
* minAscii: Minium value of ASCII table that will be used to convert the image
* maxAscii: Maxium value of ASCII table that will be used to convert the image
* imagePercent: Scale of the original image that will be used (0 - 1)