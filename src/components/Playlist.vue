<template>
  <i-table class="table" stripe :columns="columns1" :data="data1"/>
</template>

<script>

  export default {
    name: 'Playlist',
    data() {
      return {
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
        data1: [
          {
            name: 'xxx',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03',
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park',
            date: '2016-10-01',
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park',
            date: '2016-10-02',
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04',
          },
        ],
      };
    },
  };
</script>

<style>
  .table {
    opacity: 0.8;
  }

  .table p {
    color: #FFFFFF;
  }
</style>
