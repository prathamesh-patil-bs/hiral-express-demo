const { Router } = require('express');
const UserController = require('../controllers/user.controller');

const userRouter = Router();

userRouter.get('/', UserController.getAllUsers);
userRouter.get('/:userId', UserController.getUserById);
userRouter.post('/', UserController.createUser);
userRouter.put('/:userId', UserController.updateUser);
userRouter.delete('/:userId', UserController.deleteUser);

module.exports = userRouter;
