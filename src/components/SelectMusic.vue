<template>
  <i-collapse v-model="activeName">
    <i-panel :name="item.name" v-for="item in items" :key="item.index">
      {{item.dirName}}
      <p slot="content">
        史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。
        <br/>
        <i-button type="primary">Primary</i-button>
      </p>
    </i-panel>
  </i-collapse>
</template>

<script>
  export default {
    name: 'select-music',
    data() {
      return {
        activeName: '0',
        items: [],
      };
    },
    created() {
      this.items.push({
        name: '1',
        dirName: 'Blackmore\'s Night - Under A Violet Moon',
        files: [],
        index: 0,
      });
      this.items.push({
        name: '2',
        dirName: 'Gary Stadler - Fairy Heart Magic',
        files: [],
        index: 1,
      });
      this.items.push({
        name: '3',
        dirName: 'Rule of Rose Songs from the Original Soundtrack',
        files: [],
        index: 2,
      });
      this.items.push({
        name: '4',
        dirName: '原声大碟.-.[暗黑破坏神2.-.DiabloII].专辑.(mp3)',
        files: [],
        index: 3,
      });
      this.items.push({
        name: '5',
        dirName: '原声大碟.-.[潘神的迷宫.-.Pan\'\\\'\'s.Labyrinth].专辑.(mp3)',
        files: [],
        index: 4,
      });
    },
  };
</script>

<style>

</style>
