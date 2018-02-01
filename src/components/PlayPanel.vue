<template>
  <div>
    <audio ref="audio" :src="audioPath"
           controls="controls"></audio>
    <div class="panel">
      <img class="prev" @click="onButtonClick('prev')" src="../assets/icon_prev.svg">
      <img class="play" ref="play" @click="onButtonClick('play')" :src="iconPlay">
      <img class="next" @click="onButtonClick('next')" src="../assets/icon_next.svg">
      <img class="mode" @click="onButtonClick('mode')" src="../assets/icon_shuffle.svg">
      <img class="volume" @click="onButtonClick('volume')" :src="iconVolume">
      <i-progress class="progress-volume" :percent="70" hide-info :stroke-width="6"></i-progress>
    </div>
    <div class="panel">
      <i-progress class="progress-music" :percent="25" hide-info></i-progress>
    </div>
  </div>
</template>

<script>
  import svgStop from '@/assets/icon_stop.svg';
  import svgPause from '@/assets/icon_pause.svg';
  import svgPlay from '@/assets/icon_play.svg';
  import svgVolume from '@/assets/icon_volume.svg';
  // import svgMute from '@/assets/icon_mute.svg';
  import EventBus from '../eventBus';

  let isPlaying = false;

  let audio = null;

  export default {
    name: 'PlayPanel',
    data() {
      return {
        audioPath: '',
        iconPlay: svgStop,
        iconVolume: svgVolume,
      };
    },
    methods: {
      onButtonClick(id) {
        console.log('clickButton', id);
        if (id === 'play') {
          if (isPlaying) {
            audio.pause();
          } else {
            audio.play();
          }
        }
      },
    },
    created() {
      EventBus.$on('EVENT_MUSIC_PLAY', (musicData) => {
        console.log('musicData', musicData);
        this.audioPath = `music/path?path=${musicData.path}`;
        this.$nextTick(() => {
          audio.play();
        });
      });
    },
    mounted() {
      console.log('this.$refs.audio', this.$refs.audio);
      audio = this.$refs.audio;
      audio.addEventListener('playing', () => {
        console.log('playing');
        isPlaying = true;
        this.iconPlay = svgPause;
      });
      audio.addEventListener('pause', () => {
        console.log('paused');
        isPlaying = false;
        this.iconPlay = svgPlay;
      });
    },
  };
</script>

<style scoped>
  .panel {
    width: 100vw;
    height: 2vw;
    background-color: rgba(255, 255, 255, 0.5);
    display: flex;
    align-items: center;
    clear: both;
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
    width: 8vw;
  }

  .progress-music {
    margin-top: 1vh;
    margin-left: -2vw;
    width: 92vw;
  }
</style>
