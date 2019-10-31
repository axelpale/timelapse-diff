// const sharp = require('sharp')
const fs = require('fs')

module.exports = (dirpath) => {
  const files = fs.readdirSync(dirpath)
  files.forEach(f => {
    console.log(f)
  })
}
