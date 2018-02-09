<template>
  <div class="main-div">
    <i-tabs class="tab" :animated="false" :value="activeName" @on-click="handleClick">
      <i-tab-pane :label="label1" name="play_list">
        <playlist/>
        <play-panel class="playpanel"/>
      </i-tab-pane>
      <i-tab-pane :label="label2" name="select_music">
        <select-music/>
      </i-tab-pane>
    </i-tabs>
  </div>
</template>

<script>
  import Playlist from './Playlist';
  import SelectMusic from './SelectMusic';
  import PlayPanel from './PlayPanel';

  export default {
    name: 'MainPage',
    components: {
      PlayPanel,
      Playlist,
      SelectMusic,
    },
    data() {
      return {
        activeName: 'play_list',
        label1: h => h('span', {
          style: {
            fontWeight: 'bold',
            fontSize: '1rem',
          },
        }, '播放列表'),
        label2: h => h('span', {
          style: {
            fontWeight: 'bold',
            fontSize: '1rem',
          },
        }, '　曲库　'),
      };
    },
    methods: {
      handleClick(name) {
        name.toString();
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .main-div {
    width: 100vw;
    height: 100vh;
    /*background: linear-gradient(to bottom right, #006374 20%, #8B00FF 40%, #00BFFF 60%, #00CED1 80%);*/
    background: linear-gradient(to bottom right, #006374, #6640FF, #00BFFF, #00CED1);
  }

  .tab {
    width: 98vw;
    margin-left: 1vw;
  }

  .playpanel {
    margin-top: 2vh;
  }
</style>
