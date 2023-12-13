import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import API_BASE_URL from '../../config';
import { useNavigate, useParams } from 'react-router-dom';
import { token, userData } from '../Auth/Token';

const BlogPostForm = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const isEditing = !!id
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: null,
        category: '',
        tags: [],
        author: userData.id,
    })
    const [categories, setCategories]= useState([])
    const [tags, setTags]= useState([])
    const [error, setError] = useState('')
    const [authorDetails,setAuthorDetails] = useState({})

    useEffect(() => {
        if(isEditing){
            axios.get(`${API_BASE_URL}/api/posts/${id}`, {headers: {Authorization: `Token ${token}`, 'Content-Type': 'application/json',}})
            .then(response => {
                setFormData(response.data)
            })
            .catch(error => {
                setError(`Error fetching blog post: ${error}`)
                console.error(`Error fetching blog post: ${error}`);
            })
        }

        //Fetch Category List
        axios.get(`${API_BASE_URL}/api/categories`, {headers: {Authorization: `Token ${token}`, 'Content-Type': 'application/json',}})
        .then(response => {
            setCategories(response.data)
        })
        .catch(error => {
            setError(`Error fetching categories: ${error}`)
            console.error(`Error fetching categories: ${error}`);
        })

        //Fetch Tags
        axios.get(`${API_BASE_URL}/api/tags`, {headers: {Authorization: `Token ${token}`, 'Content-Type': 'application/json',}})
        .then(response => {
            setTags(response.data)
        })
        .catch(error => {
            setError(`Error fetching tags: ${error}`)
            console.error(`Error fetching tags: ${error}`);
        })

        //Fetch Author Details
        axios.get(`${API_BASE_URL}/api/users/${formData.author}`, {headers: {Authorization: `Token ${token}`, 'Content-Type': 'application/json',}})
        .then(response => {
            const fetchedAuthorDetails = response.data;
            setAuthorDetails(fetchedAuthorDetails)
        })
        .catch(error => {
            console.error(`Error fetching author data: ${error}`);
        });
        
    }, [id, isEditing]);
    
    const handleChange = (e) => {
        const { name, value, type } = e.target
        if(type === 'checkbox'){
            const selectedTags = formData.tags.includes(value) ? formData.tags.filter(tag => tag !== value)
                                                               : [...formData.tags, value]
            setFormData({
                ...formData,
                [name]: selectedTags,
            })
        }else{
            setFormData({
                ...formData,
                [name]: value,
            })
        }        
    }

    const handleImageChange = (e) => {
        const image = e.target.files[0]
        setFormData({
            ...formData,
            image: image,
        })
    }

    const handleContentChange = (newContent) => {
        setFormData({
            ...formData,
            content: newContent,
        })
    }

    const handleSubmission = (e) => {
        e.preventDefault();
        const postData = new FormData();
        postData.append('title', formData.title)
        postData.append('content', formData.content)
        postData.append('category', formData.category)
        postData.append('image', formData.image)
        postData.append('author', formData.author)
        formData.tags.forEach((tagId) => {
            postData.append('tags', tagId);
        })
        
        if(id){
            //Update blog post
            axios.put(`${API_BASE_URL}/api/posts/${id}/`, postData, {headers: {Authorization: `Token ${token}`, 'Content-Type': 'multipart/form-data',}})
            .then(response => {
                navigate('/');
            })
            .catch(error => {
                setError(`Error updating blog post: ${error}`)
                console.error(`Error updating blog post: ${error}`);
            })
        }else{ 
            axios.post(`${API_BASE_URL}/api/posts/`, postData, {headers: {Authorization: `Token ${token}`, 'Content-Type': 'multipart/form-data',}})
            .then(response => {
                navigate('/')
            })
            .catch(error => {
                setError(`Error creating blog post: ${error}`)
                console.error(`Error creating blog post: ${error}`);
                console.error('Error response:', error.response)
            })
        }      
    }

    return(
        <div>
            <h1>{isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}</h1>
            {error && <div>{error}</div>}
            <div><em>Author: {authorDetails.username}</em></div>
            <form onSubmit={handleSubmission}>
                <div>
                    <label htmlFor='title'>Title</label>
                    <input type='text' name='title' value={formData.title} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor='category'>Category'</label>
                    <select name='category' value={formData.category} onChange={handleChange}>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                        <label htmlFor='tags'>Tags</label>
                        {tags.map(tag => (
                            <label key={tag.id}>
                                <input type='checkbox' name='tags' value={tag.id} onChange={handleChange} {...formData.tags.includes(tag.id) && 'checked' } />
                                {tag.name}
                            </label>                           
                        ))}                    
                </div>
                <div>
                    <label htmlFor='image'>Blog Image</label>
                    <input type='file' name='image' accept='image/*' onChange={handleImageChange} />
                </div>
                <div>
                    <label htmlFor='content'>Content</label>
                    <ReactQuill value={formData.content} onChange={handleContentChange} placeholder='Write your content here...' />
                </div>
                <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
            </form>
        </div>
    )
}

export default BlogPostForm