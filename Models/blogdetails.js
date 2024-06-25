const { Schema } = require('mongoose')
const { model } = require('mongoose')
const demo = new Schema({
    blogId: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: String, required: true },
    
})

const blogDetails = model('blogdetails', demo) 
module.exports = blogDetails    