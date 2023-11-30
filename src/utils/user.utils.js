const path = require('path');
const fs = require('fs/promises');

const usersFilePath = path.join(process.cwd(), 'src', 'data', 'user.data.json');

exports.getUserData = async () => {
    const users = await fs.readFile(usersFilePath, 'utf-8');
    return JSON.parse(users);
}

exports.saveUserData = (data) => {
    return fs.writeFile(usersFilePath, JSON.stringify(data), 'utf-8');
}