import React from 'react';
import Button from "react-bootstrap/Button";
import * as API_COMPANY from "./api/company-api";

import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";

class CompanyForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);

        this.state = {

            errorStatus: 0,
            error: null,

            idNotNull: true,

            formControls: {

                companyId: {
                    value: '',
                    valid: true,
                    placeholder: 'Company id...',
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

                email: {
                    value: '',
                    placeholder: 'Company email...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },

                password: {
                    value: '',
                    placeholder: 'Company password...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },

                areaOfWork: {
                    value: '',
                    placeholder: 'Area of work...',
                    touched: false,
                },

                city: {
                    value: '',
                    placeholder: 'City...',
                    touched: false,
                }
            }
        };
        
        this.compId = -1;
        this.company = null;
        this.companyServices=[];
        this.companyServicesIds=[];

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

    }

    toggleForm() {
        this.setState({ collapseForm: !this.state.collapseForm });
    }

    fetchServices(){
        return API_COMPANY.getCompanyServiceList(this.company.id, (result,status,err) => {
            
            if(result != null && status == 200){
                result.forEach(x => {
                    this.companyServices.push(x);
                    this.companyServicesIds.push(x.id);
                });
                this.forceUpdate();
            } else {
                this.state.errorStatus = status;
                this.state.error = err;
                this.forceUpdate();
            }
        });
    }

    fetchCompanyInfo(){
        return API_COMPANY.getCompanyById(this.compId, (result,status,err) => {
            
            if(result != null && status == 200){
                this.company = result;
                this.forceUpdate();
            } else {
                this.state.errorStatus = status;
                this.state.error = err;
                this.forceUpdate();
            }
        });
    }

    componentWillMount(){
        let i = this.props.id;
        if(i!=null){
           this.compId = i;
        }
    }

    componentDidMount() {
        if (this.compId != null){
            this.fetchCompanyInfo();
            if (this.company != null){
                this.fetchServices();
            }
        }   
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

    insertCompany(company) {
        return API_COMPANY.postCompany(company, (result, status, error) => {
            console.log(result);

            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted company with id: " + result);
                alert("Successfully inserted company. Id: " + result.id);
                this.props.refresh();
            } else {
                this.state.errorStatus = status;
                this.error = error;
            }
        });
    }

    updateCompany(company) {
        console.log(company);
        return API_COMPANY.updateCompany(company, company.id, (result, status, error) => {
            console.log(result);

            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully updated company with id: " + result);
                alert("Successfully updated medication with id: " + result.id);
            } else {
                this.state.errorStatus = status;
                this.error = error;
            }
        });
    }

    handleUpdate() {

        let companyLocal = {
            id: this.company.id,
            name: this.state.formControls.name.value,
            email: this.state.formControls.name.email,
            password: this.state.formControls.name.password,
            areaOfWork: this.state.formControls.name.areaOfWork,
            city: this.state.formControls.name.city,
            logo: "",
            servicesId: this.companyServicesIds
        };

        // console.log("ID:" + this.state.formControls.medicationId.value);
        this.updateCompany(companyLocal);
    }

    handleSubmit() {

        let companyLocal = {
            id: this.company.id,
            name: this.state.formControls.name.value,
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            areaOfWork: this.state.formControls.areaOfWork.value,
            city: this.state.formControls.city.value,
            logo: "",
            servicesId: this.companyServicesIds
        };

        this.insertCompany(companyLocal);
    }

    handleDelete() {

        let params = {
            id: this.state.formControls.companyId.value
        };

        console.log(params);

        return API_COMPANY.deleteCompany(params, (result, status, error) => {
            console.log(result);

            if (result == null && (status === 200 || status === 201)) {
                console.log("Successfully deleted company with id: " + params.id);
                alert("Successfully deleted company with id: " + result.id);
                this.props.refresh();
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

                    <h1>MANAGE COMPANY PROFILE</h1>
                    
                    <br />
                    <p> Id: </p>
                    <input name="companyId"
                        className="form-control"
                        placeholder={this.state.formControls.companyId.placeholder}
                        value={this.state.formControls.companyId.value}
                        onChange={this.handleChange}
                        touched={this.state.formControls.companyId.toString()}
                    />
                    <br />
                    <p> Name: </p>
                    <input name="name"
                        className="form-control"
                        placeholder={this.state.formControls.name.placeholder}
                        value={this.state.formControls.name.value}
                        onChange={this.handleChange}
                        touched={this.state.formControls.name.toString()}
                    />
                    <br />
                    <p> Email: </p>
                    <input name="email"
                        className="form-control"
                        placeholder={this.state.formControls.email.placeholder}
                        value={this.state.formControls.email.value}
                        onChange={this.handleChange}
                        touched={this.state.formControls.email.toString()}
                    />
                    <br />
                    <p> Password: </p>
                    <input name="password"
                        className="form-control"
                        placeholder={this.state.formControls.password.placeholder}
                        value={this.state.formControls.password.value}
                        onChange={this.handleChange}
                        touched={this.state.formControls.password.toString()}
                    />
                    <br />
                    <p> Area of work: </p>
                    <input name="areaOfWork"
                        className="form-control"
                        placeholder={this.state.formControls.areaOfWork.placeholder}
                        value={this.state.formControls.areaOfWork.value}
                        onChange={this.handleChange}
                        touched={this.state.formControls.areaOfWork.toString()}
                    />
                    <br />
                    <p> City: </p>
                    <input name="city"
                        className="form-control"
                        placeholder={this.state.formControls.city.placeholder}
                        value={this.state.formControls.city.value}
                        onChange={this.handleChange}
                        touched={this.state.formControls.city.toString()}
                    />
                    <br />
                    <div>
                        <Button
                            onClick={this.handleSubmit}>
                            Create
                        </Button>

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

export default CompanyForm;