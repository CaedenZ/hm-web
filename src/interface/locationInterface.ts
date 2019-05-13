import { Country } from "./countryInterface";

export interface Location {
    location_name: string;
    location_id: string;
    company_id: string;
    address: string;
    postal_code: string;
}

export interface LocationState {
    locationList: Location[],
    selectedLocation?: Location,
}

export interface CREATELOCATIONCRED {
    location_name: string;
    address: string;
    postal_code: string;
}

export interface UPDATELOCATIONCRED {
    location_id: string;
    location_name: string;
    address: string;
    postal_code: string;
}
