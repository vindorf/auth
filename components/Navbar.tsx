import Link from "next/link";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Clink from "./Link";
import SmMenu from "./SmMenu";
import { LuChevronDown } from "react-icons/lu"
import { AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  const { data: session }: any = useSession();
  const[state, setState] = useState(false);

 
  const handleMouseEnter = () => {
    setState(true);
  };

  const handleMouseLeave = () => {
    setState(false);
  };
  return (
    <div
      className="
    flex 
    justify-between
    items-center
    px-5
    py-2
    h-12
    shadow-md
    sticky
    top-0
    left-0
    bg-white
    opacity-90
    "
    >
      <div className="flex justify-center items-center">
      <div className="w-11 h-10 flex justify-center items-center relative">
      <img src="/images/seehorse.png" alt="" />
    </div>
      {session &&  <div className="mx-10">
          <p className="text-zinc-500 py-1">Welcome: {session?.user?.email}</p>
          </div>}
      </div>
   
      {session && (
        <div className="flex h-full items-center justify-end">
        <div className="sm:hidden lg:block xs:hidden">
        <Clink href="/profile" label="PROF" />
        <Clink href="/users" label="USE" />
        <Clink href="/movies" label="MOV" />
        <Clink href="/products" label="PROD" />
        <Clink href="/post" label="POST" />
        <Clink href="/admin" label="ADMIN" />
          <button
            className=" px-5 py-1 rounded text-zinc-500 hover:text-black hover:shadow-md"
            onClick={() => {
              signOut();
            }}
          >
            LOGOUT
          </button>
        </div >
        <div onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave} className="flex h-full justify-center items-center lg:hidden sm:block">
        <button        
        className="text-xl h-8 absolute flex items-center right-5 px-5 py-1 rounded text-zinc-500 hover:text-black hover:shadow-md">
          <AiOutlineMenu className=""/>
          <LuChevronDown className={`text-zinc-500 mt-1 mx-1 hover:text-black ${state ? 'rotate-180' : ''}`} />  
          </button>
        
        {session &&  <SmMenu visible={state}/>}
        </div>        
        </div>       
      )}
      
    </div>
    
  );
};

export default Navbar;


