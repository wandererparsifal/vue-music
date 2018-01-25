<template>
  <div class="main-div">
    <Tabs class="tab" value="play_list" @on-click="handleClick">
      <tab-pane :label="label1" name="play_list">标签一的内容</tab-pane>
      <tab-pane :label="label2" name="select_music">标签二的内容</tab-pane>
    </Tabs>
  </div>
</template>

<script>
  import Tabs from 'iview/src/components/tabs/tabs';
  import TabPane from 'iview/src/components/tabs/pane';

  export default {
    name: 'MainPage',
    components: { Tabs, TabPane },
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
        console.log(name);
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
    padding: 1vh;
  }
</style>
