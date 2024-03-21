
import React from "react";

interface UserCardProps {
    name: string;
    email: string;
    onDelete: (email:string) => void;
}


const UserCard: React.FC<UserCardProps> = ({name, email, onDelete}) => {
    const handleDeleteClick = () => {
        onDelete(email);
    };

    return(
        <div className="flex justify-center">
        <div className=" rounded shadow hover:shadow-xl p-4 m-4 w-56 ">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-zinc-500">{name} </h1>
                <h3>{email} </h3>
                <button className="rounded px-5 py-1 m-4 text-zinc-500 hover:text-black shadow-md" onClick={handleDeleteClick}>Delete</button>
            </div>
        </div>
        </div>
    )
};

export default UserCard;