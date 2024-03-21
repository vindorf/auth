import Post from "@/models/Post.model";
import {connect} from "@/utils/connect";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"



const onePost = async (req:any, res:any) => {
    const {_id} = await req.body
    //req.query
   
    const session = await getServerSession(req, res, authOptions)
   

    if (!session) {
        res.status(404).json({ message: 'Servus from One-Product Server; Please log in' });
        return;
    }
   

    await connect();

    try{
        const onePost = await Post.findById(_id);
        res.status(200).json({onePost})
    } catch(error) {
        res.status(500).json({message: 'Error get One-Product', error})
    }
}

export default onePost;