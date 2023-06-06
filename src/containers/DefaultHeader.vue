<template>
  <AppHeader fixed>
    <SidebarToggler class="d-lg-none" display="md" mobile />
    <a v-bind:href="cyberspect.HOME_URL"><img class="d-lg-inline d-md-none d-sm-none bv-d-xs-down-none" style="margin-left:10px" src="@/assets/img/brand/dt-logo-symbol.svg" width="30" height="30" alt="Dependency-Track Logo"/></a>
    <SidebarToggler class="d-md-down-none" display="lg" :defaultOpen=true />
    <b-navbar-nav class="ml-auto">
      <DefaultHeaderProfileDropdown/>
    </b-navbar-nav>
  </AppHeader>
</template>
<script>
  import { Header as AppHeader, SidebarToggler, AsideToggler } from '@coreui/vue';
  import DefaultHeaderProfileDropdown from './DefaultHeaderProfileDropdown';
  import globalVarsMixin from "../mixins/globalVarsMixin";

  export default {
    name: 'DefaultHeader',
    mixins: [globalVarsMixin],
    components: {
      AsideToggler,
      AppHeader,
      DefaultHeaderProfileDropdown,
      SidebarToggler
    }
  }  
</script>