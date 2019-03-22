const colorsys = require('colorsys')
export default (src) => {
  return new Promise(resolve => {
    let img = new Image()
    img.crossOrigin = 'Anonymous'
    img.src = src
    img.onload = () => {
      let data = getBase64Image(img)
      resolve(data)
    }
  })
}

function getBase64Image (img) {
  let canvas = document.createElement('canvas')
  let ctx = canvas.getContext('2d')
  canvas.width = img.width
  canvas.height = img.height
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  canvaspixel(ctx, canvas)
  return canvas.toDataURL()
}

function canvaspixel (ctx, canvas) {
  var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  var pixelData = imgData.data
  console.log(pixelData)
  for (var i = 0; i < pixelData.length; i += 4) {
    let hsl = colorsys.rgb_to_hsl({ r: pixelData[i], g: pixelData[i + 1], b: pixelData[i + 2] })
    // console.log(hsl)
    hsl.h = 100
    let rgb = colorsys.hsl_to_rgb(hsl)
    pixelData[i] = rgb.r
    pixelData[i + 1] = rgb.g
    pixelData[i + 2] = rgb.b
  }
  ctx.putImageData(imgData, 0, 0)
}
