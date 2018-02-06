const express = require('express');
const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid/v4');
const id3 = require('id3js');

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

function id3Async(path) {
  return new Promise((resolve, reject) => {
    id3({ file: path, type: id3.OPEN_LOCAL }, (error, tags) => {
      if (error) {
        reject(error);
      } else {
        resolve(tags);
      }
    });
  });
}

function getMusicDirectory(musicDirs, files) {
  return Promise.all(files.map((file) => {
    const musicDir = path.join(PATH, file);
    return statAsync(musicDir)
      .then((stat) => {
        if (stat.isDirectory()) {
          musicDirs.push(musicDir);
        }
      });
  }));
}

function getMusicList(list, musicDirs) {
  return Promise.all(musicDirs.map((musicDir) => { // eslint-disable-line
    const musicList = [];
    return readDirAsync(musicDir)
      .then((musicArray) => {
        console.log('musicArray', musicArray);
        return Promise.all(musicArray.map((musicName) => { // eslint-disable-line
          return id3Async(path.join(musicDir, musicName))
            .then((tags) => {
              musicList.push({
                title: tags.title !== null ? tags.title : path.basename(musicName, '.mp3'), // todo Unicode 乱码
                path: path.join(musicDir, musicName),
                artist: tags.artist !== null ? tags.artist : '-',
                album: tags.album !== null ? tags.album : '-',
                id: uuidv4(),
              });
            });
        }));
      })
      .then(() => {
        list.push({
          name: (list.length + 1).toString(),
          dirName: path.basename(musicDir),
          list: musicList,
          index: list.length,
        });
      });
  }));
}

router.get('/', (req, res, next) => { // eslint-disable-line
  const list = [];
  const musicDirs = [];
  readDirAsync(PATH)
    .then((files) => { // eslint-disable-line
      return getMusicDirectory(musicDirs, files);
    })
    .then(() => {
      console.log('musicDirs', musicDirs);
      return getMusicList(list, musicDirs);
    })
    .then(() => {
      console.log('array', JSON.stringify(list));
      res.json(list);
    })
    .catch(error => console.log(error));
});

module.exports = router;
