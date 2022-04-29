import React, {Component} from 'react';
import RegisterService from "../../services/RegisterService";
import { withRouter } from 'react-router-dom';

class RegisterUserComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: '',
            loginError: '',
            email: '',
            emailError: '',
            lastName: '',
            lastNameError: '',
            firstName: '',
            firstNameError: '',
            password: '',
            passwordError: '',
            dbError: ''
        }

        this.changeHandler = this.changeHandler.bind(this)
    }

    changeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        this.setState({[name]: value})
    }

    validate(user) {
        let isFormValid = true

        let latinRe = /^[a-zA-Z0-9_]+$/
        if (user.login.length < 6 || user.login.length > 30 || !latinRe.test(user.login)) {
            isFormValid = false
            this.setState({loginError: "Login should contain only latin from 6 to 30 length"})
        } else
            this.setState({loginError: ""})

        let emailRe = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        if (!emailRe.test(user.email)) {
            isFormValid = false
            this.setState({emailError: "Incorrect Email"})
        } else
            this.setState({emailError: ""})

        if (user.password.length < 8 || user.password.length > 30) {
            isFormValid = false
            this.setState({passwordError: "Password should contain from 8 to 30 symbols"})
        } else
            this.setState({passwordError: ""})

        if (user.lastName.length === 0) {
            isFormValid = false
            this.setState({lastNameError: "Cannot be empty"})
        } else
            this.setState({lastNameError: ""})

        if (user.firstName.length === 0) {
            isFormValid = false
            this.setState({firstNameError: "Cannot be empty"})
        } else
            this.setState({firstNameError: ""})

        return isFormValid
    }

    register = (event) => {
        event.preventDefault();
        let user = {
            login: this.state.login,
            email: this.state.email,
            lastName: this.state.lastName,
            firstName: this.state.firstName,
            password: this.state.password
        }

        let isValid = this.validate(user)

        if (isValid) {
            RegisterService.register(user)
                .then(res => {
                    this.setState({dbError: ""})
                    this.props.history.push('/login')
                })
                // .catch(error => this.setState({dbError: error.response.data}));
        }

    }

    cancel = (event) => {
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Registration</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Login: </label>
                                        <input placeholder="Login" name="login" className="form-control"
                                               value={this.state.login} onChange={this.changeHandler}
                                               required/>
                                        <span style={{color: "red"}}>{this.state.loginError}</span>
                                    </div>
                                    <div className="form-group" style={{marginTop: "10px"}}>
                                        <label> Email: </label>
                                        <input placeholder="Email" name="email" className="form-control"
                                               value={this.state.email}
                                               onChange={this.changeHandler}/>
                                        <span style={{color: "red"}}>{this.state.emailError}</span>
                                    </div>
                                    <div className="form-group" style={{marginTop: "10px"}}>
                                        <label> Last name: </label>
                                        <input placeholder="Last name" name="lastName" className="form-control"
                                               value={this.state.lastName}
                                               onChange={this.changeHandler}/>
                                        <span style={{color: "red"}}>{this.state.lastNameError}</span>
                                    </div>
                                    <div className="form-group" style={{marginTop: "10px"}}>
                                        <label> First name: </label>
                                        <input placeholder="First name" name="firstName" className="form-control"
                                               value={this.state.firstName}
                                               onChange={this.changeHandler}/>
                                        <span style={{color: "red"}}>{this.state.firstNameError}</span>
                                    </div>
                                    <div className="form-group" style={{marginTop: "10px"}}>
                                        <label> Password: </label>
                                        <input placeholder="Password" name="password" className="form-control"
                                               type="password" minLength="3"
                                               value={this.state.password}
                                               onChange={this.changeHandler}/>
                                        <span style={{color: "red"}}>{this.state.passwordError}</span>
                                    </div>
                                    <div>
                                        <button className="btn btn-success" onClick={this.register}>Submit</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)}
                                                style={{margin: "10px"}}>Cancel
                                        </button>
                                        <span style={{color: "red"}}>{this.state.dbError}</span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(RegisterUserComponent);