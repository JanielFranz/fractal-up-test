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
  <pv-dialog :visible="visible" @update:visible="onCloseSelected" class="bg-white">
    <div class="flex justify-content-center mb-4">
      <img :src="country.countryImgUrl" :alt="country.name" class="country-img"/>
    </div>
<!--image of country flag-->
    <div class="grid align-items-center ml-5">
      <div class="col-12 md:col-4">
        <img :src="country.countryFlagImgUrl"
             :alt="country.countryFlagImgUrl"
             class="country-flag"
        />
      </div>
      <div class="col-12 md:col-8">
        <div class="flex flex-column">
          <span class="country-name">{{ country.name }}</span>
          <span class="country-continent">{{ country.continent}}</span>
        </div>
      </div>
    </div>
<!--country details-->
    <div class="flex flex-column items-center ml-5">
      <p> <span class="country-capital">Capital: </span> <span class="text-black-alpha-40">{{country.capital}}</span></p>
      <p> <span class="country-language">Language: </span>
        <span class="text-black-alpha-40" v-for="(language, index) in country.languages" :key="index">
          {{ language.name }} <span v-if="index < country.languages.length -1">, </span>
        </span>
      </p>
      <p><span class="country-currency">Currency: </span> <span class="text-black-alpha-40">{{ country.currency }}</span></p>
    </div>
  </pv-dialog>
</template>

<style scoped>
  .country-img {
    height: 20rem;
    width: 20rem;
    border-radius: 8px;
  }

  .country-flag {
    width:5rem;
    height: 3rem;
  }

  .country-name {
    font-size: 1.5rem;
    font-weight: bold;
    color: deepskyblue;
  }

  .country-capital {
    font-size: 1.2rem;
    font-weight: bold;
    color: deepskyblue;
  }

  .country-language {
    font-size: 1.2rem;
    font-weight: bold;
    color: deepskyblue;
  }

  .country-currency {
    font-size: 1.2rem;
    font-weight: bold;
    color: deepskyblue;
  }
  .country-continent {
    color: #808080;
    font-size: 1rem;
  }
</style>