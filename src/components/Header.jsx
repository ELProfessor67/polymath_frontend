import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Bell, ChevronDown, Menu, Search,Moon,Sun, UserCheck } from 'lucide-react'
import { UserContext } from '@/providers/UserProvider';
import { useRouter } from 'next/navigation';

const Header = ({ setSidebarOpen }) => {
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(true)
    const {setUser, setIsAuth} = useContext(UserContext);
    const router = useRouter();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])


  const handleLogout = useCallback(() => {
    try {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setUser(null)
        setIsAuth(false);
        router.push('/')
    } catch (error) {
        
    }
  },[])
    return (
        <header className="flex items-center justify-between p-4 ">

            <div className="flex items-center">
                <button className="lg:hidden mr-4" onClick={() => setSidebarOpen(true)}>
                    <Menu className="h-6 w-6" />
                </button>
                <div className="relative max-w-xl">
                    <input type="text" placeholder="Search here..." className="w-full  bg-white dark:bg-gray-7 dark:text-white rounded-md py-2 px-4 pl-10 outline-none" />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
            </div>
            <div className="flex items-center">
                <button
                    className="mr-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700"
                    onClick={() => setDarkMode(!darkMode)}
                >
                    {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
                <Bell className="h-6 w-6 mr-4" />
                <div className="relative">
                    <button
                        className="flex items-center focus:outline-none"
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                    >
                        <img src="/images/users/profile.png" alt="User Avatar" className="h-8 w-8 rounded-full mr-2" />
                        <ChevronDown className="h-4 w-4" />
                    </button>
                    {userMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-7 rounded-md shadow-lg py-1">
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Profile</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Settings</a>
                            <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header