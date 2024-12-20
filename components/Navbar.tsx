'use client'

import Link from 'next/link'
import { TonConnectButton } from '@tonconnect/ui-react'

export default function Navbar() {

  return (
    <div className="fixed z-10 backdrop-blur-sm">
        <section className="relative mx-auto">

          <nav className="flex justify-between text-white w-screen px-24">
            <div className="px-5 xl:px-12 py-6 flex w-full items-center">
              <a className="text-3xl font-bold font-heading">
                Ignitus Networks
              </a>

              <ul className="md:flex px-4 mx-auto font-semibold font-heading space-x-7" >
                <Link className='no-underline text-gray-200' href="/">
                  <li>Home</li>
                </Link>
                <Link className='no-underline text-gray-200' href="/nfts">
                  <li>All NFTs</li>
                </Link>
                <Link className='no-underline text-gray-200' href="/create">
                  <li>Mint NFT</li>
                </Link>
              </ul>

              <div className="xl:flex items-center space-x-5">

                <TonConnectButton />
              </div>
            </div>


          </nav>

        </section>
      </div>
  )
}

