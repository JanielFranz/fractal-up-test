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

    /**
     * Build countries with image
     * @param countries - countries to be filtered
     * @returns {Promise<Country[]>} - countries with image
     */
    async buildCountriesWithImage(countries) {
      try{
        return await Promise.all(
            countries.map(async (country) => {

              const countryImageUrl = await this.getImageUrlByName(`country ${country.name}`);
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

    /**
     * Build continent entities
     * @param countries - countries to be filtered
     * @returns {Promise<Continent[]>} - continent entities
     */
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

    /**
     * Get image url by country name
     * @param name - country name
     * @returns {Promise<*|null>} - image url
     */
    async getImageUrlByName(name) {
      try {
        const { data } = await this.imageService.getImageByName(name);
        console.log('Images response', data);

        const { hits } = data;
        if (hits.length > 0) {
          return hits[0].webformatURL;
        }

        return null;
      } catch (error) {
        console.error(error);
        return null;
      }
    },


    /**
     * Get flag image url by country name
     * @param name - country name
     * @returns {Promise<*|null>} - flag image url
     */
    async getFlagImageUrlByName(name) {
      try{
        let imagesResponse = await this.imageService.getImageByName(name);
        imagesResponse  = imagesResponse.data;

        return imagesResponse.hits.filter( i => i.tags.includes('flag'))[0].webformatURL;
      }catch(error){
        console.error(error);
        return null;
      }
    },

    /**
     * Get all countries
     * @returns {Promise<void>} - countries from the service
     */
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

      } catch (error) {
        console.error(error);
      }
    },

    //#endregion

    //#region Event Handlers

    /**
     * On word added event handler
     * @param word - word to be searched
     */
    onWordAdded(word) {
      this.searchWord = word;

        this.filteredByWordsCountries = this.flexibleCountries.filter((country) =>
            country.name.toLowerCase().includes(word.toLowerCase())
        );
    },

    /**
     * On continent selected event handler
     * @param continent - continent to be filtered
     */
    onContinentSelected(continent) {
      this.flexibleCountries = this.countries;
      console.log('continent arrived', continent);
      this.flexibleCountries = this.countries.filter((country) =>
          country.continent.toLowerCase().includes(continent.toLowerCase())
      );
    }

    //#endregion
  },

  //#region Lifecycle Hooks
  created(){
    this.countryService = new CountryService();
    this.imageService = new ImageService();
    this.getCountries();
  }
  //#endregion
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