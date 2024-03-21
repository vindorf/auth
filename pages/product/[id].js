import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import { IoReturnDownBackSharp } from "react-icons/io5";

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const fetcher = async (url, options) => {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  };

  const url = "/api/oneProduct/";
  const requestBody = {
    method: "POST",
    body: JSON.stringify({ _id: id }),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const { data, error, isLoading } = useSWR(
    url,
    fetcher.bind(null, url, requestBody)
  );

  const d = data?.oneProduct;

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="flex justify-center items-center mt-24 h-[300px] text-zinc-500">
      <div className="flex flex-col border-r mr-10 pr-10">
        <p className="my-2">{d.title}</p>
        <div className="w-56 my-5 ">
          <img src={d.image}></img>
        </div>
        <div className="font-extralight text-xs">
          <p>Id: {d._id} </p>
        </div>
      </div>
      <div className="h-full">
        <Link
          className="bg-zinc-200 hover:bg-zinc-300 rounded flex h-full  items-center px-1"
          href="/products"
        >
          <IoReturnDownBackSharp />
        </Link>
      </div>
    </div>
  );
};

export default ProductDetailPage;
