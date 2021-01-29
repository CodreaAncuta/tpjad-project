import React from 'react';
import Button from "react-bootstrap/Button";
import * as API_MEDICATION_PLAN from "./api/medication-plan-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";

class MedicationPlanForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);

        this.state = {

            errorStatus: 0,
            error: null,

            formControls: {

                patientId: {
                    value: '',
                    placeholder: 'Patient id...',
                    touched: false,
                },

                medicationId: {
                    value: '',
                    placeholder: 'Medication Id...',
                    touched: false,

                },

                start: {
                    value: '',
                    placeholder: 'yyyy-mm-dd...',
                    touched: false
                },

                end: {
                    value: '',
                    placeholder: 'yyyy-mm-dd...',
                    touched: false
                },

                startHour: {
                    value: '',
                    placeholder: 'hh:mm...',
                    touched: false
                },

                endHour: {
                    value: '',
                    placeholder: 'hh:mm...',
                    touched: false
                },

                dosage: {
                    value: '',
                    placeholder: '20.0...',
                    touched: false
                }
            }
        };

        this.intakeIntervals = [];

        this.handleChange = this.handleChange.bind(this);
        this.handleInsert = this.handleInsert.bind(this);
        this.handleAddInterval = this.handleAddInterval.bind(this);

    }

    toggleForm() {
        this.setState({ collapseForm: !this.state.collapseForm });
    }

    componentDidMount() {

    }

    handleChange = event => {

        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = {
            ...this.state.formControls
        };

        const updatedFormElement = {
            ...updatedControls[name]
        };

        updatedFormElement.value = value;
        updatedFormElement.touched = true;

        updatedControls[name] = updatedFormElement;

        this.setState({
            formControls: updatedControls
        });
    };

    insertMedicationPlan(medicationPlan) {
        return API_MEDICATION_PLAN.postMedicationPlan(medicationPlan, (result, status, error) => {
            console.log(result);

            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully created medication plan with id: " + result + " for patient with id: " + medicationPlan.patientId);
                alert("Created medication plan!" + "\n" +
                    "Patient id: " + this.state.formControls.patientId.value + "\n" +
                    "Medication id: " + this.state.formControls.medicationId.value + "\n" +
                    "Start: " + this.state.formControls.start.value + "\n" +
                    "End: " + this.state.formControls.end.value + "\n"
                )
            } else {
                this.state.errorStatus = status;
                this.error = error;
            }
        });
    }


    handleInsert() {

        let medicationPlan = {
            patientId: this.state.formControls.patientId.value,
            medicationId: this.state.formControls.medicationId.value,
            start: this.state.formControls.start.value,
            end: this.state.formControls.end.value,
            intakeIntervals: this.intakeIntervals
        };

        console.log("Med Plan ", JSON.stringify(medicationPlan));

        this.insertMedicationPlan(medicationPlan);
    }

    handleAddInterval() {

        this.intakeIntervals.push({
            startHour: this.state.formControls.startHour.value,
            endHour: this.state.formControls.endHour.value,
            dosage: this.state.formControls.dosage.value
        });

        alert("Added intake interval!" + "\n" +
            "Start hour: " + this.state.formControls.startHour.value + "\n" +
            "End hour: " + this.state.formControls.endHour.value + "\n" +
            "Dosage: " + this.state.formControls.dosage.value + "\n"
        )
        console.log(this.intakeIntervals);
    }

    render() {
        return (
            <div>
                <form>

                    <h1>CREATE MEDICATION PLAN</h1>

                    <p> Patient Id: </p>
                    <input name="patientId"
                        className="form-control"
                        placeholder={this.state.formControls.patientId.placeholder}
                        value={this.state.formControls.patientId.value}
                        onChange={this.handleChange}
                        touched={this.state.formControls.patientId.touched}
                    />
                    <br />
                    <p> Medication Id: </p>
                    <input name="medicationId"
                        className="form-control"
                        placeholder={this.state.formControls.medicationId.placeholder}
                        value={this.state.formControls.medicationId.value}
                        onChange={this.handleChange}
                        touched={this.state.formControls.medicationId.touched}
                    />
                    <br />
                    <p> Start: </p>
                    <input name="start"
                        className="form-control"
                        placeholder={this.state.formControls.start.placeholder}
                        value={this.state.formControls.start.value}
                        onChange={this.handleChange}
                        touched={this.state.formControls.start.touched}
                    />
                    <br />
                    <p> End: </p>
                    <input name="end"
                        className="form-control"
                        placeholder={this.state.formControls.end.placeholder}
                        value={this.state.formControls.end.value}
                        onChange={this.handleChange}
                        touched={this.state.formControls.end.touched}
                    />
                    <br />
                    <h2>INTAKE INTERVALS</h2>
                    <br />
                    <p> Start Hour: </p>
                    <input name="startHour"
                        className="form-control"
                        placeholder={this.state.formControls.startHour.placeholder}
                        value={this.state.formControls.startHour.value}
                        onChange={this.handleChange}
                        touched={this.state.formControls.startHour.touched}
                    />
                    <br />
                    <p> End Hour: </p>
                    <input name="endHour"
                        className="form-control"
                        placeholder={this.state.formControls.endHour.placeholder}
                        value={this.state.formControls.endHour.value}
                        onChange={this.handleChange}
                        touched={this.state.formControls.endHour.touched}
                    />
                    <br />
                    <p> Dosage: </p>
                    <input name="dosage"
                        className="form-control"
                        placeholder={this.state.formControls.dosage.placeholder}
                        value={this.state.formControls.dosage.value}
                        onChange={this.handleChange}
                        touched={this.state.formControls.dosage.touched}
                    />
                    <br />
                    <div>
                        <Button
                            onClick={this.handleAddInterval}>
                            Add intake interval
                        </Button>

                        <br /> <br />

                        <Button
                            onClick={this.handleInsert}>
                            Create Medication Plan
                        </Button>
                        {this.state.errorStatus > 0 &&
                            <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error} />}
                    </div>
                </form>
            </div>
        );
    }
}

export default MedicationPlanForm;
