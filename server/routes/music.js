const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => { // eslint-disable-line
  const array = [];
  array.push({
    name: '1',
    dirName: 'Blackmore\'s Night - Under A Violet Moon',
    files: [],
    index: 0,
  });
  array.push({
    name: '2',
    dirName: 'Gary Stadler - Fairy Heart Magic',
    files: [],
    index: 1,
  });
  array.push({
    name: '3',
    dirName: 'Rule of Rose Songs from the Original Soundtrack',
    files: [],
    index: 2,
  });
  array.push({
    name: '4',
    dirName: '原声大碟.-.[暗黑破坏神2.-.DiabloII].专辑.(mp3)',
    files: [],
    index: 3,
  });
  array.push({
    name: '5',
    dirName: '原声大碟.-.[潘神的迷宫.-.Pan\'\\\'\'s.Labyrinth].专辑.(mp3)',
    files: [],
    index: 4,
  });
  res.json(array);
});

module.exports = router;
