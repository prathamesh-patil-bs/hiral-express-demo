const path = require('path')
const fs = require('fs/promises')

const commentFilePath = path.join(process.cwd(), 'src', 'data', 'comment.data.json')

exports.getAllComments = async () => {
    const comments = await fs.readFile(commentFilePath, 'utf-8')
    return JSON.parse(comments)
}

exports.saveCommentData = async (data) => {
    await fs.writeFile(commentFilePath, JSON.stringify(data), 'utf-8')
}