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
    onSelectedContinent(continent) {
      console.log('first-co',continent);
      this.$emit('continent-selected', continent);
      this.$refs.op.hide();
    }
  }
}
</script>

<template>
  <pv-toolbar class="toolbar">
    <template #center>
      <pv-icon-field>
        <pv-input-text
            @click="toggle"
            placeholder="Escribe el pais que deseas ver"
            v-model="countrySearched"
            @input="onWordAdded"
            style="width: 40rem;"
        />
        <pv-input-icon>
          <i class="pi pi-search"/>
        </pv-input-icon>
      </pv-icon-field>
    </template>
  </pv-toolbar>
  <pv-popover ref="op">
    <div class="flex justify-content-evenly">
      <h2 class>Filtrar por continentes</h2>
      <pv-button severity="info" @click="onSelectedContinent('')" style="height: 2rem;" class="mt-3">Limpiar</pv-button>
    </div>
    <div class="grid-container">
      <div
          v-for="continent in continents"
          :key="continent.name"
          class="grid-item"
      >
        <div class="continent-item" @click="onSelectedContinent(continent.name)">
          <img :src="continent.continentImgUrl" alt="continent.name" style="height: 5rem; width: 6rem;"/>
          <p>{{ continent.name }}</p>
        </div>
      </div>
    </div>

  </pv-popover>
</template>

<style scoped>
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap:1rem;
  }

  .grid-item {
    text-align: center;
    padding:1rem;
  }

  .toolbar {
    background-color: lightskyblue;
  }
</style>