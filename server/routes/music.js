const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const PATH = '/home/yangming/音乐';

router.get('/', (req, res, next) => { // eslint-disable-line
  const array = [];
  fs.readdir(PATH, (err, files) => {
    const length = files.length;
    let count = 0; // todo 循环异步解决方案
    files.forEach((fileName) => {
      const p = path.join(PATH, fileName);
      fs.stat(p, (err, stats) => {
        if (err) throw err;
        if (stats.isDirectory()) {
          array.push({
            name: (array.length + 1).toString(),
            dirName: p,
            files: [],
            index: array.length,
          });
        }
        count += 1;
        if (count === length) {
          console.log('array', array);
          res.json(array);
        }
      });
    });
  });
});

module.exports = router;
