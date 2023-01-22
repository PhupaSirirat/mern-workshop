import { useState } from "react";
import NavbarComponent from "./NavBarComponent";
import axios from "axios";
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getUsername, getToken } from "../services/authorize";

const FormComponent = () => {

    const [state, setState] = useState({
        title: "",
        author: getUsername(),
    })
    const { title, author } = state;

    const [content, setContent] = useState('');
    const submitContent = (event) => {
        setContent(event);
    } 

    // assign state value
    const inputValue = name => event => {
        // console.log(name, "=", event.target.value);
        setState({ ...state, [name]: event.target.value });
    }

    const submitForm = (event) => {

        // prevent data in form (if not -> clear form)
        event.preventDefault();

        // log API URL
        console.log(`API URL: ${process.env.REACT_APP_API}/create`);

        // log table in the console
        // console.table({ title, content, author });

        // connect with api/create
        // (.post) means to input data to database
        // axios.post(`${API LINK}`, Object to send)
        axios.post(`${process.env.REACT_APP_API}/create`, 
                { title, content, author }, 
                {
                    headers: { 
                        authorization: `Bearer ${getToken()}`
                    }
                }
            )
            .then(response => {
                // (.then) means if axios send data successfully -> do something below this
                // alert("Data sent successfully");
                Swal.fire(
                    'Success!',
                    'Data sent successfully.',
                    'success'
                )

                // after that -> set blank the state (clearing the form)
                setState({...state, title:"", author:""});
                setContent('');
            })
            .catch(err => {
                // data.error from server-controllers-blogController
                // alert(err.response.data.error);
                Swal.fire(
                    'Warning!',
                    `${err.response.data.error}`,
                    'warning'
                )
            })
    }

    return (
        <div className="container p-5">
            <NavbarComponent />
            <h1 className="mb-3 mt-3">CREATE BLOG</h1>

            {/* Try to see all the state value */}
            {/* {JSON.stringify(state)} */}

            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" name="title" className="form-control"
                        value={title} onChange={inputValue('title')} />
                </div>
                <div className="form-group">
                    <label>Content</label>
                    <ReactQuill
                        value={content}
                        onChange={submitContent}
                        theme='snow'
                        className="pb-3"
                        placeholder="Write your content here"
                    />
                </div>
                <div className="form-group">
                    <label>Author</label>
                    <input type="text" name="author" className="form-control"
                        value={author} onChange={inputValue('author')} />
                </div>
                <br />
                <input type="submit" name="submit" value="Save" className="btn btn-primary" />
            </form>
        </div>
    )
}

export default FormComponent;