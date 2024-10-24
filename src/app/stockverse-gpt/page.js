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
    const [sidebarHide, setSidebarHide] = useState(false);
    const [favouriteStatus, setFavouriteStatus] = useState({}); // Track favorite status for each chat

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

    const FavouriteChatId = async (chatId) => {

        // Find the current chat in chatHistory
        const chat = chatHistory.find(chat => chat.chat_id === chatId);
        const isFavourite = chat.favourite;  // Get the current favorite status
    
        try {
            const response = await axios.post('https://devsalman.tech/favourite-chat', {
            chatId,
            }, {
                withCredentials: true,
            });
    
            const data = response.data;
            console.log(data);
            if (response.status === 207 || response.status === 201) {
                // Update the favourite status in chatHistory
                setChatHistory(prevHistory =>
                    prevHistory.map(chat =>
                        chat.chat_id === chatId
                            ? { ...chat, favourite: !isFavourite }  // Toggle the status
                            : chat
                    )
                );
                // Update the favorite status in the favouriteStatus object for real-time UI update
                setFavouriteStatus(prev => ({
                    ...prev,
                    [chatId]: !isFavourite ? 'green' : 'var(--svg-color)'  // Toggle color
                }));
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

    const toggleSidebar = () => {
        setSidebarHide(!sidebarHide);
    };

    const getSvgFillColor = (chat) => {
        // First, check the favoriteStatus to handle real-time updates; fallback to initial chat.favourite
        return favouriteStatus[chat.chat_id] === 'green' || chat.favourite ? 'green' : 'var(--svg-color)';
    };

    return (
        <section className="flex items-start h-[94.5dvh] relative ">
            {/* web view side bar */}
            <div style={{ width: sidebarHide ? '0' : '18rem', transition: 'width 300ms ease-in-out',}} 
            className={`max-lg:hidden transition-width duration-300 ease-in-out flex flex-col h-[100%] w-[18rem] overflow-x-hidden`}>
                <div className="bg-background w-full p-2 flex justify-between">
                    <svg onClick={toggleSidebar} className="cursor-pointer" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32.38 4H15.62C8.34 4 4 8.34 4 15.62V32.36C4 39.66 8.34 44 15.62 44H32.36C39.64 44 43.98 39.66 43.98 32.38V15.62C44 8.34 39.66 4 32.38 4ZM34 34.5H14C13.18 34.5 12.5 33.82 12.5 33C12.5 32.18 13.18 31.5 14 31.5H34C34.82 31.5 35.5 32.18 35.5 33C35.5 33.82 34.82 34.5 34 34.5ZM34 25.5H14C13.18 25.5 12.5 24.82 12.5 24C12.5 23.18 13.18 22.5 14 22.5H34C34.82 22.5 35.5 23.18 35.5 24C35.5 24.82 34.82 25.5 34 25.5ZM34 16.5H14C13.18 16.5 12.5 15.82 12.5 15C12.5 14.18 13.18 13.5 14 13.5H34C34.82 13.5 35.5 14.18 35.5 15C35.5 15.82 34.82 16.5 34 16.5Z" fill="var(--svg-color)"/>
                    </svg>
                    <svg onClick={handleCreateNewChat} className="cursor-pointer" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32 4H16C8 4 4 8 4 16V42C4 43.1 4.9 44 6 44H32C40 44 44 40 44 32V16C44 8 40 4 32 4ZM22.22 33.32C21.72 33.82 20.8 34.28 20.12 34.38L15.96 34.96C15.8 34.98 15.64 35 15.5 35C14.8 35 14.16 34.76 13.7 34.3C13.14 33.74 12.9 32.92 13.04 32.04L13.62 27.88C13.72 27.2 14.18 26.26 14.68 25.78L22.22 18.24C22.34 18.6 22.5 18.96 22.68 19.36C22.86 19.72 23.04 20.08 23.24 20.42C23.4 20.7 23.58 20.98 23.74 21.18C23.94 21.48 24.14 21.74 24.28 21.88C24.36 22 24.44 22.08 24.46 22.12C24.9 22.62 25.36 23.1 25.8 23.46C25.92 23.58 26 23.64 26.02 23.66C26.28 23.86 26.52 24.08 26.76 24.22C27.02 24.42 27.3 24.6 27.58 24.76C27.92 24.96 28.28 25.16 28.66 25.34C29.04 25.52 29.4 25.66 29.76 25.78L22.22 33.32ZM33.1 22.46L31.54 24.02C31.44 24.12 31.3 24.18 31.16 24.18C31.12 24.18 31.04 24.18 31 24.16C27.56 23.18 24.82 20.44 23.84 17C23.78 16.82 23.84 16.62 23.98 16.48L25.56 14.9C28.14 12.32 30.58 12.38 33.1 14.9C34.38 16.18 35.02 17.42 35 18.7C35 19.96 34.38 21.18 33.1 22.46Z" fill="var(--svg-color)"/>
                    </svg>
                </div>
                <div className="p-2 gap-4 h-[100%] bg-background w-full overflow-y-scroll scrollbar-thin">
                    <div className="flex flex-col gap-2">
                        {chatHistory && chatHistory.length > 0 ? (
                            chatHistory
                                .filter(chat => chat.title !== null)  // Filter out chats with null titles
                                .sort((a, b) => {
                                    // Sort by favorite first, then by created_at
                                    if (a.favourite === b.favourite) {
                                        return new Date(b.created_at) - new Date(a.created_at);  // Sort by date if favorite status is the same
                                    }
                                    return a.favourite ? -1 : 1;  // Prioritize favorite chats
                                })
                                .map((chat) => (
                                    <div  key={chat.chat_id} className="cursor-pointer p-3 relative flex items-center bg-primaryText/10 rounded-lg w-full ">
                                            {/* <svg className="absolute right-3 z-4" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18.8884 2.33337H9.11171C4.86504 2.33337 2.33337 4.86504 2.33337 9.11171V18.8767C2.33337 23.135 4.86504 25.6667 9.11171 25.6667H18.8767C23.1234 25.6667 25.655 23.135 25.655 18.8884V9.11171C25.6667 4.86504 23.135 2.33337 18.8884 2.33337ZM18.3867 18.3867C18.3167 19.3784 18.235 20.615 15.995 20.615H12.005C9.77671 20.615 9.68337 19.3784 9.61337 18.3867L9.25171 13.7667C9.22837 13.4634 9.33337 13.1717 9.53171 12.95C9.73004 12.7284 10.0217 12.6117 10.3134 12.6117H17.6867C17.9784 12.6117 18.27 12.74 18.4684 12.95C18.6667 13.1717 18.7717 13.4634 18.7484 13.755L18.3867 18.3867ZM19.6 11.4567C19.5767 11.4567 19.5534 11.4567 19.53 11.4567C18.3167 11.34 17.2084 11.2584 16.1467 11.2117C14.7234 11.1417 13.3 11.1184 11.865 11.1767C11.165 11.2117 10.4534 11.2584 9.75337 11.3284L8.48171 11.4567C8.45837 11.4567 8.42337 11.4567 8.40004 11.4567C7.99171 11.4567 7.64171 11.1534 7.60671 10.7334C7.56004 10.3017 7.88671 9.90504 8.31837 9.87004L9.59004 9.74171C10.0917 9.69504 10.5817 9.66004 11.0834 9.63671L11.1767 9.08837C11.27 8.50504 11.445 7.38504 13.195 7.38504H14.8167C16.5784 7.38504 16.7534 8.54004 16.835 9.10004L16.9284 9.66004C17.8034 9.70671 18.7017 9.77671 19.6817 9.87004C20.125 9.91671 20.44 10.3017 20.405 10.745C20.3584 11.1534 20.0084 11.4567 19.6 11.4567Z" fill="var(--svg-color)"/>
                                            </svg> */}
                                        <div className="flex gap-1 absolute right-3">
                                            <svg onClick={() => FavouriteChatId(chat.chat_id)} className="cursor-pointer" width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M27.5966 3.99499L27.9932 4.80249C28.1916 5.19915 28.6874 5.56749 29.1266 5.65249L29.6649 5.73749C31.2799 6.00665 31.6624 7.19665 30.5007 8.37249L30.0049 8.86832C29.6791 9.20832 29.4949 9.85999 29.5941 10.3133L29.6649 10.6108C30.1041 12.5658 29.0699 13.3167 27.3699 12.2967L27.0016 12.0842C26.5624 11.8292 25.8541 11.8292 25.4149 12.0842L25.0466 12.2967C23.3324 13.3308 22.2982 12.5658 22.7516 10.6108L22.8224 10.3133C22.9216 9.85999 22.7374 9.20832 22.4116 8.86832L21.9157 8.35832C20.7541 7.18249 21.1366 5.99249 22.7516 5.72332L23.2899 5.63832C23.7149 5.56749 24.2249 5.18499 24.4232 4.78832L24.8199 3.98082C25.5849 2.45082 26.8316 2.45082 27.5966 3.99499Z" fill={getSvgFillColor(chat)}/>
                                            <path d="M30.5575 14.2942C30.0475 14.6625 28.6167 15.3425 26.5767 14.2942C26.35 14.1809 26.0667 14.1667 25.84 14.2942C25.0325 14.705 24.2959 14.875 23.715 14.875C22.8084 14.875 22.1709 14.5209 21.8592 14.2942C21.335 13.9117 20.23 12.8209 20.6125 10.5117C20.655 10.2709 20.5842 10.03 20.4284 9.84587C19.4509 8.72671 18.9125 7.22504 19.295 6.04921C19.4367 5.58171 19.1392 4.95837 18.6575 4.95837H9.91671C5.66671 4.95837 2.83337 7.08337 2.83337 12.0417V21.9584C2.83337 26.9167 5.66671 29.0417 9.91671 29.0417H24.0834C28.3334 29.0417 31.1667 26.9167 31.1667 21.9584V14.5492C31.1667 14.28 30.7842 14.1384 30.5575 14.2942ZM20.315 17.1275C19.38 17.8784 18.19 18.2467 17 18.2467C15.81 18.2467 14.6059 17.8784 13.685 17.1275L9.25087 13.5859C8.79754 13.2175 8.72671 12.5375 9.08087 12.0842C9.44921 11.6309 10.115 11.5459 10.5684 11.9142L15.0025 15.4559C16.0792 16.32 17.9067 16.32 18.9834 15.4559C19.4367 15.0875 20.1025 15.1584 20.4709 15.6259C20.8534 16.0792 20.7825 16.7592 20.315 17.1275Z" fill="var(--svg-color)"/>
                                            </svg>

                                            <svg onClick={() => DeleteChatId(chat.chat_id)} className="cursor-pointer" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M25.6504 5.7583C23.6904 5.56352 21.7304 5.41743 19.7582 5.30787V5.29569L19.4904 3.71309C19.3078 2.59309 19.04 0.913086 16.1913 0.913086H13.0017C10.1652 0.913086 9.89735 2.52004 9.70257 3.70091L9.44692 5.25917C8.31475 5.33222 7.18257 5.40526 6.0504 5.51482L3.56692 5.7583C3.05562 5.807 2.6904 6.25743 2.73909 6.75656C2.78779 7.25569 3.22605 7.62091 3.73735 7.57222L6.22083 7.32874C12.6 6.69569 19.0278 6.93917 25.48 7.58439C25.5165 7.58439 25.5408 7.58439 25.5774 7.58439C26.04 7.58439 26.4417 7.23135 26.4904 6.75656C26.5269 6.25743 26.1617 5.807 25.6504 5.7583Z" fill="var(--svg-color)"/>
                                            <path d="M23.4105 9.30095C23.1183 8.99661 22.7166 8.82617 22.3026 8.82617H6.91482C6.5009 8.82617 6.08699 8.99661 5.80699 9.30095C5.52699 9.6053 5.36873 10.0192 5.39308 10.4453L6.14786 22.9357C6.28177 24.7862 6.45221 27.0992 10.7009 27.0992H18.5166C22.7653 27.0992 22.9357 24.7983 23.0696 22.9357L23.8244 10.4575C23.8487 10.0192 23.6905 9.6053 23.4105 9.30095ZM16.6296 21.0001H12.5757C12.0766 21.0001 11.6626 20.5862 11.6626 20.087C11.6626 19.5879 12.0766 19.174 12.5757 19.174H16.6296C17.1287 19.174 17.5426 19.5879 17.5426 20.087C17.5426 20.5862 17.1287 21.0001 16.6296 21.0001ZM17.6522 16.1305H11.5653C11.0661 16.1305 10.6522 15.7166 10.6522 15.2175C10.6522 14.7183 11.0661 14.3044 11.5653 14.3044H17.6522C18.1513 14.3044 18.5653 14.7183 18.5653 15.2175C18.5653 15.7166 18.1513 16.1305 17.6522 16.1305Z" fill="var(--svg-color)"/>
                                            </svg>
                                        </div>
                                        <div className="w-[70%] overflow-x-hidden">
                                            <p onClick={() => ConversationIdHistory(chat.chat_id)} className="text-md font-sansMedium w-max">
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
            </div>
            {/* Mob view side bar */}
            <div style={{ width: sidebarHide ? '80%' : '0', transition: 'width 300ms ease-in-out',}} 
            className={`lg:hidden absolute top-0 left-0 transition-width duration-300 ease-in-out flex flex-col h-[100%] w-[18rem] overflow-x-hidden`}>
                <div className="bg-background w-full p-2 flex justify-between">
                    <svg onClick={toggleSidebar} className="cursor-pointer" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32.38 4H15.62C8.34 4 4 8.34 4 15.62V32.36C4 39.66 8.34 44 15.62 44H32.36C39.64 44 43.98 39.66 43.98 32.38V15.62C44 8.34 39.66 4 32.38 4ZM34 34.5H14C13.18 34.5 12.5 33.82 12.5 33C12.5 32.18 13.18 31.5 14 31.5H34C34.82 31.5 35.5 32.18 35.5 33C35.5 33.82 34.82 34.5 34 34.5ZM34 25.5H14C13.18 25.5 12.5 24.82 12.5 24C12.5 23.18 13.18 22.5 14 22.5H34C34.82 22.5 35.5 23.18 35.5 24C35.5 24.82 34.82 25.5 34 25.5ZM34 16.5H14C13.18 16.5 12.5 15.82 12.5 15C12.5 14.18 13.18 13.5 14 13.5H34C34.82 13.5 35.5 14.18 35.5 15C35.5 15.82 34.82 16.5 34 16.5Z" fill="var(--svg-color)"/>
                    </svg>
                    <svg onClick={handleCreateNewChat} className="cursor-pointer" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32 4H16C8 4 4 8 4 16V42C4 43.1 4.9 44 6 44H32C40 44 44 40 44 32V16C44 8 40 4 32 4ZM22.22 33.32C21.72 33.82 20.8 34.28 20.12 34.38L15.96 34.96C15.8 34.98 15.64 35 15.5 35C14.8 35 14.16 34.76 13.7 34.3C13.14 33.74 12.9 32.92 13.04 32.04L13.62 27.88C13.72 27.2 14.18 26.26 14.68 25.78L22.22 18.24C22.34 18.6 22.5 18.96 22.68 19.36C22.86 19.72 23.04 20.08 23.24 20.42C23.4 20.7 23.58 20.98 23.74 21.18C23.94 21.48 24.14 21.74 24.28 21.88C24.36 22 24.44 22.08 24.46 22.12C24.9 22.62 25.36 23.1 25.8 23.46C25.92 23.58 26 23.64 26.02 23.66C26.28 23.86 26.52 24.08 26.76 24.22C27.02 24.42 27.3 24.6 27.58 24.76C27.92 24.96 28.28 25.16 28.66 25.34C29.04 25.52 29.4 25.66 29.76 25.78L22.22 33.32ZM33.1 22.46L31.54 24.02C31.44 24.12 31.3 24.18 31.16 24.18C31.12 24.18 31.04 24.18 31 24.16C27.56 23.18 24.82 20.44 23.84 17C23.78 16.82 23.84 16.62 23.98 16.48L25.56 14.9C28.14 12.32 30.58 12.38 33.1 14.9C34.38 16.18 35.02 17.42 35 18.7C35 19.96 34.38 21.18 33.1 22.46Z" fill="var(--svg-color)"/>
                    </svg>
                </div>
                <div className={`${sidebarHide ? '' : ''} p-2 gap-4 h-[100%] bg-background w-full overflow-y-scroll scrollbar-thin`}>
                    <div className="flex flex-col gap-2">
                        {chatHistory && chatHistory.length > 0 ? (
                            chatHistory
                                .filter(chat => chat.title !== null)  // Filter out chats with null titles
                                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))  // Sort by latest created_at
                                .map((chat) => (
                                    <div key={chat.chat_id} className="cursor-pointer p-3 relative flex items-center bg-primaryText/10 rounded-lg w-full ">
                                            {/* <svg className="absolute right-3 z-4" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18.8884 2.33337H9.11171C4.86504 2.33337 2.33337 4.86504 2.33337 9.11171V18.8767C2.33337 23.135 4.86504 25.6667 9.11171 25.6667H18.8767C23.1234 25.6667 25.655 23.135 25.655 18.8884V9.11171C25.6667 4.86504 23.135 2.33337 18.8884 2.33337ZM18.3867 18.3867C18.3167 19.3784 18.235 20.615 15.995 20.615H12.005C9.77671 20.615 9.68337 19.3784 9.61337 18.3867L9.25171 13.7667C9.22837 13.4634 9.33337 13.1717 9.53171 12.95C9.73004 12.7284 10.0217 12.6117 10.3134 12.6117H17.6867C17.9784 12.6117 18.27 12.74 18.4684 12.95C18.6667 13.1717 18.7717 13.4634 18.7484 13.755L18.3867 18.3867ZM19.6 11.4567C19.5767 11.4567 19.5534 11.4567 19.53 11.4567C18.3167 11.34 17.2084 11.2584 16.1467 11.2117C14.7234 11.1417 13.3 11.1184 11.865 11.1767C11.165 11.2117 10.4534 11.2584 9.75337 11.3284L8.48171 11.4567C8.45837 11.4567 8.42337 11.4567 8.40004 11.4567C7.99171 11.4567 7.64171 11.1534 7.60671 10.7334C7.56004 10.3017 7.88671 9.90504 8.31837 9.87004L9.59004 9.74171C10.0917 9.69504 10.5817 9.66004 11.0834 9.63671L11.1767 9.08837C11.27 8.50504 11.445 7.38504 13.195 7.38504H14.8167C16.5784 7.38504 16.7534 8.54004 16.835 9.10004L16.9284 9.66004C17.8034 9.70671 18.7017 9.77671 19.6817 9.87004C20.125 9.91671 20.44 10.3017 20.405 10.745C20.3584 11.1534 20.0084 11.4567 19.6 11.4567Z" fill="var(--svg-color)"/>
                                            </svg> */}
                                        <div className="flex gap-1 absolute right-3">
                                            <svg onClick={() => FavouriteChatId(chat.chat_id)} className="cursor-pointer" width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M27.5966 3.99499L27.9932 4.80249C28.1916 5.19915 28.6874 5.56749 29.1266 5.65249L29.6649 5.73749C31.2799 6.00665 31.6624 7.19665 30.5007 8.37249L30.0049 8.86832C29.6791 9.20832 29.4949 9.85999 29.5941 10.3133L29.6649 10.6108C30.1041 12.5658 29.0699 13.3167 27.3699 12.2967L27.0016 12.0842C26.5624 11.8292 25.8541 11.8292 25.4149 12.0842L25.0466 12.2967C23.3324 13.3308 22.2982 12.5658 22.7516 10.6108L22.8224 10.3133C22.9216 9.85999 22.7374 9.20832 22.4116 8.86832L21.9157 8.35832C20.7541 7.18249 21.1366 5.99249 22.7516 5.72332L23.2899 5.63832C23.7149 5.56749 24.2249 5.18499 24.4232 4.78832L24.8199 3.98082C25.5849 2.45082 26.8316 2.45082 27.5966 3.99499Z" fill={getSvgFillColor(chat)}/>
                                            <path d="M30.5575 14.2942C30.0475 14.6625 28.6167 15.3425 26.5767 14.2942C26.35 14.1809 26.0667 14.1667 25.84 14.2942C25.0325 14.705 24.2959 14.875 23.715 14.875C22.8084 14.875 22.1709 14.5209 21.8592 14.2942C21.335 13.9117 20.23 12.8209 20.6125 10.5117C20.655 10.2709 20.5842 10.03 20.4284 9.84587C19.4509 8.72671 18.9125 7.22504 19.295 6.04921C19.4367 5.58171 19.1392 4.95837 18.6575 4.95837H9.91671C5.66671 4.95837 2.83337 7.08337 2.83337 12.0417V21.9584C2.83337 26.9167 5.66671 29.0417 9.91671 29.0417H24.0834C28.3334 29.0417 31.1667 26.9167 31.1667 21.9584V14.5492C31.1667 14.28 30.7842 14.1384 30.5575 14.2942ZM20.315 17.1275C19.38 17.8784 18.19 18.2467 17 18.2467C15.81 18.2467 14.6059 17.8784 13.685 17.1275L9.25087 13.5859C8.79754 13.2175 8.72671 12.5375 9.08087 12.0842C9.44921 11.6309 10.115 11.5459 10.5684 11.9142L15.0025 15.4559C16.0792 16.32 17.9067 16.32 18.9834 15.4559C19.4367 15.0875 20.1025 15.1584 20.4709 15.6259C20.8534 16.0792 20.7825 16.7592 20.315 17.1275Z" fill="var(--svg-color)"/>
                                            </svg>

                                            <svg onClick={() => DeleteChatId(chat.chat_id)} className="cursor-pointer" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M25.6504 5.7583C23.6904 5.56352 21.7304 5.41743 19.7582 5.30787V5.29569L19.4904 3.71309C19.3078 2.59309 19.04 0.913086 16.1913 0.913086H13.0017C10.1652 0.913086 9.89735 2.52004 9.70257 3.70091L9.44692 5.25917C8.31475 5.33222 7.18257 5.40526 6.0504 5.51482L3.56692 5.7583C3.05562 5.807 2.6904 6.25743 2.73909 6.75656C2.78779 7.25569 3.22605 7.62091 3.73735 7.57222L6.22083 7.32874C12.6 6.69569 19.0278 6.93917 25.48 7.58439C25.5165 7.58439 25.5408 7.58439 25.5774 7.58439C26.04 7.58439 26.4417 7.23135 26.4904 6.75656C26.5269 6.25743 26.1617 5.807 25.6504 5.7583Z" fill="var(--svg-color)"/>
                                            <path d="M23.4105 9.30095C23.1183 8.99661 22.7166 8.82617 22.3026 8.82617H6.91482C6.5009 8.82617 6.08699 8.99661 5.80699 9.30095C5.52699 9.6053 5.36873 10.0192 5.39308 10.4453L6.14786 22.9357C6.28177 24.7862 6.45221 27.0992 10.7009 27.0992H18.5166C22.7653 27.0992 22.9357 24.7983 23.0696 22.9357L23.8244 10.4575C23.8487 10.0192 23.6905 9.6053 23.4105 9.30095ZM16.6296 21.0001H12.5757C12.0766 21.0001 11.6626 20.5862 11.6626 20.087C11.6626 19.5879 12.0766 19.174 12.5757 19.174H16.6296C17.1287 19.174 17.5426 19.5879 17.5426 20.087C17.5426 20.5862 17.1287 21.0001 16.6296 21.0001ZM17.6522 16.1305H11.5653C11.0661 16.1305 10.6522 15.7166 10.6522 15.2175C10.6522 14.7183 11.0661 14.3044 11.5653 14.3044H17.6522C18.1513 14.3044 18.5653 14.7183 18.5653 15.2175C18.5653 15.7166 18.1513 16.1305 17.6522 16.1305Z" fill="var(--svg-color)"/>
                                            </svg>
                                        </div>
                                        <div className="w-[70%] overflow-x-hidden">
                                            <p onClick={() => ConversationIdHistory(chat.chat_id)} className="text-md font-sansMedium w-max">
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
            </div>
            <div className="flex flex-col items-start py-2 px-4 gap-4 flex-grow">
                <div className={`${sidebarHide ? 'visible' : 'hidden'} max-lg:hidden flex gap-2`}>
                    <svg onClick={toggleSidebar} className="cursor-pointer" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32.38 4H15.62C8.34 4 4 8.34 4 15.62V32.36C4 39.66 8.34 44 15.62 44H32.36C39.64 44 43.98 39.66 43.98 32.38V15.62C44 8.34 39.66 4 32.38 4ZM34 34.5H14C13.18 34.5 12.5 33.82 12.5 33C12.5 32.18 13.18 31.5 14 31.5H34C34.82 31.5 35.5 32.18 35.5 33C35.5 33.82 34.82 34.5 34 34.5ZM34 25.5H14C13.18 25.5 12.5 24.82 12.5 24C12.5 23.18 13.18 22.5 14 22.5H34C34.82 22.5 35.5 23.18 35.5 24C35.5 24.82 34.82 25.5 34 25.5ZM34 16.5H14C13.18 16.5 12.5 15.82 12.5 15C12.5 14.18 13.18 13.5 14 13.5H34C34.82 13.5 35.5 14.18 35.5 15C35.5 15.82 34.82 16.5 34 16.5Z" fill="var(--svg-color)"/>
                    </svg>
                    <svg onClick={handleCreateNewChat} className="cursor-pointer" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32 4H16C8 4 4 8 4 16V42C4 43.1 4.9 44 6 44H32C40 44 44 40 44 32V16C44 8 40 4 32 4ZM22.22 33.32C21.72 33.82 20.8 34.28 20.12 34.38L15.96 34.96C15.8 34.98 15.64 35 15.5 35C14.8 35 14.16 34.76 13.7 34.3C13.14 33.74 12.9 32.92 13.04 32.04L13.62 27.88C13.72 27.2 14.18 26.26 14.68 25.78L22.22 18.24C22.34 18.6 22.5 18.96 22.68 19.36C22.86 19.72 23.04 20.08 23.24 20.42C23.4 20.7 23.58 20.98 23.74 21.18C23.94 21.48 24.14 21.74 24.28 21.88C24.36 22 24.44 22.08 24.46 22.12C24.9 22.62 25.36 23.1 25.8 23.46C25.92 23.58 26 23.64 26.02 23.66C26.28 23.86 26.52 24.08 26.76 24.22C27.02 24.42 27.3 24.6 27.58 24.76C27.92 24.96 28.28 25.16 28.66 25.34C29.04 25.52 29.4 25.66 29.76 25.78L22.22 33.32ZM33.1 22.46L31.54 24.02C31.44 24.12 31.3 24.18 31.16 24.18C31.12 24.18 31.04 24.18 31 24.16C27.56 23.18 24.82 20.44 23.84 17C23.78 16.82 23.84 16.62 23.98 16.48L25.56 14.9C28.14 12.32 30.58 12.38 33.1 14.9C34.38 16.18 35.02 17.42 35 18.7C35 19.96 34.38 21.18 33.1 22.46Z" fill="var(--svg-color)"/>
                    </svg>
                </div>
                <div className={`${sidebarHide ? 'hidden' : 'visible'} lg:hidden flex justify-between w-full`}>
                    <svg onClick={toggleSidebar} className="cursor-pointer" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32.38 4H15.62C8.34 4 4 8.34 4 15.62V32.36C4 39.66 8.34 44 15.62 44H32.36C39.64 44 43.98 39.66 43.98 32.38V15.62C44 8.34 39.66 4 32.38 4ZM34 34.5H14C13.18 34.5 12.5 33.82 12.5 33C12.5 32.18 13.18 31.5 14 31.5H34C34.82 31.5 35.5 32.18 35.5 33C35.5 33.82 34.82 34.5 34 34.5ZM34 25.5H14C13.18 25.5 12.5 24.82 12.5 24C12.5 23.18 13.18 22.5 14 22.5H34C34.82 22.5 35.5 23.18 35.5 24C35.5 24.82 34.82 25.5 34 25.5ZM34 16.5H14C13.18 16.5 12.5 15.82 12.5 15C12.5 14.18 13.18 13.5 14 13.5H34C34.82 13.5 35.5 14.18 35.5 15C35.5 15.82 34.82 16.5 34 16.5Z" fill="var(--svg-color)"/>
                    </svg>
                    <svg onClick={handleCreateNewChat} className="cursor-pointer" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32 4H16C8 4 4 8 4 16V42C4 43.1 4.9 44 6 44H32C40 44 44 40 44 32V16C44 8 40 4 32 4ZM22.22 33.32C21.72 33.82 20.8 34.28 20.12 34.38L15.96 34.96C15.8 34.98 15.64 35 15.5 35C14.8 35 14.16 34.76 13.7 34.3C13.14 33.74 12.9 32.92 13.04 32.04L13.62 27.88C13.72 27.2 14.18 26.26 14.68 25.78L22.22 18.24C22.34 18.6 22.5 18.96 22.68 19.36C22.86 19.72 23.04 20.08 23.24 20.42C23.4 20.7 23.58 20.98 23.74 21.18C23.94 21.48 24.14 21.74 24.28 21.88C24.36 22 24.44 22.08 24.46 22.12C24.9 22.62 25.36 23.1 25.8 23.46C25.92 23.58 26 23.64 26.02 23.66C26.28 23.86 26.52 24.08 26.76 24.22C27.02 24.42 27.3 24.6 27.58 24.76C27.92 24.96 28.28 25.16 28.66 25.34C29.04 25.52 29.4 25.66 29.76 25.78L22.22 33.32ZM33.1 22.46L31.54 24.02C31.44 24.12 31.3 24.18 31.16 24.18C31.12 24.18 31.04 24.18 31 24.16C27.56 23.18 24.82 20.44 23.84 17C23.78 16.82 23.84 16.62 23.98 16.48L25.56 14.9C28.14 12.32 30.58 12.38 33.1 14.9C34.38 16.18 35.02 17.42 35 18.7C35 19.96 34.38 21.18 33.1 22.46Z" fill="var(--svg-color)"/>
                    </svg>
                </div>
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