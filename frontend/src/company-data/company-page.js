import React from 'react';
import CompanyForm from "./company-form"
import CompanyStatus from "./company-status"

class CompanyPage extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        let pageSize = 5;
        return(
            <div>
                <CompanyForm />     
                <CompanyStatus />
            </div>
        );
    }
}

export default CompanyPage; 