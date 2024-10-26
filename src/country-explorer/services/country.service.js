// country.service.js
import {gql} from '@apollo/client/core';
import apolloClient from '../../shared/services/apollo-client.js';

/**
 * Country Service
 * @class CountryService
 * @description Service to fetch country data
 */
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


    /**
     * Gets all countries
     * @returns {Promise<[]>} - Array of countries
     */
    async getAllCountries() {
        try {
            const { data } = await apolloClient.query({
                query: this.GET_COUNTRIES,
            });
            return data.countries.slice(98,117);
        } catch (error) {
            console.error('Error fetching countries', error);
            throw error;
        }
    }
}
