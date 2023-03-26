const {
    User
} = require('../Models/user');
const {
    Post
} = require('../Models/post');
const { Comment } = require('../Models/comment');

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


module.exports.updateLikes = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            likes
        } = req.body;

        const updatedPost = await Post.findById(id);
        updatedPost.likes = likes;
       

        await updatedPost.save();

        res.json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating post array");
    }
};

module.exports.updateFollowing = async (req, res) => {
     try {
         const {id} = req.params;
         const {following} = req.body;

         const updatedUser = await User.findByIdAndUpdate(
             id, {
                 following
             }, {
                 new: true
             }
         );

         res.json(updatedUser);
     } catch (error) {
         console.error(error);
         res.status(500).send("Error updating user's following array");
     }
};
module.exports.updateFollowers = async (req, res) => {
      try {
          const {id} = req.params;
          const {followers} = req.body;

          const updatedUser = await User.findByIdAndUpdate(
              id, {
                  followers
              }, {
                  new: true
              }
          );

          res.json(updatedUser);
      } catch (error) {
          console.error(error);
          res.status(500).send("Error updating user's followers array");
      }
};



module.exports.alluser = async (req, res) => {
    try {
        const users = await User.find()
            .populate('blogPosts')
            .populate('followers')
            .populate('following');
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
        const posts = await Post.find()
        .populate('createdBy')
        .populate("likes")
        .populate("comments");
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

module.exports.addComment = async (req, res) => {
    try {
        const {
            commentBody,
            id,
            currentPostId
        } = req.body;

         const post = await Post.findById(currentPostId);

         if (!post) {
             return res.status(404).send({
                 error: 'post not found'
             });
         }

        const comment = await Comment.create({
            body: commentBody,
            post: currentPostId,
            user:id,
        });

        await comment.save();

        post.comments.push(comment._id);
        await post.save();

        res.status(201).json({
            message:"comment added successfully"
        })

    } catch (error) {
        
    }
}