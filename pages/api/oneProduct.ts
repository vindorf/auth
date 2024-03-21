import Product from "@/models/Product.model";
import {connect} from "@/utils/connect";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"



const oneProduct = async (req:any, res:any) => {
    const {_id} = await req.body
   
    const session = await getServerSession(req, res, authOptions)
   

    if (!session) {
        res.status(404).json({ message: 'Servus from One-Product Server; Please log in' });
        return;
    }
   

    await connect();

    try{
        const oneProduct = await Product.findById(_id);
        res.status(200).json({oneProduct})
    } catch(error) {
        res.status(500).json({message: 'Error get One-Product', error})
    }
}

export default oneProduct;