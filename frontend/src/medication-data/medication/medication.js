import React from 'react';
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Card, Col, Row} from 'reactstrap';
import Table from "../../commons/tables/table"
import MedicationForm from "./medication-form";

import * as API_MEDICATION from "./api/medication-api"

const columns = [
    {
        Header:  'Id',
        accessor: 'id',
    },
    {
        Header:  'Name',
        accessor: 'name',
    }
];

const filters = [
    {
        accessor: 'name',
    }
];

class Medication extends React.Component {

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
        this.fetchMedication();
    }

    fetchMedication() {
        return API_MEDICATION.getMedication((result, status, err) => {
           console.log(result);
           if(result !== null && status === 200) {
               result.forEach( x => {
                   this.tableData.push({
                       id: x.id,
                       name: x.name
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
        let pageSize = 5;
        return (
            <div style={{display: "flex", backgroundColor:"white"}}>

                <Row style={{width:"900px"}}>
                    <Col>
                        <Card body>
                            <div>
                                <MedicationForm insertMedication={this.refresh} updateMedication={this.refresh} />
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

export default Medication;
