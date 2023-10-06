import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from '../config';
import { useParams } from "react-router-dom";

const BlogPostFull = () =>{
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/postlist/${id}/`)
        .then((response) => {
            setPost(response.data);
        })
        .catch((error) => {
            alert(`Error fetching blog post:
            ${error}`);
        })
    },[]);

    return(
        <div className="article-div">
            <h2>Test</h2>
            <h1>{post && post.title}</h1>
            <div className="article-content">
                {post && post.content}
            </div>
            <a href='/'>Back To Article List</a>
        </div>
    )


}

export default BlogPostFull;