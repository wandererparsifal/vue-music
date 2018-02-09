<template>
  <div>
    <audio ref="audio" :src="audioPath"
           controls="controls" hidden></audio>
    <div class="panel-controls">
      <img class="prev" @click="onButtonClick('prev', $event)" src="../assets/icon_prev.svg">
      <img class="play" @click="onButtonClick('play', $event)" :src="iconPlay">
      <img class="next" @click="onButtonClick('next', $event)" src="../assets/icon_next.svg">
      <img class="mode" @click="onButtonClick('mode', $event)" src="../assets/icon_loop.svg">
      <img class="volume" @click="onButtonClick('volume', $event)" :src="iconVolume">
      <input type="range" class="progress-volume" v-model="percentVolume"/>
    </div>
    <div class="panel-progress">
      <div class="text-current-time">
        {{textCurrentTime}}
      </div>
      <input type="range" class="progress-music" v-model="currentTime" :max="totalTime"/>
      <div class="text-total-time">
        {{textTotalTime}}
      </div>
    </div>
    <div class="panel-blank">
    </div>
  </div>
</template>

<script>
  import svgStop from '@/assets/icon_stop.svg';
  import svgPause from '@/assets/icon_pause.svg';
  import svgPlay from '@/assets/icon_play.svg';
  import svgVolume from '@/assets/icon_volume.svg';
  import svgMute from '@/assets/icon_mute.svg';
  import svgShuffle from '@/assets/icon_shuffle.svg';
  import svgLoop from '@/assets/icon_loop.svg';
  import svgOne from '@/assets/icon_one.svg';
  import EventBus from '../eventBus';
  import playlist from '../playlist';

  let isPlaying = false;

  let isMute = false;

  let audio = null;

  let timerId = 0;

  let mode = 'LOOP';

  let indexCurrent = 0; // todo 列表删除当前播放项时，循环播放下一曲有问题

  let shuffleList = [];

  function formatTime(value) {
    let s = parseInt(value, 10);// 秒
    let m = 0;// 分
    let h = 0;// 小时
    if (s > 60) {
      m = parseInt(s / 60, 10);
      s = parseInt(s % 60, 10);
      if (m > 60) {
        h = parseInt(m / 60, 10);
        m = parseInt(m % 60, 10);
      }
    }
    let result = '';
    if (s >= 10) {
      result = parseInt(s, 10); // eslint-disable-line
    } else {
      result = '0' + parseInt(s, 10); // eslint-disable-line
    }
    if (m >= 10) {
      result = parseInt(m, 10) + ':' + result; // eslint-disable-line
    } else {
      result = '0' + parseInt(m, 10) + ':' + result; // eslint-disable-line
    }
    if (h >= 10) {
      result = parseInt(h, 10) + ':' + result; // eslint-disable-line
    } else if (h > 0) {
      result = '0' + parseInt(h, 10) + ':' + result; // eslint-disable-line
    }
    return result;
  }

  function getNext(mode) {
    if (mode === 'LOOP') {
      indexCurrent += 1;
      if (indexCurrent === playlist.list.length) {
        indexCurrent = 0;
      }
      EventBus.$emit('EVENT_HIGHLIGHT_ROW', indexCurrent);
      return playlist.list[indexCurrent];
    } else if (mode === 'ONE') {
      return playlist.list[indexCurrent];
    } else if (mode === 'SHUFFLE') {
      if (shuffleList.length === 0) {
        shuffleList = shuffleList.concat(playlist.list);
      }
      const randomIndex = parseInt(shuffleList.length * Math.random(), 10);
      let item;
      for (let i = 0; i < playlist.list.length; i += 1) {
        item = playlist.list[i];
        if (item.id === shuffleList[randomIndex].id) {
          indexCurrent = i;
          break;
        }
      }
      shuffleList.splice(randomIndex, 1);
      console.log('shuffleList.length', shuffleList.length);
      console.log('indexCurrent', indexCurrent);
      EventBus.$emit('EVENT_HIGHLIGHT_ROW', indexCurrent);
      return playlist.list[indexCurrent];
    }
    return null;
  }

  function getPrev(mode) {
    if (mode === 'LOOP') {
      indexCurrent -= 1;
      if (indexCurrent === -1) {
        indexCurrent = playlist.list.length - 1;
      }
      EventBus.$emit('EVENT_HIGHLIGHT_ROW', indexCurrent);
      return playlist.list[indexCurrent];
    } else if (mode === 'ONE') {
      return playlist.list[indexCurrent];
    } else if (mode === 'SHUFFLE') {
      if (shuffleList.length === 0) {
        shuffleList = shuffleList.concat(playlist.list);
      }
      const randomIndex = parseInt(shuffleList.length * Math.random(), 10);
      let item;
      for (let i = 0; i < playlist.list.length; i += 1) {
        item = playlist.list[i];
        if (item.id === shuffleList[randomIndex].id) {
          indexCurrent = i;
          break;
        }
      }
      shuffleList.splice(randomIndex, 1);
      console.log('shuffleList.length', shuffleList.length);
      console.log('indexCurrent', indexCurrent);
      EventBus.$emit('EVENT_HIGHLIGHT_ROW', indexCurrent);
      return playlist.list[indexCurrent];
    }
    return null;
  }

  export default {
    name: 'PlayPanel',
    data() {
      return {
        audioPath: '',
        iconPlay: svgStop,
        iconVolume: svgVolume,
        percentVolume: 100,
        currentTime: 0,
        totalTime: 0,
        textCurrentTime: '00:00',
        textTotalTime: '00:00',
      };
    },
    methods: {
      onButtonClick(id, event) {
        console.log('clickButton', id);
        if (id === 'play') {
          if (isPlaying) {
            audio.pause();
          } else {
            audio.play();
          }
        } else if (id === 'volume') {
          if (isMute) {
            this.percentVolume = 50;
          } else {
            this.percentVolume = 0;
          }
        } else if (id === 'mode') {
          const src = event.currentTarget.src;
          if (src === svgShuffle) {
            event.currentTarget.src = svgLoop;
            mode = 'LOOP';
          } else if (src === svgLoop) {
            event.currentTarget.src = svgOne;
            mode = 'ONE';
          } else if (src === svgOne) {
            event.currentTarget.src = svgShuffle;
            mode = 'SHUFFLE';
          }
        } else if (id === 'next') {
          this.playNext();
        } else if (id === 'prev') {
          this.playPrev();
        }
      },
      playNext() {
        if (playlist.list.length !== 0) {
          audio.fastSeek(0);
          const musicData = getNext(mode);
          this.audioPath = `music/path?path=${musicData.path}`;
          this.$nextTick(() => {
            audio.play();
          });
        }
      },
      playPrev() {
        if (playlist.list.length !== 0) {
          audio.fastSeek(0);
          const musicData = getPrev(mode);
          this.audioPath = `music/path?path=${musicData.path}`;
          this.$nextTick(() => {
            audio.play();
          });
        }
      },
    },
    watch: {
      percentVolume: {
        deep: true,
        handler(curVal, oldVal) { // eslint-disable-line
          const volume = curVal / 100;
          audio.volume = volume;
          if (volume === 0) {
            isMute = true;
            this.iconVolume = svgMute;
          } else {
            if (isMute) { // eslint-disable-line
              isMute = false;
              this.iconVolume = svgVolume;
            }
          }
        },
      },
    },
    created() {
      EventBus.$on('EVENT_MUSIC_PLAY', (index) => {
        const musicData = playlist.list[index];
        console.log('musicData', musicData, index);
        indexCurrent = index;
        this.audioPath = `music/path?path=${musicData.path}`;
        this.$nextTick(() => {
          audio.play();
        });
      });
    },
    mounted() {
      audio = this.$refs.audio;
      audio.addEventListener('durationchange', () => {
        this.totalTime = Math.round(audio.duration);
        this.textTotalTime = formatTime(this.totalTime);
      });
      audio.addEventListener('playing', () => {
        console.log('playing');
        isPlaying = true;
        this.iconPlay = svgPause;
        timerId = setInterval(() => {
          const currentTime = Math.round(audio.currentTime);
          if (currentTime <= this.totalTime) {
            this.currentTime = currentTime;
          }
          this.textCurrentTime = formatTime(this.currentTime);
        }, 1000);
      });
      audio.addEventListener('pause', () => {
        console.log('paused');
        isPlaying = false;
        this.iconPlay = svgPlay;
        clearInterval(timerId);
      });
      audio.addEventListener('ended', () => {
        console.log('ended');
        this.currentTime = this.totalTime;
        this.playNext();
      });
    },
  };
