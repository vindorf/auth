import Post from "@/models/Post.model";
import {connect} from "@/utils/connect";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]"



 const Posts = async (req:any, res:any) => {
    const session = await getServerSession(req, res, authOptions)
   

    if (!session) {
        res.status(404).json({ message: 'Servus from Server; Please log in' });
        return;
    }
   

  

    await connect();

    try {
        const post = await Post.find();
        res.status(200).json({post})
    } catch(error) {
        res.status(500).json({message: 'Error get Post', error})
    }
}



export default Posts;