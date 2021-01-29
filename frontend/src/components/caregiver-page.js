import React from 'react';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import { Card, Col, Row } from 'reactstrap';
import Table from "../commons/tables/table"
import * as API_CAREGIVER from "../caregiver-data/caregiver/api/caregiver-api"

const columns = [
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Patient Id',
        accessor: 'patientId',
    },

];

const filters = [
    {
        accessor: 'name',
    },
    {
        accessor: 'patientId',
    }
];

class CaregiverPage extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.state = {
            collapseForm: true,
            loadPage: false,
            errorStatus: 0,
            error: null
        };

        this.tableData = [];
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        localStorage.clear();
        window.location.href = '/';
    }

    toggleForm() {
        this.setState({ collapseForm: !this.state.collapseForm });
    }

    componentDidMount() {
        this.getCaregiverByUserId(localStorage.getItem('id'));
    }

    getCaregiverByUserId(id) {
        console.log("ID ", id);
        return API_CAREGIVER.getCaregiverByUserId(id, (result, status, error) => {
            console.log(result);

            if(result != null && (status === 200 || status ===201)){
                console.log("Successfully got caregiver with id: " + result.id);
                this.fetchPatients(result.id);
            } else {
                this.state.errorStatus = status;
                this.error = error;
            }
        });
    }

    fetchPatients(id) {
        console.log("In storage: " + localStorage.getItem('id'));
        
        return API_CAREGIVER.getPatientsForCaregiver(id, (result, status, err) => {
            console.log(result);
            if (result !== null && status === 200) {
                result.forEach(x => {
                    this.tableData.push({
                        patientId: x.id,
                        name: x.name
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

    refresh() {
        this.forceUpdate()
    }

    render() {
        let pageSize = 10;
        return (
            <div>
                <button onClick = {this.handleLogout} style={{marginLeft: "95%", marginBottom: "1%"}}> Logout </button>
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
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error} />}

            </div>
        );
    };

}

export default CaregiverPage;