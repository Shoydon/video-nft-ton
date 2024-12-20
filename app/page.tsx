"use client";

import Link from "next/link";
import Ar from "./assets/Ar.svg";
import Image from "next/image";

export default function Home() {
  return (
    <div className='text-white flex justify-around items-center pt-32'>
        
        <div className='mb-16 mx-5'>
            <h1 className='font-semibold text-6xl'>View and Create<br></br><span className='font-thin text-sky-400'>Video NFTs </span>(Non Fungible Tokens)</h1>
            <p className='pt-8 text-xl font-thin'>Video NFTs are unique digital assets that represent ownership of a specific video file.<br/>They ensure authenticity and provenance by recording ownership on the blockchain.<br/> Each NFT has a unique identifier, ensuring its uniqueness and non-interchangeability.</p>
            <Link href="/nfts">
            <button type="button" className="text-white mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Explore All</button>
            </Link>
        </div>
        <div className=''>
           <Image 
             src={Ar}
             alt="AR illustration"
             width={490}
             height={490}
             className='h-[490px] w-auto'
           />
        </div>
    </div>
  );
}
