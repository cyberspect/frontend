<template>
  <AppHeader fixed>
    <SidebarToggler class="d-lg-none" display="md" mobile />
    <a :href="home_url"><img class="d-lg-inline d-md-none d-sm-none bv-d-xs-down-none" style="margin-left:10px" src="@/assets/img/brand/dt-logo-symbol.svg" width="30" height="30" alt="Dependency-Track Logo"/></a>
    <SidebarToggler class="d-md-down-none" display="lg" :defaultOpen=true />
    <b-navbar-nav class="ml-auto">
      <DefaultHeaderProfileDropdown/>
    </b-navbar-nav>
  </AppHeader>
</template>
<script>
  import { Header as AppHeader, SidebarToggler, AsideToggler } from '@coreui/vue'
  import DefaultHeaderProfileDropdown from './DefaultHeaderProfileDropdown'

  export default {
    name: 'DefaultHeader',
    components: {
      AsideToggler,
      AppHeader,
      DefaultHeaderProfileDropdown,
      SidebarToggler
    }
  }  
</script>
<script setup>
  const home_url = process.env.VUE_APP_CYBERSPECT_HOME_URL
</script>