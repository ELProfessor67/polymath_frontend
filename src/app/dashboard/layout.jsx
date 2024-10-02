'use client'
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { UserContext } from '@/providers/UserProvider';
import { useRouter } from 'next/navigation';
import React, { useContext, useLayoutEffect, useState } from 'react'

const layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const { user, isAuth } = useContext(UserContext);
    const router = useRouter();
  
    useLayoutEffect(() => {
      if (isAuth == false) {
       router.push('/');
      }
    }, [user, isAuth])

    return (
        <div className="flex h-screen bg-white-shade-1 dark:bg-black dark:text-white text-black">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header setSidebarOpen={setSidebarOpen} />
                {children}
            </div>
        </div>
    )
}

export default layout