import ProductCard from '@/components/ProductCard'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";



const Products = () => {
    const { data: session } = useSession();
    const router = useRouter();
  
  
    useEffect(() => {
      if (!session) { 
        router.replace('/')
      }
    }, [session]);
    const{isLoading, data} = useQuery({
        queryKey: ['products'],
        queryFn: () => fetch('/api/products').then((res) => res.json())
    })

    if(isLoading) {
        return <div>...Loading</div>
    }
    const pData = data.products ? data.products : [];
    
  return (
   <div>
    <h1 className='text-zinc-500 m-5'>TOP TECH PRODUCTS</h1>
     <div className='m-auto grid lg:grid-cols-4 ms:grid-cols-2 xs:grid-cols-1 gap-3 mt-6'>
        {pData && pData.map((e:any, i:any) => 
        <div key={i}>
         <ProductCard key={i} title={e.title} image={e.image} id={e._id}/>
        </div>
        )}
    </div>
   </div>
  )
}

export default Products