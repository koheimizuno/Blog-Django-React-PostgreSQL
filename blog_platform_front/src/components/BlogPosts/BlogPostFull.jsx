import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from '../../config';
import { useParams, useNavigate } from "react-router-dom";
import {token} from "../Auth/Token";

const BlogPostFull = () =>{
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

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
    
    const handleEditClick = (postId) =>{
        navigate(`/dashboard/?id=${postId}`)
    }

    return(
        
        <div className="article-div">
            <h1>{post && post.title}</h1>
            <p><em>{post && post.author.username}</em></p>
            {token && <button onClick={() => handleEditClick(post && post.id)}>Edit Post</button> }
            {post && post.image && 
                <div className="post_image">
                    {post && <img src={`${post.image}`} alt={post.title} /> }
                </div>
            }            
            <div className="article-content">
                {post &&  <p dangerouslySetInnerHTML={{ __html: post.content }} />}
            </div>
            <a href='/'>Back To Article List</a>
        </div>
    )


}

export default BlogPostFull;