import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/index';

import { Grid } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


import { fade, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

const user = isAuthenticated().user;
console.log({ user });

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },

    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    }
}));



const Navbar = () => {

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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

    const signin = () => {
        console.log('clicked');
        window.location.href = "/signin";
    }

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>RK Tutors</Typography>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show 4 new mails" color="inherit">
                            <Typography>Home</Typography>
                        </IconButton>
                        <IconButton aria-label="show 4 new mails" color="inherit">
                            <Typography>Tutors</Typography>
                        </IconButton>
                        {user && (
                            <div>
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-haspopup="true"
                                    color="inherit"
                                    aria-controls="simple-menu"
                                    onClick={handleClick}
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                    <MenuItem onClick={signout}>Logout</MenuItem>
                                </Menu>
                            </div>
                        )}
                        {!user && (
                            <IconButton aria-label="show 4 new mails" color="inherit">
                                <Typography onclick={signin}>Sign In</Typography>
                            </IconButton>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}



export default Navbar;


// const ProfileLogo = () => {

//     const [menuState, setMenuState] = useState(false);

//     const toggleMenu = () => {
//         setMenuState(!menuState);
//     }

//     const signout = async () => {
//         try {
//             let result = await fetch('http://localhost:8000/api/signout');
//             result = await result.json();
//             localStorage.removeItem('jwt');
//             window.location.href = "/";
//         } catch (error) {
//             console.log({ error })
//         }
//     }

//     return (
//         <div>
//             <h2 onClick={toggleMenu}>
//                 {user.name}
//                 <img src={user.avatar_image} alt="avatar" />
//             </h2>
//             <ul
//                 style={{
//                     display: menuState ? 'block' : 'none'
//                 }}
//             >
//                 <li><Link to="/profile">Profile</Link></li>
//                 <li onClick={signout}>Sign out</li>
//             </ul>
//         </div>
//     )
// }


{/* <nav>
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
    </nav> */}
