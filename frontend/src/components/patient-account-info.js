import React from 'react';
import * as API_PATIENTS from "../patient-data/patient/api/patient-api"
import {Jumbotron} from 'reactstrap';

const styleInfoBox = {
  backgroundColor: "#12c2e9",
  width: "500px",
  height: "400px",
  position: "absolute",
  left: "33%",
  top: "20%"
}

class PatientAccountInfo extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            errorStatus: 0,
            error: null,

            patientInfo: {
                id: '',
                name: '',
                birthDate: '',
                gender: '',
                address: ''
            }
        };

    }

    componentDidMount() {
        this.fetchInfo();
    }

    fetchInfo() {
        console.log(localStorage.getItem('id'));

        return API_PATIENTS.getPatientByUserId(localStorage.getItem('id'), (result, status, error) => {
            console.log(result);

            if(result != null && (status === 200 || status ===201)){
                console.log("Successfully got patient with id: " + result.id);
                let info = {
                                id: result.id,
                                name: result.name,
                                birthDate: result.birthDate,
                                gender: result.gender,
                                address: result.address
                            }
                this.setState({patientInfo: info});
            } else {
                this.state.errorStatus = status;
                this.error = error;
            }
        });
    }

	render() {
  	return (
        <Jumbotron style = {styleInfoBox} >
            <h1> Account information </h1>
            <br/>
            <div>
                <div> <b> Name: </b> {this.state.patientInfo.name} </div> 
                <div> <b> Email: </b> {this.state.patientInfo.birthDate} </div>
                <div> <b> Gender: </b> {this.state.patientInfo.gender} </div>
                <div> <b> Address: </b> {this.state.patientInfo.address} </div>
            </div>
        </Jumbotron>
    );
  }
}

export default PatientAccountInfo;