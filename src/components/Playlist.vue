<template>
  <i-table class="table" :height="height" :highlight-row="true" stripe :columns="columns1" :data="data1"/>
</template>

<script>
  import EventBus from '../eventBus';

  export default {
    name: 'Playlist',
    data() {
      return {
        height: 0,
        columns1: [
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
        data1: [],
      };
    },
    created() {
      this.height = document.documentElement.clientHeight * 0.87;
      window.addEventListener('resize', () => {
        this.height = document.documentElement.clientHeight * 0.87;
      });
      EventBus.$on('EVENT_MUSIC_ADDED', (data) => {
        this.data1.push(data);
      });
    },
  };
</script>

<style>
  .table {
    opacity: 1;
  }
</style>
