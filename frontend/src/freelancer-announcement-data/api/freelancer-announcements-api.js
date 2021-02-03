import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    announcements_endpoint: '/announcement/',
    announcement_freelancer_endpoint: 'freelancerAnnouncement/',
};

function getAnnouncementsByFreelancerId(params, callback){
    let request = new Request(HOST.backend_api + endpoint.announcements_endpoint + endpoint.announcement_freelancer_endpoint + params.id, {
       method: 'GET',
       headers : {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postAnnouncements(announcement, callback){
    let request = new Request(HOST.backend_api + endpoint.announcements_endpoint , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        },
        body: JSON.stringify(announcement)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function updateAnnouncement(announcement, id, callback){
    let request = new Request(HOST.backend_api + endpoint.announcements_endpoint + id, {
        method: 'PUT',
        headers : {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(announcement)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function deleteAnnouncement(params, callback){
    let request = new Request(HOST.backend_api + endpoint.announcements_endpoint, {
       method: 'DELETE',
       headers : {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    },
    body: JSON.stringify(params)
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}


export {
    getAnnouncementsByFreelancerId,
    postAnnouncements,
    updateAnnouncement,
    deleteAnnouncement
};
