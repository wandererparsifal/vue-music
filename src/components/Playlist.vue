<template>
  <div class="list-wrapper">
    <div class="list-item" v-for="(music, index) in data" :key="data.id"
         :style="{backgroundColor: highlightRow === index ? '#7be6ff' : (index % 2 === 0 ? '#e0ffff' : '#FFFDFD')}"
         @click="rowClicked(music, index)">
      <div class="title-wrapper">
        <div class="music-text">
          {{music.title}}
        </div>
      </div>
      <div class="artist-wrapper">
        <div class="music-text">
          {{music.artist}}
        </div>
      </div>
      <div class="album-wrapper">
        <div class="music-text">
          {{music.album}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import EventBus from '../eventBus';

  export default {
    name: 'Playlist',
    data() {
      return {
        data: [],
        musicIds: [],
        highlightRow: -1,
      };
    },
    methods: {
      rowClicked(musicData, index) {
        this.highlightRow = index;
        EventBus.$emit('EVENT_MUSIC_PLAY', musicData, index);
      },
    },
    created() {
      EventBus.$on('EVENT_MUSIC_ADDED', (musicData) => {
        if (!this.musicIds.includes(musicData.id)) {
          this.musicIds.push(musicData.id);
          this.data.push(musicData);
        }
      });
      EventBus.$on('EVENT_HIGHLIGHT_ROW', (index) => {
        console.log('highlightRow', this.highlightRow);
        this.highlightRow = index;
      });
    },
    mounted() {
    },
  };
</script>

<style>
  .list-wrapper {
    overflow-y: auto;
    max-height: 79vh;
    height: 79vh;
    background-color: #F8F8FF;
  }

  .list-item {
    display: flex;
    align-items: center;
    height: 6vh;
    font-size: 1rem;
    color: #00477D;
  }

  .title-wrapper {
    display: flex;
    margin-left: 2vw;
    width: 23vw;
  }

  .artist-wrapper {
    display: flex;
    margin-left: 5vw;
    width: 20vw;
  }

  .album-wrapper {
    display: flex;
    margin-left: 5vw;
    width: 20vw;
  }

  .music-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
