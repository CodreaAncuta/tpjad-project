import {HOST} from '../../../commons/hosts';
import RestApiClient from "../../../commons/api/rest-client";


const endpoint = {
    medicationPlan_endpoint: '/medicationPlan/',
    medicationPlanWithIntakeIntervals_endpoint: '/medicationPlan/intakeIntervals'
};

function getMedicationPlansWithIntakeIntervals(callback) {
    let request = new Request(HOST.backend_api + endpoint.medicationPlanWithIntakeIntervals_endpoint, {
        method: 'GET'
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postMedicationPlan(medicationPlan, callback){
    let request = new Request(HOST.backend_api + endpoint.medicationPlan_endpoint , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(medicationPlan)
    });

    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    getMedicationPlansWithIntakeIntervals,
    postMedicationPlan
};
