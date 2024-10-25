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
  <div v-for="country in countries" :key="country.name">
    <country-card-item :country="country"/>
  </div>
</template>

<style scoped>

</style>