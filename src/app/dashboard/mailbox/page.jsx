"use client";
import DialogBox from '@/components/DialogBox';
// import { emails } from '@/constants/emails';
import { getAllEmailsRequest, getEmailOutboxRequest, registerProfileRequest, scheduleMailRequest } from '@/http/apiCalls';
import { UserContext } from '@/providers/UserProvider';
import { PlusCircle, ChevronDown, Search, Archive, Trash2, RefreshCw, CornerUpLeft, CornerUpRight, Share2, FolderSymlink, HelpCircle, Settings, Inbox, Send, Clock, Menu, ChevronUp, CircleChevronDown, CirclePlus, SquarePen, Circle, Plus } from 'lucide-react'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import { formatTimestampToTime, formatCustomDate } from '@/lib/formatDate'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'



export default function page() {
    const [activeTab, setActiveTab] = useState('inbox');
    const { user, getUser } = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [indexMails, setInboxMails] = useState([]);
    const [outboxMails, setOutboxMails] = useState([]);
    const [scheduledMails, setScheduledMails] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [openScheduled, setOpenScheduled] = useState(false);
    const intervaref = useRef();


    console.log(scheduledMails, 'scheduledMails')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            formData.append("imap_server", "imap.gmail.com");
            formData.append("imap_port", 993);
            const res = await registerProfileRequest(formData);
            getUser();
            toast.success(res.data.message);
            setOpen(false);
        } catch (error) {
            toast.error(error.response?.data?.message);
            console.log(error);
        }
    }

    const saveScheduleInLocalStorage = useCallback(async (data) => {
        try {
            const schedule = window.localStorage.getItem("schedule");
            if (schedule) {
                const scheduleData = JSON.parse(schedule);
                scheduleData.push(data);
                window.localStorage.setItem("schedule", JSON.stringify(scheduleData));
            } else {
                window.localStorage.setItem("schedule", JSON.stringify([data]));
            }
        } catch (error) {
            console.log(error)
        }

    }, [])

    const getScheduledMails = useCallback(async () => {
        try {
            const schedule = window.localStorage.getItem("schedule");
            if (schedule) {
                const scheduleData = JSON.parse(schedule);
                const now = new Date();
                
                setScheduledMails(scheduleData);
            }
        } catch (error) {
            console.log(error)
        }
    }, []);




    const handleScheduleSubmit = useCallback(async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const sendTimeInput = formData.get('send_time');
            formData.set('send_time', sendTimeInput + ":00");
            formData.append("from_addr", user?.profiles[0]?.email);
            formData.append("user_avtr", user?.profiles[0]?.email?.split('')[0].toUpperCase());
            formData.append("created_at", new Date().toISOString());
            const res = await scheduleMailRequest(formData);
            toast.success(res.data.message);
            setOpenScheduled(false);
            const data = {};
            for (const pair of formData.entries()) {
                data[pair[0]] = pair[1];
            }
            data.content = {
                email_body: data.body
            }
            data.email_id = Math.floor(Math.random() * 100000000)
            saveScheduleInLocalStorage(data);
        } catch (error) {
            toast.error(error.response?.data?.message);
            console.log(error);
        }
    }, [user])

    const getEmails = useCallback(async (emailList) => {
        try {
            const formData = {
                emails: emailList
            }
            const [ires,ores] = await Promise.all([getAllEmailsRequest(formData),getEmailOutboxRequest()])
            
            setInboxMails(ires.data.data);
            if (!selectedEmail) {
                if(activeTab === 'inbox'){
                    setSelectedEmail(ires.data.data[0]);
                }else{
                    setSelectedEmail(ores.data.data[0]);
                }
            }
            
            setOutboxMails(ores.data.data);
            getScheduledMails()
        } catch (error) {
            console.log(error);
        }
    }, [selectedEmail])

    useEffect(() => {
        if (user?.profiles?.length && user?.profiles?.length != 0) {
            getEmails(user?.profiles?.map((profile) => profile.email));
            if(intervaref.current){
                clearInterval(intervaref.current)
            }
            intervaref.current = setInterval(() => {
                getEmails(user?.profiles?.map((profile) => profile.email));
            }, 30000);
        }
    }, [user])
    return (

        <main className="flex-1 overflow-x-hidden overflow-y-auto  p-6">
            {
                user && user.profiles.length != 0 &&
                <div className="flex-grow flex flex-col lg:flex-row">
                    <div className="lg:w-1/3 dark:bg-gray-7 bg-white rounded-l-md border-r border-gray-4/30">
                        <div className="p-4 border-b border-gray-4/30">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full dark:bg-gray-700 bg-gray-4 flex items-center justify-center mr-3">
                                        <span className="text-lg font-semibold">{user?.profiles[0]?.email?.split('')[0].toUpperCase()}</span>
                                    </div>
                                    <div>
                                        <h2 className="font-bold">{user?.profiles[0]?.email?.split('@')[0]}</h2>
                                        <p className="text-sm text-gray-400">{user?.profiles[0]?.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className='bg-none outline-none border-none'>
                                        <CircleChevronDown />
                                    </button>
                                    <button className='bg-none outline-none border-none' onClick={() => setOpen(true)}>
                                        <CirclePlus />
                                    </button>

                                </div>
                            </div>

                            <div className="flex space-x-4 mb-6 mt-6">
                                <button onClick={() => setActiveTab('inbox')} className={`flex-grow py-2 px-4 font-medium flex items-center justify-center text-[16px] pb-2   ${activeTab === 'inbox' ? 'border-b-2 border-black dark:border-gray-9' : 'opacity-70'}`}>

                                    Inbox
                                </button>
                                <button onClick={() => setActiveTab('outbox')} className={`flex-grow py-2 px-4 font-medium flex items-center justify-center text-[16px] pb-2  ${activeTab === 'outbox' ? 'border-b-2 border-black dark:border-gray-9' : 'opacity-70'}`}>

                                    Outbox
                                </button>
                                <button onClick={() => setActiveTab('scheduled')} className={`flex-grow py-2 px-4 font-medium flex items-center justify-center text-[16px] pb-2  ${activeTab === 'scheduled' ? 'border-b-2 border-black dark:border-gray-9' : 'opacity-70'}`}>

                                    Scheduled
                                </button>
                            </div>
                            <div className='flex gap-2'>
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                    <input className="w-full bg-white border border-gray-9 dark:border-transparent dark:bg-gray-10 rounded-md py-2 pl-10 pr-8  outline-none" placeholder='Search' />
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                                {
                                    activeTab === 'scheduled' &&
                                    <button className='opacity-70 bg-white border border-gray-9 dark:border-transparent dark:bg-gray-10 rounded-md p-2 px-3' onClick={() => setOpenScheduled(true)}>
                                        <Plus size={14} />
                                    </button>
                                }


                            </div>

                        </div>
                        {
                            activeTab === 'inbox' &&
                            <div className="overflow-y-auto h-[88vh] px-4 space-y-2 mt-2">
                                {indexMails && indexMails.length != 0 && indexMails.map((email) => (
                                    <div key={email.email_id} className={`flex items-start p-4 hover:bg-gray-10/80 rounded-md cursor-pointer text-black dark:text-white ${selectedEmail?.email_id === email.email_id ? 'bg-gray-10/80' : ''}`} onClick={() => setSelectedEmail(email)}>
                                        <div className="flex-shrink-0 mr-4">
                                            {email.icon ? (
                                                <img src={email.icon} alt={email.from_addr} className="w-10 h-10 rounded-full" />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full dark:bg-gray-700 bg-gray-4 flex items-center justify-center">
                                                    <span className="text-lg font-semibold">{email.user_avtr}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-sm font-semibold truncate">{email.from_addr.split('@')[0]}</h3>
                                                <span className="text-xs  whitespace-nowrap ml-2">{formatTimestampToTime(email.created_at)}</span>
                                            </div>
                                            <p className="text-sm font-medium  truncate opacity-80">{email.subject}</p>
                                            <p className="text-sm  truncate opacity-70">{email?.content?.email_body?.slice(0, 100)}</p>
                                        </div>
                                        <Circle className="w-2 h-2 text-blue-500 ml-2 flex-shrink-0" />
                                    </div>
                                ))}

                                {
                                    indexMails && indexMails.length == 0 &&
                                    <div className='flex items-center justify-center h-[80vh]'>
                                        <h1 className='text-[24px] font-semibold dark:text-white text-black'>No emails found</h1>
                                    </div>
                                }
                            </div>
                        }

                        {
                            activeTab === 'outbox' &&
                            <div className="overflow-y-auto h-[88vh] px-4 space-y-2 mt-2">
                                {outboxMails && outboxMails.length != 0 && outboxMails.map((email) => (
                                    <div key={email.email_id} className={`flex items-start p-4 hover:bg-gray-10/80 rounded-md cursor-pointer text-black dark:text-white ${selectedEmail?.email_id === email.email_id ? 'bg-gray-10/80' : ''}`} onClick={() => setSelectedEmail(email)}>
                                        <div className="flex-shrink-0 mr-4">
                                            {email.icon ? (
                                                <img src={email.icon} alt={email.from_addr} className="w-10 h-10 rounded-full" />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full dark:bg-gray-700 bg-gray-4 flex items-center justify-center">
                                                    <span className="text-lg font-semibold">{email.to_addr.split('')[0].toUpperCase()}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-sm font-semibold truncate">{email.to_addr.split('@')[0]}</h3>
                                                <span className="text-xs  whitespace-nowrap ml-2">{formatTimestampToTime(email.created_at)}</span>
                                            </div>
                                            <p className="text-sm font-medium  truncate opacity-80">{email.subject}</p>
                                            <p className="text-sm  truncate opacity-70">{email?.content?.email_body?.slice(0, 100)}</p>
                                        </div>
                                        <Circle className="w-2 h-2 text-blue-500 ml-2 flex-shrink-0" />
                                    </div>
                                ))}

                                {
                                    outboxMails && outboxMails.length == 0 &&
                                    <div className='flex items-center justify-center h-[80vh]'>
                                        <h1 className='text-[24px] font-semibold dark:text-white text-black'>No emails found</h1>
                                    </div>
                                }
                            </div>
                        }

                        {
                            activeTab === 'scheduled' &&
                            <div className="overflow-y-auto h-[88vh] px-4 space-y-2 mt-2">
                                {scheduledMails && scheduledMails.length != 0 && scheduledMails.map((email) => (
                                    <div key={email.email_id} className={`flex items-start p-4 hover:bg-gray-10/80 rounded-md cursor-pointer text-black dark:text-white ${selectedEmail?.email_id === email.email_id ? 'bg-gray-10/80' : ''}`} onClick={() => setSelectedEmail(email)}>
                                        <div className="flex-shrink-0 mr-4">
                                            {email.icon ? (
                                                <img src={email.icon} alt={email.from_addr} className="w-10 h-10 rounded-full" />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full dark:bg-gray-700 bg-gray-4 flex items-center justify-center">
                                                    <span className="text-lg font-semibold">{email.user_avtr}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-sm font-semibold truncate">{email.from_addr.split('@')[0]}</h3>
                                                <span className="text-xs  whitespace-nowrap ml-2">{formatTimestampToTime(email.created_at)}</span>
                                            </div>
                                            <p className="text-sm font-medium  truncate opacity-80">{email.subject}</p>
                                            <p className="text-sm  truncate opacity-70">{email?.content.email_body.slice(0, 100)}</p>
                                        </div>
                                        <Circle className="w-2 h-2 text-blue-500 ml-2 flex-shrink-0" />
                                    </div>
                                ))}
                            </div>
                        }


                    </div>

                    {/* Email Content */}
                    <div className="flex-grow dark:bg-gray-7 bg-white flex flex-col rounded-r-md">
                        {/* New Toolbar */}
                        <div className="border-b border-gray-4/30 p-2 flex items-center space-x-2 justify-between">
                            <div>
                                <button className="p-2 hover:bg-gray-700 rounded-full">
                                    <Archive className="w-5 h-5 text-gray-400" />
                                </button>
                                <button className="p-2 hover:bg-gray-700 rounded-full">
                                    <Trash2 className="w-5 h-5 text-gray-400" />
                                </button>
                                <button className="p-2 hover:bg-gray-700 rounded-full">
                                    <RefreshCw className="w-5 h-5 text-gray-400" />
                                </button>

                            </div>


                            <div>

                                <button className="p-2 hover:bg-gray-700 rounded-full">
                                    <CornerUpLeft className="w-5 h-5 text-gray-400" />
                                </button>
                                <button className="p-2 hover:bg-gray-700 rounded-full">
                                    <CornerUpRight className="w-5 h-5 text-gray-400" />
                                </button>
                                <button className="p-2 hover:bg-gray-700 rounded-full">
                                    <Share2 className="w-5 h-5 text-gray-400" />
                                </button>
                                <button className="p-2 hover:bg-gray-700 rounded-full">
                                    <FolderSymlink className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>


                            <div>
                                <button className="p-2 hover:bg-gray-700 rounded-full">
                                    <HelpCircle className="w-5 h-5 text-gray-400" />
                                </button>
                                <button className="p-2 hover:bg-gray-700 rounded-full">
                                    <Settings className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>
                        </div>
                        {
                            selectedEmail &&
                            <div className="p-6 overflow-y-auto">
                                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
                                    <div className="flex items-center mb-4 lg:mb-0">

                                        <div className="w-10 h-10 rounded-full dark:bg-gray-700 bg-gray-4 flex items-center justify-center mr-4">
                                            <span className="text-lg font-semibold">{selectedEmail?.user_avtr ? selectedEmail?.user_avtr : user?.primary_email?.split('')[0].toUpperCase()}</span>
                                        </div>

                                        <div>
                                            <h2 className="text-xl font-bold">{selectedEmail?.from_addr ? selectedEmail?.from_addr?.split('@')[0] : user?.primary_email?.split('@')[0]}</h2>
                                            <p className="text-sm text-gray-400">to: {selectedEmail?.to_addr}</p>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-400">{selectedEmail?.created_at ? formatCustomDate(selectedEmail?.created_at) : ''}</div>
                                </div>
                                <h1 className="text-[28px] font-medium mb-4">{selectedEmail?.subject}</h1>
                                <div className='text-[14px] text-gray-11 space-y-4'>
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{selectedEmail?.content?.email_body}</ReactMarkdown>
                                </div>

                                {selectedEmail?.content?.attachment_link && (
                                    <div className="w-full h-64 relative rounded-lg mb-6 mt-6">
                                        {selectedEmail.content.attachment_link.match(/\.(jpeg|jpg|gif|png)$/i) ? (
                                            <img src={selectedEmail.content.attachment_link} className='w-full h-full rounded-lg object-cover' alt="Email attachment" />
                                        ) : (
                                            <a href={selectedEmail.content.attachment_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                View Attachment
                                            </a>
                                        )}
                                    </div>
                                )}

                                <div className="flex space-x-4 mt-6">
                                    <button className="py-2 px-6 bg-black text-white dark:bg-white dark:text-black rounded-md font-medium">Reply</button>
                                    <button className="py-2 px-6 border border-black dark:border-white text-black dark:text-white rounded-md font-medium">Forward</button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            }

            {
                user && user.profiles.length == 0 &&
                <div className="flex-grow flex items-center flex-col gap-3 justify-center dark:bg-gray-7 bg-white min-h-[80vh] rounded-md">
                    <img src='/images/image-wrap.svg' className='w-[10rem]' />
                    <h1 className='text-[32px] font-semibold dark:text-white text-black'>Add a Mailbox!</h1>
                    <p className='text-[18px] font-normal dark:text-white text-black opacity-70'>The passage experienced a surge in popularity during the 1960s.</p>
                    <button onClick={() => setOpen(true)} className='bg-black dark:bg-white dark:text-black text-white rounded-md px-4 py-2 font-medium flex items-center gap-2'><PlusCircle /> Add New Mailbox </button>
                </div>
            }

            <DialogBox open={open} onClose={() => setOpen(false)}>
                <h2 className='text-[24px] font-semibold mb-4 dark:text-white text-black text-center'>iCloud Integration</h2>
                <p className='text-[16px] font-normal mb-4 dark:text-white text-black opacity-70 text-center'>The passage experienced a surge in popularity during the 1960s..</p>
                <form className='space-y-4' onSubmit={handleSubmit}>
                    <div className='flex flex-col'>
                        <label htmlFor="email" className='text-[16px] font-normal mb-2 dark:text-white text-black'>Email*</label>
                        <input type="email" id="email" name="email" placeholder='Enter your email' className='bg-white dark:bg-gray-10 border border-gray-9 dark:border-transparent rounded-md py-2 px-4 outline-none' required />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="password" className='text-[16px] font-normal mb-2 dark:text-white text-black'>Password*</label>
                        <input type="password" id="password" name="imap_pass" placeholder='Enter your password' className='bg-white dark:bg-gray-10 border border-gray-9 dark:border-transparent rounded-md py-2 px-4 outline-none' required />
                    </div>
                    <button className='bg-black dark:bg-white dark:text-black text-white rounded-md px-4 py-2 font-medium flex items-center gap-2 w-full justify-center !mt-8' type='submit'>Connect</button>
                </form>
            </DialogBox>



            <DialogBox open={openScheduled} onClose={() => setOpenScheduled(false)}>
                <h2 className='text-[24px] font-semibold mb-4 dark:text-white text-black text-center'>Schedule Email</h2>
                <form className='space-y-4' onSubmit={handleScheduleSubmit}>

                    <div className='flex flex-col'>
                        <label htmlFor="subject" className='text-[16px] font-normal mb-2 dark:text-white text-black'>Subject*</label>
                        <input type="text" id="subject" name="subject" placeholder='Enter email subject' className='bg-white dark:bg-gray-10 border border-gray-9 dark:border-transparent rounded-md py-2 px-4 outline-none' required />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="to_addr" className='text-[16px] font-normal mb-2 dark:text-white text-black'>To*</label>
                        <input type="email" id="to_addr" name="to_addr" placeholder='Enter recipient email' className='bg-white dark:bg-gray-10 border border-gray-9 dark:border-transparent rounded-md py-2 px-4 outline-none' required />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="body" className='text-[16px] font-normal mb-2 dark:text-white text-black'>Body*</label>
                        <textarea id="body" name="body" placeholder='Enter email body' className='bg-white dark:bg-gray-10 border border-gray-9 dark:border-transparent rounded-md py-2 px-4 outline-none' rows="4" required></textarea>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="send_time" className='text-[16px] font-normal mb-2 dark:text-white text-black'>Send Time*</label>
                        <input
                            type="datetime-local"
                            id="send_time"
                            name="send_time"
                            className='bg-white dark:bg-gray-10 border border-gray-9 dark:border-transparent rounded-md py-2 px-4 outline-none'
                            required
                            onChange={(e) => {
                                const date = new Date(e.target.value);
                                const etDate = new Date(date.toLocaleString("en-US", { timeZone: "America/New_York" }));
                                e.target.value = etDate.toISOString().slice(0, 19).replace('T', ' ');
                            }}
                        />
                    </div>
                    <button className='bg-black dark:bg-white dark:text-black text-white rounded-md px-4 py-2 font-medium flex items-center gap-2 w-full justify-center !mt-8' type='submit'>Schedule Email</button>
                </form>
            </DialogBox>

        </main>


    )
}