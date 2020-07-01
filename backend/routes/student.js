const express = require('express');
const router = express.Router();

const { getTutors, getOneTutor, getOwnProfile } = require('../controllers/student');
const User = require('../models/user');

// * VIEW ALL TUTORS
router.get('/tutors/profiles', getTutors)

// * VIEW A TUTORS PAGE
router.get('/tutors/profile/:tutorId', getOneTutor)

// * VIEW OWN PROFILE
router.get('/student/profile/:studentId', getOwnProfile)

module.exports = router;