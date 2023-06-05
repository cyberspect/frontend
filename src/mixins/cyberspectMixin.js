import Vue from 'vue';

export default {
  data () {
    return {
      homeUrl: String
    }
  },
  created() {
    if (this.$homeUrl) {
      this.homeUrl = this.$homeUrl;
    } else {
      this.homeUrl = `${Vue.prototype.$cyberspect.HOME_URL}`;
    }
  }
}
