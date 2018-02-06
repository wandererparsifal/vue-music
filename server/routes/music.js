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

function readDirAsync(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (error, files) => {
      if (error) {
        reject(error);
      } else {
        resolve(files);
      }
    });
  });
}

function statAsync(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (error, stats) => {
      if (error) {
        reject(error);
      } else {
        resolve(stats);
      }
    });
  });
}

router.get('/', (req, res, next) => { // eslint-disable-line
  const array = [];
  const musicDirs = [];
  readDirAsync(PATH)
    .then((files) => { // eslint-disable-line
      return Promise.all(files.map((file) => {
        const musicDir = path.join(PATH, file);
        return statAsync(musicDir)
          .then((stat) => {
            if (stat.isDirectory()) {
              musicDirs.push(musicDir);
            }
          });
      }));
    })
    .then(() => {
      console.log('musicDirs', musicDirs);
      return Promise.all(musicDirs.map((musicDir) => { // eslint-disable-line
        return readDirAsync(musicDir)
          .then((musicArray) => {
            console.log('musicArray', musicArray);
            const musicList = musicArray.map((musicName) => { // eslint-disable-line
              return {
                title: path.basename(musicName, '.mp3'),
                path: path.join(musicDir, musicName),
                artist: 'artist',
                album: 'album',
                id: uuidv4(),
              };
            });
            array.push({
              name: (array.length + 1).toString(),
              dirName: path.basename(musicDir),
              list: musicList,
              index: array.length,
            });
          });
      }));
    })
    .then(() => {
      console.log('array', JSON.stringify(array));
      res.json(array);
    })
    .catch(error => console.log(error));
});

module.exports = router;
