import {HOST} from '../../../commons/hosts';
import RestApiClient from "../../../commons/api/rest-client";


const endpoint = {
    user_endpoint: '/user/',
    oauth_endpoint: '/oauth/token'
};

function authenticateUser(userSecrets, callback){
    var details = {
        'username': userSecrets.username,
        'password': userSecrets.password,
        'grant_type': userSecrets.grant_type
    };
    
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    let request = new Request(HOST.backend_api + endpoint.oauth_endpoint , {
        method: 'POST',
        headers : {
            'Accept': '*/*',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': 'Basic Zm9vQ2xpZW50SWQ6c2VjcmV0',
        },
        body: formBody
    });

    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

function getUserByUsername(params, callback){
    let request = new Request(HOST.backend_api + endpoint.user_endpoint + params.email, {
        method: 'GET',
        headers : {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        }
    });

    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

export {
   authenticateUser,
   getUserByUsername
};
