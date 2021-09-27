import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:9001/api/users"

class Service {

    getEmployees(){
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

}

export default new Service()