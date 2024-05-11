// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import App from './App';
import router from './router';
import i18n from './i18n';
import './validation';
import './plugins/table.js';
import axios from 'axios';
import VueAxios from 'vue-axios';
import vueDebounce from 'vue-debounce';
import VuePageTitle from 'vue-page-title';
import '@/directives/VuePermission';
import VueToastr from 'vue-toastr';
import api from './shared/api.json';
import oidc from './shared/oidc.json';
import version from './version';
import { getContextPath } from './shared/utils';
import cyberspect from './shared/cyberspect.json';

Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);
Vue.use(VueToastr, {
  defaultTimeout: 5000,
  defaultProgressBar: false,
  defaultProgressBarValue: 0,
  defaultPosition: 'toast-top-right',
  defaultCloseOnHover: false,
});
Vue.use(vueDebounce, { defaultTime: '750ms' });
Vue.use(VuePageTitle, { prefix: 'Dependency-Track -', router });

Vue.prototype.$api = api;
Vue.prototype.$oidc = oidc;
Vue.prototype.$cyberspect = cyberspect;
const contextPath = getContextPath();
axios
  .get(contextPath + '/static/config.json')
  .then((response) => {
    if (response.data.API_BASE_URL && response.data.API_BASE_URL !== '') {
      Vue.prototype.$api.BASE_URL = response.data.API_BASE_URL;
    } else {
      Vue.prototype.$api.BASE_URL = contextPath;
    }

    // Send XHR cross-site cookie credentials
    Vue.prototype.$api.WITH_CREDENTIALS =
      response.data.API_WITH_CREDENTIALS &&
      response.data.API_WITH_CREDENTIALS.toLowerCase() === 'true';

    // OpenID Connect
    Vue.prototype.$oidc.ISSUER = response.data.OIDC_ISSUER;
    Vue.prototype.$oidc.CLIENT_ID = response.data.OIDC_CLIENT_ID;
    Vue.prototype.$oidc.SCOPE = response.data.OIDC_SCOPE;
    Vue.prototype.$oidc.FLOW = response.data.OIDC_FLOW;
    if (response.data.OIDC_LOGIN_BUTTON_TEXT) {
      Vue.prototype.$oidc.LOGIN_BUTTON_TEXT =
        response.data.OIDC_LOGIN_BUTTON_TEXT;
    } else {
      Vue.prototype.$oidc.LOGIN_BUTTON_TEXT = '';
    }

    // Cyberspect
    Vue.prototype.$cyberspect.HOME_URL = response.data.CYBERSPECT_HOME_URL;
    createVueApp();
  })
  .catch(function (error) {
    console.log(
      'Cannot retrieve static/config.json from host. This is expected behavior in development environments.',
    );
    createVueApp();
  });

/**
 * Removed finally block due to:
 * https://github.com/DependencyTrack/frontend/issues/34
 */
function createVueApp() {
  /*
  Register global $dtrack variable which will be the response body from /api/version.
  $dtrack can then be used anywhere in the app to get information about the server,
  the version of dtrack, timestamp, uuid, Alpine version, etc.
  */
  axios
    .get(`${Vue.prototype.$api.BASE_URL}/${Vue.prototype.$api.URL_ABOUT}`)
    .then((result) => {
      Vue.prototype.$dtrack = result.data;
    });

  Vue.prototype.$version = version;

  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
      App,
    },
    i18n,
  });
}
