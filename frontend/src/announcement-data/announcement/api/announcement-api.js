import {HOST} from '../../../commons/hosts';
import RestApiClient from "../../../commons/api/rest-client";


const endpoint = {
    announcement_endpoint: '/announcement',
    announcement_duration_endpoint: '/announcement/duration',
    announcement_price_endpoint: '/announcement/price'
};

function getAnnouncements(callback) {
    let request = new Request(HOST.backend_api + endpoint.announcement_endpoint, {
        method: 'GET',
        headers : {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        }
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getAnnouncementsByCategory(params, callback) {
    var requestParams = new URLSearchParams({
        category: params.category
    })

    let request = new Request(HOST.backend_api + endpoint.announcement_endpoint + '?' + requestParams, {
        method: 'GET',
        headers : {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        }
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getAnnouncementsByTechnology(params, callback) {
    var requestParams = new URLSearchParams({
        technology: params.technology
    })

    let request = new Request(HOST.backend_api + endpoint.announcement_endpoint + '?' + requestParams, {
        method: 'GET',
        headers : {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        }
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getAnnouncementsByDuration(duration, callback) {
    let request = new Request(HOST.backend_api + endpoint.announcement_duration_endpoint + '/' + duration, {
        method: 'GET',
        headers : {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        }
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getAnnouncementsByPrice(params, callback) {
    var requestParams = new URLSearchParams({
        value: params.price,
        operator: params.operator
    })

    let request = new Request(HOST.backend_api + endpoint.announcement_duration_endpoint + '?' + requestParams, {
        method: 'GET',
        headers : {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        }
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    getAnnouncements,
    getAnnouncementsByCategory,
    getAnnouncementsByTechnology,
    getAnnouncementsByDuration,
    getAnnouncementsByPrice
};
