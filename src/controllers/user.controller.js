const express = require('express');
const uuid = require('uuid').v4;
const createError = require('http-errors');
const { getUserData, saveUserData } = require('../utils/user.utils');

exports.getAllUsers = async (req, res, next) => {
    const users = await getUserData();
    return res.json(users);
}

/**
 * @function getUserById
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 * @returns {Promise<void>}
 */
exports.getUserById = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const users = await getUserData();
    
        const user = users.find((user) => user.id == userId);
    
        if (!user) throw createError(404, 'User does not exists');
    
        return res.json(user);
    }
    catch(e) {
        next(e);
    }
}

exports.createUser = async (req, res, next) => {
    try {
        const payload = req.body;
        let users = await getUserData();
    
        const isEmailExists = users.find((user) => user.email == payload.email);
    
        if (isEmailExists) {
            throw createError(409, 'Email already in use');
        }
    
        const user = {
            id: uuid(),
            ...payload
        };
    
        users.push(user);
    
        await saveUserData(users);
        return res.status(201).json(user);
    } catch(e) {
        next(e);
    }
}

exports.updateUser = async(req, res, next) => {
    try{
        let users = await getUserData()
        const { userId } = req.params
        const payload = req.body 
    
        const userExist = users.find((user) => user.id === userId);

        if (payload.email) {
            const isEmailExists = users.find((user) => user.email == payload.email);
            if (isEmailExists) {
                throw createError(409, 'Email already in use');
            }
        }
        
        if(!userExist){
            throw createError(404, 'user not exist')
        }

        const updateUser = {
            ...userExist,
            ...payload
        }
        const updatedData = users.map((user) => user.id === userId ? updateUser : user)
        await saveUserData(updatedData)
        res.json(updatedData)
    }catch(err) {
        next(err)
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const users = await getUserData()
        const { userId } = req.params
        const userExist = users.find((user) => user.id == userId)
        
        if(!userExist){
            throw createError(404, 'user not exist')
        }
    
        const userData = users.filter((user) => user.id !== userId)
        await saveUserData(userData)
        res.json(userData)
    }catch(err) {
        next(err)
    }
}