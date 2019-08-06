export interface Country {
    country_name: string;
}
export interface Currency {
    country_name: string;
    code: string;
    rate: string;
}

export interface DistintCurrency {
    code: string;
}
// export interface Industry {
//     name: string;
// }

export interface CountryState {
    countryList: Country[],
    currencyList: Currency[],
    distintCurrencyList: DistintCurrency[],
    // industryList: Industry[],
}   