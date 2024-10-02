import { formatTimestampToTime } from '@/lib/formatDate'


export default function ChatMessage({ sender, time, message, isUser = false }) {
    return (
        <div className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && (
                <div className="w-8 h-8 rounded-full relative mr-2 flex-shrink-0">
                    <img src="/images/users/user-1.png" className="w-full h-full rounded-full" />
                </div>
            )}
            <div className={`max-w-xs md:max-w-md ${isUser ? 'bg-dark-blue' : 'bg-gray-7'} rounded-lg p-3`}>
                <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-white">{sender}</span>
                    <span className="text-xs text-gray-400 ml-3">{formatTimestampToTime(time)}</span>
                </div>
                <p className="text-sm text-white">{message}</p>
            </div>
            {isUser && (
                <div className="w-8 h-8 rounded-full relative mr-2 flex-shrink-0 ml-2">
                    <img src="/images/users/user-3.png" className="w-full h-full rounded-full" />
                </div>
            )}
        </div>
    )
}