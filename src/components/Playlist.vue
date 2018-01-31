<template>
  <i-table class="table" :height="height" :highlight-row="true" stripe :columns="columns" :data="data"/>
</template>

<script>
  import EventBus from '../eventBus';

  export default {
    name: 'Playlist',
    data() {
      return {
        height: 0,
        columns: [
          {
            title: 'Title',
            key: 'title',
            align: 'left',
          },
          {
            title: 'Artist',
            key: 'artist',
            align: 'center',
          },
          {
            title: 'Album',
            key: 'album',
            align: 'center',
          },
          {
            title: ' ',
            key: 'xxx',
            align: 'center',
            render: (h, params) => { // eslint-disable-line
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'shuffle',
                  },
                  nativeOn: { // Icon 需要用 nativeOn，button 用 on
                    click: () => {
                      console.log('click Icon');
                    },
                  },
                }, 'View'),
              ]);
            },
          },
        ],
        data: [],
        musicIds: [],
      };
    },
    created() {
      this.height = document.documentElement.clientHeight * 0.77;
      window.addEventListener('resize', () => {
        this.height = document.documentElement.clientHeight * 0.77;
      });
      EventBus.$on('EVENT_MUSIC_ADDED', (musicData) => {
        if (!this.musicIds.includes(musicData.id)) {
          this.musicIds.push(musicData.id);
          this.data.push(musicData);
        }
      });
    },
  };
</script>

<style>
  .table {
    opacity: 1;
  }
</style>
