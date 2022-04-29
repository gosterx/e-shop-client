import {Component} from "react";
import LoginService from "../../services/LoginService";
import {withRouter} from "react-router-dom";

class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: '',
            loginError: '',
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

    validate(authInfo) {
        let isFormValid = true
        let latinRe = /^[a-zA-Z0-9_]+$/
        if (authInfo.login.length < 6 || authInfo.login.length > 30 || !latinRe.test(authInfo.login)) {
            isFormValid = false
            this.setState({loginError: "Login should contain only latin from 6 to 30 length"})
        } else
            this.setState({loginError: ""})
        if (authInfo.password.length < 8 || authInfo.password.length > 30) {
            isFormValid = false
            this.setState({passwordError: "Password should contain from 8 to 30 symbols"})
        } else
            this.setState({passwordError: ""})
        return isFormValid
    }

    login = (event) => {
        event.preventDefault();
        let userAuthInfo = {
            login: this.state.login,
            password: this.state.password
        }

        let isValid = this.validate(userAuthInfo)

        if (isValid) {
            LoginService.login(userAuthInfo)
                .then(res => {
                    console.log(res.headers)
                this.props.history.push('/')})
                .catch(error => this.setState({dbError: error.response.data}));
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
                            <h3 className="text-center">Login</h3>
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
                                        <label> Password: </label>
                                        <input placeholder="Password" name="password" className="form-control"
                                               type="password" minLength="3"
                                               value={this.state.password}
                                               onChange={this.changeHandler}/>
                                        <span style={{color: "red"}}>{this.state.passwordError}</span>
                                    </div>
                                    <div>
                                        <button className="btn btn-success" onClick={this.login.bind(this)}>Submit</button>
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

export default withRouter(LoginComponent);