import React from 'react';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import { Card, Col, Row } from 'reactstrap';
import Table from "../commons/tables/table"
import * as API_ANNOUNCEMENTS from "./api/announcement-api"
import * as API_SERVICES from "./api/service-api"
import userRoles from '../commons/constants/enums';
import Button from "react-bootstrap/Button";

const buttonStyle = {
    display: 'inline-block',
    width: '100%',
    margin: '0 auto'
};

const columns = [
    {
        Header: 'Announcement Number',
        accessor: 'number',
    },
    {
        Header: 'Title',
        accessor: 'title'
    },
    {
        Header: 'Description',
        accessor: 'description'
    },
    {
        Header: 'Category',
        accessor: 'category'
    },
    {
        Header: 'Technology',
        accessor: 'technology'
    },
    {
        Header: 'Price (EURO)',
        accessor: 'price'
    },
    {
        Header: 'Duration (Days)',
        accessor: 'duration'
    },
    {
        Header:  'RequestService',
        accessor: 'requestService',
    }
];

const filters = [
    {
        accessor: 'number'
    },
    {
        accessor: 'title'
    },
    {
        accessor: 'description'
    },
    {
        accessor: 'category'
    },
    {
        accessor: 'technology'
    },
    {
        accessor: 'price'
    },
    {
        accessor: 'duration'
    }
];

class AnnouncementPage extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.state = {
            collapseForm: true,
            loadPage: false,
            errorStatus: 0,
            error: null,
            // priceService: 0,
            // durationService: 0,
            // freelancerService: 0,
            formControls: {

                idAnnouncement: {
                    value: '',
                    valid: true,
                    placeholder: 'Announcement Number...',
                    touched: true
                }
            }
        };

        this.tableData = [];
        this.handleLogout = this.handleLogout.bind(this);
        this.handleProfile = this.handleProfile.bind(this);
        this.handleRequestService = this.handleRequestService.bind(this);
    }

    handleLogout() {
        localStorage.clear();
        window.location.href = '/';
    }

    handleProfile() {
        let role = localStorage.getItem('role');
        console.log("profile logged user: " + localStorage.getItem('username') + " role: " + role);
        if (role === userRoles.FREELANCER ) {
            window.location.href = '/freelancer';
        } else if (role === userRoles.COMPANY) {
            window.location.href = '/company';
        }
    }

    handleRequestService(announcement) {
        let serviceBody = {
            jobPrice: announcement.price,
            jobDuration: announcement.duration,
            freelancerId: announcement.freelancerId,
            companyId: localStorage.getItem('userId'),
            announcementId: announcement.id
        };

        this.saveServiceRequest(serviceBody);
    }

    toggleForm() {
        this.setState({ collapseForm: !this.state.collapseForm });
    }

    componentDidMount() {
        this.fetchAnnouncements();
        // let params = {
        //     price: '10',
        //     operator: 'ge'
        // };
        // this.fetchAnnouncementsByPrice(params);
    }

    fetchAnnouncements() {
        return API_ANNOUNCEMENTS.getAnnouncements((result, status, err) => {
            console.log(result);
            if (result !== null && status === 200) {
                result.forEach(x => {
                    this.tableData.push({
                        number: x.id,
                        title: x.title,
                        description: x.description,
                        category: x.category,
                        technology: x.technology,
                        price: x.price,
                        duration: x.duration,
                        requestService: localStorage.getItem('role') === userRoles.COMPANY ? <button onClick = {() => this.handleRequestService(x)} style={buttonStyle}> Request </button> : null
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

    fetchAnnouncementById(id) {
        return API_ANNOUNCEMENTS.getAnnouncementById(id, (result, status, err) => {
            console.log("Result getAnnouncementById: " + result);
            if (result !== null && status === 200) {
                // this.setState({
                //     price: result.price,
                //     duration: result.duration,
                //     freelancer: result.freelancer.id
                //   });
                console.log("fetchAnnouncementById: " + result.price + " " + result.duration + " " + result.freelancer);
                localStorage.setItem('priceService', result.price);
                localStorage.setItem('durationService', result.duration);
                localStorage.setItem('freelancerService', result.freelancer.id);
                this.forceUpdate();
            } else {
                console.log("Error fetch!!!");
                this.state.errorStatus = status;
                this.state.error = err;
                this.forceUpdate();
            }
        });
    }


    fetchAnnouncementsByPrice(params) {
        return API_ANNOUNCEMENTS.getAnnouncementsByPrice(params, (result, status, err) => {
            console.log(result);
            if (result !== null && status === 200) {
                result.forEach(x => {
                    console.log(x);
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

    saveServiceRequest(serviceBody) {
        return API_SERVICES.insertService(serviceBody, (result, status, err) => {
            console.log(result);
            if (result !== null && status === 200) {
                console.log("Save service request with id: " + result.id);
                alert("Requested service!");
            } else {
                console.log("Error!!!");
                this.state.errorStatus = status;
                this.state.error = err;
                this.forceUpdate();
            }
        });
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

    refresh() {
        this.forceUpdate()
    }

    render() {
        let pageSize = 10;
        return (
            <div>
                <div>
                    <Button onClick = {this.handleLogout} style={buttonStyle}> Logout </Button>
                    <Button onClick = {this.handleProfile} style={buttonStyle}> Profile </Button>
                </div>
    
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
                {/* <br/> <br/>
                {
                localStorage.getItem('role') === userRoles.COMPANY ?
                <div>
                    <center><h5>Select an announcement</h5></center>
                    <input name="idAnnouncement"
                        className="form-control"
                        placeholder={this.state.formControls.idAnnouncement.placeholder}
                        value={this.state.formControls.idAnnouncement.value}
                        onChange={this.handleChange}
                        touched={this.state.formControls.idAnnouncement.touched}
                        style={buttonStyle}
                    />
                    <Button style={buttonStyle}
                        onClick={this.handleRequestService}>
                        Request Service
                    </Button>
                </div>
                : null
                } */}
            </div>
        );
    };

}

export default AnnouncementPage;