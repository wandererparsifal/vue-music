<template>
  <i-collapse class="collapse" v-model="activeName" @on-change="changed">
    <i-panel :name="item.name" v-for="(item, albumIndex) in allMusic" :key="item.id">
      {{item.dirName}}
      <div slot="content" class="list-item" v-for="(music, musicIndex) in item.list" :key="item.list.id"
           :style="{backgroundColor: ((hoveredAlbum === albumIndex) && (hoveredMusic === musicIndex)) ? '#bdf9ff' : (musicIndex % 2 === 0 ? '#e0ffff' : '#cdfdfc')}"
           @click="rowClicked(music)" @mouseover="rowMouseOver(albumIndex, musicIndex)"
           @mouseout="rowMouseOut(albumIndex, musicIndex)">
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
    </i-panel>
  </i-collapse>
</template>

<script>
  import axios from 'axios';
  import playlist from '../playlist';

  export default {
    name: 'select-music',
    data() {
      return {
        activeName: '0',
        allMusic: [],
        hoveredAlbum: -1,
        hoveredMusic: -1,
      };
    },
    created() {
      axios.get('/music')
        .then((response) => {
          const data = response.data;
          if (data instanceof Array) {
            this.allMusic = response.data;
            this.$nextTick(() => {
              this.activeName = '1';
            });
          }
        })
        .catch((response) => {
          console.log(response);
        });
    },
    methods: {
      changed(names) {
        console.log(names);
      },
      rowClicked(musicData) {
        playlist.add(musicData);
      },
      rowMouseOver(albumIndex, musicIndex) {
        this.hoveredAlbum = albumIndex;
        this.hoveredMusic = musicIndex;
      },
      rowMouseOut(albumIndex, musicIndex) {
        if (this.hoveredMusic === musicIndex) {
          this.hoveredAlbum = -1;
          this.hoveredMusic = -1;
        }
      },
    },
  };
</script>

<style>
  .collapse {
    overflow-y: auto;
    max-height: 90vh;
  }
</style>
