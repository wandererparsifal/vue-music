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
  import axios from 'axios';

  export default {
    name: 'select-music',
    data() {
      return {
        activeName: '0',
        items: [],
      };
    },
    created() {
      axios.get('/music')
        .then((response) => {
          const data = response.data;
          if (data instanceof Array) {
            this.items = response.data;
          }
        })
        .catch((response) => {
          console.log(response);
        });
    },
  };
</script>

<style>

</style>
