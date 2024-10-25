<script>
import {CountryService} from "../services/country.service.js";
import {ImageService} from "../services/image.service.js";
import {Country} from "../model/country.entity.js";
import CountryCardList from "../components/country-card-list.component.vue";
import SearchBar from "../components/search-bar.component.vue";

export default {
  name: "country-explorer",
  components: {SearchBar, CountryCardList},
  data() {
    return {
      countries: [],
      filteredCountries: [],
      countryService: null,
      imageService: null,
      searchWord: ""
    }
  },
  methods : {
    //#region Utility Methods

    async getCountryImageUrlByName(name) {
      try{
        let imagesResponse = await this.imageService.getImageByName(name);
        imagesResponse  = imagesResponse.data;
        return imagesResponse.hits[0].webformatURL;
      }catch(error){
        console.error(error);
        return null;
      }
    },

    async buildCountriesWithImage(countries) {
      try{
        return await Promise.all(
            countries.map(async (country) => {

              const countryImageUrl = await this.getCountryImageUrlByName(country.name);
              return {
                ...country,
                countryImgUrl: countryImageUrl,
              };
            })
        );
      }catch (error) {
        console.error(error);
      }
    },

    //#endregion

    //#region Service Methods
    async getCountries() {
      try{
        let countriesResponse = await this.countryService.getAllCountries();
        countriesResponse = countriesResponse.map(country => ({
          ...country,
          continent: country.continent.name
        }));

        const countriesResponseWithImages = await this.buildCountriesWithImage(countriesResponse);

        this.countries = countriesResponseWithImages.map(country => new Country(country));
        this.filteredCountries = this.countries;
        console.log("Countries final values", this.countries);
      } catch (error) {
        console.error(error);
      }
    },

    //#endregion

    //#region Event Handlers

    onWordAdded(word) {
      this.searchWord = word;

        this.filteredCountries = this.countries.filter((country) =>
            country.name.toLowerCase().includes(word.toLowerCase())
        );

      console.log("Word added", this.searchWord);
      console.log("Filtered countries", this.filteredCountries);
    }

    //#endregion
  },
  created(){
    this.countryService = new CountryService();
    this.imageService = new ImageService();
    this.getCountries();
  }

}
</script>

<template>
  <search-bar
      v-on:word-added="onWordAdded($event)"
  />
  <country-card-list :countries="searchWord === '' ? countries : filteredCountries"></country-card-list>
</template>

<style scoped>

</style>