
export interface OfferModel {
    offermodel_id:string;
    business_title: string;
    country: string;
    jobgrade_id: string;
    jobgrade_name: string;
    location: string;
    jobfunction: string;
    sjobfunction: string;
    description: string;
    remarks: string;
}

export interface OfferModelState {
    offermodelList: OfferModel[],
    selectedOfferModel?: OfferModel,
}

export interface CREATEOFFERMODELCRED {
    business_title: string;
    country: string;
    jobgrade_id: string;
    jobgrade_name: string;
    location: string;
    jobfunction: string;
    sjobfunction: string;
    description: string;
    remarks: string;
}

export interface UPDATEOFFERMODELCRED {
    offermodel_id:string;
    business_title: string;
    country: string;
    jobgrade_id: string;
    jobgrade_name: string;
    location: string;
    jobfunction: string;
    sjobfunction: string;
    description: string;
    remarks: string;
}
