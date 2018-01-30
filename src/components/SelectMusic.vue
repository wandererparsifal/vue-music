<template>
  <i-collapse class="collapse" v-model="activeName" @on-change="changed">
    <i-panel :name="item.name" v-for="item in items" :key="item.index">
      {{item.dirName}}
      <p slot="content">
        {{item.files}}
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
    },
  };
</script>

<style>
  .collapse {
    overflow-y: auto;
    max-height: 90vh;
  }
</style>
