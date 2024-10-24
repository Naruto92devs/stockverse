export default function StockVerse_GPT_History({ chatHistory }) {
    return (
        <div className="flex flex-col gap-1">
            {chatHistory && chatHistory.length > 0 ? (
                chatHistory
                    .filter(chat => chat.title !== null)  // Filter out chats with null titles
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))  // Sort by latest created_at
                    .map((chat) => (
                        <div key={chat.chat_id} className="p-3 bg-primaryText/10 rounded-lg w-full ">
                            <div className="w-[80%] overflow-x-hidden">
                                <p className="text-base font-sansMedium w-max">{chat.title}</p>
                            </div>
                            {/* <p className="text-xs text-gray-500">
                                {chat.created_at ? new Date(chat.created_at).toLocaleString() : 'No date available'}
                            </p> */}
                        </div>
                    ))
            ) : (
                <p>No conversation history available</p>
            )}
        </div>
    );
}