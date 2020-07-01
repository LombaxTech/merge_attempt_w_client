import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes, addDays, subDays } from "date-fns";

import { isAuthenticated } from '../../auth/index';
let user = isAuthenticated().user;

console.log({ user })

const BookingCalendar = ({ tutorId }) => {

    // console.log({ tutorId })

    const [bookings, setBookings] = useState([]);
    const [bookedTimesForDay, setBookedTimesForDay] = useState([]);

    async function initializeBookings() {
        let bookingsData = await fetch(`http://localhost:8000/api/bookings/${tutorId}`);
        bookingsData = await bookingsData.json();

        // * CONVERT TIME FROM STRING TO TYPE DATE
        bookingsData = bookingsData.bookings.map(booking => ({
            ...booking,
            time: new Date(booking.time)
        }))

        // * GET ONLY PRESENT BOOKINGS 
        console.log({ allBookings: bookingsData });
        bookingsData = bookingsData.filter(booking => booking.time >= new Date())
        console.log({ bookingsData })
        setBookings(bookingsData);
    }


    useEffect(() => {
        initializeBookings();
    }, [])

    // * returns the bookings as an array for a given date 
    let getBookings = date => {
        return bookings.filter(booking => (
            booking.time.getDate() === date.getDate() &&
            booking.time.getMonth() === date.getMonth() &&
            booking.time.getFullYear() === date.getFullYear()
        ))
    }

    // * uses getBookings to set values for the bookedTimes of the day 
    const updateBookedTimes = date => {
        let bookingsForDay = getBookings(date);
        console.log(bookingsForDay)
        setBookedTimesForDay(bookingsForDay.map(booking => booking.time))
    }

    const [selectedDate, setSelectedDate] = useState(new Date());

    const createBooking = async () => {
        if (!user) return console.error('You need to be signed in to make a booking')
        if (user.role === 1) console.error('Only students can make bookings');
        // TODO: make sure selected time is not a bad time
        // TODO: create booking
    }

    return (
        <div>
            <DatePicker
                timeIntervals={60}
                selected={selectedDate}
                onChange={date => {
                    setSelectedDate(date);
                    updateBookedTimes(date);
                }}
                showTimeSelect
                minDate={subDays(new Date(), 0)}
                maxDate={addDays(new Date(), 13)}
                excludeDates={[new Date()]}
                excludeTimes={bookedTimesForDay}
                dateFormat="MMMM d, yyyy h:mm aa"
            />
            <button onClick={createBooking}>
                Book Lesson
            </button>
        </div>
    );

}

export default BookingCalendar;

    // const bookLesson = async () => {
    //     try {
    //         let response = await fetch('http://localhost:8000/api/booking/Thomas/SalKhan', {
    //             method: "POST",
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 subject: 'Solid State Chemistry',
    //                 time: selectedDate
    //             })
    //         });
    //         response = await response.json();
    //         console.log(response);
    //     } catch (err) {
    //         console.log(`error is: ${err}`);
    //     }
    // }