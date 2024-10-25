'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import User from '@/components/User';
import ThemeSwitch from '@/components/ThemeSwitch';

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
        setLoading(true);  // Start loading
    
        // Optimistically update the UI by removing the chat
        const updatedChatHistory = chatHistory.filter(chat => chat.chat_id !== chatId);
    
        try {
            const response = await axios.post('https://devsalman.tech/delete-chat', {
                chatId,
            }, {
                withCredentials: true,
            });
    
            const data = response.data;
            if (response.status === 200) {
                setChatHistory(updatedChatHistory);  // Update state immediately   
                localStorage.setItem('chatHistory', JSON.stringify(updatedChatHistory));
                // Chat successfully deleted on the server, no further action needed
                setMessage(data.message || 'Something went wrong');
            } else {
                // Revert UI changes if the deletion failed
                setChatHistory(chatHistory);  // Restore the previous state
                setMessage(data.message || 'Something went wrong');
            }
        } catch (error) {
            // Handle errors, revert the optimistic update if necessary
            setChatHistory(chatHistory);  // Restore the previous state
            if (error.response && error.response.data) {
                setMessage(error.response.data.message || 'Something went wrong');
            } else {
                setMessage('An error occurred. Please try again.');
            }
        } finally {
            setLoading(false);  // Stop loading after request completes
        }
    };

    const toggleSidebar = () => {
        setSidebarHide(!sidebarHide);
    };

    const getSvgFillColor = (chat) => {
        // First, check the favoriteStatus to handle real-time updates; fallback to initial chat.favourite
        return favouriteStatus[chat.chat_id] === 'green' || chat.favourite ? 'green' : 'var(--svg-color)';
    };
    
    const groupChatsByDate = (chats) => {
        const groupedChats = {};
    
        // Group chats by the calculated days ago
        chats.forEach(chat => {
            const chatDate = new Date(chat.created_at);
            const daysAgo = calculateDaysAgo(chatDate);
        
            if (!groupedChats[daysAgo]) {
                groupedChats[daysAgo] = [];
            }
            groupedChats[daysAgo].push(chat);
        });
    
        // Sort groups by recency ("Today" first, then "Yesterday", etc.)
        const sortedDays = Object.keys(groupedChats).sort((a, b) => {
            if (a === "Today") return -1;
            if (b === "Today") return 1;
            if (a === "Yesterday") return -1;
            if (b === "Yesterday") return 1;
            return parseInt(a.split(" ")[0]) - parseInt(b.split(" ")[0]);  // Sort other days numerically
        });
    
        // Render each group with a heading and chats under that group
        return sortedDays.map(daysAgo => (
            <div className='flex flex-col gap-1' key={daysAgo}>
                <h3 className="text-sm text-primaryText/80 font-sansMedium">{daysAgo}</h3>
                {groupedChats[daysAgo].map(chat => (
                    <div key={chat.chat_id} className="cursor-pointer p-3 relative flex items-center bg-primaryText/10 rounded-lg w-full">
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
                    </div>
                ))}
            </div>
        ));
    };
    
    // Helper function to calculate how many days ago the chat was created
    const calculateDaysAgo = (chatDate) => {
        const today = new Date();
        const diffTime = today - chatDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    
        if (diffDays === 0) {
            return "Today";
        } else if (diffDays === 1) {
            return "Yesterday";
        } else if (diffDays === 2) {
            return "2 Days Ago";
        } else {
            return `${diffDays} Days Ago`;
        }
    };

    return (
        <section className="flex items-start h-[100dvh] relative">
            {/* side bar start */}
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
                            <>
                                {/* Favorite Chats Section */}
                                {chatHistory.some(chat => chat.favourite) && (
                                    <>
                                        <h2 className="text-lg text-primaryText font-sansMedium">Favorites</h2>
                                        {chatHistory
                                            .filter(chat => chat.favourite && chat.title !== null)  // Filter only favorite chats
                                            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))  // Sort favorites by date
                                            .map(chat => (
                                                <div key={chat.chat_id} className="cursor-pointer p-3 relative flex items-center bg-primaryText/10 rounded-lg w-full">
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
                                                </div>
                                            ))}
                                    </>
                                )}

                                {/* Non-favorite Chats Section */}
                                <h2 className="text-lg text-primaryText font-sansMedium">Conversations</h2>
                                {groupChatsByDate
                                    (chatHistory
                                        .filter(chat => !chat.favourite && chat.title !== null)
                                        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))  // Sort favorites by date
                                    )
                                }

                            </>
                        ) : (
                            <p>No conversation history available</p>
                        )}
                    </div>
                </div>
            </div>
            {/* Mob view side bar */}
            <div style={{ width: sidebarHide ? '85%' : '0', transition: 'width 300ms ease-in-out',}} 
            className={`lg:hidden absolute top-0 left-0 z-20 transition-width duration-300 ease-in-out flex flex-col h-[100%] w-[18rem] overflow-x-hidden`}>
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
                            <>
                                {/* Favorite Chats Section */}
                                {chatHistory.some(chat => chat.favourite) && (
                                    <>
                                        <h2 className="text-lg text-primaryText font-sansMedium">Favorites</h2>
                                        {chatHistory
                                            .filter(chat => chat.favourite && chat.title !== null)  // Filter only favorite chats
                                            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))  // Sort favorites by date
                                            .map(chat => (
                                                <div key={chat.chat_id} className="cursor-pointer p-3 relative flex items-center bg-primaryText/10 rounded-lg w-full">
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
                                                </div>
                                            ))}
                                    </>
                                )}

                                {/* Non-favorite Chats Section */}
                                <h2 className="text-lg text-primaryText font-sansMedium">Conversations</h2>
                                {groupChatsByDate
                                    (chatHistory
                                        .filter(chat => !chat.favourite && chat.title !== null)
                                        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))  // Sort favorites by date
                                    )
                                }
                            </>
                        ) : (
                            <p>No conversation history available</p>
                        )}
                    </div>
                </div>
            </div>
            {/* side bar end */}

            {/* Chat canvas start */}
            <div className="flex flex-col items-start justify-between py-2 px-2 gap-4 flex-grow h-[100%]">
                <div className='flex items-center justify-end w-full'>
                    <div className={`${sidebarHide ? 'visible' : 'hidden'} max-lg:hidden mr-auto flex gap-2`}>
                        <svg onClick={toggleSidebar} className="cursor-pointer" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M32.38 4H15.62C8.34 4 4 8.34 4 15.62V32.36C4 39.66 8.34 44 15.62 44H32.36C39.64 44 43.98 39.66 43.98 32.38V15.62C44 8.34 39.66 4 32.38 4ZM34 34.5H14C13.18 34.5 12.5 33.82 12.5 33C12.5 32.18 13.18 31.5 14 31.5H34C34.82 31.5 35.5 32.18 35.5 33C35.5 33.82 34.82 34.5 34 34.5ZM34 25.5H14C13.18 25.5 12.5 24.82 12.5 24C12.5 23.18 13.18 22.5 14 22.5H34C34.82 22.5 35.5 23.18 35.5 24C35.5 24.82 34.82 25.5 34 25.5ZM34 16.5H14C13.18 16.5 12.5 15.82 12.5 15C12.5 14.18 13.18 13.5 14 13.5H34C34.82 13.5 35.5 14.18 35.5 15C35.5 15.82 34.82 16.5 34 16.5Z" fill="var(--svg-color)"/>
                        </svg>
                        <svg onClick={handleCreateNewChat} className="cursor-pointer" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M32 4H16C8 4 4 8 4 16V42C4 43.1 4.9 44 6 44H32C40 44 44 40 44 32V16C44 8 40 4 32 4ZM22.22 33.32C21.72 33.82 20.8 34.28 20.12 34.38L15.96 34.96C15.8 34.98 15.64 35 15.5 35C14.8 35 14.16 34.76 13.7 34.3C13.14 33.74 12.9 32.92 13.04 32.04L13.62 27.88C13.72 27.2 14.18 26.26 14.68 25.78L22.22 18.24C22.34 18.6 22.5 18.96 22.68 19.36C22.86 19.72 23.04 20.08 23.24 20.42C23.4 20.7 23.58 20.98 23.74 21.18C23.94 21.48 24.14 21.74 24.28 21.88C24.36 22 24.44 22.08 24.46 22.12C24.9 22.62 25.36 23.1 25.8 23.46C25.92 23.58 26 23.64 26.02 23.66C26.28 23.86 26.52 24.08 26.76 24.22C27.02 24.42 27.3 24.6 27.58 24.76C27.92 24.96 28.28 25.16 28.66 25.34C29.04 25.52 29.4 25.66 29.76 25.78L22.22 33.32ZM33.1 22.46L31.54 24.02C31.44 24.12 31.3 24.18 31.16 24.18C31.12 24.18 31.04 24.18 31 24.16C27.56 23.18 24.82 20.44 23.84 17C23.78 16.82 23.84 16.62 23.98 16.48L25.56 14.9C28.14 12.32 30.58 12.38 33.1 14.9C34.38 16.18 35.02 17.42 35 18.7C35 19.96 34.38 21.18 33.1 22.46Z" fill="var(--svg-color)"/>
                        </svg>
                    </div>
                    <div className={`${sidebarHide ? 'hidden' : 'visible'} lg:hidden mr-auto flex gap-2`}>
                        <svg onClick={toggleSidebar} className="cursor-pointer" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M32.38 4H15.62C8.34 4 4 8.34 4 15.62V32.36C4 39.66 8.34 44 15.62 44H32.36C39.64 44 43.98 39.66 43.98 32.38V15.62C44 8.34 39.66 4 32.38 4ZM34 34.5H14C13.18 34.5 12.5 33.82 12.5 33C12.5 32.18 13.18 31.5 14 31.5H34C34.82 31.5 35.5 32.18 35.5 33C35.5 33.82 34.82 34.5 34 34.5ZM34 25.5H14C13.18 25.5 12.5 24.82 12.5 24C12.5 23.18 13.18 22.5 14 22.5H34C34.82 22.5 35.5 23.18 35.5 24C35.5 24.82 34.82 25.5 34 25.5ZM34 16.5H14C13.18 16.5 12.5 15.82 12.5 15C12.5 14.18 13.18 13.5 14 13.5H34C34.82 13.5 35.5 14.18 35.5 15C35.5 15.82 34.82 16.5 34 16.5Z" fill="var(--svg-color)"/>
                        </svg>
                        <svg onClick={handleCreateNewChat} className="cursor-pointer" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M32 4H16C8 4 4 8 4 16V42C4 43.1 4.9 44 6 44H32C40 44 44 40 44 32V16C44 8 40 4 32 4ZM22.22 33.32C21.72 33.82 20.8 34.28 20.12 34.38L15.96 34.96C15.8 34.98 15.64 35 15.5 35C14.8 35 14.16 34.76 13.7 34.3C13.14 33.74 12.9 32.92 13.04 32.04L13.62 27.88C13.72 27.2 14.18 26.26 14.68 25.78L22.22 18.24C22.34 18.6 22.5 18.96 22.68 19.36C22.86 19.72 23.04 20.08 23.24 20.42C23.4 20.7 23.58 20.98 23.74 21.18C23.94 21.48 24.14 21.74 24.28 21.88C24.36 22 24.44 22.08 24.46 22.12C24.9 22.62 25.36 23.1 25.8 23.46C25.92 23.58 26 23.64 26.02 23.66C26.28 23.86 26.52 24.08 26.76 24.22C27.02 24.42 27.3 24.6 27.58 24.76C27.92 24.96 28.28 25.16 28.66 25.34C29.04 25.52 29.4 25.66 29.76 25.78L22.22 33.32ZM33.1 22.46L31.54 24.02C31.44 24.12 31.3 24.18 31.16 24.18C31.12 24.18 31.04 24.18 31 24.16C27.56 23.18 24.82 20.44 23.84 17C23.78 16.82 23.84 16.62 23.98 16.48L25.56 14.9C28.14 12.32 30.58 12.38 33.1 14.9C34.38 16.18 35.02 17.42 35 18.7C35 19.96 34.38 21.18 33.1 22.46Z" fill="var(--svg-color)"/>
                        </svg>
                    </div>
                    <svg className="max-lg:hidden mr-auto" width="170" height="39" viewBox="0 0 170 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_2291_2706)">
                    <path d="M31.6794 0H7.24428C3.24337 0 0 3.24337 0 7.24428V31.6794C0 35.6803 3.24337 38.9236 7.24428 38.9236H31.6794C35.6803 38.9236 38.9236 35.6803 38.9236 31.6794V7.24428C38.9236 3.24337 35.6803 0 31.6794 0Z" fill="var(--svg-color)"/>
                    <path d="M22.0858 21.2001L21.8927 21.3099L22.0858 21.2001Z" fill="var(--svg-color)"/>
                    <path d="M29.2319 14.7133V8.4031L19.4618 2.76218L9.69179 8.4031V14.2671L21.1201 20.8654L19.4618 21.8228L9.69179 16.1818V22.4921L19.4618 28.133L29.2319 22.4921V16.628L17.8035 10.0298L19.4618 9.07242L29.2319 14.7133ZM10.4643 8.84931L19.4618 3.65294L28.4593 8.84931V10.764L19.4618 5.58764L10.4643 10.764V8.84931ZM10.4643 13.8209V12.101L23.3828 19.5601L21.8927 20.4208L10.4643 13.8226V13.8209ZM28.461 22.0442L19.4635 27.2406L10.466 22.0442V20.1295L19.4635 25.3242L28.461 20.1295V22.0442ZM28.461 17.0726V18.7925L15.5425 11.3334L17.0326 10.4727L28.461 17.0709V17.0726ZM17.031 9.58356L16.8378 9.69512L13.9974 11.3351L28.0747 19.4618L19.4618 24.4351L10.4643 19.2387V17.5188L19.4618 22.7135L21.8927 21.3099L22.0858 21.1984L24.9263 19.5584L10.8506 11.4317L19.4618 6.4784L28.4593 11.6548V13.3747L19.4618 8.17999L17.031 9.58356Z" fill="var(--opposite-svg-color)"/>
                    <path d="M17.031 9.58356L16.8378 9.69512L17.031 9.58356Z" fill="var(--svg-color)"/>
                    <path d="M19.4618 29.8529L9.69179 24.212V30.5222L19.4618 36.1631L29.2319 30.5222V24.212L19.4618 29.8529ZM28.461 30.076L19.4635 35.2707L10.466 30.076V28.1613L19.4635 33.356L28.461 28.1613V30.076ZM28.461 27.2689L19.4635 32.4636L10.466 27.2689V25.549L19.4635 30.7437L28.461 25.549V27.2689Z" fill="var(--opposite-svg-color)"/>
                    </g>
                    <g clipPath="url(#clip1_2291_2706)">
                    <path d="M52.0669 28.5292C50.7832 28.5292 49.5578 28.3328 48.3873 27.9398C47.2169 27.5469 46.2945 27.0374 45.6218 26.4131L46.5126 24.5366C47.1536 25.0977 47.9711 25.5623 48.9667 25.9319C49.9607 26.3015 50.9947 26.4847 52.0702 26.4847C53.0476 26.4847 53.8418 26.3731 54.4511 26.1483C55.0605 25.9236 55.5101 25.6155 55.7981 25.2226C56.0861 24.8297 56.231 24.3851 56.231 23.8873C56.231 23.3096 56.0429 22.845 55.6666 22.4921C55.2903 22.1391 54.8008 21.8544 54.1997 21.6379C53.5987 21.4215 52.9377 21.2334 52.2151 21.0735C51.4942 20.9137 50.7682 20.7255 50.039 20.5091C49.3097 20.2926 48.6437 20.0163 48.0427 19.6799C47.4416 19.3436 46.9555 18.8907 46.5875 18.3213C46.2179 17.7519 46.0347 17.0193 46.0347 16.1202C46.0347 15.2211 46.2628 14.4569 46.7207 13.7277C47.1769 12.9984 47.8828 12.4123 48.8369 11.9711C49.7909 11.5299 51.0047 11.3101 52.4815 11.3101C53.4588 11.3101 54.4295 11.4383 55.3918 11.6947C56.3542 11.9511 57.1884 12.3208 57.8926 12.8019L57.0984 14.7267C56.3775 14.2455 55.615 13.8975 54.8141 13.6811C54.0116 13.4646 53.234 13.3564 52.4815 13.3564C51.5358 13.3564 50.7582 13.4763 50.1489 13.7177C49.5395 13.9574 49.0949 14.2788 48.8136 14.68C48.5322 15.0813 48.3923 15.5308 48.3923 16.027C48.3923 16.6197 48.5805 17.0942 48.9567 17.4455C49.333 17.7985 49.8225 18.0799 50.4236 18.288C51.0246 18.4961 51.6856 18.6843 52.4082 18.8524C53.1292 19.0206 53.8551 19.2087 54.5843 19.4169C55.3136 19.625 55.9796 19.898 56.5806 20.2344C57.1817 20.5707 57.6662 21.0202 58.0358 21.5813C58.4038 22.1424 58.5886 22.865 58.5886 23.7458C58.5886 24.6266 58.3555 25.3858 57.891 26.115C57.4264 26.8443 56.7088 27.4304 55.7382 27.8716C54.7675 28.3128 53.5454 28.5326 52.0702 28.5326L52.0669 28.5292Z" fill="var(--svg-color)"/>
                    <path d="M67.2448 25.9319C66.7636 26.3315 66.1625 26.5329 65.4399 26.5329C64.7989 26.5329 64.3061 26.3481 63.9614 25.9802C63.6168 25.6106 63.4436 25.0811 63.4436 24.3918V12.7986H61.1343V24.4884C61.1343 25.7704 61.4873 26.7577 62.1932 27.447C62.8992 28.1363 63.8932 28.481 65.1752 28.481C65.7047 28.481 66.2141 28.4094 66.7036 28.2645C67.1931 28.1197 67.6127 27.8966 67.9657 27.5902L67.2448 25.9319ZM64.8122 15.5891L63.4436 17.4888H67.0999V15.5891H64.8122ZM58.9682 15.5891V17.4888H63.442V15.5891H58.9682Z" fill="var(--svg-color)"/>
                    <path d="M74.8204 28.481C73.5367 28.481 72.3995 28.2012 71.4055 27.6385C70.4115 27.0774 69.6257 26.3032 69.0479 25.3175C68.4702 24.3319 68.1821 23.213 68.1821 21.9626C68.1821 20.7122 68.4702 19.5734 69.0479 18.5944C69.6257 17.617 70.4115 16.8511 71.4055 16.2967C72.3995 15.7439 73.5384 15.4676 74.8204 15.4676C76.1024 15.4676 77.2213 15.7439 78.2236 16.2967C79.2259 16.8495 80.0117 17.612 80.5812 18.5811C81.1506 19.5517 81.4353 20.6772 81.4353 21.9609C81.4353 23.2446 81.1506 24.3502 80.5812 25.3292C80.0117 26.3082 79.2259 27.0774 78.2236 27.6385C77.2213 28.1996 76.0874 28.481 74.8204 28.481ZM74.8204 26.4597C75.6379 26.4597 76.3721 26.2749 77.0215 25.9069C77.6708 25.539 78.1803 25.0128 78.5482 24.3319C78.9162 23.6509 79.101 22.86 79.101 21.9626C79.101 21.0652 78.9162 20.2593 78.5482 19.5934C78.1786 18.9274 77.6708 18.4112 77.0215 18.0416C76.3721 17.6736 75.6379 17.4888 74.8204 17.4888C74.0029 17.4888 73.272 17.6736 72.6309 18.0416C71.9899 18.4112 71.4771 18.9274 71.0908 19.5934C70.7062 20.2593 70.5131 21.0485 70.5131 21.9626C70.5131 22.8767 70.7062 23.6509 71.0908 24.3319C71.4755 25.0128 71.9883 25.539 72.6309 25.9069C73.272 26.2765 74.0012 26.4597 74.8204 26.4597Z" fill="var(--svg-color)"/>
                    <path d="M89.229 28.481C87.9303 28.481 86.7715 28.2012 85.7526 27.6385C84.7336 27.0774 83.9361 26.3082 83.36 25.3292C82.7823 24.3518 82.4942 23.228 82.4942 21.9609C82.4942 20.6939 82.7823 19.5717 83.36 18.5927C83.9377 17.6154 84.7353 16.8495 85.7526 16.2951C86.7699 15.7423 87.9287 15.4659 89.229 15.4659C90.3828 15.4659 91.4135 15.694 92.3192 16.1519C93.2249 16.6081 93.9259 17.2857 94.4237 18.1848L92.6672 19.3153C92.2493 18.6893 91.7415 18.2297 91.1404 17.9317C90.5393 17.6354 89.8933 17.4872 89.204 17.4872C88.3699 17.4872 87.624 17.672 86.9663 18.0399C86.3087 18.4096 85.7875 18.9257 85.4029 19.5917C85.0183 20.2577 84.8252 21.0469 84.8252 21.9609C84.8252 22.875 85.0183 23.6692 85.4029 24.3418C85.7875 25.0145 86.3087 25.5373 86.9663 25.9053C87.624 26.2749 88.3699 26.458 89.204 26.458C89.8933 26.458 90.5393 26.3098 91.1404 26.0135C91.7415 25.7171 92.2509 25.2559 92.6672 24.6299L94.4237 25.7371C93.9259 26.6195 93.2249 27.2972 92.3192 27.77C91.4135 28.2429 90.3828 28.4793 89.229 28.4793V28.481Z" fill="var(--svg-color)"/>
                    <path d="M108.328 15.5891L102.965 20.8587L101.223 22.3888L98.5845 24.853L98.5695 24.868L98.5845 28.3361H96.2768V10.4893H98.5845V21.9476L105.536 15.5891H108.328Z" fill="var(--svg-color)"/>
                    <path d="M115.111 28.3361L107.702 11.4999H110.299L117.106 27.0391H115.614L122.47 11.4999H124.876L117.492 28.3378H115.111V28.3361Z" fill="var(--svg-color)"/>
                    <path d="M130.432 28.481C129.068 28.481 127.87 28.2012 126.836 27.6385C125.802 27.0774 124.999 26.3082 124.43 25.3292C123.86 24.3518 123.576 23.228 123.576 21.9609C123.576 20.6939 123.852 19.5717 124.405 18.5927C124.958 17.6154 125.72 16.8495 126.689 16.2951C127.66 15.7423 128.754 15.4659 129.972 15.4659C131.191 15.4659 132.297 15.739 133.244 16.2834C134.19 16.8295 134.932 17.5937 135.469 18.5811C136.006 19.5667 136.274 20.7172 136.274 22.0325C136.274 22.1291 136.271 22.2407 136.263 22.3689C136.254 22.4971 136.243 22.6169 136.226 22.7302H125.379V21.0702H135.024L134.087 21.6479C134.103 20.8304 133.933 20.1012 133.582 19.4585C133.229 18.8175 132.745 18.3163 132.127 17.955C131.509 17.5937 130.792 17.4139 129.974 17.4139C129.157 17.4139 128.459 17.5937 127.833 17.955C127.207 18.3163 126.719 18.8208 126.366 19.4701C126.013 20.1195 125.837 20.8621 125.837 21.6945V22.0792C125.837 22.93 126.033 23.6875 126.426 24.3518C126.819 25.0178 127.368 25.534 128.074 25.9036C128.78 26.2732 129.59 26.4564 130.504 26.4564C131.258 26.4564 131.942 26.3282 132.56 26.0717C133.178 25.8153 133.719 25.4307 134.183 24.9179L135.459 26.4097C134.881 27.0824 134.163 27.5969 133.306 27.9498C132.448 28.3028 131.489 28.4793 130.432 28.4793V28.481Z" fill="var(--svg-color)"/>
                    <path d="M138.514 28.3361V15.5891H140.727V19.0522L140.51 18.1865C140.863 17.304 141.456 16.6314 142.29 16.1668C143.124 15.7023 144.15 15.4692 145.368 15.4692V17.7069C145.272 17.6903 145.18 17.6836 145.092 17.6836H144.839C143.604 17.6836 142.626 18.0533 141.905 18.7892C141.184 19.5268 140.823 20.594 140.823 21.9876V28.3378H138.514V28.3361Z" fill="var(--svg-color)"/>
                    <path d="M151.046 28.481C149.987 28.481 148.981 28.3361 148.027 28.0481C147.073 27.76 146.324 27.4071 145.778 26.9891L146.74 25.161C147.285 25.5306 147.959 25.842 148.76 26.0984C149.561 26.3548 150.38 26.483 151.214 26.483C152.288 26.483 153.062 26.3315 153.535 26.0268C154.008 25.7221 154.244 25.2975 154.244 24.7514C154.244 24.3502 154.1 24.0388 153.811 23.814C153.523 23.5893 153.142 23.4211 152.669 23.3096C152.196 23.198 151.67 23.0964 151.094 23.0082C150.517 22.92 149.94 22.8084 149.363 22.6719C148.785 22.5354 148.255 22.3439 147.776 22.0941C147.295 21.8461 146.91 21.5014 146.622 21.0602C146.334 20.619 146.189 20.0296 146.189 19.292C146.189 18.5544 146.406 17.8485 146.839 17.2724C147.271 16.6946 147.884 16.2501 148.678 15.9371C149.473 15.6241 150.413 15.4676 151.504 15.4676C152.338 15.4676 153.184 15.5675 154.041 15.7689C154.899 15.9704 155.601 16.2534 156.146 16.623L155.16 18.4512C154.582 18.0666 153.981 17.8018 153.357 17.657C152.731 17.5121 152.107 17.4405 151.481 17.4405C150.47 17.4405 149.716 17.6054 149.22 17.9334C148.722 18.2614 148.474 18.6826 148.474 19.1954C148.474 19.6283 148.622 19.9613 148.918 20.1944C149.215 20.4275 149.599 20.6073 150.072 20.7355C150.545 20.8637 151.071 20.9719 151.647 21.0602C152.225 21.1484 152.801 21.2617 153.379 21.3965C153.956 21.533 154.481 21.7212 154.954 21.9609C155.427 22.2007 155.811 22.5387 156.107 22.9716C156.404 23.4045 156.552 23.9822 156.552 24.7031C156.552 25.4724 156.327 26.1383 155.878 26.6994C155.428 27.2605 154.795 27.6984 153.978 28.0098C153.16 28.3228 152.181 28.4793 151.044 28.4793L151.046 28.481Z" fill="var(--svg-color)"/>
                    <path d="M164.154 28.481C162.791 28.481 161.592 28.2012 160.558 27.6385C159.524 27.0774 158.721 26.3082 158.152 25.3292C157.583 24.3518 157.298 23.228 157.298 21.9609C157.298 20.6939 157.574 19.5717 158.127 18.5927C158.68 17.6154 159.442 16.8495 160.411 16.2951C161.382 15.7423 162.476 15.4659 163.695 15.4659C164.914 15.4659 166.019 15.739 166.966 16.2834C167.912 16.8295 168.655 17.5937 169.191 18.5811C169.729 19.5667 169.997 20.7172 169.997 22.0325C169.997 22.1291 169.993 22.2407 169.985 22.3689C169.977 22.4971 169.965 22.6169 169.948 22.7302H159.101V21.0702H168.746L167.809 21.6479C167.826 20.8304 167.656 20.1012 167.304 19.4585C166.951 18.8175 166.467 18.3163 165.849 17.955C165.232 17.5937 164.514 17.4139 163.696 17.4139C162.879 17.4139 162.181 17.5937 161.555 17.955C160.929 18.3163 160.441 18.8208 160.088 19.4701C159.735 20.1195 159.559 20.8621 159.559 21.6945V22.0792C159.559 22.93 159.755 23.6875 160.148 24.3518C160.541 25.0178 161.091 25.534 161.797 25.9036C162.503 26.2732 163.312 26.4564 164.226 26.4564C164.98 26.4564 165.664 26.3282 166.282 26.0717C166.9 25.8153 167.441 25.4307 167.905 24.9179L169.181 26.4097C168.603 27.0824 167.885 27.5969 167.028 27.9498C166.171 28.3028 165.212 28.4793 164.154 28.4793V28.481Z" fill="var(--svg-color)"/>
                    <path d="M108.856 28.3361H106.017L101.841 23.1581L101.223 22.3888L104.18 22.4022L108.856 28.3361Z" fill="var(--svg-color)"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_2291_2706">
                    <rect width="38.9236" height="38.9236" fill="var(--svg-color)"/>
                    </clipPath>
                    <clipPath id="clip1_2291_2706">
                    <rect width="124.38" height="18.0399" fill="var(--svg-color)" transform="translate(45.6201 10.4893)"/>
                    </clipPath>
                    </defs>
                    </svg>
                    <User/>
                </div>
                <div className='w-full flex flex-col items-center'>
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
            </div>
            <div className='fixed bottom-3 right-3'>
                <ThemeSwitch/>
            </div>
        </section>
    );
}