import PostCard from "@/components/PostCard";
import { useQuery} from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";



const postPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.replace("/");
    }
  }, [session]);
  const [input, setInput] = useState({ title: "", text: "" });
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetch("/api/post").then((res) => res.json()),
  });

  if (isLoading) {
    return <div>...Loading</div>;
  }
  const pData = data.post ? data.post : [];

  const inputH = (e: any) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const subH = async (e: any) => {
    e.preventDefault();

    try {
      const addPost = await axios.post("/api/addpost", {
        title: input.title,
        text: input.text,
      });
      setInput({ title: "", text: "" });
      await refetch();
    } catch (error) {
      console.log("error add post", error);
    }
  };

  return (
    <div>
      <h1 className="text-zinc-500 m-5">Flaschen-Post</h1>
      <div>
        <form className="flex flex-col" onSubmit={subH}>
          <input
            onChange={inputH}
            placeholder="Title"
            name="title"
            type="text"
            value={input.title}
            className="border rounded p-1 m-3 text-base focus:outline-none focus:border-zinc-500"
          />
          <textarea
            onChange={inputH}
            name="text"
            cols={5}
            placeholder="Post"
            value={input.text}
            className="border rounded p-1 m-3 text-base focus:outline-none focus:border-zinc-500"
          />
          <button className="bg-zinc-100 mx-2 h-full px-5 py-1 rounded text-zinc-500 hover:text-black hover:shadow-md text-base">
            Submit
          </button>
        </form>
      </div>
      <div>
        <h1 className="text-zinc-500 m-5">YOUR POSTS</h1>
        {pData &&
          pData.map((e: any, i: any) => (
            <PostCard key={i} title={e.title} id={e._id}/>
          ))}
      </div>
    </div>
  );
};

export default postPage;
