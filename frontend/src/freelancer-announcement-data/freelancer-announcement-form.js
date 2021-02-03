import React from 'react';
import Button from "react-bootstrap/Button";
import * as API_ANNOUNCEMENTS from "./api/freelancer-announcements-api.js";
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";

class FreelancerAnnouncementForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);

        this.announcement = [];

        this.state = {

            errorStatus: 0,
            error: null,

            idNotNull: true,

            formControls: {

                title: {
                    value: '',
                    placeholder: 'Your title...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 5,
                        isRequired: true
                    }
                },


                 description: {
                    value: '',
                    placeholder: 'Your description...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 7,
                        isRequired: true
                    }
                },

                category: {
                    value: '',
                    placeholder: 'Your category...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 7,
                        isRequired: true
                    }
                },

                technology: {
                    value: '',
                    placeholder: 'Your technology...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 7,
                        isRequired: true
                    }
                },

                price: {
                    value: '',
                    placeholder: 'The price...',
                    touched: false,
                },
                
                duration: {
                    value: '',
                    placeholder: 'Duration...',
                    touched: false,
                }
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleGet = this.handleGet.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
    }

    toggleForm() {
        this.setState({ collapseForm: !this.state.collapseForm });
    }

    componentDidMount() {

    }

    refreshPage() {
        window.location.reload(false);
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

    registerAnnouncement(announcement) {
        this.refreshPage();
        return API_ANNOUNCEMENTS.postAnnouncements(announcement, (result, status, error) => {
            console.log(result);

            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted announcement with id: " + result.id);
                alert("Successfully inserted announcement!");
                this.forceUpdate();
            } else {
                this.state.errorStatus = status;
                this.error = error;
            }
        });
    }

    updateAnnouncement(announcement, id) {
        this.refreshPage();
        console.log(announcement);
        return API_ANNOUNCEMENTS.updateAnnouncement(announcement, id, (result, status, error) => {
            console.log(result);

            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully updated announcement with id: " + result);
                alert("Successfully updated announcement!");
                this.forceUpdate();
            } else {
                this.state.errorStatus = status;
                this.error = error;
            }
        });
    }

    handleUpdate() {

        console.log("New announcement data:");
        console.log("title: " + this.state.formControls.title.value);
        console.log(this.state.formControls.description.value === null);
        console.log(this.state.formControls.description.value === undefined);
        console.log("category: " + this.state.formControls.category.value);
        console.log("technology: " + this.state.formControls.technology.value);

        
        let announcement = {
            title: this.state.formControls.title.value,
            description: this.state.formControls.description.value,
            category: this.state.formControls.category.value,
            technology: this.state.formControls.technology.value,
            price: this.state.formControls.price.value,
            duration: this.state.formControls.duration.value,
            freelancerId: localStorage.getItem('userId')
        };

        if (this.state.formControls.description.value === null)
        announcement.description = this.state.formControls.description.placeholder;

        if (this.state.formControls.category.value == null)
        announcement.category = this.state.formControls.category.placeholder;

        if (this.state.formControls.technology.value == null)
        announcement.technology = this.state.formControls.technology.placeholder;

        if (this.state.formControls.price.value == null)
        announcement.price = this.state.formControls.price.placeholder;

        if (this.state.formControls.duration.value == null)
        announcement.duration = this.state.formControls.duration.placeholder;

        this.updateAnnouncement(announcement, localStorage.getItem('announcementIdCurrent'));
    }

    handleSubmit() {

        // console.log("New caregiver data:");
        // console.log("Name: " + this.state.formControls.name.value);
        // console.log("BirthDate: mail: " + this.state.formControls.birthDate.value);
        // console.log("Gender: " + this.state.formControls.gender.value);
        // console.log("Address: " + this.state.formControls.address.value);

        let announcement = {
            title: this.state.formControls.title.value,
            description: this.state.formControls.description.value,
            category: this.state.formControls.category.value,
            technology: this.state.formControls.technology.value,
            price: this.state.formControls.price.value,
            duration: this.state.formControls.duration.value,
            freelancerId: localStorage.getItem('userId')
        };


        this.registerAnnouncement(announcement);
    }

    handleGet() {
        let params = {
            title: this.state.formControls.title.value
        };
        return API_ANNOUNCEMENTS.getAnnouncementByTitleAndFreelancerId(localStorage.getItem('userId'), params, (result,status,err) => {
            if(result != null && status == 200){
                alert("Successfully fetched announcement: " + result.title);
                localStorage.setItem('announcementIdCurrent', result.id);
                this.idAnnouncement = result.id;
                this.state.formControls.title.value = result.title;
                this.state.formControls.description.value = result.description;
                this.state.formControls.category.value = result.category;
                this.state.formControls.technology.value = result.technology;
                this.state.formControls.price.value = result.price;
                this.state.formControls.duration.value = result.duration;
                this.forceUpdate();
            } else {
                this.state.errorStatus = status;
                this.state.error = err;
                this.forceUpdate();
            }
        });
    }

    // handleRefreshTable() {

    //     let params = {
    //         id: localStorage.getItem('userId')
    //     };

    //     console.log(params);

    //     return API_ANNOUNCEMENTS.getAnnouncementsByFreelancerId(params, (result, status, error) => {
    //         console.log(result);

    //         if (result != null && (status === 200 || status === 201)) {
    //             console.log("Successfully got announcements ");

    //             result.forEach(x => {
    //                 this.announcement.push({
    //                     title:x.title,
    //                     description:x.description,
    //                     category:x.category,
    //                     technology:x.technology,
    //                     title:x.title,
    //                     price:x.price,
    //                     duration:x.duration
    //                 });
    //             });
    //             this.forceUpdate();
    //             // alert(
    //             //     "Caregiver ID: " + result.id + "\n" +
    //             //     "Name: " + result.name + "\n" +
    //             //     "Birth date: " + result.birthDate + "\n" +
    //             //     "Gender: " + result.gender + "\n" +
    //             //     "Address: " + result.address + "\n" +
    //             //     "User ID: " + result.userId + "\n" +
    //             //     "Doctor ID: " + result.doctorId
    //             // )

    //         } else {
    //             this.state.errorStatus = status;
    //             this.error = error;
    //             this.forceUpdate();
    //         }
    //     });
    // }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>

                    <h1>MANAGE ANNOUNCEMENTS</h1>
                    <br />
                    <p> Title: </p>
                    <input name="title"
                        className="form-control"
                        placeholder={this.state.formControls.title.placeholder}
                        value={this.state.formControls.title.value}
                        onChange={this.handleChange}
                        touched={this.state.formControls.title.touched}
                    />
                    <br />
                    <p> Description: </p>
                    <input name="description"
                        className="form-control"
                        placeholder={this.state.formControls.description.placeholder}
                        value={this.state.formControls.description.value}
                        onChange={this.handleChange}
                        touched={this.state.formControls.description.touched}
                    />
                    <br />
                    <p>Category: </p>
                    <input name="category"
                        className="form-control"
                        placeholder={this.state.formControls.category.placeholder}
                        value={this.state.formControls.category.value}
                        onChange={this.handleChange}
                        touched={this.state.formControls.category.touched}
                    />
                    <br />
                    <p> Technology: </p>
                    <input name="technology"
                        className="form-control"
                        placeholder={this.state.formControls.technology.placeholder}
                        value={this.state.formControls.technology.value}
                        onChange={this.handleChange}
                        touched={this.state.formControls.technology.touched}
                    />
                    <br />
                    <p> Price: </p>
                    <input name="price"
                        className="form-control"
                        placeholder={this.state.formControls.price.placeholder}
                        value={this.state.formControls.price.value}
                        onChange={this.handleChange}
                        touched={this.state.formControls.price.touched}
                    />
                    <br />
                    <p> Duration: </p>
                    <input name="duration"
                        className="form-control"
                        placeholder={this.state.formControls.duration.placeholder}
                        value={this.state.formControls.duration.value}
                        onChange={this.handleChange}
                        touched={this.state.formControls.duration.touched}
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
                {/* <Button
                            onClick={this.handleRefreshTable}>
                            Refresh table
                </Button> */}
                    </div>

                </form>


            </div>
        );
    }
}

export default FreelancerAnnouncementForm;