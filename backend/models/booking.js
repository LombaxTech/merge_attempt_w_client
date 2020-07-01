const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    tutor: {
        tutorName: String,
        tutorId: String
    },
    student: {
        studentName: String,
        studentId: String
    },
    subject: String,
    time: Date
    // TODO: add notes and # of students fields
})

const bookingModel = mongoose.model('Booking', bookingSchema);

module.exports = bookingModel;