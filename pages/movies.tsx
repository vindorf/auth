import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import MovieCard from "@/components/MovieCard";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

type Movie = {
  Title: string;
  Poster: string;
  Year: string;
  Type: string;
};

const movies = () => {
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState<Movie | Movie[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const router = useRouter();
  const { data: session } = useSession();


  useEffect(() => {
    if (!session) {
      router.replace("/");
    }
  }, [session]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const movie = await axios.get(
        `https://www.omdbapi.com/?&apikey=${API_KEY}&s=${input}`
      )
      
      setMovies(movie.data.Search);
    } catch (error) {
      console.log(error);
    }
    setInput("");
  };

  const toggle = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div>
      <h1 className="text-zinc-500 m-5">MOVIES</h1>
      <div className="m-8">
        <form
          className="h-[30px] flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <input
            className="text-zinc-500 border h-full rounded-l text-base focus:outline-none focus:border-zinc-500"
            value={input}
            placeholder="  Search"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            type="text"
          />
          <button
            className="bg-zinc-100 border rounded-r px-5 py-0 h-full text-zinc-400 hover:text-black hover:shadow-md"
            type="submit"
          >
            Go
          </button>
        </form>
      </div>
      <div className="grid lg:grid-cols-3 ms:grid-cols-2 xs:grid-cols-1 gap-2">
        {Array.isArray(movies) &&
          movies.map((e: any, index) => (
            <div 
            key={index}
            onClick={() => toggle(index)}
            className="flex flex-col justify-center items-center rounded shadow hover:shadow-lg m-auto pb-2 w-[350px] h-[400px]">
              <img src={e.Poster} className="w-auto h-[300px]"/>
              <p className="text-zinc-500 p-2">{e.Title} </p>
              {openIndex === index && (
              <MovieCard
                title={e.Title}
                year={e.Year}
                image={e.Poster}
                visible={true}
              />
            )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default movies;
