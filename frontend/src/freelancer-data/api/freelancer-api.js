import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";

const endpoint = {
    freelancer_endpoint: '/freelancer/',
    freelancer_addAnnouncement:'/addAnnouncement',
    freelancer_getServicesByFreelancer:'/service/freelancerServices/'
};


function findAll(callback) {
    let request = new Request(HOST.backend_api + endpoint.freelancer_endpoint, {
        method: 'GET'
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}
function findById(userId,callback) {
    let request = new Request(HOST.backend_api + endpoint.freelancer_endpoint+userId, {
        method: 'GET',
        headers : {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getServicesByFreelancer(freelancerId,callback) {
    let request = new Request(HOST.backend_api + endpoint.freelancer_getServicesByFreelancer+freelancerId, {
        method: 'GET',
        headers : {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }

    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function insertFreelancer(freelancer,callback) {
    let request = new Request(HOST.backend_api + endpoint.freelancer_endpoint, {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(freelancer)
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function updateFreelancer(freelancer,freelancerId,callback) {
    let request = new Request(HOST.backend_api + endpoint.freelancer_endpoint, {
        method: 'PUT',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(freelancer)
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function deleteFreelancer(freelancerId, callback){
    let request = new Request(HOST.backend_api + endpoint.freelancer_endpoint + freelancerId, {
        method: 'DELETE'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}


function addAnnouncement(announcement,freelancerId,callback) {
    let request = new Request(HOST.backend_api +freelancerId+ endpoint.freelancer_addAnnouncement, {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(announcement)
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    findAll,
    insertFreelancer,
    findById,
    deleteFreelancer,
    addAnnouncement,
    updateFreelancer,
    getServicesByFreelancer
};