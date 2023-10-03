import React, { useState, useEffect} from "react";
import axios from "axios";

const BlogPostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/postlist`)
        .then(response => {
            setPosts(response.data);
        })
        .catch(error => {
            alert(`Error fetching blog posts:
            ${error}`);
        })
    }, [])

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
            <h1>Articles</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <a href={`/posts/${post.id}`}>{post.title}</a>
                        <p>{getPostReadMore(post.content)}</p>
                        <a href={`/posts/${post.id}`}>Read More</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default BlogPostList;