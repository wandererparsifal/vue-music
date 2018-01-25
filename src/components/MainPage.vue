<template>
  <div class="main-div">
    <el-tabs class="tab" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="播放列表" name="play_list">
        播放列表
      </el-tab-pane>
      <el-tab-pane label="选择音乐" name="select_music">
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
        console.log(tab.name, tab.label);
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .main-div {
    width: 100vw;
    height: 100vh;
  }

  .tab {
    padding: 1vh;
  }
</style>
