import React, { useState } from "react";
import BlogPostForm from "../components/BlogPosts/BlogPostForm";
import {token} from "../components/Auth/Token";
import LogOut from "../components/Auth/LogOut";

const DashBoard = () => {
    const [displayComponent, setDisplayComponent] = useState('create_post')
    return(
        <>
            {token && <LogOut /> }
            <div className="dashboard_div">
                <div className="dashboard_menu">
                    <ul>
                        <li><button onClick={() => setDisplayComponent('create_post')}>Create New Post</button></li>
                        <li><button onClick={() => setDisplayComponent('my_posts')}>My Posts</button></li>
                        <li><button onClick={() => setDisplayComponent('category_list')}>Categories</button></li>
                        <li><button onClick={() => setDisplayComponent('account_details')}>My Account</button></li>
                    </ul>
                </div>
                <div>
                    {displayComponent === 'create_post' && <BlogPostForm />}
                </div>

            </div>
        </>

    )
}

export default DashBoard;