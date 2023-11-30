const { Router } = require('express');
const PostController = require('../controllers/post.controller')

const postRouter = Router({ mergeParams: true });

postRouter.get('/', PostController.getAllPosts);
postRouter.get('/:postId', PostController.getPostById);
postRouter.post('/', PostController.createPost);
postRouter.put('/:postId', PostController.updatePost);
postRouter.delete('/:postId', PostController.deletePost);

module.exports = postRouter;
