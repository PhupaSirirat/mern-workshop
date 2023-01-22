import NavbarComponent from "./components/NavBarComponent";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import parse from 'html-react-parser';
import { getUsername, getToken } from './services/authorize';

function App() {

  const [blogs, setBlogs] = useState([]);

  const fetchData = () => {
    axios.get(`${process.env.REACT_APP_API}/blogs`)
      // if fetching successfully
      .then(response => {
        setBlogs(response.data);
      })
      // if fetching failed
      .catch(err => alert(err));
  }

  // useEffect run after every render
  useEffect(() => {
    fetchData();
  }, [])

  const confirmDelete = (slug, title) => {
    Swal.fire({
      title: "Comfirm to delete?",
      text: `You want to delete '${title}' blog?`,
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // then send request to delete/remove this blog
        deleteBlog(slug);
      }
    })
  }

  const deleteBlog = (slug) => {
    // send request to api to delete blog
    axios.delete(`${process.env.REACT_APP_API}/blog/${slug}`,
      {
        headers: {
          authorization: `Bearer ${getToken()}`
        }
      }
    )
      .then(response => {
        Swal.fire(
          'Deleted!',
          response.data.message,
          'success'
        )

        // then update client UI
        fetchData();
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="container p-5">
      <NavbarComponent />
      {/* get every blog in map */}
      {blogs.map((blog, index) => (
        <div className="row" key={index} style={{ borderBottom: '1px solid silver' }}>
          <div className="col pt-3 pb-2">
            <Link to={`/blog/${blog.slug}`}>
              <h2>{blog.title}</h2>
            </Link>
            <div>{parse(blog.content)}</div>
            <p className="text-muted">Author: {blog.author}, Release: {new Date(blog.createdAt).toLocaleString()}</p>
            {getUsername() && (
              <div>
                <Link to={`/blog/edit/${blog.slug}`} className="btn btn-outline-dark me-2">Edit</Link>
                <button className="btn btn-outline-danger" onClick={() => { confirmDelete(blog.slug, blog.title) }}>Remove</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
