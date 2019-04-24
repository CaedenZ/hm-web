import { Country } from "./countryInterface";

export interface Region {
    region_name: string;
    region_id: string;
    country_list: string[];
}

export interface RegionState {
    regionList: Region[],
    selectedRegion?: Region,
}

export interface CREATEREGIONCRED {
    region_name: string;
    country_list: any;
}

export interface UPDATEREGIONCRED {
    region_id: string;
    region_name: string;
    country_list: Country[];
}