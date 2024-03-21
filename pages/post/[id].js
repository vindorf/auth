import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoReturnDownBackSharp } from "react-icons/io5";
import axios from 'axios';
import { useEffect, useState } from 'react';


const PostDetailPage =  () => {
  const router = useRouter();
  const { id } = router.query;
  const [post , setPost] = useState({});


  const get = async () => {
    await axios.post('/api/onePost', {_id:id}).then((res) => setPost(res.data.onePost) )
  }

  useEffect(() => {
    get()
  },[])

const _id = post._id
const handleDelete =  () => {
  axios.post('/api/deletePost', {_id}).then((res) => console.log(res))
  router.replace('/post')
}



return (
  
        <div
          className="flex justify-center items-center mt-24 h-[300px] text-zinc-500"
          key={post._id}
        >
          <div className="grid grid-cols-2 gap-3 text-left items-center border-r mr-10 pr-10 h-[150px]">
            <p>Title:</p>
            <p>{post.title}</p>
            <p>Text:</p>
            <p>{post.text}</p>
            <p>id: </p>
            <p className='text-xs'>{post._id}</p>
            <p
                  onClick={() => handleDelete()}
              className="bg-zinc-200 hover:bg-zinc-300 rounded px-2 cursor-pointer"
            >
              Delete post
            </p>
          </div>
          <div className="h-full">
            <Link
              className="bg-zinc-200 hover:bg-zinc-300 rounded flex h-full items-center px-1"
              href="/post"
            >
              <IoReturnDownBackSharp />
            </Link>
          </div>
        </div>
);
      }

export default PostDetailPage;