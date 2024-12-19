"use client";

import Navbar from '@/components/Navbar';
import { FloatingNav } from '@/components/ui/loating-navbar';
import { IconHome, IconMessage, IconUser } from '@tabler/icons-react';
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { FC, PropsWithChildren } from 'react'


const Wrapper: FC<PropsWithChildren> = ({children}) => {
    const navItems = [
        {
            name: "Home",
            link: "/",
            icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
        {
            name: "About",
            link: "/about",
            icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
        {
            name: "Contact",
            link: "/contact",
            icon: (
                <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
            ),
        },
        {
            name: "Hacker",
            link: "/hacker",
            icon: (
                <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
            ),
        },
    ];

    return (
        <TonConnectUIProvider manifestUrl="https://manifest-files.exadrivecdn.com/video-ton-manifest.json">
            <Navbar />
            {children}
        </TonConnectUIProvider>
    )
}

export default Wrapper