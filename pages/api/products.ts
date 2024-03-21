import Product from "@/models/Product.model";
import {connect} from "@/utils/connect";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"


 const Products = async (req:any, res:any) => {
    const session = await getServerSession(req, res, authOptions)
   

    if (!session) {
        res.status(404).json({ message: 'Servus from Product Server; Please log in' });
        return;
    }
   

    await connect();

    try {
        const products = await Product.find();
        res.status(200).json({products})
    } catch(error) {
        res.status(500).json({message: 'Error get Users', error})
    }
}



export default Products;