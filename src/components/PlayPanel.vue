<template>
  <div>
    <audio ref="audio" :src="audioPath"
           controls="controls" hidden></audio>
    <div class="panel-controls">
      <img class="prev" @click="onButtonClick('prev')" src="../assets/icon_prev.svg">
      <img class="play" ref="play" @click="onButtonClick('play')" :src="iconPlay">
      <img class="next" @click="onButtonClick('next')" src="../assets/icon_next.svg">
      <img class="mode" @click="onButtonClick('mode')" src="../assets/icon_shuffle.svg">
      <img class="volume" @click="onButtonClick('volume')" :src="iconVolume">
      <vue-slider ref="slider" class="progress-volume" v-model="percentVolume" :tooltip="false" width="8vw"
                  :dot-size="12" :max="100"
                  :bgStyle="{backgroundColor: '#fff'}" :processStyle="{backgroundColor: 'rgba(0, 127, 255, 0.7)'}"
                  :sliderStyle="{backgroundColor: '#483D8B'}"/>
    </div>
    <div class="panel-progress">
      <vue-slider ref="slider" class="progress-music" v-model="percentMusic" :tooltip="false" width="81vw"
                  :dot-size="16" :max="10000"
                  :bgStyle="{backgroundColor: '#fff'}" :processStyle="{backgroundColor: 'rgba(0, 127, 255, 0.7)'}"
                  :sliderStyle="{backgroundColor: '#483D8B'}"/>
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
  import vueSlider from 'vue-slider-component';
  import EventBus from '../eventBus';

  let isPlaying = false;

  let isMute = false;

  let audio = null;

  export default {
    name: 'PlayPanel',
    components: { vueSlider },
    data() {
      return {
        audioPath: '',
        iconPlay: svgStop,
        iconVolume: svgVolume,
        percentVolume: 100,
        percentMusic: 2500,
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
        } else if (id === 'volume') {
          if (isMute) {
            this.percentVolume = 50;
          } else {
            this.percentVolume = 0;
          }
        }
      },
      setVolume(volume) {
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
    watch: {
      percentVolume: {
        deep: true,
        handler(curVal, oldVal) { // eslint-disable-line
          const volume = curVal / 100;
          audio.volume = volume;
          this.setVolume(volume);
        },
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
  .panel-controls {
    width: 100vw;
    height: 2vw;
    background-color: rgba(255, 255, 255, 0.5);
    display: flex;
    align-items: center;
    clear: both;
  }

  .panel-progress {
    width: 100vw;
    height: 2vw;
    background-color: rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    clear: both;
  }

  .panel-blank {
    width: 100vw;
    height: 1vh;
    background-color: rgba(255, 255, 255, 0.5);
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
    margin-left: -2vw;
  }
</style>
