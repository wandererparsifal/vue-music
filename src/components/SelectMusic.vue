<template>
  <i-collapse class="collapse" v-model="activeName" @on-change="changed">
    <i-panel :name="item.name" v-for="item in items" :key="item.index">
      {{item.dirName}}
      <p slot="content">
        <i-table class="table" stripe :columns="columns" :data="item.data" @on-row-click="rowClicked"/>
      </p>
    </i-panel>
  </i-collapse>
</template>

<script>
  import axios from 'axios';
  import EventBus from '../eventBus';

  export default {
    name: 'select-music',
    data() {
      return {
        activeName: '0',
        items: [],
        columns: [
          {
            title: 'Title',
            key: 'title',
            align: 'left',
          },
          {
            title: 'Artist',
            key: 'artist',
            align: 'left',
          },
          {
            title: 'Album',
            key: 'album',
            align: 'left',
          },
        ],
      };
    },
    created() {
      axios.get('/music')
        .then((response) => {
          const data = response.data;
          if (data instanceof Array) {
            data.forEach((d) => {
              d.data = [];
              d.titles.forEach((t) => {
                d.data.push({
                  title: t,
                  artist: 'artist',
                  album: 'album',
                });
              });
            });
            this.items = response.data;
            setTimeout(() => { // todo 必须延迟，否则无效 ?
              this.activeName = '1';
            }, 0);
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
      rowClicked(data) {
        EventBus.$emit('EVENT_MUSIC_ADDED', data);
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
