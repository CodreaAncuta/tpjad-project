import React from 'react';
import CompanyForm from "./company-form"
import CompanyStatus from "./company-status"

const buttonStyle = {
    display: 'inline-block',
    width: 'calc(50% - 4px)',
    margin: '0 auto'
};

class CompanyPage extends React.Component{

    constructor(props){
        super(props);
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
        console.log("Yey the button works")
    }

    render(){
        let pageSize = 5;
        return(
            <div>
                <CompanyForm />     
                <CompanyStatus />
                <button onClick = {this.handleRequestService} style={buttonStyle}> Delete </button>

            </div>
        );
    }
}

export default CompanyPage; 