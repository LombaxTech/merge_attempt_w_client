const User = require('../models/user');
const Booking = require('../models/booking');

exports.createBooking = async (req, res) => {

    let { tutorName, tutorId, studentName, studentId, subject, time } = req.body;

    let bookingDetails = {
        tutor: {
            tutorName,
            tutorId
        },
        student: {
            studentName,
            studentId
        },
        subject,
        time: new Date(time.year, time.month, time.day, time.hour)
    }

    let booking = new Booking(bookingDetails);

    try {
        booking = await booking.save();
        return res.json({ success: true, booking });
    } catch (error) {
        return res.status(400).json({ error })
    }

}

exports.getBookings = async (req, res) => {
    const { userId } = req.params;

    try {
        let bookings = await Booking.find({
            $or: [{ 'tutor.tutorId': userId }, { 'student.studentId': userId }]
        });
        if (!bookings) return res.status(400).json({ error: 'no bookings found' });
        return res.json({ bookings });
    } catch (error) {
        return res.status(400).json({ error })
    }

}