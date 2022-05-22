import Vue from 'vue'
import axios from "axios";

export default {
  data () {
    return {
      dtrack: Object
    }
  },
  created() {
    if (this.$dtrack) {
      this.dtrack = this.$dtrack;
    } else {
      axios.get(`${Vue.prototype.$api.BASE_URL}/${Vue.prototype.$api.URL_ABOUT}`)
        .then((result) => {
            this.dtrack = result.data;

            var api_url = new URL(`${Vue.prototype.$api.BASE_URL}`);
            var parts = api_url.hostname.split('.')
            var home_domain = parts.shift();
            dtrack.home_url = api_url.protocol + '//' + home_domain.join('.');
          }
        );
    }
  }
}
