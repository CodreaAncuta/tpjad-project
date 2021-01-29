import React from 'react';
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Card, Col, Row} from 'reactstrap';
import Table from "../../commons/tables/table"
import PatientForm from "./patient-form";
import * as API_PATIENTS from "./api/patient-api"

const columns = [
    {
        Header:  'Name',
        accessor: 'name',
    },
    {
        Header: 'Doctor Id',
        accessor: 'doctorId',
    },

];

const filters = [
    {
        accessor: 'name',
    },
    {
        accessor: 'doctorId',
    }
];

class Patients extends React.Component {

    constructor(props){
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.state = {
            collapseForm: true,
            loadPage: false,
            errorStatus: 0,
            error: null
        };

        this.tableData = [];
    }

    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }

    componentDidMount() {
        this.fetchPatients();
    }

    fetchPatients() {
        return API_PATIENTS.getPatients((result, status, err) => {
           console.log(result);
           if(result !== null && status === 200) {
               result.forEach( x => {
                   this.tableData.push({
                       name: x.name,
                       doctorId: x.doctorId,
                   });
               });
               this.forceUpdate();
           } else {
               console.log("Error!!!");
               this.state.errorStatus = status;
               this.state.error = err;
               this.forceUpdate();
           }
        });
    }

    refresh(){
        this.forceUpdate()
    }

    render() {
        let pageSize = 5;
        return (
            <div style={{display: "flex", backgroundColor:"white"}}>

                <Row style={{width:"1000px"}}>
                    <Col>
                        <Card body>
                            <div>
                                <PatientForm registerPatient={this.refresh} updatePatient={this.refresh} />
                            </div>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Card body>
                            <Table
                                data={this.tableData}
                                columns={columns}
                                search={filters}
                                pageSize={pageSize}
                            />
                        </Card>
                    </Col>
                </Row>

                {this.state.errorStatus > 0 &&
                <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>}

            </div>
        );
    };

}

export default Patients;
