<script>
import {defineComponent} from "vue";


import CountryExplorer from "./country-explorer/pages/country-explorer.component.vue";

export default {
  name:'app',
  components: {CountryExplorer}
}
</script>

<template>
  <country-explorer/>
</template>

<style scoped>

</style>
