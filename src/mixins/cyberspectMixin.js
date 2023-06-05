import Vue from 'vue';

export default {
  data () {
    return {
      cyberspect: Object
    }
  },
  created() {
    if (this.$cyberspect) {
      this.cyberspect = this.$cyberspect;
    } else {
      this.cyberspect = Vue.prototype.$cyberspect;
    }
  }
}
