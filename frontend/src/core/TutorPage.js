import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookingCalendar from './TutorPageComponents/BookingCalendar';

import { isAuthenticated } from '../auth/index'
let data = isAuthenticated();

const TutorPage = ({ match }) => {

    const [loading, setLoading] = useState(true);
    const [tutor, setTutor] = useState({});

    async function init() {
        let tutorData = await fetch(`http://localhost:8000/api/tutors/profile/${match.params.tutorId}`)
        tutorData = await tutorData.json();
        setTutor(tutorData);
        setLoading(false);
    }

    useEffect(() => {
        init();
    }, [])

    const sendMessage = () => {
        if (!data) return console.log('You must be signed in');
        if (data.user.role === 1) return console.log('Not allowed');
        if (data.user.role === 0) window.location.href = `/messages/${data.user._id}/${tutor._id}`;
    }

    return (
        <div>
            {loading && <h1>Loading...</h1>}
            {!loading && (
                <div>
                    <h1>{tutor.name}'s Page</h1>
                    <h3>Profile Picture</h3>
                    <h3>Subjects</h3>
                    <h2>About me</h2>
                    <button onClick={sendMessage}>
                        <h3>Message {tutor.name}</h3>
                    </button>
                    <h2>Calendar</h2>
                    <BookingCalendar tutorId={tutor._id} />
                </div>
            )}
        </div>
    )

}

export default TutorPage;