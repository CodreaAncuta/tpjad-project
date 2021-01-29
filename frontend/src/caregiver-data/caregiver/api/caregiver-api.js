import {HOST} from '../../../commons/hosts';
import RestApiClient from "../../../commons/api/rest-client";


const endpoint = {
    caregiver_endpoint: '/caregiver/',
    caregiver_patients_endpoint: '/patients/',
    caregiver_user_endpoint: '/caregiver/user/'
};

function getCaregivers(callback) {
    let request = new Request(HOST.backend_api + endpoint.caregiver_endpoint, {
        method: 'GET'
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getCaregiverById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.caregiver_endpoint + params.id, {
       method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postCaregiver(caregiver, callback){
    let request = new Request(HOST.backend_api + endpoint.caregiver_endpoint , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(caregiver)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function updateCaregiver(caregiver, id, callback){
    let request = new Request(HOST.backend_api + endpoint.caregiver_endpoint + id, {
        method: 'PUT',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(caregiver)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function deleteCaregiver(params, callback){
    let request = new Request(HOST.backend_api + endpoint.caregiver_endpoint + params.id, {
       method: 'DELETE'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getPatientsForCaregiver(id, callback){
    let request = new Request(HOST.backend_api + endpoint.caregiver_endpoint + id + endpoint.caregiver_patients_endpoint, {
       method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getCaregiverByUserId(id, callback){
    let request = new Request(HOST.backend_api + endpoint.caregiver_user_endpoint + id , {
        method: 'GET'
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

export {
    getCaregivers,
    getCaregiverById,
    postCaregiver,
    updateCaregiver,
    deleteCaregiver,
    getPatientsForCaregiver,
    getCaregiverByUserId
};
