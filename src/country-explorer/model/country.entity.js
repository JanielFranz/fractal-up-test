export class Country {
    constructor({ name, capital, currency, languages = [],
                    continent, countryImgUrl, countryFlagImgUrl }) {
        this.name = name;
        this.capital = capital;
        this.currency = currency;
        this.languages = languages;
        this.continent = continent;
        this.countryImgUrl = countryImgUrl;
        this.countryFlagImgUrl = countryFlagImgUrl;
    }
}