const path = require('path');
const fs = require('fs/promises');

const postsFilePath = path.join(process.cwd(), 'src', 'data', 'post.data.json');

exports.getPostsdata = async () => {
    const posts = await fs.readFile(postsFilePath, 'utf-8');
    return JSON.parse(posts);
}

exports.savePostData = (data) => {
    return fs.writeFile(postsFilePath, JSON.stringify(data), 'utf-8');
}