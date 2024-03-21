import User from "@/models/User.model";
import {connect} from "@/utils/connect";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]"



 const Users = async (req:any, res:any) => {
    const session = await getServerSession(req, res, authOptions)
   

    if (!session) {
        res.status(404).json({ message: 'Servus from User Server; Please log in' });
        return;
    }
    if(session) {
        console.log('SESSION', JSON.stringify(session, null, 2))
    }

    await connect();

    try {
        const users = await User.find();
        res.status(200).json({users})
    } catch(error) {
        res.status(500).json({message: 'Error get Users', error})
    }
}



export default Users;