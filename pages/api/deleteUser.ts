import User from "@/models/User.model";
import { connect } from "@/utils/connect";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]"

const DeleteUser = async (req: any, res: any) => {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
      res.status(404).json({ message: 'Servus from DeleteUser Server; Please log in' });
      return;
  }
 
  try {
    const { email } = req.body;
    console.log("EMAIL", email);

    await connect();

    const deletedUser = await User.findOneAndDelete({ email });

    return res.status(200).json({ message: "User deleted", deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Error deleting user", error });
  }
};

export default DeleteUser;
