import React from 'react';
import BackgroundImg from '../commons/images/14019.jpg';
import {Container, Jumbotron} from 'reactstrap';
import NavBarDoctor from './nav-bar-doctor'

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "500px",
    backgroundImage: `url(${BackgroundImg})`
};
const textStyle = {color: 'white'};

class HomeDoctor extends React.Component {

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);

    }

    handleLogout() {
        localStorage.clear();
        window.location.href = '/';
    }

    render() {

        return (

            <div>
                <NavBarDoctor/>
                <button onClick = {this.handleLogout} style={{marginLeft: "95%", marginBottom: "1%"}}> Logout </button>
                <Jumbotron fluid style={backgroundStyle}>
                    <Container fluid>
                        <h1 className="display-3" style={textStyle}>Medical Monitoring Platform</h1>
                        <p className="lead" style={textStyle}> <b>Enabling real time monitoring of patients, remote-assisted care services and
                            smart intake mechanism for prescribed medication.</b> </p>
                        <hr className="my-2"/>
                    </Container>
                </Jumbotron>
            </div>
        )
    };
}

export default HomeDoctor
