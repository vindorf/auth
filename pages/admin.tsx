import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";


export default function Admin() {
  const { data: session } = useSession();
  const router = useRouter()
  useEffect(() => {
    if (!session) { 
      router.replace('/')
    }
  }, [session]);

 
  return (
    <>
      {session?.user && session.user.role === "admin" ? (
        
        <div className="text-zinc-500 m-5">
        <h1>WELCOME ADMIN</h1>
        <h1>Role: {session.user.role} </h1>
        </div>
      ) : (
        <div className="text-zinc-500 m-5">
        <h1>SORRY ACCESS DENIED FOR USER</h1>
        <h1>Role: {session?.user?.role} </h1>
        </div>
      )}
    </>
  );
}
