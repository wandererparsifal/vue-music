<template>
  <i-table class="table" :height="height" stripe :columns="columns1" :data="data1"/>
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
          },
          {
            title: 'Age',
            key: 'age',
          },
          {
            title: 'Address',
            key: 'address',
          },
          {
            title: 'Date',
            key: 'date',
          },
        ],
        data1: [],
      };
    },
    created() {
      this.height = document.documentElement.clientHeight * 0.88;
      window.addEventListener('resize', () => {
        this.height = document.documentElement.clientHeight * 0.88;
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
    opacity: 0.8;
  }
</style>
