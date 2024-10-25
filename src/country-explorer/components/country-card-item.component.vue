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
    },
    closeDialog() {
      console.log('close dialog');
      this.dialogVisible = false;
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
        <div class="grid align-items-center">
          <div class="col-12 md:col-3 mb-4">
            <img :src="country.countryFlagImgUrl"
                 :alt="country.countryFlagImgUrl"
                 class="country-flag"
            />
          </div>
          <div class="col-12 md:col-8">
            <h3 class="title-center">{{ country.name }} </h3>
            <h4 class="subtitle-center">{{ country.continent }}</h4>
          </div>
        </div>
      </template>

    </pv-card>
  </div>

  <country-item-dialog :country="country" :visible="dialogVisible" v-on:close-selected="closeDialog"/>

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
  .country-flag {
    width:5rem;
    height: 3rem;
  }
</style>