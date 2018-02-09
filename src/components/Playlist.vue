<template>
  <div class="list-wrapper">
    <div class="list-item" v-for="(music, index) in list" :key="list.id"
         :style="{backgroundColor: highlightRow === index ? 'rgba(28, 205, 221, 0.9)' : (hoveredRow === index ? 'rgba(189, 249, 255, 0.9)' : (index % 2 === 0 ? 'rgba(224, 255, 255, 0.9)' : 'rgba(205, 253, 252, 0.9)'))}"
         @click="rowClicked(index)" @mouseover="rowMouseOver(index)" @mouseout="rowMouseOut(index)">
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
      <div class="icon-wrapper" @click="remove(music, $event)" :style="{opacity: hoveredRow === index ? 1 : 0.1}">
        <img class="icon" src="../assets/icon_remove.svg"/>
      </div>
    </div>
  </div>
</template>

<script>
  import EventBus from '../eventBus';
  import playlist from '../playlist';

  export default {
    name: 'Playlist',
    data() {
      return {
        list: playlist.list,
        highlightRow: -1,
        hoveredRow: -1,
      };
    },
    methods: {
      rowClicked(index) {
        this.highlightRow = index;
        EventBus.$emit('EVENT_MUSIC_PLAY', index);
      },
      remove(music, event) {
        event.stopPropagation();
        playlist.remove(music);
      },
      rowMouseOver(index) {
        this.hoveredRow = index;
      },
      rowMouseOut(index) {
        if (this.hoveredRow === index) {
          this.hoveredRow = -1;
        }
      },
    },
    created() {
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
    background-color: rgba(0, 0, 0, 0.2);
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

  .icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10vw;
    height: 6vh;
    width: 6vh;
  }

  .icon {
    height: 3vh;
    width: 3vh;
  }

  .music-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
