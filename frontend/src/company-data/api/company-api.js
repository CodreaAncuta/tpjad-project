import {HOST} from '../../commons/hosts';
import RestApiClient from  "../../commons/api/rest-client";

const endpoint = {
    company_endpoint: '/company/'
};

function getCompanyById(userId, callback){
    console.log("Requesting getCompanyById, user: " + userId)
    let request = new Request(HOST.backend_api + endpoint.company_endpoint + userId, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postCompany(company, callback){
    let request = new Request(HOST.backend_api + endpoint.company_endpoint , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        },
        body: JSON.stringify(company)
    });

    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

function updateCompany(company, callback){
    let request = new Request(HOST.backend_api + endpoint.company_endpoint, {
        method: 'PUT',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        },
        body: JSON.stringify(company)
    });

    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

function deleteCompany(params, callback){
    let request = new Request(HOST.backend_api + endpoint.company_endpoint + params.id, {
       method: 'DELETE',
       headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getCompanyServiceList(id, callback){
    console.log("Requesting getCompanyServiceList, user: " + id)
    let request = new Request(HOST.backend_api + "/service/companyServices/" + id, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getFreelancer(id, callback){
    let request = new Request(HOST.backend_api + "/freelancer/" + id, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    getCompanyById,
    postCompany,
    updateCompany,
    deleteCompany,
    getCompanyServiceList,
    getFreelancer
};