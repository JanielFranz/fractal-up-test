<script>
import {CountryService} from "../services/country.service.js";
import {ImageService} from "../services/image.service.js";
import {Country} from "../model/country.entity.js";
import CountryCardList from "../components/country-card-list.component.vue";
import SearchBar from "../components/search-bar.component.vue";
import {Continent} from "../model/continent.entity.js";

export default {
  name: "country-explorer",
  components: {SearchBar, CountryCardList},
  data() {
    return {
      countries: [],
      flexibleCountries: [],
      continents: [],
      filteredByWordsCountries: [],
      countryService: null,
      imageService: null,
      searchWord: ""
    }
  },
  methods : {
    //#region Utility Methods

    async getImageUrlByName(name) {
      try{
        let imagesResponse = await this.imageService.getImageByName(name);
        console.log('Images response', imagesResponse);
        imagesResponse  = imagesResponse.data;
        return imagesResponse.hits[0].webformatURL;
      }catch(error){
        console.error(error);
        return null;
      }
    },

    async getFlagImageUrlByName(name) {
      try{
        let imagesResponse = await this.imageService.getImageByName(name);
        imagesResponse  = imagesResponse.data;
        console.log('Flag Images response', imagesResponse);
        // return imagesResponse.hits[0].webformatURL;
        return imagesResponse.hits.filter( i => i.tags.includes('flag'))[0].webformatURL;
      }catch(error){
        console.error(error);
        return null;
      }
    },


    async buildCountriesWithImage(countries) {
      try{
        return await Promise.all(
            countries.map(async (country) => {

              const countryImageUrl = await this.getImageUrlByName(country.name);
              const countryFlagImageUrl = await this.getFlagImageUrlByName(`flag of ${country.name}`);
              return {
                ...country,
                countryImgUrl: countryImageUrl,
                countryFlagImgUrl: countryFlagImageUrl
              };
            })
        );
      }catch (error) {
        console.error(error);
      }
    },

    async buildContinentEntities(countries) {
      try{
        const uniqueContinentsName = [...new Set(countries.map(country => country.continent))];
        const uniqueContinentsWithImage = await Promise.all(
            uniqueContinentsName.map(async (continentName) => {
              const continentImageUrl = await this.getImageUrlByName(`${continentName} map`);
              return {
                name: continentName,
                continentImgUrl: continentImageUrl
              };
            })
        );
        return this.continents = uniqueContinentsWithImage.map(continent => new Continent(continent));
      }catch(error){
        console.error(error);
      }
    },

    //#endregion

    //#region Service Methods
    async getCountries() {
      try{
        let countriesResponse = await this.countryService.getAllCountries();
        console.log(countriesResponse);
        countriesResponse = countriesResponse.map(country => ({
          ...country,
          continent: country.continent.name
        }));

        const countriesResponseWithImages = await this.buildCountriesWithImage(countriesResponse);

        this.countries = countriesResponseWithImages.map(country => new Country(country));
        this.flexibleCountries = this.countries;

        this.filteredByWordsCountries = this.flexibleCountries;

        this.continents = await this.buildContinentEntities(this.countries);

        console.log('continents', this.continents)
        console.log("Countries final values", this.countries);
      } catch (error) {
        console.error(error);
      }
    },

    //#endregion

    //#region Event Handlers

    onWordAdded(word) {
      this.searchWord = word;

        this.filteredByWordsCountries = this.flexibleCountries.filter((country) =>
            country.name.toLowerCase().includes(word.toLowerCase())
        );

      console.log("Word added", this.searchWord);
      console.log("Filtered countries", this.filteredByWordsCountries);
    },

    onContinentSelected(continent) {
      this.flexibleCountries = this.countries;
      console.log('continent arrived', continent);
      this.flexibleCountries = this.countries.filter((country) =>
          country.continent.toLowerCase().includes(continent.toLowerCase())
      );
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
      v-on:continent-selected="onContinentSelected($event)"
      :continents="continents"
  />
  <country-card-list :countries="searchWord === '' ? flexibleCountries : filteredByWordsCountries"></country-card-list>
</template>

<style scoped>

</style>