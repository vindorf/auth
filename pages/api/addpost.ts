import Post from "@/models/Post.model";
import {connect} from "@/utils/connect";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]"


 const Posts = async (req:any, res:any) => {
    const session = await getServerSession(req, res, authOptions)
   

    if (!session) {
        res.status(404).json({ message: 'Servus from AddPost Server; Please log in' });
        return;
    }
    
   

    await connect();

    try {
        const {title, text} = await req.body;
        const post = await Post.create({title, text});
        res.status(200).json('Post created',{post})
    } catch(error) {
        res.status(500).json({message: 'Error add Post', error})
    }
}



export default Posts;