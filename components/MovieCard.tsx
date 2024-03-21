import React from "react";

interface MovieCardProps {
  title: string;
  image: string;
  year: string;
  visible: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  image,
  year,
  visible,
}) => {
  return (
    <>
      {visible && (
        <div className="rounded flex justify-center w-[350px] items-center flex-col bg-zinc-200 absolute ">
          <div className="w-full flex justify-center">
            <img src={image} />
          </div>
          <div className="flex flex-col p-5">
            <p className="text-zinc-500">{title} </p>
            <p className="text-zinc-500">{year} </p>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;
