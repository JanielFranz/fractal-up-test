<script>
import {defineComponent} from "vue";


import CountryExplorer from "./country-explorer/pages/country-explorer.component.vue";

export default {
  name:'app',
  components: {CountryExplorer},
  data() {
    return {
      items: [
        { label: 'Home', to: '/country-explorer' },
        { label: 'Vista 1', to: '/view-1' },
        { label: 'Vista 2', to: '/view-2' },
      ]
    }
  }
}
</script>

<template>
  <pv-splitter style="height: 100vh">
    <pv-splitter-panel class=" panel-1" :size="15" :minSize="5">
      <div class="flex flex-column align-items-center gap-3 mt-5">
        <router-link v-for="item in items"
                     :key="item.label"
                     v-slot="{navigate, href}"
                     :to="item.to" custom
                     class="flex flex-column"
        >
          <pv-button severity="info" :href="href" style="width:10rem;" @click="navigate">{{ item.label }}</pv-button>
        </router-link>
      </div>
    </pv-splitter-panel>
    <pv-splitter-panel class="panel-2" :size="85">
      <router-view/>
    </pv-splitter-panel>
  </pv-splitter>
</template>

<style scoped>
  .panel-1 {
    overflow: hidden;
    position: relative;
    height: 100%;
    background-color: lightgrey;
  }
  .panel-2 {
    height: 100%;
    overflow-y:auto;
    background-color: lightskyblue;
  }
</style>
