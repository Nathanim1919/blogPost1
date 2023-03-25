const express = require('express');
const router = express.Router();

const {
    getUser,
    alluser,
    updateUser,
} = require('../Controllers/userController')


router.get('/', alluser)
router.get('/:id',getUser)
router.put('/:id/update',updateUser)
// router.get('/:userid/posts/:post_id', async (req, res) => {
//     res.send('login page');
// })
// router.get('/:id/friends', async (req, res) => {
//     res.send('all users page');
// })
// router.get('/:userid/friends/:friend_id', async (req, res) => {
//     res.send('all users page');
// })
// router.get('/:id/profile', async (req, res) => {
//     res.send('all users page');
// })
// router.get('/:id/profile/edit', async (req, res) => {
//     res.send('all users page');
// })


module.exports = router;