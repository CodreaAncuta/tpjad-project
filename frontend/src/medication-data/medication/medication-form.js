import React from 'react';
import Button from "react-bootstrap/Button";
import * as API_MEDICATION from "./api/medication-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";


class MedicationForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);

        this.state = {

            errorStatus: 0,
            error: null,

            idNotNull: true,

            formControls: {

                medicationId: {
                    value: '',
                    valid: true,
                    placeholder: 'Medication id...',
                    touched: true
                },

                name: {
                    value: '',
                    placeholder: 'Medication name...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },

                sideEffects: {
                    value: '',
                    placeholder: 'Side effects...',
                    touched: false,

                }
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleGet = this.handleGet.bind(this);

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

    insertMedication(medication) {
        return API_MEDICATION.postMedication(medication, (result, status, error) => {
            console.log(result);

            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted medication with id: " + result);
                alert("Successfully inserted medication. Id: " + result.id);
                this.props.refresh();
            } else {
                this.state.errorStatus = status;
                this.error = error;
            }
        });
    }

    updateMedication(medication, id) {
        console.log(medication);
        return API_MEDICATION.updateMedication(medication, id, (result, status, error) => {
            console.log(result);

            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully updated medication with id: " + result);
                alert("Successfully updated medication with id: " + result.id);
            } else {
                this.state.errorStatus = status;
                this.error = error;
            }
        });
    }

    handleUpdate() {

        let medication = {
            name: this.state.formControls.name.value,
            sideEffects: this.state.formControls.sideEffects.value
        };

        console.log("ID:" + this.state.formControls.medicationId.value);
        this.updateMedication(medication, this.state.formControls.medicationId.value);
    }

    handleSubmit() {

        let medication = {
            name: this.state.formControls.name.value,
            sideEffects: this.state.formControls.sideEffects.value
        };

        this.insertMedication(medication);
    }

    handleDelete() {

        let params = {
            id: this.state.formControls.medicationId.value
        };

        console.log(params);

        return API_MEDICATION.deleteMedication(params, (result, status, error) => {
            console.log(result);

            if (result == null && (status === 200 || status === 201)) {
                console.log("Successfully deleted medication with id: " + params.id);
                alert("Successfully deleted medication with id: " + result.id);
                this.props.refresh();
            } else {
                this.state.errorStatus = status;
                this.error = error;
            }
        });
    }

    handleGet() {

        let params = {
            id: this.state.formControls.medicationId.value
        };

        console.log(params);

        return API_MEDICATION.getMedicationById(params, (result, status, error) => {
            console.log(result);

            if (result != null && (status === 200 || status === 201)) {
                console.log("Successfully got medication with id: " + params.id);

                alert(
                    "Medication ID: " + result.id + "\n" +
                    "Name: " + result.name + "\n" +
                    "Side effects: " + result.sideEffects
                )

            } else {
                this.state.errorStatus = status;
                this.error = error;
            }
        });
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>

                    <h1>MANAGE MEDICATION</h1>
                    
                    <br />
                    <p> Id: </p>
                    <input name="medicationId"
                        className="form-control"
                        placeholder={this.state.formControls.medicationId.placeholder}
                        value={this.state.formControls.medicationId.value}
                        onChange={this.handleChange}
                        touched={this.state.formControls.medicationId.touched}
                    />
                    <br />
                    <p> Name: </p>
                    <input name="name"
                        className="form-control"
                        placeholder={this.state.formControls.name.placeholder}
                        value={this.state.formControls.name.value}
                        onChange={this.handleChange}
                        touched={this.state.formControls.name.touched}
                    />
                    <br />
                    <p> Side Effects: </p>
                    <input name="sideEffects"
                        className="form-control"
                        placeholder={this.state.formControls.sideEffects.placeholder}
                        value={this.state.formControls.sideEffects.value}
                        onChange={this.handleChange}
                        touched={this.state.formControls.sideEffects.touched}
                    />
                    <br />
                    <div>
                        <Button
                            onClick={this.handleSubmit}>
                            Create
                        </Button>
                        {this.state.errorStatus > 0 &&
                            <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error} />}

                        <Button
                            onClick={this.handleGet}>
                            Get
                        </Button>

                        <Button
                            onClick={this.handleUpdate}>
                            Update
                        </Button>

                        <Button
                            disabled={!this.state.idNotNull} onClick={this.handleDelete}>
                            Delete
                        </Button>
                    </div>

                </form>
            </div>
        );
    }
}

export default MedicationForm;
