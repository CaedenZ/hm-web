export interface Country {
    country_name: string;
}
export interface Currency {
    name: string;
}
export interface Industry {
    name: string;
}
export interface Sector {
    name: string;
}

export interface CountryState {
    countryList: Country[],
    currencyList: Currency[],
    industryList: Industry[],
    sectorList: Sector[],
}