import { Country } from "./countryInterface";

export interface Region {
    region_name: string;
    region_id: string;
    country_list: Country[];
}

export interface RegionState {
    regionList: Region[],
    selectedRegion?: Region,
}