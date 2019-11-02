# timelapse-diff

Find bad images in a timelapse sequence by summing the absolute difference between adjacent frames. The difference between frames gives hint about how much movement there is in the frame.

Install via [npm](https://www.npmjs.com/package/timelapse-diff): `$ npm install timelapse-diff`

## Usage

```
> const tldiff = require('timelapse-diff')
> const dirPath = '/path/to/image/dir/'
> tldiff.diff(dirPath)
PIC00001.JPG first
PIC00002.JPG 23172456
PIC00003.JPG 11349599
PIC00004.JPG 10386873
PIC00005.JPG 39200935
PIC00006.JPG 34348570
...
```

Larger number, larger the difference. Duplicates have zero difference.

## Versioning

[Semantic Versioning 2.0.0](http://semver.org/)

## License

[MIT License](LICENSE)
