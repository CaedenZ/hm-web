
export interface OfferModel {
    offermodel_id: string;
    jobposition_id: string;
    candidate_name: string;
    job_flag: string;
    model_type: string;
    offer_reference: string;
    jobgrade_id: string;
    current_position_title: string;
    current_position_country: string;
    current_position_location: string;
    current_position_grade: string;
    current_position_datestart: string;
    current_position_jobfunction: string;
    current_position_sjobfunction: string;
    propose_position_datestart: string;
    status: string;
    current_data: any[];
}

export interface OfferModelState {
    offerModelList: OfferModel[],
    selectedOfferModel?: OfferModel,
}

export interface CREATEOFFERMODELCRED {
    jobposition_id: string;
    candidate_name: string;
    job_flag: string;
    model_type: string;
    offer_reference: string;
    jobgrade_id: string;
    current_position_title: string;
    current_position_country: string;
    current_position_location: string;
    current_position_grade: string;
    current_position_datestart: string;
    current_position_jobfunction: string;
    current_position_sjobfunction: string;
    propose_position_datestart: string;
    status: string;
    current_data: any[];
}

export interface UPDATEOFFERMODELCRED {
    jobposition_id: string;
    candidate_name: string;
    job_flag: string;
    model_type: string;
    offer_reference: string;
    jobgrade_id: string;
    current_position_title: string;
    current_position_country: string;
    current_position_location: string;
    current_position_grade: string;
    current_position_datestart: string;
    current_position_jobfunction: string;
    current_position_sjobfunction: string;
    propose_position_datestart: string;
    status: string;
    current_data: any[];
}