import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";



const Account = () => {
  const{data: session} = useSession();
  const router = useRouter();
  const [input, setInput] = useState({name:'', email:'', password:''})
  const [variant, setVariant] = useState("register");
 const [msg, setMsg] = useState("");

 useEffect(() => {
  if(session) {
    router.replace('/profile')
  }
 },[session]);

  const login = async () => {

if(!input.email||!input.password) {
  setMsg('Input required');
  setTimeout(() => {
    setMsg("");
  },2000)
  return;
}

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: input.email,
        password: input.password,
      });

      if (res?.status == 200) {
        router.push("/profile");
      }
    } catch (error) {
      console.log("Error login", error);
    }
  };

  const register = async () => {

    if(!input.name||!input.email||!input.password) {
      setMsg('Input required');
      setTimeout(() => {
        setMsg("");
      },2000)
      return;
    }
    try {
      const res = await axios.post("/api/register", { name: input.name, email: input.email,password: input.password });
      console.log("User created", res.data);
      
      

      if (res.status == 200) {
        login();
      }
    } catch (error) {
      console.log(error);
      if(error) {
        setMsg('User already exist')
      } 
    }
  };

  const toggleV = () => {
    if (variant == "register") {
      setVariant("login");
    } else {
      setVariant("register");
    }
  };

  const handleInputChange = (e:any) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div className=" flex justify-center items-center flex-col py-5">
      <h1>{variant === "register" ? "REGISTER" : "LOGIN"} </h1>
      <div className="shadow-md py-3 m-5 bg-zinc-200 rounded h-70 opacity-90">
        <div>
          <div className="flex flex-col w-56 p-3 gap-3">
            {variant == "register" && (
              <input
                className=" focus:outline-none
                focus:ring-0 m-2 rounded text-black text-[12px] h-6 p-3"
                type="text"
                placeholder="Name"
                name="name"
                value={input.name}
                onChange={handleInputChange}
              />
            )}
            <input
              className="  focus:outline-none
              focus:ring-0 m-2 rounded text-black text-[12px] h-6 p-3"
              type="text"
              placeholder="Email"
              name="email"
              value={input.email}
              onChange={handleInputChange}            />
            <input
              className=" focus:outline-none
              focus:ring-0 m-2 rounded text-black text-[12px] h-6 p-3"
              type="password"
              placeholder="Password"
              name="password"
              value={input.password}
              onChange={handleInputChange}            />
            <button
              className="focus:outline-none focus:bg-zinc-300 py-4 flex h-6 justify-center m-2 my-0 rounded items-center text-white border border-white  hover:bg-zinc-300"
              onClick={variant == "register" ? register : login}
            >
              {variant == "register" ? "REGISTER" : "LOGIN"}
            </button>
            <p className="text-xs text-zinc-400">OR</p>
            <p
              onClick={toggleV}
              className="cursor-pointer text-zinc-600 hover:text-zinc-800"
            >
              {variant == "register" ? "LOGIN" : "REGISTER"}
            </p>
          </div>
          {msg && <p className="text-zinc-500 font-extralight text-xs"> {msg} </p> }
        </div>
      </div>
    </div>
  );
};
export default Account;
