<template>
  <div class="collapse">
    <div v-for="(item, albumIndex) in allMusic" :key="item.id">
      <div class="collapse-handle" @click="showContent(albumIndex)">
        {{item.dirName}}
      </div>
      <collapse-transition>
        <div v-show="activeArray.includes(albumIndex)">
          <div slot="content" class="list-item" v-for="(music, musicIndex) in item.list" :key="item.list.id"
               :style="{backgroundColor: (playlistRef.includes(music) ? 'rgba(0, 225, 245, 0.9)' : (((hoveredAlbum === albumIndex) && (hoveredMusic === musicIndex)) ? 'rgba(189, 249, 255, 0.9)' : (musicIndex % 2 === 0 ? 'rgba(224, 255, 255, 0.9)' : 'rgba(205, 253, 252, 0.9)'))),
               color: playlistRef.includes(music) ? '#fff' : '#004D99'}"
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
            <div class="icon-wrapper" v-show="playlistRef.includes(music)">
              <img class="icon" src="../assets/icon_added.svg"/>
            </div>
          </div>
        </div>
      </collapse-transition>
      <div class="hr" v-if="(albumIndex < (allMusic.length - 1)) && !activeArray.includes(albumIndex)"></div>
    </div>
  </div>
</template>

<script>
  import CollapseTransition from 'iview/src/components/base/collapse-transition';
  import axios from 'axios';
  import playlist from '../playlist';

  export default {
    name: 'select-music',
    components: { CollapseTransition },
    data() {
      return {
        activeArray: [],
        allMusic: [],
        hoveredAlbum: -1,
        hoveredMusic: -1,
        playlistRef: playlist,
      };
    },
    created() {
      axios.get('/music')
        .then((response) => {
          const data = response.data;
          if (data instanceof Array) {
            this.allMusic = response.data;
            this.$nextTick(() => {
              this.activeArray.push(0);
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
      showContent(index) {
        if (this.activeArray.includes(index)) {
          this.activeArray.splice(this.activeArray.indexOf(index), 1);
        } else {
          this.activeArray.push(index);
        }
      },
      rowClicked(musicData) {
        if (playlist.includes(musicData)) {
          playlist.remove(musicData);
        } else {
          playlist.add(musicData);
        }
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

<style scoped>
  .collapse {
    overflow-y: auto;
    max-height: 90vh;
    background-color: rgba(0, 0, 0, 0.2);
  }

  .collapse-handle {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 1rem;
    color: #000080;
    height: 6vh;
    background: linear-gradient(to bottom right, rgba(204, 204, 255, 0.8), rgba(0, 191, 255, 0.8));
  }

  .hr {
    height: 1px;
    background: rgba(255, 255, 255, 0.3);
  }
</style>
