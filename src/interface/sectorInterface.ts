export interface Sector {
    sector_id: string;
    name: string;
    industry: Industry[]
}

export interface Industry {
    name: string;
    industry_id: string;
    sector_id: string;
}

export interface SectorState {
    sectorList: Sector[],
    selectedSector: string,
}

export interface CREATEINDUSTRYCRED {
    name: string;
    sector_id: string;
}

export interface UPDATEINDUSTRYCRED {
    name: string;
    industry_id: string;
    sector_id: string;
}

export interface CREATESECTORCRED {
    name: string;
}

export interface UPDATESECTORCRED {
    name: string;
    sector_id: string;
}