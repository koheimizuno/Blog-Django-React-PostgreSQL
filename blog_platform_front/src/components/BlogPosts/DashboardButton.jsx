import React from 'react';
import { Link  } from 'react-router-dom';

const DashboadButton = () => {
    return (
        <Link to='/dashboard'>
            <button>Dashboad</button>
        </Link>
    );
}

export default DashboadButton