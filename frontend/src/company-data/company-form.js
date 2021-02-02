import React from 'react';
import Button from "react-bootstrap/Button";
import * as API_COMPANY from "./api/company-api";
import './fields/fields.css';

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
                    placeholder: 'Company name...',
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
        
        this.handleUpdate = this.handleUpdate.bind(this);
        

    }

    toggleForm() {
        this.setState({ collapseForm: !this.state.collapseForm });
    }

    fetchServices(){
        return API_COMPANY.getCompanyServiceList(this.compId, (result,status,err) => {
            
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

    fetchCompanyInfo(userId){
        return API_COMPANY.getCompanyById(userId, (result,status,err) => {
            
            if(result != null && status == 200){
                console.log("getCompanyById result: " + result.email);
                this.company = result
                console.log("company result: " + result);

                //update form placeholder:

                if (this.company != null){
                    this.state.formControls.companyId.placeholder = this.company.id;
                    this.state.formControls.email.placeholder = this.company.email;
                    this.state.formControls.name.placeholder = this.company.name;
                    this.state.formControls.password.placeholder = this.company.password;
                    this.state.formControls.city.placeholder = this.company.city;
                    this.state.formControls.areaOfWork.placeholder = this.company.areaOfWork;
                }
                
                console.log("Now company:");
                console.log(this.company);
                if (this.company != null){
                    this.fetchServices();
                }
                
            } else {
                this.state.errorStatus = status;
                this.state.error = err;
                this.forceUpdate();
                
            }
        });
    }

    componentDidMount() {

        let i = localStorage.getItem("userId");
        this.compId = i;
        console.log("i="+i);
        if (i != null){
            this.fetchCompanyInfo(i);
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

    render() {
        return (
            <div className="companyForm">
                <form onSubmit={this.handleSubmit}>

                    <h1>MANAGE COMPANY PROFILE</h1>
                    
                    <br />

                    <div className="form-group">
                        <p className="cformLabel"> Id: </p>
                        <input name="companyId"
                            className="form-control"
                            placeholder={this.state.formControls.companyId.placeholder}
                            value={this.state.formControls.companyId.value}
                            onChange={this.handleChange}
                            touched={this.state.formControls.companyId.toString()}
                        />
                    </div>

                    <br />

                    <div className="form-group">
                        <p className="cformLabel"> Name: </p>
                        <input name="name"
                            className="form-control"
                            placeholder={this.state.formControls.name.placeholder}
                            value={this.state.formControls.name.value}
                            onChange={this.handleChange}
                            touched={this.state.formControls.name.toString()}
                        />
                    </div>

                    <br />

                    <div className="form-group">
                        <p className="cformLabel"> Email: </p>
                        <input name="email"
                            className="form-control"
                            placeholder={this.state.formControls.email.placeholder}
                            value={this.state.formControls.email.value}
                            onChange={this.handleChange}
                            touched={this.state.formControls.email.toString()}
                        />
                    </div>

                    <br />

                    <div className="form-group">
                        <p className="cformLabel"> Password: </p>
                        <input name="password"
                            className="form-control"
                            placeholder={this.state.formControls.password.placeholder}
                            value={this.state.formControls.password.value}
                            onChange={this.handleChange}
                            touched={this.state.formControls.password.toString()}
                        />
                    </div>

                    <br />

                    <div className="form-group">
                        <p className="cformLabel"> Area of work: </p>
                        <input name="areaOfWork"
                            className="form-control"
                            placeholder={this.state.formControls.areaOfWork.placeholder}
                            value={this.state.formControls.areaOfWork.value}
                            onChange={this.handleChange}
                            touched={this.state.formControls.areaOfWork.toString()}
                        />
                    </div>

                    <br />

                    <div className="form-group">
                        <p className="cformLabel"> City: </p>
                        <input name="city"
                            className="form-control"
                            placeholder={this.state.formControls.city.placeholder}
                            value={this.state.formControls.city.value}
                            onChange={this.handleChange}
                            touched={this.state.formControls.city.toString()}
                        />
                    </div>
                    <br />
                    <div className="form-buttons">
                        <Button
                            onClick={this.handleUpdate}>
                            Update
                        </Button>
                    </div>

                </form>
            </div>
        );
    }
}

export default CompanyForm;