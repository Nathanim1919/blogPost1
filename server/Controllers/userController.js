const {
    User
} = require('../Models/user');
const {
    Post
} = require('../Models/post')

module.exports.addPost = async (req, res) => {
    try {
        const {
            title,
            description,
            Image
        } = req.body;
        const {
            id
        } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send({
                error: 'User not found'
            });
        }

        const post = await Post.create({
            title,
            body: description,
            photo: Image,
            createdBy: user._id,
        });

        await post.save();

        user.blogPosts.push(post._id);
        await user.save();

        res.status(201).json({
            post
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            error: 'Error creating post'
        });
    }
};


module.exports.updateUsers = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            following,
            followers
        } = req.body;

        const user = await User.findById(id);
        const userToFollow = await User.findById(following);

        if (user && userToFollow) {
            const isAlreadyFollowing = user.following.includes(following);
            const isNotCurrentUser = following !== user._id.toString();

            if (!isAlreadyFollowing && isNotCurrentUser) {
                user.following.push(following);
                userToFollow.followers.push(id);
            } else if (isAlreadyFollowing && isNotCurrentUser) {
                user.following = user.following.filter(
                    (followedUser) => followedUser.toString() !== following
                );
                userToFollow.followers = userToFollow.followers.filter(
                    (followedUser) => followedUser.toString() !== id
                );
            }

            await user.save();
            await userToFollow.save();

            res.status(200).json({
                message: 'Users updated successfully'
            });
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
};



module.exports.alluser = async (req, res) => {
    try {
        const users = await User.find();
        // console.log(posts)
         res.status(200).json(users); // Return the user object as JSON
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Server error'
        }); // Return 500 error if there's a server error
    }
};
module.exports.allpost = async (req, res) => {
    try {
        const posts = await Post.find().populate('createdBy');
        // console.log(posts)
         res.status(200).json(posts); // Return the user object as JSON
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Server error'
        }); // Return 500 error if there's a server error
    }
};
module.exports.getUser = async (req, res) => {
    try {
        const {id} = req.params; // Extract user ID from the request URL
        const user = await User.findById(id)
                    .populate('blogPosts')
                    .populate('followers')
                    .populate('following'); // Find the user by ID using Mongoose or any other ORM
        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            }); // Return 404 error if user not found
        }
        return res.status(200).json(user); // Return the user object as JSON
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Server error'
        }); // Return 500 error if there's a server error
    }
};