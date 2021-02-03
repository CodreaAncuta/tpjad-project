import React from 'react';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {Card, Col, Row} from 'reactstrap';
import Table from "../commons/tables/table"
import FreelancerAnnouncementForm from "./freelancer-announcement-form";
import * as API_ANNOUNCEMENTS from "./api/freelancer-announcements-api"

const columns = [
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


];

const filters = [
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

    fetchAnnouncements(params) {
        return API_ANNOUNCEMENTS.getAnnouncementsByFreelancerId(params,(result, status, err) => {
           console.log(result);
           if(result !== null && status === 200) {
            result.forEach(x => {
                this.tableData.push({
                    title:x.title,
                    description:x.description,
                    category:x.category,
                    technology:x.technology,
                    title:x.title,
                    price:x.price,
                    duration:x.duration
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
