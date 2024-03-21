import Link from 'next/link';
import React from 'react'

type PostCardProps = {
    title: string;
    id: string;
}

const PostCard = ({title, id}: PostCardProps) => {
  return (
    <div className='rounded flex flex-col justify-center items-center shadow hover:shadow-lg p-2 m-2'>
        <div>
            <h1 className='text-zinc-500 m-2'>{title} </h1>
        </div>
        <div>
        <div className="text-zinc-500 font-extralight text-xs">ID: {id}</div>

<Link
  className="text-zinc-500 font-extralight text-xs bg-zinc-200 px-24 mt-2"
  href={`/post/${id}`}
>
  LINK
</Link>
        </div>
    </div>
  )
}

export default PostCard