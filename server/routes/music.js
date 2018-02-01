const express = require('express');
const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid/v4');

const router = express.Router();

const PATH = '/home/yangming/Develop/Projects/Web/vue-music/server/Music';

router.get('/path', (req, res, next) => { // eslint-disable-line
  const musicPath = req.query.path;
  console.log('musicPath', musicPath);
  fs.readFile(musicPath, 'binary', (err, file) => {
    if (err) throw err; // todo 错误跳转
    res.writeHead(200, { 'Content-Type': 'audio/mp3' });
    res.write(file, 'binary');
    res.end();
  });
});

router.get('/', (req, res, next) => { // eslint-disable-line
  const array = [];
  fs.readdir(PATH, (err, files) => {
    if (err) throw err; // todo 错误跳转
    const length = files.length;
    let count = 0; // todo 循环异步解决方案
    files.forEach((fileName) => {
      const musicDir = path.join(PATH, fileName);
      fs.stat(musicDir, (err, stats) => {
        if (err) throw err; // todo 错误跳转
        if (stats.isDirectory()) {
          fs.readdir(musicDir, (err, musics) => {
            if (err) throw err;
            const musicList = [];
            musics.forEach((musicName) => {
              musicList.push({
                title: path.basename(musicName, '.mp3'),
                path: path.join(musicDir, musicName),
                artist: 'artist',
                album: 'album',
                id: uuidv4(),
              });
            });
            array.push({
              name: (array.length + 1).toString(),
              dirName: fileName,
              list: musicList,
              index: array.length,
            });
            count += 1;
            if (count === length) {
              console.log('array', JSON.stringify(array));
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
