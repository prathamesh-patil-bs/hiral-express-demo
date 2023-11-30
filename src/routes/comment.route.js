const { Router } = require('express');
const commentController = require('../controllers/comment.controller')

const commentRouter = Router({ mergeParams:true });

commentRouter.get('/', commentController.getAllCommnets)
commentRouter.get('/:commentId', commentController.getCommentById)
commentRouter.post('/', commentController.createComment)
commentRouter.put('/:commentId', commentController.updateComment)
commentRouter.delete('/:commentId', commentController.deleteComment)


module.exports = commentRouter;
