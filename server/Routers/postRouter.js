const express = require('express');
const router = express.Router();

const {
    addPost,
    allpost,
    addComment,
    updateLikes,
} = require('../Controllers/userController')

router.get('/', allpost);
router.post('/comment', addComment);
router.post('/:id/new', addPost);
router.put('/:id/liked', updateLikes);
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