<script>
import CountryCardItem from "./country-card-item.component.vue";

export default {
  name: "country-card-list",
  components: {CountryCardItem},
  props: {
    countries: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <div class="grid">
    <div v-for="country in countries"
         :key="country.name"
         class="col-12 sm:col-6 lg:col-4"
    >
      <country-card-item :country="country"/>
    </div>
  </div>

</template>

<style scoped>

</style>