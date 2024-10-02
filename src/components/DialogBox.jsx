import { X, XCircle } from 'lucide-react'
import React from 'react'

const DialogBox = ({open, onClose, children}) => {
  return (
   <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 h-screen w-screen p-5  ${open ? 'block' : 'hidden'}`}>
    <div className='bg-white dark:bg-gray-7 rounded-md p-4 max-w-2xl mx-auto my-auto mt-24 md:mt-36'>
        <div className='flex justify-end'>
            <button onClick={onClose} className='text-black dark:text-white'><XCircle /></button>
        </div>
        {children}
    </div>
   </div>
  )
}

export default DialogBox