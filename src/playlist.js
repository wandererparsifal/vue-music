export default {
  musicIds: [],
  list: [],
  add(musicData) {
    if (!this.musicIds.includes(musicData.id)) {
      this.musicIds.push(musicData.id);
      this.list.push(musicData);
    }
  },
  remove(musicData) {
    const index = this.musicIds.indexOf(musicData.id);
    if (index >= 0) {
      this.musicIds.splice(index, 1);
      this.list.splice(index, 1);
    }
  },
};
