import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BlogPostFull = () =>{
    const { postId } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/posts/${postId}/`)
        .then((response) => {
            setPost(response.data);
        })
        .catch((error) => {
            alert(`Error fetching blog posts:
            ${error}`);
        })
    });

    return(
        <div className="article-div">
            <h2>Test</h2>
            <h1>{post}</h1>
            <div className="article-content">
                
            </div>
            <a href="http://127.0.0.1:8000/api/postlist">Back To Article List</a>
        </div>
    )


}

export default BlogPostFull;