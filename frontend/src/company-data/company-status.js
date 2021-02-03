import React from 'react';
import * as API_COMPANY from "./api/company-api";
import {Card, Col, Row} from 'reactstrap';
import Table from  "../commons/tables/table";

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
        Header:  'Price',
        accessor: 'price',
    },
    {
        Header:  'Duration',
        accessor: 'duration',
    },
    {
        Header:  'Freelancer',
        accessor: 'freelancerId',
    },
    {
        Header:  'AnnouncementId',
        accessor: 'announcementId',
    },
    {
        Header:  'DeleteService',
        accessor: 'deleteService',
    }
];

const filters = [
    {
        accessor: 'id',
    },
    {
        accessor: 'price',
    },
    {
        accessor: 'duration',
    },
    {
        accessor: 'freelancerId',
    },
    {
        accessor: 'announcementId',
    }
];

class CompanyStatus extends React.Component{

    constructor(props){
        super(props);
        this.tableData = [];

        this.compId = -1;

        this.company = null;
        this.companyServices=[];
        this.companyServicesIds=[];

        this.handelDeleteService = this.handelDeleteService.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
    }

    refreshPage() {
        window.location.reload(false);
    }

    fetchCompanyInfo(userId){
        return API_COMPANY.getCompanyById(userId, (result,status,err) => {
            
            if(result != null && status == 200){
                console.log("getCompanyById result: " + result.email);
                this.company = result
                console.log("company result: " + result);
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

    handelDeleteService(serv) {
        this.refreshPage(); 
        return API_COMPANY.deleteService(serv, (result,status,err) => {
            if(result != null && status == 200){
                alert("Successfully deleted service with id: " + serv.id);
                this.forceUpdate();
            } else {
                this.state.errorStatus = status;
                this.state.error = err;
                this.forceUpdate();
            }
        });
    }

    fetchServices(){
        return API_COMPANY.getCompanyServiceList(this.company.id, (result,status,err) => {
            console.log("before push");
            if(result != null && status == 200){
                console.log("Result of company id="+this.company.id+"::::");
                console.log(result);
                result.forEach(x => {
                    // this.companyServices.push(x);
                    // this.companyServicesIds.push(x.id);

                    let name = "";

                    API_COMPANY.getFreelancer(x.freelancerId, (result,status,err) => {
                        if(result != null && status == 200){
                            name = result.name;
                        }
                    });

                    
                    this.tableData.push({
                        id: x.id,
                        price: x.jobPrice,
                        duration: x.jobDuration,
                        freelancerId: x.freelancerId,
                        announcementId: x.announcementId,
                        deleteService: <button onClick = {() => this.handelDeleteService(x)} style={buttonStyle}> Request </button>
                    });

                });
                this.forceUpdate();
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

    

    render(){
        let pageSize = 5;
        return(     
            <Row>
                <Col>
                    <Card body>
                        <Table 
                            data = {this.tableData}
                            columns = {columns}
                            search = {filters}
                            pageSize = {pageSize}
                        />
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default CompanyStatus;