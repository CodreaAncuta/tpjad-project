import React from 'react';
import * as API_COMPANY from "./api/company-api";
import {Card, Col, Row} from 'reactstrap';
import Table from  "../commons/tables/table";

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

    fetchServices(){
        return API_COMPANY.getCompanyServiceList(this.company.id, (result,status,err) => {
            
            if(result != null && status == 200){
                result.forEach(x => {
                    // this.companyServices.push(x);
                    // this.companyServicesIds.push(x.id);
                    
                    this.tableData.push({
                        id: x.id,
                        price: x.jobPrice,
                        duration: x.jobDuration,
                        freelancerId: x.freelancerId,
                        announcementId: x.announcementId
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

        if (this.compId != null){
            this.fetchCompanyInfo();
            if (this.company){
                this.fetchServices();
            }
        }
    }

    componentWillMount(){
        let i = this.props.match.params;
        if(i!=null){
           this.compId = i;
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