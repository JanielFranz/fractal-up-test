<script>
import {Country} from "../model/country.entity.js";
import CountryItemDialog from "./country-item-dialog.component.vue";

export default {
  name: "country-card-item",
  components: {CountryItemDialog},
  props: {
    country: {
      type: Country,
      required: true
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    openDialog() {
      this.dialogVisible = true;
    }
  }
}
</script>

<template>
  <div class="card" @click="openDialog">
    <pv-card style="width: 22rem; height:22rem; overflow: hidden" class="mb-4">
      <template #header>
        <img :src="country.countryImgUrl" alt="country image" style="width:22rem; height: 16rem;">
      </template>
      <template #title>
        <h3 class="title-center">{{ country.name }} </h3>
      </template>
      <template #subtitle>
        <h4 class="subtitle-center">{{ country.continent }}</h4>
      </template>
    </pv-card>
  </div>

  <country-item-dialog :country="country" v-bind:visible="dialogVisible"/>

</template>

<style scoped>
  .title-center{
    text-align: center;
    margin-top: 0.1rem;
    font-size: 1rem;
  }
  .subtitle-center {
    text-align: center;
    margin-top: 0.1rem;
    font-size: 1rem;
  }
</style>