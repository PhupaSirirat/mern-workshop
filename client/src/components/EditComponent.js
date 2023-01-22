import { useEffect, useState } from "react";
import NavbarComponent from "./NavBarComponent";
import axios from "axios";
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getToken } from '.././services/authorize';

const EditComponent = (props) => {

    const [state, setState] = useState({
        title: "",
        author: "",
        slug: ""
    })
    const { title, author, slug } = state;

    const [content, setContent] = useState('');
    const submitContent = event => {
        setContent(event);
    }

    // assign state value
    const inputValue = name => event => {
        // console.log(name, "=", event.target.value);
        setState({ ...state, [name]: event.target.value });
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
            .then(response => {
                // console.log(response.data);
                const { title, content, author, slug } = response.data;
                setState({ ...state, title, author, slug });
                setContent(content);
            })
            .catch(err => alert(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const submitForm = (event) => {

        // prevent data in form (if not -> clear form)
        event.preventDefault();

        // log API URL
        console.log(`API URL: ${process.env.REACT_APP_API}/blog/edit/${slug}`);

        // log table in the console
        // console.table({ title, content, author });

        // connect with api/create
        // (.post) means to input data to database
        // axios.post(`${API LINK}`, Object to send)
        axios.put(`${process.env.REACT_APP_API}/blog/edit/${slug}`,
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
                    'Blog updated',
                    'success'
                )
                const { title, content, author, slug } = response.data;

                // after that -> set blank the state (clearing the form)
                setState({ ...state, title, author, slug });
                setContent(content);
            })
            .catch(err => {
                // data.error from server-controllers-blogController
                // alert(err.response.data.error);
                Swal.fire(
                    'Error!',
                    `${err.response.data.error}`,
                    'warning'
                )
            })
    }

    // use () instead of {} to return component
    const showUpdateForm = () => (
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
            <input type="submit" name="submit" value="Update" className="btn btn-primary" />
        </form>
    )

    return (
        <div className="container p-5">
            <NavbarComponent />
            <h1 className="mb-3 mt-3" >EDIT BLOG</h1>
            {showUpdateForm()}
        </div>
    )
}

export default EditComponent;