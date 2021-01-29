import React from 'react';
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Card, Col, Row} from 'reactstrap';
import MedicationPlanForm from "./medication-plan-form";

class MedicationPlan extends React.Component {

    constructor(props){
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.state = {
            collapseForm: true,
            loadPage: false,
            errorStatus: 0,
            error: null
        };
    }

    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }

    render() {
        return (
            <div>

                <Row>
                    <Col>
                        <Card body>
                            <div>
                                <MedicationPlanForm />
                            </div>
                        </Card>
                    </Col>
                </Row>

                {this.state.errorStatus > 0 &&
                <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>}

            </div>
        );
    };

}

export default MedicationPlan;
