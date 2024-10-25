<script>
import {defineComponent} from "vue";


import CountryExplorer from "./country-explorer/pages/country-explorer.component.vue";

export default {
  name:'app',
  components: {CountryExplorer}
}
</script>

<template>
  <pv-splitter style="height: auto">
    <pv-splitter-panel class="flex items-center justify-content-center" :size="15" :minSize="5"> Panel 1 </pv-splitter-panel>
    <pv-splitter-panel  :size="85">
      <country-explorer/>
    </pv-splitter-panel>
  </pv-splitter>
</template>

<style scoped>

</style>
