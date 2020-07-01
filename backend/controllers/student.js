const User = require('../models/user');

exports.getTutors = async (req, res) => {
    try {
        let profiles = await User.find({ role: 1 });
        res.json(profiles);
    } catch (error) {
        return res.json({ error })
    }
}

exports.getOneTutor = async (req, res) => {
    const { tutorId } = req.params;
    try {
        let tutor = await User.findOne({ _id: tutorId, role: 1 })
        if (!tutor) return res.status(400).json({ error: "tutor doesnt exist" })
        res.json(tutor);
    } catch (error) {
        res.json({ error })
    }
}

exports.getOwnProfile = async (req, res) => {
    const { studentId } = req.params;
    try {
        let student = await User.findOne({ _id: studentId, role: 0 })
        if (!student) return res.status(400).json({ error: "student profile doesnt exist" })
        res.json(student);
    } catch (error) {
        res.json({ error })
    }
}