import axios from "axios";
import React, { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import UserCard from "@/components/UserCard";
import useSWR from "swr";

const Users = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.replace("/");
    }
  }, [session]);

  const fetcher = (url: string | URL | Request) =>
    fetch(url).then((r) => r.json());

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    "/api/users/",
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const apiData = data.users;

  const deleteUser = async (email: any) => {
    try {
      const delUser = await axios.post("/api/deleteUser", { email });
      console.log("user deleted", delUser);
      if (session?.user?.email === email) {
        await signOut();
      } else {
        mutate("/api/users");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-zinc-500 m-5">TOP USERS</h1>
      <div className="m-auto grid lg:grid-cols-4 ms:grid-cols-2 xs:grid-cols-1">
        {apiData &&
          apiData.map((e: any) => (
            <UserCard
              key={e._id}
              name={e.name}
              email={e.email}
              onDelete={deleteUser}
            />
          ))}
      </div>
    </div>
  );
};
export default Users;
