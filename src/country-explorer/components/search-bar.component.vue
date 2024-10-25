<script>

export default {
  name: "search-bar",
  data() {
    return {
      countrySearched: ""
    }
  },
  methods: {
    onWordAdded() {
      this.$emit("word-added", this.countrySearched);
    }
  }
}
</script>

<template>
  <pv-toolbar>
    <template #center>
      <pv-icon-field>
        <pv-input-text
            placeholder="Pais Escribe el pais que deseas ver"
            v-model="countrySearched"
            @input="onWordAdded"
        />
        <pv-input-icon>
          <i class="pi pi-search"/>
        </pv-input-icon>
      </pv-icon-field>
    </template>
  </pv-toolbar>
</template>

<style scoped>

</style>