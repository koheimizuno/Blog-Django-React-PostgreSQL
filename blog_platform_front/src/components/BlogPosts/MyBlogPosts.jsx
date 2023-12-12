import { useState, useEffect } from "react"
import axios from "axios"
import API_BASE_URL from "../../config"
import { token } from "../Auth/Token"
import DOMPurify from 'dompurify';

const MyBlogPost = () => {
    const [blogposts, setBlogPost] = useState([]);
    
    useEffect(() => {
        if(token){
            axios.get(`${API_BASE_URL}/api/my_posts`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            .then(response => {
                console.log(response.data)
                setBlogPost(response.data)
            })
            .catch(error => {
                console.log(`Error fetching user-specific blog posts: ${error}`)
                alert(`Error fetching user-specific blog posts: ${error}`)
            })
        }
    },[]);

    const getPostReadMore = (content) => {
        const words = content.split(' ');
        if (words.length > 50){
            return words.slice(0, 50).join(' ') + '...';
        }else{
            return words.join(' ');
        }
    }

    return(
        <div>
            <h1>My Blog Posts</h1>
            <ul>
                {blogposts.map(post => (
                    <li key={post.id}>
                        <h2><a href={`/posts/${post.id}`} target="_blank" rel="noopener noreferrer">{post.title}</a></h2>
                        <p><em>{post.author.username}</em></p>
                        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(getPostReadMore(post.content)) }} />
                        <a href={`/posts/${post.id}`} target="_blank" rel="noopener noreferrer">Read More</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MyBlogPost