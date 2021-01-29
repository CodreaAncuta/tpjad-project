import React from 'react';
import Button from "react-bootstrap/Button";
import * as API_CAREGIVERS from "./api/caregiver-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";


class CaregiverForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);

        this.state = {

            errorStatus: 0,
            error: null,

            idNotNull: true,

            formControls: {

                caregiverId: {
                    value: '',
                    valid: true,
                    placeholder: 'Caregiver id...',
                    touched: true
                },

                name: {
                    value: '',
                    placeholder: 'Your name...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },

                birthDate: {
                    value: '',
                    placeholder: 'yyyy-mm-dd...',
                    touched: false
                },

                gender: {
                    value: '',
                    placeholder: 'Your gender...',
                    touched: false,

                },
                address: {
                    value: '',
                    placeholder: 'Cluj, Zorilor, Str. Lalelelor 21...',
                    touched: false,

                },
                userId: {
                    value: '',
                    placeholder: 'The caregiver USER ID...',
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

    registerCaregiver(caregiver) {
        return API_CAREGIVERS.postCaregiver(caregiver, (result, status, error) => {
            console.log(result);

            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted caregiver with id: " + result.id);
                alert("Successfully inserted caregiver. Id: " + result.id);
                this.props.refresh();
            } else {
                this.state.errorStatus = status;
                this.error = error;
            }
        });
    }

    updateCaregiver(caregiver, id) {
        console.log(caregiver);
        return API_CAREGIVERS.updateCaregiver(caregiver, id, (result, status, error) => {
            console.log(result);

            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully updated caregiver with id: " + result);
                alert("Successfully updated caregiver with id: " + result.id);
            } else {
                this.state.errorStatus = status;
                this.error = error;
            }
        });
    }

    handleUpdate() {

        console.log("New caregiver data:");
        console.log("Name: " + this.state.formControls.name.value);
        console.log("BirthDate: mail: " + this.state.formControls.birthDate.value);
        console.log("Gender: " + this.state.formControls.gender.value);
        console.log("Address: " + this.state.formControls.address.value);

        let caregiver = {
            name: this.state.formControls.name.value,
            birthDate: this.state.formControls.birthDate.value,
            gender: this.state.formControls.gender.value,
            address: this.state.formControls.address.value,
            userId: this.state.formControls.userId.value,
            doctorId: localStorage.getItem('id')
        };

        console.log("ID:" + this.state.formControls.caregiverId.value);
        this.updateCaregiver(caregiver, this.state.formControls.caregiverId.value);
    }

    handleSubmit() {

        console.log("New caregiver data:");
        console.log("Name: " + this.state.formControls.name.value);
        console.log("BirthDate: mail: " + this.state.formControls.birthDate.value);
        console.log("Gender: " + this.state.formControls.gender.value);
        console.log("Address: " + this.state.formControls.address.value);

        let caregiver = {
            name: this.state.formControls.name.value,
            birthDate: this.state.formControls.birthDate.value,
            gender: this.state.formControls.gender.value,
            address: this.state.formControls.address.value,
            userId: this.state.formControls.userId.value,
            doctorId: localStorage.getItem('id')
        };

        this.registerCaregiver(caregiver);
    }

    handleDelete() {

        let params = {
            id: this.state.formControls.caregiverId.value
        };

        console.log(params);

        return API_CAREGIVERS.deleteCaregiver(params, (result, status, error) => {
            console.log(result);

            if (result == null && (status === 200 || status === 201)) {
                console.log("Successfully deleted caregiver with id: " + params.id);
                alert("Successfully deleted caregiver with id: " + result.id);
                this.props.refresh();
            } else {
                this.state.errorStatus = status;
                this.error = error;
            }
        });
    }

    handleGet() {

        let params = {
            id: this.state.formControls.caregiverId.value
        };

        console.log(params);

        return API_CAREGIVERS.getCaregiverById(params, (result, status, error) => {
            console.log(result);

            if (result != null && (status === 200 || status === 201)) {
                console.log("Successfully got caregiver with id: " + params.id);

                alert(
                    "Caregiver ID: " + result.id + "\n" +
                    "Name: " + result.name + "\n" +
                    "Birth date: " + result.birthDate + "\n" +
                    "Gender: " + result.gender + "\n" +
                    "Address: " + result.address + "\n" +
                    "User ID: " + result.userId + "\n" +
                    "Doctor ID: " + result.doctorId
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

                    <h1>MANAGE CAREGIVERS</h1>
                    <br />
                    <p> Id: </p>
                    <input name="caregiverId"
                        className="form-control"
                        placeholder={this.state.formControls.caregiverId.placeholder}
                        value={this.state.formControls.caregiverId.value}
                        onChange={this.handleChange}
                        touched={this.state.formControls.caregiverId.touched}
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
                    <p> Birth date: </p>
                    <input name="birthDate"
                        className="form-control"
                        placeholder={this.state.formControls.birthDate.placeholder}
                        value={this.state.formControls.birthDate.value}
                        onChange={this.handleChange}
                        touched={this.state.formControls.birthDate.touched}
                    />
                    <br />
                    <p> Gender: </p>
                    <input name="gender"
                        className="form-control"
                        placeholder={this.state.formControls.gender.placeholder}
                        value={this.state.formControls.gender.value}
                        onChange={this.handleChange}
                        touched={this.state.formControls.gender.touched}
                    />
                    <br />
                    <p> Address: </p>
                    <input name="address"
                        className="form-control"
                        placeholder={this.state.formControls.address.placeholder}
                        value={this.state.formControls.address.value}
                        onChange={this.handleChange}
                        touched={this.state.formControls.address.touched}
                    />
                    <br />
                    <p> USER ID: </p>
                    <input name="userId"
                        className="form-control"
                        placeholder={this.state.formControls.userId.placeholder}
                        value={this.state.formControls.userId.value}
                        onChange={this.handleChange}
                        touched={this.state.formControls.userId.touched}
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
                            onClick={this.handleDelete}>
                            Delete
                </Button>
                    </div>

                </form>


            </div>
        );
    }
}

export default CaregiverForm;
