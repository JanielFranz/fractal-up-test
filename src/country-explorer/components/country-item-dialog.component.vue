<script>


import {Country} from "../model/country.entity.js";

export default {
  name: "country-item-dialog",
  props: {
    country: {
      type: Country,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    onCloseSelected() {
      this.$emit('close-selected', false);
    }

  }
}
</script>

<template>
  <pv-dialog :visible="visible" @update:visible="onCloseSelected">
    <div class="flex items-center gap-4 mb-4">
      <img :src="country.countryImgUrl" :alt="country.name"/>
    </div>
    <div class="flex items-center gap-4 mb-4">
      <p>
        <img :src="country.countryFlagImgUrl"
             :alt="country.countryFlagImgUrl"
             class="inline-block h-6 w-6 mr-2"/>
        <span>{{ country.name }}</span>
        <span>{{ country.continent}}</span>
      </p>
    </div>
    <div class="flex items-center gap-4 mb-2">
      <p>Capital: {{country.capital}}</p>
      <p>Language:
        <span v-for="(language, index) in country.languages" :key="index">
          {{ language }} <span v-if="index < country.languages.length -1">, </span>
        </span>
      </p>
      <p>Currency: {{ country.currency }}</p>
    </div>
  </pv-dialog>
</template>

<style scoped>

</style>