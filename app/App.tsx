"use client"

import { TonConnectUIProvider } from '@tonconnect/ui-react'
import React from 'react'
import dynamic from 'next/dynamic'

// Dynamically import Home with SSR disabled
const Home = dynamic(() => import('./page'), { ssr: false })

export default function App() {


    return (
        <TonConnectUIProvider manifestUrl="./video-ton-manifest.json">
            <Home />
        </TonConnectUIProvider>
    )
}