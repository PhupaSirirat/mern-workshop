import { useState, useEffect } from "react";
import NavbarComponent from "./NavBarComponent";
import axios from "axios";
import Swal from 'sweetalert2';
import { authenticate, getUsername } from "../services/authorize";
import { withRouter } from "react-router-dom";

const LoginComponent = (props) => {

    const [state, setState] = useState({
        username: "",
        password: "",
    })
    const { username, password } = state;

    const inputValue = name => event => {
        setState({ ...state, [name]: event.target.value })
    }

    const submitForm = (event) => {
        event.preventDefault();
        // console.table({ username, password });

        axios.post(`${process.env.REACT_APP_API}/login`, { username, password })
            .then((response) => {
                // login success -> authentication -> direct to create blog page
                // console.log(response);
                authenticate(response, () => props.history.push("/create"));
            })
            .catch(error => {
                Swal.fire(
                    'Warning!',
                    `${error.response.data.error}`,
                    'error'
                )
            })
    }

    useEffect(() => {
        getUsername() && props.history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="container p-5">
            <NavbarComponent />
            <h1 className="mb-3 mt-3">ADMIN | Log in</h1>

            {/* Try to see all the state value */}
            {/* {JSON.stringify(state)} */}

            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control"
                        name='username' value={username} onChange={inputValue('username')} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control"
                        name="password" value={password} onChange={inputValue('password')} />
                </div>
                <br />
                <input type="submit" name="submit" value="Login" className="btn btn-primary" />
            </form>
        </div>
    )
}

export default withRouter(LoginComponent);