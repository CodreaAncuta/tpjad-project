import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import AnnouncementPage from './announcement-data/announcement-page'
import ErrorPage from './commons/errorhandling/error-page';
import LoginPage from './user-data/login-page'
import userRoles from "./commons/constants/enums";
import styles from './commons/styles/project-style.css';
import CompanyPage from './company-data/company-page';
import FreelancerPage from './freelancer-data/freelancer-page';
import FreelancerAnnouncementPage from './freelancer-announcement-data/freelancer-announcements';

class App extends React.Component {
    render() {
        return (
            <div className={styles.back}>
                <Router>
                    <Switch>
                        <Route exact={true} component={LoginPage} path="/" />

                        <Route
                            exact
                            path='/announcements'
                            render={() => <AnnouncementPage />}
                        />

                        <Route
                            exact
                            path="/company"
                            render = {() => <CompanyPage /> }
                        />

                        <Route
                            exact
                            path='/freelancer'
                            render={() => <FreelancerPage />}
                        />

                        <Route
                            exact
                            path='/freelancer/announcements'
                            render={() => <FreelancerAnnouncementPage />}
                        />

                        <Route exact={true} component={ErrorPage} path="/error" />
                        {/* <Route exact={true} component={AnnouncementPage} path="/ann" /> */}
                    </Switch>
                </Router>
            </div >
        )
    };
}

export default App
