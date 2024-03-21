import React, { useEffect } from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


const Profile = () => {
  const { data: session } = useSession();
  const router = useRouter();


  useEffect(() => {
    if (!session) { 
      router.replace('/')
    }
  }, [session]);
  return (
    <div className='grid grid-cols-1 gap-6 p-3 m-3'>
      <h1 className='text-zinc-500 m-5'>PROFILER</h1>
      <div className='flex justify-center items-center'>
        <div className='border max-w-[1250px] rounded p-2 bg-zinc-200'>
          <video src="videos\video (2160p).mp4" autoPlay loop muted>
          </video>
          <h1 className='text-white font-bold' style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%, -50%)' }}>THIS IS DNA</h1>
        </div>
      </div>
    </div>
  )
}

export default Profile