</script>

<style scoped>
  .panel-controls {
    width: 100vw;
    height: 2vw;
    background-color: rgba(205, 253, 252, 0.7);
    display: flex;
    align-items: center;
    clear: both;
  }

  .panel-progress {
    width: 100vw;
    height: 2vw;
    background-color: rgba(205, 253, 252, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    clear: both;
  }

  .panel-blank {
    width: 100vw;
    height: 1vh;
    background-color: rgba(205, 253, 252, 0.7);
  }

  .prev {
    margin-top: 2vh;
    margin-left: 41vw;
    width: 2vw;
    height: 2vw;
  }

  .play {
    margin-top: 2vh;
    margin-left: 5vw;
    width: 2vw;
    height: 2vw;
  }

  .next {
    margin-top: 2vh;
    margin-left: 5vw;
    width: 2vw;
    height: 2vw;
  }

  .mode {
    margin-top: 2vh;
    margin-left: 15vw;
    width: 2vw;
    height: 2vw;
  }

  .volume {
    margin-top: 2vh;
    margin-left: 5vw;
    width: 2vw;
    height: 2vw;
  }

  .progress-volume {
    margin-top: 2vh;
    margin-left: 0.5vw;
  }

  .progress-music {
    margin-top: 1vh;
    margin-left: 1vw;
    width: 81vw;
  }

  .text-current-time {
    color: #000080;
    margin-top: 1.4vh;
    font-size: 1rem;
    margin-left: -2vw;
  }

  .text-total-time {
    color: #000080;
    margin-top: 1.4vh;
    font-size: 1rem;
    margin-left: 1vw;
  }
</style>
