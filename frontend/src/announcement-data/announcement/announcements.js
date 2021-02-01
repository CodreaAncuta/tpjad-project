import React from 'react';
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Card, Col, Row} from 'reactstrap';
import Table from "../../commons/tables/table"
import AnnouncementForm from "./announcement-form";
import * as API_ANNOUNCEMENTS from "./api/announcement-api"

const columns = [
    {
        Header:  'Name',
        accessor: 'name',
    },
    {
        Header: 'Announcement Id',
        accessor: 'announcementId',
    },

];

const filters = [
    {
        accessor: 'name',
    },
    {
        accessor: 'announcementId',
    }
];

class Announcements extends React.Component {

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

    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }

    componentDidMount() {
        this.fetchAnnouncements();
    }

    fetchAnnouncements() {
        return API_ANNOUNCEMENTS.getAnnouncements((result, status, err) => {
           console.log(result);
           if(result !== null && status === 200) {
               result.forEach( x => {
                   this.tableData.push({
                       name: x.name,
                       announcementId: x.id,
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

                {/* <Row style={{width:"1000px"}}>
                    <Col>
                        <Card body>
                            <div>
                                <AnnouncementForm registerCaregiver={this.refresh} updateCaregiver={this.refresh}/>
                            </div>
                        </Card>
                    </Col>
                </Row> */}

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

export default Announcements;
