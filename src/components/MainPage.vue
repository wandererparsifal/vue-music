<template>
  <div class="main-div">
    <el-tabs class="tab" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane name="play_list">
        <span class="tab-handler" slot="label">播放列表</span>
        播放列表
      </el-tab-pane>
      <el-tab-pane name="select_music">
        <span class="tab-handler" slot="label">&#12288;曲库&#12288;</span>
        选择音乐
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: 'MainPage',
    data() {
      return {
        activeName: 'play_list',
      };
    },
    methods: {
      handleClick(tab, event) { // eslint-disable-line
        console.log(tab.name);
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

  .tab-handler {
    font-weight: bold;
    font-size: 1rem;
  }
</style>
