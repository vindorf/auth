import React from 'react'
import Link from 'next/link'


interface ClinkProps {
    label: string;
    href: string;
  }


  const Clink: React.FC<ClinkProps> = ({ label, href }) => {
    return (
      <Link className='mx-2 h-full px-5 py-1 rounded text-zinc-500 hover:text-black hover:shadow-md' href={href}>{label}</Link>
    );
  }
  
  export default Clink;