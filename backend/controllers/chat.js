const User = require('../models/user');

exports.sendMessage = async (req, res) => {
    const { sender, message } = req.body;
    const { studentId, tutorId } = req.params;

    try {
        let student = await User.findOne({ _id: studentId, role: 0 });
        if (!student) return res.status(400).json({ error: 'Student not found' });

        let tutor = await User.findOne({ _id: tutorId, role: 1 });
        if (!tutor) return res.status(400).json({ error: 'tutor not found' });

        let studentInbox = student.inbox;
        let tutorInbox = tutor.inbox;

        let studentChat = studentInbox.filter(chat => chat.partnerId === tutorId);

        // * IF CHAT DOESNT EXIST, CREATE ONE
        if (studentChat.length === 0) {
            studentInbox.push({
                partnerName: tutor.name,
                partnerId: tutorId
            });
            tutorInbox.push({
                partnerName: student.name,
                partnerId: studentId
            });
        }

        let tutorChat = tutorInbox.filter(chat => chat.partnerId === studentId)[0];
        studentChat = studentInbox.filter(chat => chat.partnerId === tutorId)[0];

        tutorChat.messages.push({
            message,
            name: sender.name
        })
        studentChat.messages.push({
            message,
            name: sender.name
        })

        // * SAVE TO DB
        try {
            let resultStudent = await student.save();
            let resultTutor = await tutor.save();
            res.json({
                success: true,
                resultStudent,
                resultTutor
            })
        } catch (error) {
            res.json({ error })
        }


    } catch (error) {
        return res.status(400).json({ error })
    }
}

exports.getInbox = async (req, res) => {

    const { userId } = req.params;

    try {
        let user = await User.findById(userId);
        if (!user) return res.status(400).json({ error: 'no user found' });

        res.json(user.inbox);
    } catch (error) {
        return res.json({ error })
    }
}

exports.getChat = async (req, res) => {

    let { senderId, studentId, tutorId } = req.params;

    try {
        let user = await User.findOne({ _id: senderId });
        if (!user) return res.status(400).json({ error: 'no user found' });

        let chat = user.inbox.filter(chat => chat.partnerId === studentId || chat.partnerId === tutorId)[0]
        return res.json(chat);
    } catch (error) {
        return res.json({ error })
    }

}