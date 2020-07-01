import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth/index';

const user = isAuthenticated().user;

const Bookings = () => {

    const [bookings, setBookings] = useState([]);

    async function initBookings() {
        let bookingsData = await fetch(`http://localhost:8000/api/bookings/${user._id}`);
        bookingsData = await bookingsData.json();

        // * CONVERT FROM STRING TO DATE
        bookingsData = bookingsData.bookings.map(booking => ({
            ...booking,
            time: new Date(booking.time)
        }))

        // * SORTING BOOKINGS IN TERMS OF DATE
        bookingsData = bookingsData.slice().sort((a, b) => a.time - b.time);
        setBookings(bookingsData);
        // console.log(bookingsData)
    }

    useEffect(() => {
        initBookings();
    }, [])

    return (
        <div>
            <h1>Bookings</h1>
            <h3>Filter Bookings</h3>
            <ul>
                {bookings.map(booking => (
                    <li key={booking._id}>
                        {booking.time.getDate()}/{booking.time.getMonth()}/{booking.time.getFullYear()}, {booking.time.getHours()}:00 {booking.student.studentName} {booking.subject}
                        <button>Options</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Bookings;