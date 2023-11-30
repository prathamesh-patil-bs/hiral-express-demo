const { Router } = require('express');
const userRouter = require('./user.route');
const postRouter = require('./post.route');
const commentRouter = require('./comment.route');

const indexRouter = Router();

indexRouter.use('/users', userRouter);
indexRouter.use('/users/:userId/posts', postRouter);
indexRouter.use('/users/:userId/posts/:postId/comments', commentRouter);

module.exports = indexRouter;
