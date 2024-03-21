import {connect} from "@/utils/connect";
import User from '@/models/User.model';
import bcrypt from 'bcrypt';




 const Register = async (req:any, res:any) => {
    const {name, email, password} = await req.body;
    
    await connect();

    const existUser = await User.findOne({email});
    if(existUser) {
        res.status(400).json({error: 'User already exitst'});
         return;
    }

    const hash = await bcrypt.hash(password, 10);

    try{
        const user = await new User({name, email, password: hash, role: 'user'});
        await user.save();
        res.status(200).json({ message: 'User registered', user });
        
    } catch(error) {
        res.status(500).json({ message: 'Error registering user' });
    }
}

export default Register;