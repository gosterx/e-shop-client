import React, {Component} from 'react';
import Cookies from 'js-cookie';
import RegisterUserComponent from "./RegisterUserComponent";
import LoginService from "../../services/LoginService";

class MainComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: ""
        }
    }

    tes = (event) => {
        let x = LoginService.test().then(res => this.setState({token : res.data}))
    }

    render() {
        return (
            <div>
            </div>
        )
    }
}

export default MainComponent;