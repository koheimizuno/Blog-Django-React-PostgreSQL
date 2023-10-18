import React from 'react';
import { Link  } from 'react-router-dom';

const LogInButton = () => {
    return (
        <Link to='/login'>
            <button>Login</button>
        </Link>
    );
}

export default LogInButton