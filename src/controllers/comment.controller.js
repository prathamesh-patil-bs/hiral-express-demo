const createError = require("http-errors");
const uuid = require("uuid").v4;
const { getAllComments, saveCommentData } = require("../utils/comment.util");

exports.getAllCommnets = async (req, res, next) => {
  try {
    const comments = await getAllComments();
    const { userId, postId } = req.params;
    const filteredComments = comments.filter(
      (comment) => comment.userId === userId && comment.postId === postId
    );
    return res.json(filteredComments);
  } catch (err) {
    next(err);
  }
};

exports.getCommentById = async (req, res, next) => {
  try {
    const comments = await getAllComments();
    const { userId, postId, commentId } = req.params;
    const userComments = comments.find(
      (comment) =>
        comment.userId === userId &&
        comment.postId === postId &&
        comment.id === commentId
    );
    if (!userComments) throw createError(404, "comment does not exists");
    return res.json(userComments);
  } catch (err) {
    next(e);
  }
};

exports.createComment = async (req, res, next) => {
  try {
    const comments = await getAllComments();
    const payload = req.body;
    const { userId, postId } = req.params;

    const comment = {
      id: uuid(),
      userId,
      postId,
      ...payload,
    };
    comments.push(comment);
    await saveCommentData(comments);
    return res.json(comments);
  } catch (err) {
    next(err);
  }
};

exports.updateComment = async (req, res, next) => {
  try {
    const comments = await getAllComments();
    const { userId, postId, commentId } = req.params;
    const payload = req.body;
    console.log({ userId, postId, commentId });
    const commentToUpdate = comments.find(
      (comment) =>
        comment.userId === userId &&
        comment.postId === postId &&
        comment.id === commentId
    );

    if (!commentToUpdate) throw createError(404, "comment does not exists");

    const updateComment = {
      ...commentToUpdate,
      ...payload,
    };
    const updatedComment = comments.map((comment) =>
      comment.id === commentId ? updateComment : comment
    );
    return res.json(updatedComment);
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const comments = await getAllComments();
    const { userId, postId, commentId } = req.params;
    const commentToDelete = comments.find(
      (comment) =>
        comment.userId === userId &&
        comment.postId === postId &&
        comment.id === commentId
    );

    if (!commentToDelete) throw createError(404, "comment does not exist");

    const filteredComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    await saveCommentData(filteredComments);
    return res.json(filteredComments);
  } catch (err) {
    next(err);
  }
};
