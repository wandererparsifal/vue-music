<template>
  <i-table class="table" :height="height" highlight-row="true" stripe :columns="columns1" :data="data1"/>
</template>

<script>
  export default {
    name: 'Playlist',
    data() {
      return {
        height: 0,
        columns1: [
          {
            title: 'Name',
            key: 'name',
            align: 'center',
          },
          {
            title: 'Age',
            key: 'age',
            align: 'center',
          },
          {
            title: 'Address',
            key: 'address',
            align: 'center',
          },
          {
            title: 'Date',
            key: 'date',
            align: 'center',
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
      for (let i = 0; i < 50; i += 1) {
        this.data1.push({
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04',
        });
      }
    },
  };
</script>

<style>
  .table {
    opacity: 1;
  }
</style>
