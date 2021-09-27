import React, {Component} from 'react';
import Service from "../services/Service";

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
    }

    componentDidMount() {
        Service.getEmployees().then(response => {
           this.setState({ employees: response.data })
        });
    }

    addEmployee(){
        this.props.history.push('/add-employee');
    }

    render() {
        return (
            <div>
                <h2 className="text-center"> Employees List </h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addEmployee}> Add Employee</button>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">

                        <thead>
                            <tr>
                                <th> Employee Name</th>
                                <th> Employee Email</th>
                                <th> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.employees.map(
                                employee =>
                                    <tr key = {employee.id}>
                                        <td>{employee.name}</td>
                                        <td>{employee.email}</td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>

                </div>
            </div>
        );
    }
}

export default ListEmployeeComponent;