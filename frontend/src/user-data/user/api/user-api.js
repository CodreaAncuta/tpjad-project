import {HOST} from '../../../commons/hosts';
import RestApiClient from "../../../commons/api/rest-client";


const endpoint = {
    user_endpoint: '/user/'
};

function authenticateUser(userSecrets, callback){
    let request = new Request(HOST.backend_api + endpoint.user_endpoint , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userSecrets)
    });

    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

export {
   authenticateUser
};
