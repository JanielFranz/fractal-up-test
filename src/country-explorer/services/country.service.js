// country.service.js
import {gql} from '@apollo/client/core';
import apolloClient from '../../shared/services/apollo-client.js';

export class CountryService {
    GET_COUNTRIES = gql`
    query {
      countries {
        name
        capital
        currency
        languages {
          name
        }
        continent {
          name
        }
      }
    }
  `;

    GET_COUNTRIES_BY_CONTINENT = gql`
    query getCountryByContinent($continent: String!) {
      countries(filter: { continent: { eq: $continent } }) {
        code
        name
        capital
      }
    }
  `;

    async getAllCountries() {
        try {
            const { data } = await apolloClient.query({
                query: this.GET_COUNTRIES,
            });
            return data.countries.slice(40, 60);
        } catch (error) {
            console.error('Error fetching countries', error);
            throw error;
        }
    }

    async getCountriesByContinent(continent) {
        try {
            const { data } = await apolloClient.query({
                query: this.GET_COUNTRIES_BY_CONTINENT,
                variables: { continent },
            });
            return data.countries;
        } catch (error) {
            console.error('Error fetching countries by continent:', error);
            throw error;
        }
    }
}
