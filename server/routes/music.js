const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const PATH = '/home/yangming/temp/Music';

router.get('/', (req, res, next) => { // eslint-disable-line
  const array = [];
  fs.readdir(PATH, (err, files) => {
    if (err) throw err;
    const length = files.length;
    let count = 0; // todo 循环异步解决方案
    files.forEach((fileName) => {
      const musicDir = path.join(PATH, fileName);
      fs.stat(musicDir, (err, stats) => {
        if (err) throw err;
        if (stats.isDirectory()) {
          fs.readdir(musicDir, (err, musics) => {
            if (err) throw err;
            const musicTitles = [];
            const musicPaths = [];
            musics.forEach((musicName) => {
              musicTitles.push(path.basename(musicName, '.mp3'));
              musicPaths.push(path.join(musicDir, musicName));
            });
            array.push({
              name: (array.length + 1).toString(),
              titles: musicTitles,
              dirName: fileName,
              paths: musicPaths,
              index: array.length,
            });
            count += 1;
            if (count === length) {
              console.log('array', array);
              res.json(array);
            }
          });
        } else {
          count += 1;
        }
      });
    });
  });
});

module.exports = router;
