import axios from "axios";
import { useState, useEffect } from "react";
import NavBarComponent from './NavBarComponent';
import parse from 'html-react-parser';

const SingleComponent = (props) => {

    const [blog, setBlog] = useState('');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
            .then(response => {
                setBlog(response.data)
            })
            .catch(err => alert(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container p-5">
            <NavBarComponent />
            <h1 className="pt-3">{blog.title}</h1>
            {blog &&
                <div>{parse(blog.content)}</div>
            }
            <p className="text-muted">Author: {blog.author}, Release: {new Date(blog.createdAt).toLocaleString()}</p>
        </div>
    );
}

export default SingleComponent;