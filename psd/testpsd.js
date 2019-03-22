let fs = require('fs')
let psd = require('ag-psd')
let { readPsd, initializeCanvas } = psd
require("ag-psd/initialize-canvas")
// import 'ag-psd/initialize-canvas'; // only needed for reading image data and thumbnails
// import { readPsd, initializeCanvas } from 'ag-psd';

const buffer = fs.readFileSync('./src.psd');

// read only document structure
const psd1 = readPsd(buffer, { skipLayerImageData: true, skipCompositeImageData: true, skipThumbnail: true });
console.log(psd1);

// read document structure and image data
const psd2 = readPsd(buffer);
console.log(psd2);
fs.writeFileSync('layer-1.png', psd2.children[0].canvas.getBuffer());
