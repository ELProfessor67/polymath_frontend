"use client";
import ChatMessage from '@/components/ChatMessage';
import { emails } from '@/constants/emails';
import { getAllConversationRequest, onboardRequest, uploadOnboardKbRequest } from '@/http/apiCalls';
import { Send, EllipsisVertical, Smile } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';
import { toast } from 'react-toastify';

export default function page() {
    const [inputValue, setInputValue] = useState('')
    const [isDragging, setIsDragging] = useState(false)
    const [uploadedFile, setUploadedFile] = useState(null)
    const [conversations, setConversation] = useState([]);
    const [query, setQuery] = useState('');
    const [isAITyping, setIsAITyping] = useState(false);
    const [uploadProgressbar, setUploadProgressbar] = useState(0);

    const handleDragEnter = useCallback((e) => {
        e.preventDefault()
        setIsDragging(true)
    }, [])

    const handleDragLeave = useCallback((e) => {
        e.preventDefault()
        setIsDragging(false)
    }, [])

    const handleDragOver = useCallback((e) => {
        e.preventDefault()
    }, [])

    const handleDrop = useCallback((e) => {
        e.preventDefault()
        setIsDragging(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setUploadedFile(e.dataTransfer.files[0])
            handleOnboardKb(e.dataTransfer.files[0]);
        }
    }, [])

    const handleFileChange = useCallback((e) => {
        if (e.target.files && e.target.files[0]) {
            setUploadedFile(e.target.files[0])
            handleOnboardKb(e.target.files[0])
        }
    }, [])


    const getAllConversation = useCallback(async () => {
        try {
            const res = await getAllConversationRequest();
            setConversation(res.data.data);
            console.log(res.data.data, 'data')
        } catch (error) {
            console.log("Error getting all conversation:", error.message)
        }
    }, []);



    useEffect(() => {
        getAllConversation();
    }, []);


    //onboard
    const onboard = useCallback(async (e) => {
        e.preventDefault();
        try {
            const newUserConversation = {
                "created_at": new Date(Date.now()),
                "message": query,
                "message_by": "User"
            }
            setConversation(prev => [...prev, newUserConversation]);
            setQuery('');

            const formData = new FormData();
            formData.append('query', query);
            setIsAITyping(true)
            const res = await onboardRequest(formData);
            const newAIConversation = {
                "created_at": new Date(Date.now()),
                "message": res.data.response,
                "message_by": "AI"
            }
            setIsAITyping(false)
            setConversation(prev => [...prev, newAIConversation]);

        } catch (error) {
            setIsAITyping(false)
            console.log(error.message)
        }
    }, [query]);


    const handleOnboardKb = useCallback(async (file) => {
        try {
            const formData = new FormData();
            formData.append('file',file);
            const res = await uploadOnboardKbRequest(formData,setUploadProgressbar);
            setUploadProgressbar(0);
            toast.success(res.data.message);
        } catch (error) {
            console.log('Error during upload:',error.message)
        }
    },[]);





    return (

        <main className="flex-1 overflow-x-hidden overflow-y-auto  p-6">
            <div className=" dark:bg-gray-7 bg-white rounded-md dark:text-white text-black relative">
                <div className="flex items-center justify-between w-full py-3 px-4 border-gray-4/30 border-b">
                    <div className='flex items-cente'>
                        <div className="w-12 h-12 rounded-full relative mr-3">
                            <img src='/images/users/user-1.png' className='h-full w-full rounded-full' />
                        </div>
                        <div>
                            <h2 className="font-semibold">My AI Employee</h2>
                            <p className="text-sm text-gray-400">Online</p>
                        </div>
                    </div>

                    <button className='bg-none outline-none border-none'>
                        <EllipsisVertical />
                    </button>
                </div>
                <div className='flex flex-col md:flex-row '>
                    <div className="w-full md:w-1/4 p-4 border-r border-gray-4/30 h-fit md:h-[75vh]">

                        <div className="mb-8 mt-3">
                            <label htmlFor="website" className="block text-sm font-medium mb-2">Website URL*</label>
                            <input
                                type="text"
                                id="website"
                                className="w-full border border-white rounded-md bg-transparent outline-none p-2 text-white"
                                placeholder="Enter website url"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                        </div>
                        <div
                            className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${isDragging ? 'border-blue-500 bg-blue-500 bg-opacity-10' : 'border-gray-600'
                                }`}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            <input
                                type="file"
                                id="fileUpload"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <label htmlFor="fileUpload" className="cursor-pointer">
                                {uploadProgressbar != 0 ? (
                                    <p>{uploadProgressbar}%</p>
                                ) : (
                                    <>
                                        <p className="mb-2">Drag & Drop files here</p>
                                        <p className="text-sm text-gray-400">or click to select files</p>
                                    </>
                                )}
                            </label>
                        </div>
                    </div>


                    <div className="h-[75vh] relative flex flex-col overflow-hidden flex-1 dark:bg-gray-8 bg-white dark:text-white text-black">
                        <ScrollToBottom className="h-[85%] overflow-y-auto p-4">
                            {conversations && conversations.map((conversation) => (

                                <ChatMessage sender={conversation.message_by == 'User' ? "Me" : "AI"} time={conversation.created_at} message={conversation.message} isUser={conversation.message_by == 'User'} />


                            ))}
                            {
                                isAITyping &&
                                <div className={`flex mb-4 justify-start`}>

                                    <div className="w-8 h-8 rounded-full relative mr-2 flex-shrink-0">
                                        <img src="/images/users/user-1.png" className="w-full h-full rounded-full" />
                                    </div>

                                    <div className={`w-[10rem] flex items-center justify-center bg-gray-7 rounded-lg p-4`}>
                                        <div className="col-3">
                                            <div className="snippet" data-title="dot-typing">
                                                <div className="stage">
                                                    <div className="dot-typing"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            }



                        </ScrollToBottom>

                        <form className='h-[15%] dark:bg-gray-7 bg-white border-t dark:border-gray-6 border-gray-4/30 relative bottom-0 z-10 flex items-center px-5' onSubmit={onboard}>
                            <div className='flex items-center gap-2 flex-1 relative'>
                                <span className='text-gray-4'><Smile /></span>

                                <input className='border-none outline-none bg-transparent text-[14px] font-normal w-full' placeholder='Type message...' value={query} onChange={(e) => setQuery(e.target.value)} />
                            </div>

                            <button className='bg-black dark:bg-white text-white dark:text-black flex items-center gap-2 py-2 px-4 rounded-md font-medium' type='submit'>
                                Send
                                <span><Send size={16} /></span>

                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </main>


    )
}