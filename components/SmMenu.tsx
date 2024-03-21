import React from 'react'
import Clink from './Link';
import { signOut } from 'next-auth/react';



interface SmMenuProps {
  visible: boolean;
}

const SmMenu: React.FC<SmMenuProps> = ({visible}) => {
  
  return (
    <>
      {visible && (
        <div className='opacity-90 w-24 bg-zinc-200 relative top-[129px] right-0 rounded shadow-md'>
          <div className='flex flex-col m-2 p-2 justify-center items-center'>
            <Clink href="/profile" label="Profile" />
            <Clink href="/users" label="Users" />
            <Clink href="/movies" label="Movies" />
            <Clink href="/products" label="Products" />
            <Clink href="/post" label="Post" />
            <Clink href="/admin" label="Admin" />
            <p className='mx-2 h-full px-5 py-1 rounded text-zinc-500 hover:text-black hover:shadow-md cursor-pointer' onClick={() => signOut()}>Logout</p>
          </div>
        </div>
      )}
    </>
  )
}

export default SmMenu