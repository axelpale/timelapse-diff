const sharp = require('sharp')
const path = require('path')
const fs = require('fs')
const asyn = require('async')

module.exports = (dirpath, opts) => {
  // Default options
  opts = Object.assign({
    minDiff: 0,
    maxDiff: Infinity
  }, opts)

  const files = fs.readdirSync(dirpath)
  const isImage = /\.(jpg|jpeg|png|tiff)$/i
  const imageFiles = files.filter(f => {
    return isImage.test(f)
  })

  let previousImage = null

  asyn.eachSeries(imageFiles, (f, next) => {
    const p = path.join(dirpath, f)
    sharp(p)
      .raw()
      .toBuffer((err, data, info) => {
        // data is an array of unsigned 8-bit integers.
        // c bytes per pixel
        // const c = info.channels
        // info.width
        // info.height

        if (err) {
          return next(err)
        }

        if (previousImage) {
          let diffSum = 0
          for (let i = 0; i < data.length; i += 1) {
            diffSum += Math.abs(previousImage[i] - data[i])
          }

          if (diffSum < opts.minDiff || diffSum > opts.maxDiff) {
            // Outlier, something we want to detect.
            console.log(f, 'diff:', diffSum)
          }
        } else {
          console.log(f, 'first')
        }

        previousImage = data

        next()
      })
  }, (finalerr) => {
    if (finalerr) {
      throw finalerr
    }
    console.log('finished')
  })
}
