const express = require("express");
const uuid = require("uuid").v4;
const createError = require("http-errors");
const { getPostsdata, savePostData } = require("../utils/post.utils");

exports.getAllPosts = async (req, res, next) => {
  const posts = await getPostsdata();
  const { userId } = req.params;
  const userPosts = posts.filter((post) => post.userId === userId);
  return res.json(userPosts);
};

/**
 * @function getUserById
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */

exports.getPostById = async (req, res, next) => {
  try {
    const { userId, postId } = req.params;
    const posts = await getPostsdata();

    const userPosts = posts.filter(
      (post) => post.userId === userId && post.id === postId
    );

    if (!userPosts) throw createError(404, "User does not exists");

    return res.json(userPosts);
  } catch (e) {
    next(e);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const payload = req.body;
    const { userId } = req.params;
    let posts = await getPostsdata();
    const post = {
      id: uuid(),
      userId,
      ...payload,
    };

    posts.push(post);

    await savePostData(posts);
    return res.status(201).json(post);
  } catch (e) {
    next(e);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    let posts = await getPostsdata();
    const { userId, postId } = req.params;
    const payload = req.body;

    const postToUpdate = posts.filter(
      (post) => post.userId === userId && post.id === postId
    );

    if (!postToUpdate) {
      throw createError(404, "post does not exist");
    }
    const updatePost = {
      ...postToUpdate,
      ...payload,
    };
    const updatedPost = postToUpdate.map((post) =>
      post.id === postId ? updatePost : post
    );
    await savePostData(updatedPost);
    res.json(updatedPost);
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const users = await getPostsdata();
    const { userId, postId } = req.params;

    const postToDelete = users.indexOf(
      (post) => post.userId == userId && post.id !== postId
    );

    if (!postToDelete) {
      throw createError(404, "user does not exist");
    }
    const updatedPost = postToDelete.filter((post) => post.id !== postId);

    await savePostData(updatedPost);
    res.json(updatedPost);
  } catch (err) {
    next(err);
  }
};
