import React from 'react';
import * as API_USERS from "../user-data/user/api/user-api";
import userRoles from "../commons/constants/enums";
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

const styleInfoBox = {
    backgroundColor: "#12c2e9",
    width: "500px",
    height: "400px",
    position: "absolute",
    left: "33%",
    top: "20%"
}

const styleOthers = {
    width: "45%",
    marginLeft: "140px"
}

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errorStatus: 0,
            error: null,
            username: '',
            password: '',
            loginPressed: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    renderRedirect = (role) => {

        if (this.state.loginPressed && role == userRoles.DOCTOR) {
            console.log("LOGIN PRESSED, LOGGED " + role)
            window.location.href = '/doctor';
        } else if (this.state.loginPressed && role == userRoles.PATIENT){
            console.log("LOGIN PRESSED, LOGGED " + role)
            window.location.href = '/patient';
        } else if (this.state.loginPressed  && role == userRoles.CAREGIVER){
            console.log("LOGIN PRESSED, LOGGED " + role)
            window.location.href = '/caregiver';
        }
      }

    authenticateUser(user){
        return API_USERS.authenticateUser(user, (result, status, error) => {
            console.log(result);

            if(result !== null && (status === 200 || status ===201)){
                console.log("Successfully authenticated user with access_token: " + result.access_token);

                localStorage.setItem('access_token', result.access_token);
                localStorage.setItem('username', user.username);
                // localStorage.setItem('refresh_token', result.refresh_token);
                // localStorage.setItem('role', result.role);
                console.log("username: " + localStorage.getItem('username'));


            } else {
                this.state.errorStatus = status;
                this.error = error;
            }
        });
    }

    getUser(username){
        let params = {
            email: username
        };

        return API_USERS.getUserByUsername(params, (result, status, error) => {
            console.log(result);

            if(result !== null && (status === 200 || status ===201)){
                console.log("email " + result.email);
                localStorage.setItem('role', result.role);
                console.log("role: " + localStorage.getItem('role'));


            } else {
                this.state.errorStatus = status;
                this.error = error;
            }
        });
    }

    handleLogin(){
        
        console.log(this.state.username);
        console.log(this.state.password);

        this.setState({
            loginPressed: true
          });

        let userSecrets = {
            username: this.state.username,
            password: this.state.password,
            grant_type: "password"
        }

        console.log(userSecrets);
        this.authenticateUser(userSecrets);
        this.getUser(userSecrets.username);
        console.log("ROLE " + localStorage.getItem('role'))
    }

    render() {
        const { username, password, loginPressed } = this.state;
       
        return (
            <div>
            <div style={styleInfoBox} >
                <br/>
                <h2 style={{"textAlign":"center"}}>LOGIN</h2>
                <br/> 
                <form name="form" > 
                    <div style={styleOthers}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                        {loginPressed && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div style={styleOthers}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {loginPressed && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <br/>
                    <div>
                        <button className="btn btn-primary" 
                                style={{"marginLeft":"40%", "width":"20%"}}
                                type = "button"
                                onClick = {this.handleLogin}
                        >
                            Login
                        </button>
                        {this.renderRedirect(localStorage.getItem('role'))}
                    </div>
                </form>
            </div>
            </div>
        );
    }
}

export default LoginPage;