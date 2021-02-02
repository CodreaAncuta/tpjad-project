import React from 'react';
import CompanyForm from "./company-form"
import CompanyStatus from "./company-status"

import {Card, Col, Row} from "reactstrap";
import Button from "react-bootstrap/Button";

const buttonStyle = {
    display: 'inline-block',
    width: 'calc(50% - 4px)',
    margin: '0 auto'
};

class CompanyPage extends React.Component{

    constructor(props){
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
        this.handleAnnouncements = this.handleAnnouncements.bind(this);
    }

    handleLogout() {
        localStorage.clear();
        window.location.href = '/';
    }

    handleAnnouncements() {
        window.location.href = '/announcements';
    }

    render(){
        let pageSize = 5;
        return(
            <div>
                <Card>
                    <span className="input-group-btn">
                        <div className="buttons">
                            <Button onClick = {this.handleLogout} style={buttonStyle}> Logout </Button>
                            <Button onClick = {this.handleAnnouncements} style={buttonStyle}> Announcements </Button>
                        </div>
                    </span>
                </Card>
                <CompanyForm />     
                <CompanyStatus />

            </div>
        );
    }
}

export default CompanyPage; 