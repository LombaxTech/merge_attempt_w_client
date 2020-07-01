const express = require('express');
const router = express.Router();

const { signup, signin, signout, userById } = require('../controllers/auth');

router.get('/', (req, res) => {
    res.send('student routes')
})

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', signout);

// router.get('/student/:studentId', requireSignin, isAuth, (req, res) => {
//     // console.log(req.auth)
//     res.send(`user found of: ${req.profile}`)
// })

router.param('userId', userById)

module.exports = router;