import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import AnnouncementPage from './announcement-data/announcement-page'
import ErrorPage from './commons/errorhandling/error-page';
import LoginPage from './user-data/login-page'
import userRoles from "./commons/constants/enums";
import styles from './commons/styles/project-style.css';
import CompanyPage from './company-data/company-page';

class App extends React.Component {
    render() {
        console.log(localStorage.getItem('role'));
        console.log(localStorage.getItem("role") === userRoles.FREELANCER || localStorage.getItem("role") === userRoles.COMPANY);
        
        return (
            <div className={styles.back}>
                <Router>
                    <Switch>
                        <Route exact={true} component={LoginPage} path="/" />

                        <Route
                            exact
                            path="/company"
                            render = {() => <CompanyPage /> }
                        />

                        <Route
                            exact
                            path='/announcements'
                            render={() => <AnnouncementPage />}
                        />

                        {/* {localStorage.getItem("role") === userRoles.CAREGIVER && <Route
                            exact
                            path='/caregiver'
                            render={() => <CaregiverPage />}
                        />} */}

                        {/* {localStorage.getItem("role") === userRoles.PATIENT && <Route
                            exact
                            path='/patient'
                            render={() => <HomePatient />}
                        />}

                        {localStorage.getItem("role") === userRoles.PATIENT && <Route
                            exact
                            path='/patient/info'
                            render={() => <PatientAccountInfo />}
                        />}

                        {localStorage.getItem("role") === userRoles.PATIENT && <Route
                            exact
                            path='/patient/medication-plans'
                            render={() => <PatientMedPlans />}
                        />}

                        {localStorage.getItem("role") === userRoles.DOCTOR && <Route
                            exact
                            path='/doctor'
                            render={() => <HomeDoctor />}
                        />}

                        {localStorage.getItem("role") === userRoles.DOCTOR && <Route
                            exact
                            path='/doctor/patients'
                            render={() => <Patients />}
                        />}

                        {localStorage.getItem("role") === userRoles.DOCTOR && <Route
                            exact
                            path='/doctor/caregivers'
                            render={() => <Caregivers />}
                        />}

                        {localStorage.getItem("role") === userRoles.DOCTOR && <Route
                            exact
                            path='/doctor/medication'
                            render={() => <Medication />}
                        />}

                        {localStorage.getItem("role") === userRoles.DOCTOR && <Route
                            exact
                            path='/doctor/medication-plan'
                            render={() => <MedicationPlan />}
                        />} */}

                        <Route exact={true} component={ErrorPage} path="/error" />
                        {/* <Route exact={true} component={AnnouncementPage} path="/ann" /> */}
                    </Switch>
                </Router>
            </div >
        )
    };
}

export default App
