<template>
  <div>
    <audio :src="audioPath"
           controls="controls"></audio>
    <div class="panel">
      <img class="blank" src="">
      <img class="prev" @click="onButtonClick('prev')" src="../assets/icon_prev.svg">
      <img class="play" @click="onButtonClick('play')" src="../assets/icon_stop.svg">
      <img class="next" @click="onButtonClick('next')" src="../assets/icon_next.svg">
      <img class="mode" @click="onButtonClick('mode')" src="../assets/icon_shuffle.svg">
    </div>
    <div class="panel">
      <i-progress class="progress" :percent="25" hide-info></i-progress>
    </div>
  </div>
</template>

<script>
  import EventBus from '../eventBus';

  export default {
    name: 'PlayPanel',
    data() {
      return {
        audioPath: '',
      };
    },
    methods: {
      onButtonClick(id) {
        console.log('clickButton', id);
      },
    },
    created() {
      EventBus.$on('EVENT_MUSIC_PLAY', (musicData) => {
        console.log('musicData', musicData);
        this.audioPath = `music/path?path=${musicData.path}`;
      });
    },
  };
</script>

<style scoped>
  .panel {
    width: 100vw;
    height: 6vh;
    background-color: rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    clear: both;
  }

  .blank {
    margin-top: 2vh;
    margin-right: 15vw;
    width: 5vh;
    height: 5vh;
  }

  .prev {
    margin-top: 2vh;
    margin-right: 15vw;
    width: 5vh;
    height: 5vh;
  }

  .play {
    margin-top: 2vh;
    width: 5vh;
    height: 5vh;
  }

  .next {
    margin-top: 2vh;
    margin-left: 15vw;
    width: 5vh;
    height: 5vh;
  }

  .mode {
    margin-top: 2vh;
    margin-left: 15vw;
    width: 5vh;
    height: 5vh;
  }

  .progress {
    margin-top: 1vh;
    margin-left: -2vw;
    width: 92vw;
  }
</style>
