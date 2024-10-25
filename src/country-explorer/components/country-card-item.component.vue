<script>
import {Country} from "../model/country.entity.js";

export default {
  name: "country-card-item",
  props: {
    country: {
      type: Country,
      required: true
    }
  }
}
</script>

<template>
  <pv-card style="width: 25rem; overflow: hidden">
    <template #header>
      <img :src="country.countryImgUrl" alt="country image">
    </template>
    <template #title>{{ country.name }}</template>
    <template #subtitle>{{ country.continent }}</template>
  </pv-card>
</template>

<style scoped>

</style>