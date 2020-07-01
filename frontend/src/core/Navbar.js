import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/index';

const user = isAuthenticated().user;

const ProfileLogo = () => {

    const [menuState, setMenuState] = useState(false);

    const toggleMenu = () => {
        setMenuState(!menuState);
    }

    const signout = async () => {
        try {
            let result = await fetch('http://localhost:8000/api/signout');
            result = await result.json();
            localStorage.removeItem('jwt');
            window.location.href = "/";
        } catch (error) {
            console.log({ error })
        }
    }

    return (
        <div>
            <h2 onClick={toggleMenu}>
                {user.name}
                <img src={user.avatar_image} alt="avatar" />
            </h2>
            <ul
                style={{
                    display: menuState ? 'block' : 'none'
                }}
            >
                <li><Link to="/profile">Profile</Link></li>
                <li onClick={signout}>Sign out</li>
            </ul>
        </div>
    )
}

const Navbar = () => (
    <nav>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>

            {(!user || user.role == 0) && (
                <li>
                    <Link to="/tutors">Tutors</Link>
                </li>
            )}

            {!user && (
                <li>
                    <Link to="/signin">Sign in</Link>
                </li>
            )}

            {user && (
                <li>
                    <Link to="/bookings">Bookings</Link>
                </li>
            )}

            {user && (
                <li>
                    <Link to="/inbox">Inbox</Link>
                </li>
            )}

            {user && (
                <li>
                    <ProfileLogo />
                </li>
            )}
        </ul>
    </nav>
)

export default Navbar;