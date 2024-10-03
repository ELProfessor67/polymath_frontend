import React from 'react'
import Link from 'next/link'
import { Atom, Brain, ChartLine, ChartNoAxesColumn, ContactRound, LayoutGrid, MessageCircle, Settings, User, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const pathname = usePathname();
    return (


        <aside className={`${sidebarOpen ? 'block' : 'hidden'} fixed inset-y-0 left-0 z-50 w-64 bg-gray-6 dark:bg-black p-4 lg:static lg:block text-white`}>
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                    <img src='/images/logo/logo-white.png' className='w-[80%] mx-auto' />
                </div>
                <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
                    <X className="h-6 w-6" />
                </button>
            </div>
            <nav className='space-y-2'>
                <Link href="/dashboard" className={`flex items-center gap-2 py-2 px-4 rounded hover:bg-white hover:text-black ${pathname == '/dashboard' ? 'bg-white text-black' : ''}`}>
                    <span><LayoutGrid size={20} /></span>
                    Dashboard
                </Link>


                {/* <Link href="/dashboard/campaigns" className={`flex items-center gap-2 py-2 px-4 rounded hover:bg-white hover:text-black ${pathname.includes('campaigns') ? 'bg-white text-black' : ''}`}>
                    <span><User size={20}/></span>
                    Campaigns
                </Link> */}

                <Link href="/dashboard/bill-management" className={`flex items-center gap-2 py-2 px-4 rounded  hover:bg-white hover:text-black ${pathname.includes('bill-management') ? 'bg-white text-black' : ''}`}>
                    <span><ChartNoAxesColumn size={20}/></span>
                    Bill Management
                </Link>


                <Link href="/dashboard/mailbox" className={`flex items-center gap-2 py-2 px-4 rounded hover:bg-white hover:text-black ${pathname.includes('mailbox') ? 'bg-white text-black' : ''}`}>
                    <span><MessageCircle size={20}/></span>
                    Mailboxes
                </Link>

                {/* <Link href="/dashboard/leads" className={`flex items-center gap-2 py-2 px-4 rounded hover:bg-white hover:text-black ${pathname.includes('leads') ? 'bg-white text-black' : ''}`}>
                    <span><ChartLine size={20} /></span>
                    Leads
                
                </Link> */}
                {/* <Link href="/dashboard/settings" className={`flex items-center gap-2 py-2 px-4 rounded hover:bg-white hover:text-black ${pathname.includes('settings') ? 'bg-white text-black' : ''}`}>
                    <span><Settings size={20}/></span>
                    Settings
                
                </Link> */}
                <Link href="/dashboard/onboarding" className={`flex items-center gap-2 py-2 px-4 rounded hover:bg-white hover:text-black ${pathname.includes('onboarding') ? 'bg-white text-black' : ''}`}>
                    <span><ContactRound size={20}/></span>
                    Onboarding
                </Link>
                <Link href="/dashboard/ai-audio" className={`flex whitespace-pre items-center gap-2 py-2 px-4 rounded hover:bg-white hover:text-black ${pathname.includes('ai-audio') ? 'bg-white text-black' : ''}`}>
                    <span><Brain size={20}/></span>
                    AI Audio Calls
                    <span className='bg-white text-black px-2 py-1 rounded-3xl text-[12px] font-semibold whitespace-pre'>Coming Soon</span>
                </Link>
                {/* <Link href="/dashboard/exnternal-integrations" className={`flex items-center gap-2 py-2 px-4 rounded hover:bg-white hover:text-black ${pathname.includes('exnternal-integrations') ? 'bg-white text-black' : ''}`}>
                    <span><Atom size={20}/></span>
                    External Integrations
                </Link> */}
            </nav>
        </aside>
    )
}

export default Sidebar