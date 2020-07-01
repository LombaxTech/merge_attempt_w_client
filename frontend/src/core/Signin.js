import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth/index';

// if (isAuthenticated) {
//     window.location.href = "/";
// }

const Signin = () => {

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const handleEmailChange = event => setEmailValue(event.target.value);
    const handlePasswordChange = event => setPasswordValue(event.target.value);

    const signin = async (e) => {
        try {
            let result = await fetch('http://localhost:8000/api/signin', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailValue,
                    password: passwordValue
                })
            });
            result = await result.json();
            if (!result.error && typeof window !== 'undefined') {
                localStorage.setItem('jwt', JSON.stringify(result));
                window.location.href = "/";
            }
        } catch (error) {
            console.log({ error })
        }

    }

    return (
        <div>
            <h2>Sign in</h2>

            <label>Email: </label>
            <input onChange={handleEmailChange} value={emailValue} type="text" />

            <label>Password: </label>
            <input onChange={handlePasswordChange} value={passwordValue} type="password" />

            <button onClick={signin}>Sign In</button>
        </div>
    )
}

export default Signin;