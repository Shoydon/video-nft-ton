"use client"

import { TonConnectUIProvider } from '@tonconnect/ui-react'
import React from 'react'
import dynamic from 'next/dynamic'
import { FloatingNav } from '@/components/ui/loating-navbar'
import { IconHome, IconMessage, IconUser } from '@tabler/icons-react'

// Dynamically import Home with SSR disabled
const Home = dynamic(() => import('./page'), { ssr: false })

export default function App() {
    const navItems = [
        {
            name: "Home",
            link: "/",
            icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
        {
            name: "Create",
            link: "/create",
            icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
        {
            name: "NFTs",
            link: "/nfts",
            icon: (
                <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
            ),
        },
    ];

    return (
        <TonConnectUIProvider manifestUrl="https://hackaton.exadrivecdn.com/manifest/tonconnect-manifest.json">
            <FloatingNav navItems={navItems} />
            <Home />
        </TonConnectUIProvider>
    )
}