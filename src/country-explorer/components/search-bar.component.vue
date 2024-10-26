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
            class="input-search bg-white"
        />
        <pv-input-icon>
          <i class="pi pi-search"/>
        </pv-input-icon>
      </pv-icon-field>
    </template>
  </pv-toolbar>
<!--  Filter by continents -->
  <pv-popover ref="op">
    <div class="flex justify-content-evenly w-[25rem]">
      <h2 class="pop-text">Filtrar por continentes</h2>
      <pv-button severity="info" @click="onSelectedContinent('')" style="height: 2rem;" class="mt-2">Limpiar</pv-button>
    </div>
    <div class="grid-container ">
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
  .input-search {
    width: 40rem;
  }

  @media (max-width: 640px) {
    .input-search {
      width: auto;
    }
  }
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

  }

  .grid-item {
    text-align: center;
    padding:1rem;
  }

  .toolbar {
    background-color: lightskyblue;
  }

  .pop-text {
    font-weight: bold;
    font-size: 1.2rem;
    color: grey;
  }
</style>