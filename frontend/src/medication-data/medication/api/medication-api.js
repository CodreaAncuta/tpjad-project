import {HOST} from '../../../commons/hosts';
import RestApiClient from "../../../commons/api/rest-client";


const endpoint = {
    medication_endpoint: '/medication/'
};

function getMedication(callback) {
    let request = new Request(HOST.backend_api + endpoint.medication_endpoint, {
        method: 'GET'
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getMedicationById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.medication_endpoint + params.id, {
       method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postMedication(medication, callback){
    let request = new Request(HOST.backend_api + endpoint.medication_endpoint , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(medication)
    });

    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

function updateMedication(medication, id, callback){
    let request = new Request(HOST.backend_api + endpoint.medication_endpoint + id, {
        method: 'PUT',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(medication)
    });

    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

function deleteMedication(params, callback){
    let request = new Request(HOST.backend_api + endpoint.medication_endpoint + params.id, {
       method: 'DELETE'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    getMedication,
    getMedicationById,
    postMedication,
    updateMedication,
    deleteMedication
};
