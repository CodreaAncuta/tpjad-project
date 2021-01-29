import React from 'react';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {Card, Col, Row} from 'reactstrap';
import Table from "../commons/tables/table"

import * as API_PATIENT from "../patient-data/patient/api/patient-api"

const columnsMedPlanTable = [
    {
        Header:  'Medication Plan Id',
        accessor: 'medPlanId',
    },
    {
        Header:  'Start',
        accessor: 'start',
    },
    {
        Header: 'End',
        accessor: 'end',
    },
    {
        Header: 'Medication Name',
        accessor: 'medicationName',
    }
];

const columnsIntakeIntervalsTable = [
    {
        Header:  'Medication Plan Id',
        accessor: 'medPlanId',
    },
    {
        Header: 'Start hour',
        accessor: 'startHour',
    },
    {
        Header: 'End hour',
        accessor: 'endHour',
    },
    {
        Header: 'Dosage',
        accessor: 'dosage',
    }
];

const filtersMedPlan = [
    {
        accessor: 'start'
    },
    {
        accessor: 'medicationName'
    }
];

const filtersIntakeIntervals = [
    {
        accessor: 'startHour'
    },
    {
        accessor: 'endHour',
    }
];

class PatientMedPlans extends React.Component {

    constructor(props){
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.state = {
            collapseForm: true,
            loadPage: false,
            errorStatus: 0,
            error: null
        };

        this.firstTableData = [];
        this.secondTableData = [];
    }

    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }

    componentDidMount() {
        this.getPatientByUserId(localStorage.getItem('id'));
    }

    getPatientByUserId(id) {
        console.log("ID ", id);
        return API_PATIENT.getPatientByUserId(id, (result, status, error) => {
            console.log(result);

            if(result != null && (status === 200 || status ===201)){
                console.log("Successfully got patient with id: " + result.id);
                this.fetchMedicationPlans(result.id);
                console.log("OBTAINED pat: " + this.state.patientId);
                
            } else {
                this.state.errorStatus = status;
                this.error = error;
            }
        });
    }

    fetchMedicationPlans(patientId) {

        return API_PATIENT.getMedicationPlansForPatient(patientId, (result, status, err) => {
           console.log(result);
           if(result !== null && status === 200) {
               result.forEach( x => {
                   this.firstTableData.push({
                       medPlanId: x.id,
                       start: x.start,
                       end: x.end,
                       medicationName: x.medication.name
                   });
                   
                    x.intakeIntervals.forEach(intervals => {
                        this.secondTableData.push({
                            medPlanId: x.id,
                            startHour: intervals.startHour,
                            endHour: intervals.endHour,
                            dosage: intervals.dosage
                        });
                    });
                
               });
               this.forceUpdate();
           } else {
               console.log("Am prins o eroare!!!");
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
        let pageSize = 10;
        return (
            <div style={{"backgroundColor": "white"}}>
                <h1>Medication Plans</h1> 
                <Row>
                    <Col>
                        <Card body>
                            <Table
                                data={this.firstTableData}
                                columns={columnsMedPlanTable}
                                search={filtersMedPlan}
                                pageSize={pageSize}
                            />
                        </Card>
                    </Col>
                </Row>

                <h1>Intake Intervals</h1> 
                <Row>
                    <Col>
                        <Card body>
                            <Table
                                data={this.secondTableData}
                                columns={columnsIntakeIntervalsTable}
                                search={filtersIntakeIntervals}
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

export default PatientMedPlans;