import React from 'react';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import { Card, Col, Row } from 'reactstrap';
import Table from "../commons/tables/table"
import * as API_ANNOUNCEMENTS from "../announcement-data/announcement/api/announcement-api"
import * as API_SERVICES from "../announcement-data/announcement/api/service-api"
import userRoles from '../commons/constants/enums';

const buttonStyle = {
    display: 'inline-block',
    width: 'calc(50% - 4px)',
    margin: '0 auto'
};

const columns = [
    {
        Header: 'Announcement Id',
        accessor: 'announcementId',
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
        Header: 'Price',
        accessor: 'price'
    },
    {
        Header: 'Duration',
        accessor: 'duration'
    },
    {
        Header: 'Request service',
        accessor: 'requestService'
    }
];

const filters = [
    {
        accessor: 'announcementId'
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
    },
    {
        accessor: ''
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
            error: null
        };

        this.tableData = [];
        this.handleLogout = this.handleLogout.bind(this);
        this.handleProfile = this.handleProfile.bind(this);
    }

    handleLogout() {
        localStorage.clear();
        window.location.href = '/';
    }

    handleProfile() {
        let role = localStorage.getItem('role');
        console.log("profile logged user: " + localStorage.getItem('username') + " role: " + role);
        if (role == userRoles.FREELANCER ) {
            window.location.href = '/freelancer';
        } else if (role == userRoles.COMPANY) {
            window.location.href = '/company';
        }
    }

    handleRequestService() {
        // private Integer id;
        // private String jobPrice;
        // private String jobDuration;
        // private Integer freelancerId;
        // private Integer companyId;
        // private Integer announcementId;

        //if user freelancer the button is not there
        //if user is company it has the button
        //get the logged company - get freelancer by announcement
        let role = localStorage.getItem('role');
        console.log("profile logged user: " + localStorage.getItem('username') + " role: " + role);
        if (role == userRoles.FREELANCER ) {
            window.location.href = '/freelancer';
        } else if (role == userRoles.COMPANY) {
            window.location.href = '/company';
        }
    }

    toggleForm() {
        this.setState({ collapseForm: !this.state.collapseForm });
    }

    componentDidMount() {
        this.fetchAnnouncements();
    }

    fetchAnnouncements() {
        return API_ANNOUNCEMENTS.getAnnouncements((result, status, err) => {
            console.log(result);
            if (result !== null && status === 200) {
                result.forEach(x => {
                    this.tableData.push({
                        announcementId: x.id,
                        title: x.title,
                        description: x.description,
                        category: x.category,
                        technology: x.technology,
                        price: x.price,
                        duration: x.duration,
                        requestService: <button onClick = {this.handleRequestService} style={buttonStyle}> Request </button>
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

    saveServiceRequest(serviceBody) {
        return API_SERVICES.insertService(serviceBody, (result, status, err) => {
            console.log(result);
            if (result !== null && status === 200) {
                console.log("Save service request with id: " + result.id);
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
                <div class="buttons">
                    <button onClick = {this.handleLogout} style={buttonStyle}> Logout </button>
                    <button onClick = {this.handleProfile} style={buttonStyle}> Profile </button>
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

            </div>
        );
    };

}

export default AnnouncementPage;