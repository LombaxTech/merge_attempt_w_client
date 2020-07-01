import React from 'react';
import { Link } from 'react-router-dom'

import { isAuthenticated } from '../auth/index';

let user = isAuthenticated().user;
// console.log(data)

const Home = () => (

    <div>
        <h1>Home</h1>
        {(!user || user.role == 0) && (
            <Link to={`/tutors`}>View Tutors</Link>
        )}
    </div>
)

export default Home