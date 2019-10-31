const sharp = require('sharp')
const path = require('path')
const fs = require('fs')
const asyn = require('async')

module.exports = (dirpath) => {
  const files = fs.readdirSync(dirpath)
  const isImage = /\.(jpg|jpeg|png|tiff)$/i
  const imageFiles = files.filter(f => {
    return isImage.test(f)
  })

  asyn.eachSeries(imageFiles, (f, next) => {
    const p = path.join(dirpath, f)
    sharp(p)
      .raw()
      .toBuffer((err, data, info) => {
        console.log(f, info.size)
      })
  }, (err) => {
    console.log('finished')
  })
}
