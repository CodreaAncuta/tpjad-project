import React from 'react';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {Card, Col, Row} from 'reactstrap';
import Table from "../commons/tables/table"
import FreelancerAnnouncementForm from "./freelancer-announcement-form";
import * as API_ANNOUNCEMENTS from "./api/freelancer-announcements-api"

const buttonStyle = {
    display: 'inline-block',
    width: 'calc(50% - 4px)',
    margin: '0 auto'
};

const columns = [
    {
        Header:  'Id',
        accessor: 'id',
    },
    {
        Header:  'Title',
        accessor: 'title',
    },
    {
        Header: 'Description',
        accessor: 'description',
    },

    {
        Header: 'Category',
        accessor: 'category',
    },

    {
        Header: 'Technology',
        accessor: 'technology',
    },
    {
        Header: 'Price',
        accessor: 'price',
    },
    {
        Header: 'Duration',
        accessor: 'duration',
    },
    {
        Header:  'Delete',
        accessor: 'deleteAnnouncement',
    }
];

const filters = [
    {
        accessor: 'id'
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

class FreelancerAnnouncementPage extends React.Component {

    constructor(props){
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.state = {
            collapseForm: true,
            loadPage: false,
            errorStatus: 0,
            error: null
        };

        this.tableData = [];
        this.handleDeleteAnnouncement = this.handleDeleteAnnouncement.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
    }

    handleLogout() {
        localStorage.clear();
        window.location.href = '/';
    }

    
    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }

    componentDidMount() {

        let params = {
            id: localStorage.getItem('userId')
        };
        console.log(localStorage.getItem('userId'));
        console.log(localStorage.getItem('access_token'));
        this.fetchAnnouncements(params);
    }

    handleDeleteAnnouncement(announcement) {
        this.refreshPage();
        return API_ANNOUNCEMENTS.deleteAnnouncement(announcement.id, (result,status,err) => {
            if(result == null && (status === 200 || status === 201)){
                alert("Successfully deleted announcement!");
                this.forceUpdate();
            } else {
                this.state.errorStatus = status;
                this.state.error = err;
                this.forceUpdate();
            }
        });
    }

    refreshPage() {
        window.location.reload(false);
    }

    fetchAnnouncements(params) {
        return API_ANNOUNCEMENTS.getAnnouncementsByFreelancerId(params,(result, status, err) => {
           console.log(result);
           if(result !== null && status === 200) {
            result.forEach(x => {
                this.tableData.push({
                    id: x.id,
                    title: x.title,
                    description: x.description,
                    category: x.category,
                    technology: x.technology,
                    price: x.price,
                    duration: x.duration,
                    deleteAnnouncement: <button onClick = {() => {this.handleDeleteAnnouncement(x)}} style={buttonStyle}>Request</button>
                });
            });
               this.forceUpdate();
           } else {
               console.log("Am prins o eroare!!!");
               this.state.errorStatus = status;
               this.state.error = err;
               this.forceUpdate();
           }
        });
    }

    refresh(){
        this.forceUpdate()
    }

    render() {

        let pageSize = 10;
        return (
            <div style={{display: "flex", backgroundColor:"white"}}>

                <div className="buttons">
                        <button onClick={this.handleLogout}> Logout</button>
                </div>

                <Row style={{width:"1000px"}}>
                    <Col>
                        <Card body>
                            <div>
                                <FreelancerAnnouncementForm registerAnnouncement={this.refresh} updateAnnouncement={this.refresh}/>
                            </div>
                        </Card>
                    </Col>
                </Row>

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
                <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>}

            </div>
        );
    };

}

export default FreelancerAnnouncementPage;
