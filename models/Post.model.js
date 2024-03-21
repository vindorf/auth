import {model, models, Schema} from 'mongoose';


const postSchema =new Schema({
    title: String,
    text: String,
},
{timestamps: true}
);

const Post = models.Post || model('Post', postSchema);

export default Post;