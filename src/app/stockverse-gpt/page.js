'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Stockverse_GPT() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [userid, setUserid] = useState('');
    const [chatId, setChatId] = useState('');
    const [command, setCommand] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [chatHistory, setChatHistory] = useState(null);

    // Load userInfo and chatHistory from sessionStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedUserInfo = localStorage.getItem('UserInfo');
            const savedChatHistory = localStorage.getItem('ChatHistory');
            
            if (savedUserInfo) {
                const parsedUserInfo = JSON.parse(savedUserInfo);
                setUserInfo(parsedUserInfo);
                setUserid(parsedUserInfo.user.userid);
            }

            if (savedChatHistory) {
                setChatHistory(JSON.parse(savedChatHistory)); // Render from sessionStorage
            }
        }
    }, []); // Run only once on mount

    // UseEffect to run fetchChatHistory only when userid is set
    useEffect(() => {
        if (userid) {
            fetchChatHistory();
        }
    }, [userid]);  // Dependency array with userid ensures it runs only after userid is set

    const fetchChatHistory = async () => {
        setLoading(true);
        try {
            const response = await axios.post('https://devsalman.tech/conversation-history', {
                userid,  // Ensure userid is passed correctly
            }, {
                withCredentials: true,
            });

            const data = response.data;
            if (response.status === 200) {
                setChatHistory(data.response); // Update the state with new history
                localStorage.setItem('ChatHistory', JSON.stringify(data.response)); // Store in sessionStorage
            } else {
                setMessage(data.message || 'Something went wrong');
            }
            setLoading(false);
        } catch (error) {
            setMessage('An error occurred. Please try again.');
            console.error('Error fetching chat history:', error);
            setLoading(false);
        }
    };

    const handleCreateNewChat = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const response = await axios.post('https://devsalman.tech/add-conversation', { userid }, { withCredentials: true });
            if (response.status === 207) {
                setChatId(response.data.chat_id);
                setMessage(response.data.message);
            } else {
                setMessage(response.data.message || 'Something went wrong');
            }
            setLoading(false);
        } catch (error) {
            setMessage('An error occurred. Please try again.');
            setLoading(false);
            console.error('Error during chat creation:', error);
        }
    };

    const handleSubmitCommand = async (e) => {
        setLoading(true);
        setQuestion(command);
        e.preventDefault();
        try {
            const response = await axios.post('https://devsalman.tech/stockgpt', { chatId, command }, { withCredentials: true });
            if (response.status === 207) {
                setAnswer(response.data.answer);
                setMessage(response.data.message);
            } else {
                setMessage(response.data.message || 'Something went wrong');
            }
            setCommand('');
            setLoading(false);
        } catch (error) {
            setMessage('An error occurred. Please try again.');
            setLoading(false);
            console.error('Error during command submission:', error);
        }
    };

    const ConversationIdHistory = async (chatId) => {
        setLoading(true);
        // e.preventDefault();
    
        try {
            const response = await axios.post('https://devsalman.tech/chat-history', {
            chatId,
            }, {
                withCredentials: true,
            });
    
            const data = response.data;
            console.log(data);
            if (response.status === 206) {
                console.log(data);
            } else {
                setMessage(data.message || 'Something went wrong');
                setLoading(false);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.message || 'Something went wrong');
                setLoading(false);
            } else {
                setMessage('An error occurred. Please try again.');
                setLoading(false);
            }
            console.error('Error during signup:', error);
        }
    };
    
    
    const DeleteChatId = async (chatId) => {
    setLoading(true);
    // e.preventDefault();

    try {
        const response = await axios.post('https://devsalman.tech/delete-chat', {
        chatId,
        }, {
            withCredentials: true,
        });

        const data = response.data;
        console.log(data);
        if (response.status === 207) {
            console.log(data);
        } else {
            setMessage(data.message || 'Something went wrong');
            setLoading(false);
        }
    } catch (error) {
        if (error.response && error.response.data) {
            setMessage(error.response.data.message || 'Something went wrong');
            setLoading(false);
        } else {
            setMessage('An error occurred. Please try again.');
            setLoading(false);
        }
        console.error('Error during signup:', error);
    }
    };

    return (
        <section className="flex items-start h-[94.5dvh] relative">
            <div className="p-2 gap-4 h-[100%] bg-background w-[18rem] max-lg:absolute top-0 left-0 overflow-y-scroll scrollbar-thin">
                <div className="flex flex-col gap-2">
                    {chatHistory && chatHistory.length > 0 ? (
                        chatHistory
                            .filter(chat => chat.title !== null)  // Filter out chats with null titles
                            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))  // Sort by latest created_at
                            .map((chat) => (
                                <div onClick={() => ConversationIdHistory(chat.chat_id)} key={chat.chat_id} className="cursor-pointer p-3 relative flex items-center bg-primaryText/10 rounded-lg w-full ">
                                        {/* <svg className="absolute right-3 z-4" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.8884 2.33337H9.11171C4.86504 2.33337 2.33337 4.86504 2.33337 9.11171V18.8767C2.33337 23.135 4.86504 25.6667 9.11171 25.6667H18.8767C23.1234 25.6667 25.655 23.135 25.655 18.8884V9.11171C25.6667 4.86504 23.135 2.33337 18.8884 2.33337ZM18.3867 18.3867C18.3167 19.3784 18.235 20.615 15.995 20.615H12.005C9.77671 20.615 9.68337 19.3784 9.61337 18.3867L9.25171 13.7667C9.22837 13.4634 9.33337 13.1717 9.53171 12.95C9.73004 12.7284 10.0217 12.6117 10.3134 12.6117H17.6867C17.9784 12.6117 18.27 12.74 18.4684 12.95C18.6667 13.1717 18.7717 13.4634 18.7484 13.755L18.3867 18.3867ZM19.6 11.4567C19.5767 11.4567 19.5534 11.4567 19.53 11.4567C18.3167 11.34 17.2084 11.2584 16.1467 11.2117C14.7234 11.1417 13.3 11.1184 11.865 11.1767C11.165 11.2117 10.4534 11.2584 9.75337 11.3284L8.48171 11.4567C8.45837 11.4567 8.42337 11.4567 8.40004 11.4567C7.99171 11.4567 7.64171 11.1534 7.60671 10.7334C7.56004 10.3017 7.88671 9.90504 8.31837 9.87004L9.59004 9.74171C10.0917 9.69504 10.5817 9.66004 11.0834 9.63671L11.1767 9.08837C11.27 8.50504 11.445 7.38504 13.195 7.38504H14.8167C16.5784 7.38504 16.7534 8.54004 16.835 9.10004L16.9284 9.66004C17.8034 9.70671 18.7017 9.77671 19.6817 9.87004C20.125 9.91671 20.44 10.3017 20.405 10.745C20.3584 11.1534 20.0084 11.4567 19.6 11.4567Z" fill="var(--svg-color)"/>
                                        </svg> */}
                                    <div className="flex gap-1 absolute right-3 z-4">
                                        <svg className="cursor-pointer" width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M27.5966 3.99499L27.9932 4.80249C28.1916 5.19915 28.6874 5.56749 29.1266 5.65249L29.6649 5.73749C31.2799 6.00665 31.6624 7.19665 30.5007 8.37249L30.0049 8.86832C29.6791 9.20832 29.4949 9.85999 29.5941 10.3133L29.6649 10.6108C30.1041 12.5658 29.0699 13.3167 27.3699 12.2967L27.0016 12.0842C26.5624 11.8292 25.8541 11.8292 25.4149 12.0842L25.0466 12.2967C23.3324 13.3308 22.2982 12.5658 22.7516 10.6108L22.8224 10.3133C22.9216 9.85999 22.7374 9.20832 22.4116 8.86832L21.9157 8.35832C20.7541 7.18249 21.1366 5.99249 22.7516 5.72332L23.2899 5.63832C23.7149 5.56749 24.2249 5.18499 24.4232 4.78832L24.8199 3.98082C25.5849 2.45082 26.8316 2.45082 27.5966 3.99499Z" fill="var(--svg-color)"/>
                                        <path d="M30.5575 14.2942C30.0475 14.6625 28.6167 15.3425 26.5767 14.2942C26.35 14.1809 26.0667 14.1667 25.84 14.2942C25.0325 14.705 24.2959 14.875 23.715 14.875C22.8084 14.875 22.1709 14.5209 21.8592 14.2942C21.335 13.9117 20.23 12.8209 20.6125 10.5117C20.655 10.2709 20.5842 10.03 20.4284 9.84587C19.4509 8.72671 18.9125 7.22504 19.295 6.04921C19.4367 5.58171 19.1392 4.95837 18.6575 4.95837H9.91671C5.66671 4.95837 2.83337 7.08337 2.83337 12.0417V21.9584C2.83337 26.9167 5.66671 29.0417 9.91671 29.0417H24.0834C28.3334 29.0417 31.1667 26.9167 31.1667 21.9584V14.5492C31.1667 14.28 30.7842 14.1384 30.5575 14.2942ZM20.315 17.1275C19.38 17.8784 18.19 18.2467 17 18.2467C15.81 18.2467 14.6059 17.8784 13.685 17.1275L9.25087 13.5859C8.79754 13.2175 8.72671 12.5375 9.08087 12.0842C9.44921 11.6309 10.115 11.5459 10.5684 11.9142L15.0025 15.4559C16.0792 16.32 17.9067 16.32 18.9834 15.4559C19.4367 15.0875 20.1025 15.1584 20.4709 15.6259C20.8534 16.0792 20.7825 16.7592 20.315 17.1275Z" fill="var(--svg-color)"/>
                                        </svg>

                                        <svg onClick={() => DeleteChatId(chat.chat_id)} className="cursor-pointer" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M25.6504 5.7583C23.6904 5.56352 21.7304 5.41743 19.7582 5.30787V5.29569L19.4904 3.71309C19.3078 2.59309 19.04 0.913086 16.1913 0.913086H13.0017C10.1652 0.913086 9.89735 2.52004 9.70257 3.70091L9.44692 5.25917C8.31475 5.33222 7.18257 5.40526 6.0504 5.51482L3.56692 5.7583C3.05562 5.807 2.6904 6.25743 2.73909 6.75656C2.78779 7.25569 3.22605 7.62091 3.73735 7.57222L6.22083 7.32874C12.6 6.69569 19.0278 6.93917 25.48 7.58439C25.5165 7.58439 25.5408 7.58439 25.5774 7.58439C26.04 7.58439 26.4417 7.23135 26.4904 6.75656C26.5269 6.25743 26.1617 5.807 25.6504 5.7583Z" fill="var(--svg-color)"/>
                                        <path d="M23.4105 9.30095C23.1183 8.99661 22.7166 8.82617 22.3026 8.82617H6.91482C6.5009 8.82617 6.08699 8.99661 5.80699 9.30095C5.52699 9.6053 5.36873 10.0192 5.39308 10.4453L6.14786 22.9357C6.28177 24.7862 6.45221 27.0992 10.7009 27.0992H18.5166C22.7653 27.0992 22.9357 24.7983 23.0696 22.9357L23.8244 10.4575C23.8487 10.0192 23.6905 9.6053 23.4105 9.30095ZM16.6296 21.0001H12.5757C12.0766 21.0001 11.6626 20.5862 11.6626 20.087C11.6626 19.5879 12.0766 19.174 12.5757 19.174H16.6296C17.1287 19.174 17.5426 19.5879 17.5426 20.087C17.5426 20.5862 17.1287 21.0001 16.6296 21.0001ZM17.6522 16.1305H11.5653C11.0661 16.1305 10.6522 15.7166 10.6522 15.2175C10.6522 14.7183 11.0661 14.3044 11.5653 14.3044H17.6522C18.1513 14.3044 18.5653 14.7183 18.5653 15.2175C18.5653 15.7166 18.1513 16.1305 17.6522 16.1305Z" fill="var(--svg-color)"/>
                                        </svg>
                                    </div>
                                    <div className="z-2 w-[70%] overflow-x-hidden">
                                        <p className="text-md font-sansMedium w-max">
                                            {chat.title.length > 20 ? `${chat.title.substring(0, 20)}...` : chat.title}
                                        </p>
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
            </div>
            <div className="flex flex-col items-end gap-4 w-[80%]">
                <button
                    onClick={handleCreateNewChat}
                    disabled={loading}
                    type="button"
                    className="w-max px-4 bg-primaryButtonBg text-base text-primaryButtonText py-2 hover:bg-secondaryHeading hover:text-mobNavLink transition duration-300"
                >
                    {loading ? 'Loading...' : 'New Chat'}
                </button>
                <p className="text-3xl">{chatId}</p>
                <p className="text-3xl">{question}</p>
                <p className="text-3xl">{answer}</p>
                <form onSubmit={handleSubmitCommand} className="w-[50%] flex flex-col space-y-4">
                    <div className="flex flex-col gap-y-8">
                        <div className="w-full flex flex-col gap-y-2">
                            <label htmlFor="question" className="text-md font-Medium text-primaryText">
                                Question
                            </label>
                            <textarea
                                id="question"
                                autoComplete="off"
                                required
                                value={command}
                                onChange={(e) => setCommand(e.target.value)}
                                placeholder="Enter your inquiry"
                                className="w-full text-lg px-4 py-2 border-2 bg-background text-primaryText border-primaryText/10 focus:outline-none focus:border-primaryText h-12 resize-none"
                            />
                        </div>
                    </div>
                    <div className="w-full py-4 flex justify-end">
                        <button
                            disabled={loading}
                            type="submit"
                            className="w-max px-4 bg-primaryButtonBg text-base text-primaryButtonText py-2 hover:bg-secondaryHeading hover:text-mobNavLink transition duration-300"
                        >
                            {loading ? 'Analyzing...' : 'Ask'}
                        </button>
                    </div>
                </form>
                {message && <p className="mt-4 text-red-600 text-center">{message}</p>}
            </div>
        </section>
    );
}