import {HOST} from '../../../commons/hosts';
import RestApiClient from "../../../commons/api/rest-client";


const endpoint = {
    patient_endpoint: '/patient/',
    patient_medication_plans_endpoint: '/medicationPlans/',
    patient_user_endpoint: '/patient/user/'
};

function getPatients(callback) {
    let request = new Request(HOST.backend_api + endpoint.patient_endpoint, {
        method: 'GET'
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getPatientById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.patient_endpoint + params.id, {
       method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postPatient(patient, callback){
    let request = new Request(HOST.backend_api + endpoint.patient_endpoint , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(patient)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function updatePatient(patient, id, callback){
    let request = new Request(HOST.backend_api + endpoint.patient_endpoint + id, {
        method: 'PUT',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(patient)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function deletePatient(params, callback){
    let request = new Request(HOST.backend_api + endpoint.patient_endpoint + params.id, {
       method: 'DELETE'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getMedicationPlansForPatient(id, callback){
    let request = new Request(HOST.backend_api + endpoint.patient_endpoint + id + endpoint.patient_medication_plans_endpoint, {
       method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getPatientByUserId(id, callback){
    let request = new Request(HOST.backend_api + endpoint.patient_user_endpoint + id , {
        method: 'GET'
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

export {
    getPatients,
    getPatientById,
    postPatient,
    updatePatient,
    deletePatient,
    getMedicationPlansForPatient,
    getPatientByUserId
};
