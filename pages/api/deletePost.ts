import Post from "@/models/Post.model";
import { connect } from "@/utils/connect";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]"

const DeletePost = async (req: any, res: any) => {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
      res.status(404).json({ message: 'Servus from DeleteUser Server; Please log in' });
      return;
  }
 
  try {
    const { _id } = await req.body;
    console.log("ID", _id);

    await connect();

    const deletedPost = await Post.findOneAndDelete({ _id });

    return res.status(200).json({ message: "Post deleted", deletedPost });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Error deleting user", error });
  }
};

export default DeletePost;
