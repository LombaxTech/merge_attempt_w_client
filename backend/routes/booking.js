const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Booking = require('../models/booking');

const { createBooking, getBookings } = require('../controllers/booking');

// * MAKE A BOOKING
router.post('/booking', createBooking);

// * GET BOOKINGS 
router.get('/bookings/:userId', getBookings)

// * DELETE A BOOKING
router.delete('/booking/:userId', async (req, res) => {
    let { bookingId } = req.body;
    let { userId } = req.params;

    try {
        let user = await User.findOne({ _id: userId });
        if (!user) return res.status(400).json({ error: 'no user found' });

        let booking = user.bookings.id(bookingId);
        if (!booking) return res.json({ error: 'booking does not exist' })

        // return res.json({ bookingTime: booking.time })

        let tutor = await User.findOne({ _id: booking.tutor.tutorId, role: 1 })
        let student = await User.findOne({ _id: booking.student.studentId, role: 0 });

        if (!tutor || !student) return res.status(400).json({ error: 'student or tutor not found' });
        // return res.json({ booking: booking.time });

        let tutorBooking = tutor.bookings.filter(bookingData => (
            bookingData.tutor.tutorId === booking.tutor.tutorId &&
            bookingData.student.studentId === booking.student.studentId &&
            // TODO: find a better way to compare the bloody time
            // TODO: because bookingDate.time === booking.time doesnt fucking work
            new Date(bookingData.time).getFullYear() === new Date(booking.time).getFullYear &&
            new Date(bookingData.time).getMonth() === new Date(booking.time).getMonth &&
            new Date(bookingData.time).getDate() === new Date(booking.time).getDate &&
            new Date(bookingData.time).getHours() === new Date(booking.time).getHours
        ))

        return res.json({})

        return res.json({ tutorBooking })

    } catch (error) {
        return res.status(400).json({ error })
    }
})

module.exports = router;