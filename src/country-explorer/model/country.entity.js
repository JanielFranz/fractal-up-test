export class Country {
    constructor({ name, capital, currency, languages = [],
                    continent, countryImgUrl, continentImgUrl }) {
        this.name = name;
        this.capital = capital;
        this.currency = currency;
        this.languages = languages;
        this.continent = continent;
        this.countryImgUrl = countryImgUrl;
        this.continentImgUrl = continentImgUrl;
    }
}