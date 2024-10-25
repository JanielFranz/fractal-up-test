<script>


export default {
  name: "search-bar",
  props: {
    continents: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedContinent: null,
      countrySearched: "",
      dialogVisible: false,
      popOverVisible: false
    }
  },
  methods: {
    //#region Event Handlers
    onWordAdded() {
      this.$emit("word-added", this.countrySearched);
    },
    onSearchBarClicked() {
      console.log("search bar clicked");
      this.dialogVisible=true;
    },
    //#endregion

    openDialog() {
      this.dialogVisible = true;
    },

    closeDialog() {
      this.dialogVisible = false;
    },

    togglePopOver() {
      this.popOverVisible = !this.popOverVisible;
    },

    toggle(event) {
      this.$refs.op.toggle(event);
    },
    selectContinent(continent) {
      this.selectedContinent = continent;
      this.$refs.op.hide();
    }
  }
}
</script>

<template>
  <pv-toolbar>
    <template #center>
      <pv-icon-field>
        <pv-input-text
            @click="toggle"
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
  <pv-popover ref="op">
    <h2>Filtrar por continentes</h2>
    <div class="grid mt-4">
      <div
          v-for="continent in continents"
          :key="continent.name"
          class="col-10 sm:col-6 lg:col-4"
      >
        <img :src="continent.continentImgUrl" alt="continent.name" style="height: 5rem; width: 6rem;"/>
        <p>{{ continent.name }}</p>
      </div>
    </div>

  </pv-popover>
</template>

<style scoped>

</style>