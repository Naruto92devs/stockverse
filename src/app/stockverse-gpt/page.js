'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import axios from 'axios';
import User from '@/components/ProfileLogo';
import ThemeSwitch from '@/components/ThemeSwitch';

const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

export default function Stockverse_GPT() {
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [responseloading, setResponseLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [userid, setUserid] = useState('');
    const [chatId, setChatId] = useState('');
    const [activeChatId, setActiveChatId] = useState('');
    const [command, setCommand] = useState('');
    const textareaRef = useRef(null);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [chatCanvas, setChatCanvas] = useState([]);
    const [chatHistory, setChatHistory] = useState(null);
    const [sidebarHide, setSidebarHide] = useState(false);
    const [favouriteStatus, setFavouriteStatus] = useState({}); // Track favorite status for each chat
    const [isChatEmpty, setIsChatEmpty] = useState(true);

    useEffect(() => {
        setIsChatEmpty(chatCanvas.length === 0 ? true : false);
    }, [chatCanvas]);

    useEffect(() => {
        const token = Cookies.get('authToken');
        if (!token) {
            setIsLogin(true);
        }
    }, []);
    
    // Load userInfo and chatHistory from sessionStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedUserInfo = localStorage.getItem('UserInfo');
            const savedChatHistory = localStorage.getItem('ChatHistory');
            
            if (savedUserInfo) {
                const parsedUserInfo = JSON.parse(savedUserInfo);
                setUserInfo(parsedUserInfo);
                setUserid(parsedUserInfo.userid);
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

    // UseEffect to Create chatId automatically
    useEffect(() => {

        setLoading(true);

        const savedChatId = sessionStorage.getItem('chatId');

        if (savedChatId) {
            setChatId(savedChatId);
            setLoading(false);
        }
        if (!chatId && userid) {
            handleCreateNewChat();
        } else if (!chatId && !userid) {
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [userid]);  // Dependency array with userid ensures it runs only after userid is set

    useEffect(() => {
        const savedChatCanvas = sessionStorage.getItem('chatCanvas');
        if (savedChatCanvas) {
            const parsedCanvas = JSON.parse(savedChatCanvas);
            setChatCanvas(parsedCanvas);
            setActiveChatId(parsedCanvas[0]?.chat_id); // Use optional chaining for safety
        }
        if (!savedChatCanvas && userid) {
            setChatCanvas([]);
        }
    }, [userid]);

    // Update Active ChatId
    useEffect(() => {
        if (chatCanvas) {
            setActiveChatId(chatCanvas[0]?.chat_id); // Use optional chaining for safety
        }
    }, [chatCanvas]);

    // Update Active Chat history
    useEffect(() => {
        const savedChatHistory = localStorage.getItem('ChatHistory');
            
        if (savedChatHistory) {
            const parsedUserInfo = JSON.parse(savedChatHistory);
            setChatHistory(parsedUserInfo);
        }
    }, [activeChatId]);

    const fetchChatHistory = async () => {
        try {
            const response = await axios.post(`${STOCKVERSE_BACK_END}/conversation-history`, {
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
        } catch (error) {
            setMessage('An error occurred. Please try again.');
            console.error('Error fetching chat history:', error);
        }
    };

    const handleCreateNewChat = async () => {
        setLoading(true);
        // e.preventDefault();
        try {
            const response = await axios.post(`${STOCKVERSE_BACK_END}/add-conversation`, { userid }, { withCredentials: true });
            if (response.status === 207) {
                setChatId(response.data.chat_id);
                sessionStorage.setItem('chatId', (response.data.chat_id));
                setChatCanvas([]);
                sessionStorage.removeItem('chatCanvas');
                setMessage(response.data.message);
                setLoading(false);
            } else {
                setMessage(response.data.message || 'Something went wrong');
                setLoading(false);
            }
            setLoading(false);
        } catch (error) {
            setMessage('An error occurred. Please try again.');
            setLoading(false);
            console.error('Error during chat creation:', error);
        }
    };

    const handleSubmitCommand = async (e, inputCommand = null) => {
        if (e) e.preventDefault(); // Prevent default form behavior if called from form submit
    
        const commandToSubmit = inputCommand || command; // Use inputCommand if provided, otherwise use state
    
        setResponseLoading(true);
        setQuestion(commandToSubmit);
        setCommand(''); // Clear input field if form submission
    
        // Generate a temporary unique ID for tracking the new chat object
        const tempId = Date.now();
    
        // Create the new chat object with an empty answer
        const newChatObject = {
            id: tempId,
            chat_id: chatId,
            question: commandToSubmit,
            answer: '',
            created_at: new Date().toISOString(),
        };
    
        // Add the new chat object to chatCanvas state immediately and update sessionStorage
        setChatCanvas((prevChatCanvas) => {
            const updatedCanvas = [...prevChatCanvas, newChatObject];
            sessionStorage.setItem('chatCanvas', JSON.stringify(updatedCanvas));
            return updatedCanvas;
        });
    
        try {
            // Make the API request
            const response = await axios.post(
                `${STOCKVERSE_BACK_END}/stockgpt`,
                { chatId, command: commandToSubmit },
                { withCredentials: true }
            );
    
            if (response.status === 207) {
                // Update the answer in chatCanvas once received from the server
                setChatCanvas((prevChatCanvas) => {
                    const updatedCanvas = prevChatCanvas.map((chat) =>
                        chat.id === tempId ? { ...chat, answer: response.data.answer } : chat
                    );
                    sessionStorage.setItem('chatCanvas', JSON.stringify(updatedCanvas));
                    fetchChatHistory();
                    setResponseLoading(false);
                    return updatedCanvas;
                });
                setAnswer(response.data.answer);
                setMessage(response.data.message);
            } else {
                setMessage(response.data.message || 'Something went wrong');
                setResponseLoading(false);
            }
    
        } catch (error) {
            setMessage('An error occurred. Please try again.');
            console.error('Error during command submission:', error);
            setResponseLoading(false);
        } finally {
            setResponseLoading(false);
        }
    };

    const ConversationIdHistory = async (chatId) => {
    
        try {
            const response = await axios.post(`${STOCKVERSE_BACK_END}/chat-history`, {
            chatId,
            }, {
                withCredentials: true,
            });
    
            const data = response.data;
            // console.log(data.user);
            if (response.status === 200) {
                sessionStorage.setItem('chatCanvas', JSON.stringify(data.user));
                setChatCanvas(data.user);
                setChatId(data.user[0].chat_id);
                sessionStorage.setItem('chatId', data.user[0].chat_id);
                setActiveChatId(chatId);
                console.log(chatCanvas);
            } else {
                setMessage(data.message || 'Something went wrong');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.message || 'Something went wrong');
            } else {
                setMessage('An error occurred. Please try again.');
            }
            console.error('Error during signup:', error);
        }
    };

    const FavouriteChatId = async (chatId) => {

        // Find the current chat in chatHistory
        const chat = chatHistory.find(chat => chat.chat_id === chatId);
        const isFavourite = chat.favourite;  // Get the current favorite status
    
        try {
            const response = await axios.post(`${STOCKVERSE_BACK_END}/favourite-chat`, {
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
                setMessage(data.message || 'Something went wrong');
            } else {
                setMessage(data.message || 'Something went wrong');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.message || 'Something went wrong');
            } else {
                setMessage('An error occurred. Please try again.');
            }
            console.error('Error during signup:', error);
        }
    };
    
    const DeleteChatId = async (chatId) => {
    
        // Optimistically update the UI by removing the chat
        const updatedChatHistory = chatHistory.filter(chat => chat.chat_id !== chatId);
    
        try {
            const response = await axios.post(`${STOCKVERSE_BACK_END}/delete-chat`, {
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
            <div className='flex flex-col' key={daysAgo}>
                <h3 className="text-sm text-primaryText font-sansMedium py-1 px-4 bg-primaryText/10 rounded w-max my-4">{daysAgo}</h3>
                {groupedChats[daysAgo].map(chat => (
                    <div key={chat.chat_id} className={`cursor-pointer p-3 relative flex items-center hover:bg-primaryText/10 rounded-lg w-full ${
                        chat.chat_id === activeChatId ? 'bg-primaryText/10' : ''
                    }`}>
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
                        <div onClick={() => ConversationIdHistory(chat.chat_id)} className="w-[70%] overflow-x-hidden">
                            <p className="text-md text-primaryText/60 font-sansMedium w-max">
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

    // Text Area height manage automatic funtion
    useEffect(() => {
        if (textareaRef.current) {
          textareaRef.current.style.height = '14px'; // Initial height
          textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 300)}px`; // Max height 200px
        }
    }, [command]);

    // Automatically clear the message after 2 seconds
    useEffect(() => {
        if (message) {
        const timer = setTimeout(() => {
            setMessage(''); // Clear message after 2 seconds
        }, 4000);

        // Clean up the timer if message changes or component unmounts
        return () => clearTimeout(timer);
        }
    }, [message]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault(); // Prevents a new line
        handleSubmitCommand(e);
    }
    };

    const [showMore, setShowMore] = useState(false);
    const maxChars = 1000;

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    return (
        <section className="flex items-start h-[100dvh] overflow-hidden relative scrollbar-hide">
            {/* side bar start */}
            {/* web view side bar */}
            <div style={{ width: sidebarHide ? '0' : '18rem', transition: 'width 300ms ease-in-out',}} 
            className={`max-lg:hidden z-30 flex-shrink-0 transition-width duration-300 ease-in-out flex flex-col h-[100%] w-[18rem] overflow-x-hidden`}>
                <div className="bg-background w-full p-2 flex justify-between">
                    <svg onClick={toggleSidebar} className="w-10 h-10 p-1 rounded-xl cursor-pointer hover:bg-primaryText/10 icon-xl-heavy" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M8.85719 3H15.1428C16.2266 2.99999 17.1007 2.99998 17.8086 3.05782C18.5375 3.11737 19.1777 3.24318 19.77 3.54497C20.7108 4.02433 21.4757 4.78924 21.955 5.73005C22.2568 6.32234 22.3826 6.96253 22.4422 7.69138C22.5 8.39925 22.5 9.27339 22.5 10.3572V13.6428C22.5 14.7266 22.5 15.6008 22.4422 16.3086C22.3826 17.0375 22.2568 17.6777 21.955 18.27C21.4757 19.2108 20.7108 19.9757 19.77 20.455C19.1777 20.7568 18.5375 20.8826 17.8086 20.9422C17.1008 21 16.2266 21 15.1428 21H8.85717C7.77339 21 6.89925 21 6.19138 20.9422C5.46253 20.8826 4.82234 20.7568 4.23005 20.455C3.28924 19.9757 2.52433 19.2108 2.04497 18.27C1.74318 17.6777 1.61737 17.0375 1.55782 16.3086C1.49998 15.6007 1.49999 14.7266 1.5 13.6428V10.3572C1.49999 9.27341 1.49998 8.39926 1.55782 7.69138C1.61737 6.96253 1.74318 6.32234 2.04497 5.73005C2.52433 4.78924 3.28924 4.02433 4.23005 3.54497C4.82234 3.24318 5.46253 3.11737 6.19138 3.05782C6.89926 2.99998 7.77341 2.99999 8.85719 3ZM6.35424 5.05118C5.74907 5.10062 5.40138 5.19279 5.13803 5.32698C4.57354 5.6146 4.1146 6.07354 3.82698 6.63803C3.69279 6.90138 3.60062 7.24907 3.55118 7.85424C3.50078 8.47108 3.5 9.26339 3.5 10.4V13.6C3.5 14.7366 3.50078 15.5289 3.55118 16.1458C3.60062 16.7509 3.69279 17.0986 3.82698 17.362C4.1146 17.9265 4.57354 18.3854 5.13803 18.673C5.40138 18.8072 5.74907 18.8994 6.35424 18.9488C6.97108 18.9992 7.76339 19 8.9 19H9.5V5H8.9C7.76339 5 6.97108 5.00078 6.35424 5.05118ZM11.5 5V19H15.1C16.2366 19 17.0289 18.9992 17.6458 18.9488C18.2509 18.8994 18.5986 18.8072 18.862 18.673C19.4265 18.3854 19.8854 17.9265 20.173 17.362C20.3072 17.0986 20.3994 16.7509 20.4488 16.1458C20.4992 15.5289 20.5 14.7366 20.5 13.6V10.4C20.5 9.26339 20.4992 8.47108 20.4488 7.85424C20.3994 7.24907 20.3072 6.90138 20.173 6.63803C19.8854 6.07354 19.4265 5.6146 18.862 5.32698C18.5986 5.19279 18.2509 5.10062 17.6458 5.05118C17.0289 5.00078 16.2366 5 15.1 5H11.5ZM5 8.5C5 7.94772 5.44772 7.5 6 7.5H7C7.55229 7.5 8 7.94772 8 8.5C8 9.05229 7.55229 9.5 7 9.5H6C5.44772 9.5 5 9.05229 5 8.5ZM5 12C5 11.4477 5.44772 11 6 11H7C7.55229 11 8 11.4477 8 12C8 12.5523 7.55229 13 7 13H6C5.44772 13 5 12.5523 5 12Z" fill="currentColor"></path></svg>
                    <svg onClick={handleCreateNewChat} className="w-10 h-10 p-1 rounded-xl cursor-pointer hover:bg-primaryText/10 icon-xl-heavy" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.6729 3.91287C16.8918 2.69392 18.8682 2.69392 20.0871 3.91287C21.3061 5.13182 21.3061 7.10813 20.0871 8.32708L14.1499 14.2643C13.3849 15.0293 12.3925 15.5255 11.3215 15.6785L9.14142 15.9899C8.82983 16.0344 8.51546 15.9297 8.29289 15.7071C8.07033 15.4845 7.96554 15.1701 8.01005 14.8586L8.32149 12.6785C8.47449 11.6075 8.97072 10.615 9.7357 9.85006L15.6729 3.91287ZM18.6729 5.32708C18.235 4.88918 17.525 4.88918 17.0871 5.32708L11.1499 11.2643C10.6909 11.7233 10.3932 12.3187 10.3014 12.9613L10.1785 13.8215L11.0386 13.6986C11.6812 13.6068 12.2767 13.3091 12.7357 12.8501L18.6729 6.91287C19.1108 6.47497 19.1108 5.76499 18.6729 5.32708ZM11 3.99929C11.0004 4.55157 10.5531 4.99963 10.0008 5.00007C9.00227 5.00084 8.29769 5.00827 7.74651 5.06064C7.20685 5.11191 6.88488 5.20117 6.63803 5.32695C6.07354 5.61457 5.6146 6.07351 5.32698 6.63799C5.19279 6.90135 5.10062 7.24904 5.05118 7.8542C5.00078 8.47105 5 9.26336 5 10.4V13.6C5 14.7366 5.00078 15.5289 5.05118 16.1457C5.10062 16.7509 5.19279 17.0986 5.32698 17.3619C5.6146 17.9264 6.07354 18.3854 6.63803 18.673C6.90138 18.8072 7.24907 18.8993 7.85424 18.9488C8.47108 18.9992 9.26339 19 10.4 19H13.6C14.7366 19 15.5289 18.9992 16.1458 18.9488C16.7509 18.8993 17.0986 18.8072 17.362 18.673C17.9265 18.3854 18.3854 17.9264 18.673 17.3619C18.7988 17.1151 18.8881 16.7931 18.9393 16.2535C18.9917 15.7023 18.9991 14.9977 18.9999 13.9992C19.0003 13.4469 19.4484 12.9995 20.0007 13C20.553 13.0004 21.0003 13.4485 20.9999 14.0007C20.9991 14.9789 20.9932 15.7808 20.9304 16.4426C20.8664 17.116 20.7385 17.7136 20.455 18.2699C19.9757 19.2107 19.2108 19.9756 18.27 20.455C17.6777 20.7568 17.0375 20.8826 16.3086 20.9421C15.6008 21 14.7266 21 13.6428 21H10.3572C9.27339 21 8.39925 21 7.69138 20.9421C6.96253 20.8826 6.32234 20.7568 5.73005 20.455C4.78924 19.9756 4.02433 19.2107 3.54497 18.2699C3.24318 17.6776 3.11737 17.0374 3.05782 16.3086C2.99998 15.6007 2.99999 14.7266 3 13.6428V10.3572C2.99999 9.27337 2.99998 8.39922 3.05782 7.69134C3.11737 6.96249 3.24318 6.3223 3.54497 5.73001C4.02433 4.7892 4.78924 4.0243 5.73005 3.54493C6.28633 3.26149 6.88399 3.13358 7.55735 3.06961C8.21919 3.00673 9.02103 3.00083 9.99922 3.00007C10.5515 2.99964 10.9996 3.447 11 3.99929Z" fill="currentColor"></path></svg>
                </div>
                <div className="p-2 gap-4 h-[100%] bg-background w-full overflow-y-scroll scrollbar-thin">
                    <div className="flex flex-col gap-1">
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
                                                <div key={chat.chat_id} className={`cursor-pointer p-3 relative flex items-center hover:bg-primaryText/10 rounded-lg w-full ${
                                                    chat.chat_id === activeChatId ? 'bg-primaryText/10' : ''
                                                }`}>
                                                    <div className="flex gap-0 absolute right-3">
                                                        <svg onClick={() => FavouriteChatId(chat.chat_id)} className="cursor-pointer" width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M27.5966 3.99499L27.9932 4.80249C28.1916 5.19915 28.6874 5.56749 29.1266 5.65249L29.6649 5.73749C31.2799 6.00665 31.6624 7.19665 30.5007 8.37249L30.0049 8.86832C29.6791 9.20832 29.4949 9.85999 29.5941 10.3133L29.6649 10.6108C30.1041 12.5658 29.0699 13.3167 27.3699 12.2967L27.0016 12.0842C26.5624 11.8292 25.8541 11.8292 25.4149 12.0842L25.0466 12.2967C23.3324 13.3308 22.2982 12.5658 22.7516 10.6108L22.8224 10.3133C22.9216 9.85999 22.7374 9.20832 22.4116 8.86832L21.9157 8.35832C20.7541 7.18249 21.1366 5.99249 22.7516 5.72332L23.2899 5.63832C23.7149 5.56749 24.2249 5.18499 24.4232 4.78832L24.8199 3.98082C25.5849 2.45082 26.8316 2.45082 27.5966 3.99499Z" fill={getSvgFillColor(chat)}/>
                                                        <path d="M30.5575 14.2942C30.0475 14.6625 28.6167 15.3425 26.5767 14.2942C26.35 14.1809 26.0667 14.1667 25.84 14.2942C25.0325 14.705 24.2959 14.875 23.715 14.875C22.8084 14.875 22.1709 14.5209 21.8592 14.2942C21.335 13.9117 20.23 12.8209 20.6125 10.5117C20.655 10.2709 20.5842 10.03 20.4284 9.84587C19.4509 8.72671 18.9125 7.22504 19.295 6.04921C19.4367 5.58171 19.1392 4.95837 18.6575 4.95837H9.91671C5.66671 4.95837 2.83337 7.08337 2.83337 12.0417V21.9584C2.83337 26.9167 5.66671 29.0417 9.91671 29.0417H24.0834C28.3334 29.0417 31.1667 26.9167 31.1667 21.9584V14.5492C31.1667 14.28 30.7842 14.1384 30.5575 14.2942ZM20.315 17.1275C19.38 17.8784 18.19 18.2467 17 18.2467C15.81 18.2467 14.6059 17.8784 13.685 17.1275L9.25087 13.5859C8.79754 13.2175 8.72671 12.5375 9.08087 12.0842C9.44921 11.6309 10.115 11.5459 10.5684 11.9142L15.0025 15.4559C16.0792 16.32 17.9067 16.32 18.9834 15.4559C19.4367 15.0875 20.1025 15.1584 20.4709 15.6259C20.8534 16.0792 20.7825 16.7592 20.315 17.1275Z" fill="var(--svg-color)"/>
                                                        </svg>

                                                        <svg onClick={() => DeleteChatId(chat.chat_id)} className="cursor-pointer" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M25.6504 5.7583C23.6904 5.56352 21.7304 5.41743 19.7582 5.30787V5.29569L19.4904 3.71309C19.3078 2.59309 19.04 0.913086 16.1913 0.913086H13.0017C10.1652 0.913086 9.89735 2.52004 9.70257 3.70091L9.44692 5.25917C8.31475 5.33222 7.18257 5.40526 6.0504 5.51482L3.56692 5.7583C3.05562 5.807 2.6904 6.25743 2.73909 6.75656C2.78779 7.25569 3.22605 7.62091 3.73735 7.57222L6.22083 7.32874C12.6 6.69569 19.0278 6.93917 25.48 7.58439C25.5165 7.58439 25.5408 7.58439 25.5774 7.58439C26.04 7.58439 26.4417 7.23135 26.4904 6.75656C26.5269 6.25743 26.1617 5.807 25.6504 5.7583Z" fill="var(--svg-color)"/>
                                                        <path d="M23.4105 9.30095C23.1183 8.99661 22.7166 8.82617 22.3026 8.82617H6.91482C6.5009 8.82617 6.08699 8.99661 5.80699 9.30095C5.52699 9.6053 5.36873 10.0192 5.39308 10.4453L6.14786 22.9357C6.28177 24.7862 6.45221 27.0992 10.7009 27.0992H18.5166C22.7653 27.0992 22.9357 24.7983 23.0696 22.9357L23.8244 10.4575C23.8487 10.0192 23.6905 9.6053 23.4105 9.30095ZM16.6296 21.0001H12.5757C12.0766 21.0001 11.6626 20.5862 11.6626 20.087C11.6626 19.5879 12.0766 19.174 12.5757 19.174H16.6296C17.1287 19.174 17.5426 19.5879 17.5426 20.087C17.5426 20.5862 17.1287 21.0001 16.6296 21.0001ZM17.6522 16.1305H11.5653C11.0661 16.1305 10.6522 15.7166 10.6522 15.2175C10.6522 14.7183 11.0661 14.3044 11.5653 14.3044H17.6522C18.1513 14.3044 18.5653 14.7183 18.5653 15.2175C18.5653 15.7166 18.1513 16.1305 17.6522 16.1305Z" fill="var(--svg-color)"/>
                                                        </svg>
                                                    </div>
                                                    <div onClick={() => ConversationIdHistory(chat.chat_id)} className="w-[70%] overflow-x-hidden">
                                                        <p className="text-md text-primaryText/60 font-sansMedium w-max">
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
            className={`lg:hidden z-30 absolute top-0 left-0 z-20 transition-width duration-300 ease-in-out flex flex-col h-[100%] w-[18rem] overflow-x-hidden`}>
                <div className="bg-background w-full p-2 flex justify-between">
                    <svg onClick={toggleSidebar} className="w-10 h-10 p-1 rounded-xl cursor-pointer hover:bg-primaryText/10 icon-xl-heavy" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M8.85719 3H15.1428C16.2266 2.99999 17.1007 2.99998 17.8086 3.05782C18.5375 3.11737 19.1777 3.24318 19.77 3.54497C20.7108 4.02433 21.4757 4.78924 21.955 5.73005C22.2568 6.32234 22.3826 6.96253 22.4422 7.69138C22.5 8.39925 22.5 9.27339 22.5 10.3572V13.6428C22.5 14.7266 22.5 15.6008 22.4422 16.3086C22.3826 17.0375 22.2568 17.6777 21.955 18.27C21.4757 19.2108 20.7108 19.9757 19.77 20.455C19.1777 20.7568 18.5375 20.8826 17.8086 20.9422C17.1008 21 16.2266 21 15.1428 21H8.85717C7.77339 21 6.89925 21 6.19138 20.9422C5.46253 20.8826 4.82234 20.7568 4.23005 20.455C3.28924 19.9757 2.52433 19.2108 2.04497 18.27C1.74318 17.6777 1.61737 17.0375 1.55782 16.3086C1.49998 15.6007 1.49999 14.7266 1.5 13.6428V10.3572C1.49999 9.27341 1.49998 8.39926 1.55782 7.69138C1.61737 6.96253 1.74318 6.32234 2.04497 5.73005C2.52433 4.78924 3.28924 4.02433 4.23005 3.54497C4.82234 3.24318 5.46253 3.11737 6.19138 3.05782C6.89926 2.99998 7.77341 2.99999 8.85719 3ZM6.35424 5.05118C5.74907 5.10062 5.40138 5.19279 5.13803 5.32698C4.57354 5.6146 4.1146 6.07354 3.82698 6.63803C3.69279 6.90138 3.60062 7.24907 3.55118 7.85424C3.50078 8.47108 3.5 9.26339 3.5 10.4V13.6C3.5 14.7366 3.50078 15.5289 3.55118 16.1458C3.60062 16.7509 3.69279 17.0986 3.82698 17.362C4.1146 17.9265 4.57354 18.3854 5.13803 18.673C5.40138 18.8072 5.74907 18.8994 6.35424 18.9488C6.97108 18.9992 7.76339 19 8.9 19H9.5V5H8.9C7.76339 5 6.97108 5.00078 6.35424 5.05118ZM11.5 5V19H15.1C16.2366 19 17.0289 18.9992 17.6458 18.9488C18.2509 18.8994 18.5986 18.8072 18.862 18.673C19.4265 18.3854 19.8854 17.9265 20.173 17.362C20.3072 17.0986 20.3994 16.7509 20.4488 16.1458C20.4992 15.5289 20.5 14.7366 20.5 13.6V10.4C20.5 9.26339 20.4992 8.47108 20.4488 7.85424C20.3994 7.24907 20.3072 6.90138 20.173 6.63803C19.8854 6.07354 19.4265 5.6146 18.862 5.32698C18.5986 5.19279 18.2509 5.10062 17.6458 5.05118C17.0289 5.00078 16.2366 5 15.1 5H11.5ZM5 8.5C5 7.94772 5.44772 7.5 6 7.5H7C7.55229 7.5 8 7.94772 8 8.5C8 9.05229 7.55229 9.5 7 9.5H6C5.44772 9.5 5 9.05229 5 8.5ZM5 12C5 11.4477 5.44772 11 6 11H7C7.55229 11 8 11.4477 8 12C8 12.5523 7.55229 13 7 13H6C5.44772 13 5 12.5523 5 12Z" fill="currentColor"></path></svg>
                    <svg onClick={handleCreateNewChat} className="w-10 h-10 p-1 rounded-xl cursor-pointer hover:bg-primaryText/10 icon-xl-heavy" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.6729 3.91287C16.8918 2.69392 18.8682 2.69392 20.0871 3.91287C21.3061 5.13182 21.3061 7.10813 20.0871 8.32708L14.1499 14.2643C13.3849 15.0293 12.3925 15.5255 11.3215 15.6785L9.14142 15.9899C8.82983 16.0344 8.51546 15.9297 8.29289 15.7071C8.07033 15.4845 7.96554 15.1701 8.01005 14.8586L8.32149 12.6785C8.47449 11.6075 8.97072 10.615 9.7357 9.85006L15.6729 3.91287ZM18.6729 5.32708C18.235 4.88918 17.525 4.88918 17.0871 5.32708L11.1499 11.2643C10.6909 11.7233 10.3932 12.3187 10.3014 12.9613L10.1785 13.8215L11.0386 13.6986C11.6812 13.6068 12.2767 13.3091 12.7357 12.8501L18.6729 6.91287C19.1108 6.47497 19.1108 5.76499 18.6729 5.32708ZM11 3.99929C11.0004 4.55157 10.5531 4.99963 10.0008 5.00007C9.00227 5.00084 8.29769 5.00827 7.74651 5.06064C7.20685 5.11191 6.88488 5.20117 6.63803 5.32695C6.07354 5.61457 5.6146 6.07351 5.32698 6.63799C5.19279 6.90135 5.10062 7.24904 5.05118 7.8542C5.00078 8.47105 5 9.26336 5 10.4V13.6C5 14.7366 5.00078 15.5289 5.05118 16.1457C5.10062 16.7509 5.19279 17.0986 5.32698 17.3619C5.6146 17.9264 6.07354 18.3854 6.63803 18.673C6.90138 18.8072 7.24907 18.8993 7.85424 18.9488C8.47108 18.9992 9.26339 19 10.4 19H13.6C14.7366 19 15.5289 18.9992 16.1458 18.9488C16.7509 18.8993 17.0986 18.8072 17.362 18.673C17.9265 18.3854 18.3854 17.9264 18.673 17.3619C18.7988 17.1151 18.8881 16.7931 18.9393 16.2535C18.9917 15.7023 18.9991 14.9977 18.9999 13.9992C19.0003 13.4469 19.4484 12.9995 20.0007 13C20.553 13.0004 21.0003 13.4485 20.9999 14.0007C20.9991 14.9789 20.9932 15.7808 20.9304 16.4426C20.8664 17.116 20.7385 17.7136 20.455 18.2699C19.9757 19.2107 19.2108 19.9756 18.27 20.455C17.6777 20.7568 17.0375 20.8826 16.3086 20.9421C15.6008 21 14.7266 21 13.6428 21H10.3572C9.27339 21 8.39925 21 7.69138 20.9421C6.96253 20.8826 6.32234 20.7568 5.73005 20.455C4.78924 19.9756 4.02433 19.2107 3.54497 18.2699C3.24318 17.6776 3.11737 17.0374 3.05782 16.3086C2.99998 15.6007 2.99999 14.7266 3 13.6428V10.3572C2.99999 9.27337 2.99998 8.39922 3.05782 7.69134C3.11737 6.96249 3.24318 6.3223 3.54497 5.73001C4.02433 4.7892 4.78924 4.0243 5.73005 3.54493C6.28633 3.26149 6.88399 3.13358 7.55735 3.06961C8.21919 3.00673 9.02103 3.00083 9.99922 3.00007C10.5515 2.99964 10.9996 3.447 11 3.99929Z" fill="currentColor"></path></svg>
                </div>
                <div className={`${sidebarHide ? '' : ''} p-2 gap-2 h-[100%] bg-background w-full overflow-y-scroll scrollbar-thin`}>
                    <div className="flex flex-col gap-0">
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
                                                <div key={chat.chat_id} className={`cursor-pointer p-3 relative flex items-center hover:bg-primaryText/10 rounded-lg w-full ${
                                                    chat.chat_id === activeChatId ? 'bg-primaryText/10' : ''
                                                }`}>
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
                                                    <div onClick={() => ConversationIdHistory(chat.chat_id)} className="w-[70%] overflow-x-hidden">
                                                        <p className="text-md text-primaryText/60 font-sansMedium w-max">
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

            {/* IsLogin popup start*/}
            <div className={`${isLogin ? 'visible' : 'hidden'} fixed z-50 shadow-lg top-0 left-0 bottom-0 right-0 bg-primaryText/70 flex items-center justify-center`}>
                <div className='max-w-[90%] w-max p-8 rounded-lg bg-background text-center flex flex-col items-center gap-4'>
                    <p className="text-lg text-primaryText text-center">Please Login / Create Free Account to Use StockverseGPT</p>
                    <div className="flex gap-4 flex-wrap">
                        <Link href='/login'
                            className="w-max bg-sell text-base text-primaryButtonText py-2 px-8 hover:bg-secondaryHeading hover:text-mobNavLink transition duration-300"
                        >
                            Login / Create Free Account
                        </Link>
                        <Link href='/'
                        className="w-max bg-buy text-base text-primaryButtonText py-2 px-8 hover:bg-secondaryHeading hover:text-mobNavLink transition duration-300"
                        >
                            Go to DashBoard
                        </Link>
                    </div>
                </div>
            </div>
            {/* IsLogin popup end*/}

            {/* Loader start*/}
            <div className={`${loading ? 'visible' : 'hidden'} absolute z-50 top-0 left-0 bottom-0 right-0 bg-primaryText/30 flex items-center justify-center`}>
                <div id="wifi-loader">
                    <svg className="circle-outer" viewBox="0 0 86 86">
                        <circle className="back" cx="43" cy="43" r="40"></circle>
                        <circle className="front" cx="43" cy="43" r="40"></circle>
                        <circle className="new" cx="43" cy="43" r="40"></circle>
                    </svg>
                    <svg className="circle-middle" viewBox="0 0 60 60">
                        <circle className="back" cx="30" cy="30" r="27"></circle>
                        <circle className="front" cx="30" cy="30" r="27"></circle>
                    </svg>
                    <svg className="circle-inner" viewBox="0 0 34 34">
                        <circle className="back" cx="17" cy="17" r="14"></circle>
                        <circle className="front" cx="17" cy="17" r="14"></circle>
                    </svg>
                    <div className="text" data-text="Loading"></div>
                </div>
            </div>
            {/* Loader end*/}

            {/* Chat canvas start */}
            <div className="relative flex flex-col max-lg:pb-[4rem] max-lg:pt-[4rem] items-start justify-start gap-y-4 max-w-full flex-grow h-[100%] overflow-y-scroll scrollbar-thin">
                
                {/* Chat Navbar start */}
                <div className='sticky z-20 top-0 max-lg:fixed py-3 px-2 bg-background flex items-start justify-end w-full h-max'>
                    <div className={`${sidebarHide ? 'visible' : 'hidden'} max-lg:hidden mr-auto flex gap-2`}>
                    <svg onClick={toggleSidebar} className="w-10 h-10 p-1 rounded-xl cursor-pointer hover:bg-primaryText/10 icon-xl-heavy" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M8.85719 3H15.1428C16.2266 2.99999 17.1007 2.99998 17.8086 3.05782C18.5375 3.11737 19.1777 3.24318 19.77 3.54497C20.7108 4.02433 21.4757 4.78924 21.955 5.73005C22.2568 6.32234 22.3826 6.96253 22.4422 7.69138C22.5 8.39925 22.5 9.27339 22.5 10.3572V13.6428C22.5 14.7266 22.5 15.6008 22.4422 16.3086C22.3826 17.0375 22.2568 17.6777 21.955 18.27C21.4757 19.2108 20.7108 19.9757 19.77 20.455C19.1777 20.7568 18.5375 20.8826 17.8086 20.9422C17.1008 21 16.2266 21 15.1428 21H8.85717C7.77339 21 6.89925 21 6.19138 20.9422C5.46253 20.8826 4.82234 20.7568 4.23005 20.455C3.28924 19.9757 2.52433 19.2108 2.04497 18.27C1.74318 17.6777 1.61737 17.0375 1.55782 16.3086C1.49998 15.6007 1.49999 14.7266 1.5 13.6428V10.3572C1.49999 9.27341 1.49998 8.39926 1.55782 7.69138C1.61737 6.96253 1.74318 6.32234 2.04497 5.73005C2.52433 4.78924 3.28924 4.02433 4.23005 3.54497C4.82234 3.24318 5.46253 3.11737 6.19138 3.05782C6.89926 2.99998 7.77341 2.99999 8.85719 3ZM6.35424 5.05118C5.74907 5.10062 5.40138 5.19279 5.13803 5.32698C4.57354 5.6146 4.1146 6.07354 3.82698 6.63803C3.69279 6.90138 3.60062 7.24907 3.55118 7.85424C3.50078 8.47108 3.5 9.26339 3.5 10.4V13.6C3.5 14.7366 3.50078 15.5289 3.55118 16.1458C3.60062 16.7509 3.69279 17.0986 3.82698 17.362C4.1146 17.9265 4.57354 18.3854 5.13803 18.673C5.40138 18.8072 5.74907 18.8994 6.35424 18.9488C6.97108 18.9992 7.76339 19 8.9 19H9.5V5H8.9C7.76339 5 6.97108 5.00078 6.35424 5.05118ZM11.5 5V19H15.1C16.2366 19 17.0289 18.9992 17.6458 18.9488C18.2509 18.8994 18.5986 18.8072 18.862 18.673C19.4265 18.3854 19.8854 17.9265 20.173 17.362C20.3072 17.0986 20.3994 16.7509 20.4488 16.1458C20.4992 15.5289 20.5 14.7366 20.5 13.6V10.4C20.5 9.26339 20.4992 8.47108 20.4488 7.85424C20.3994 7.24907 20.3072 6.90138 20.173 6.63803C19.8854 6.07354 19.4265 5.6146 18.862 5.32698C18.5986 5.19279 18.2509 5.10062 17.6458 5.05118C17.0289 5.00078 16.2366 5 15.1 5H11.5ZM5 8.5C5 7.94772 5.44772 7.5 6 7.5H7C7.55229 7.5 8 7.94772 8 8.5C8 9.05229 7.55229 9.5 7 9.5H6C5.44772 9.5 5 9.05229 5 8.5ZM5 12C5 11.4477 5.44772 11 6 11H7C7.55229 11 8 11.4477 8 12C8 12.5523 7.55229 13 7 13H6C5.44772 13 5 12.5523 5 12Z" fill="currentColor"></path></svg>
                    <svg onClick={handleCreateNewChat} className="w-10 h-10 p-1 rounded-xl cursor-pointer hover:bg-primaryText/10 icon-xl-heavy" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.6729 3.91287C16.8918 2.69392 18.8682 2.69392 20.0871 3.91287C21.3061 5.13182 21.3061 7.10813 20.0871 8.32708L14.1499 14.2643C13.3849 15.0293 12.3925 15.5255 11.3215 15.6785L9.14142 15.9899C8.82983 16.0344 8.51546 15.9297 8.29289 15.7071C8.07033 15.4845 7.96554 15.1701 8.01005 14.8586L8.32149 12.6785C8.47449 11.6075 8.97072 10.615 9.7357 9.85006L15.6729 3.91287ZM18.6729 5.32708C18.235 4.88918 17.525 4.88918 17.0871 5.32708L11.1499 11.2643C10.6909 11.7233 10.3932 12.3187 10.3014 12.9613L10.1785 13.8215L11.0386 13.6986C11.6812 13.6068 12.2767 13.3091 12.7357 12.8501L18.6729 6.91287C19.1108 6.47497 19.1108 5.76499 18.6729 5.32708ZM11 3.99929C11.0004 4.55157 10.5531 4.99963 10.0008 5.00007C9.00227 5.00084 8.29769 5.00827 7.74651 5.06064C7.20685 5.11191 6.88488 5.20117 6.63803 5.32695C6.07354 5.61457 5.6146 6.07351 5.32698 6.63799C5.19279 6.90135 5.10062 7.24904 5.05118 7.8542C5.00078 8.47105 5 9.26336 5 10.4V13.6C5 14.7366 5.00078 15.5289 5.05118 16.1457C5.10062 16.7509 5.19279 17.0986 5.32698 17.3619C5.6146 17.9264 6.07354 18.3854 6.63803 18.673C6.90138 18.8072 7.24907 18.8993 7.85424 18.9488C8.47108 18.9992 9.26339 19 10.4 19H13.6C14.7366 19 15.5289 18.9992 16.1458 18.9488C16.7509 18.8993 17.0986 18.8072 17.362 18.673C17.9265 18.3854 18.3854 17.9264 18.673 17.3619C18.7988 17.1151 18.8881 16.7931 18.9393 16.2535C18.9917 15.7023 18.9991 14.9977 18.9999 13.9992C19.0003 13.4469 19.4484 12.9995 20.0007 13C20.553 13.0004 21.0003 13.4485 20.9999 14.0007C20.9991 14.9789 20.9932 15.7808 20.9304 16.4426C20.8664 17.116 20.7385 17.7136 20.455 18.2699C19.9757 19.2107 19.2108 19.9756 18.27 20.455C17.6777 20.7568 17.0375 20.8826 16.3086 20.9421C15.6008 21 14.7266 21 13.6428 21H10.3572C9.27339 21 8.39925 21 7.69138 20.9421C6.96253 20.8826 6.32234 20.7568 5.73005 20.455C4.78924 19.9756 4.02433 19.2107 3.54497 18.2699C3.24318 17.6776 3.11737 17.0374 3.05782 16.3086C2.99998 15.6007 2.99999 14.7266 3 13.6428V10.3572C2.99999 9.27337 2.99998 8.39922 3.05782 7.69134C3.11737 6.96249 3.24318 6.3223 3.54497 5.73001C4.02433 4.7892 4.78924 4.0243 5.73005 3.54493C6.28633 3.26149 6.88399 3.13358 7.55735 3.06961C8.21919 3.00673 9.02103 3.00083 9.99922 3.00007C10.5515 2.99964 10.9996 3.447 11 3.99929Z" fill="currentColor"></path></svg>
                    </div>
                    <div className={`${sidebarHide ? 'hidden' : 'visible'} lg:hidden mr-auto flex gap-2`}>
                    <svg onClick={toggleSidebar} className="w-10 h-10 p-1 rounded-xl cursor-pointer hover:bg-primaryText/10 icon-xl-heavy" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M8.85719 3H15.1428C16.2266 2.99999 17.1007 2.99998 17.8086 3.05782C18.5375 3.11737 19.1777 3.24318 19.77 3.54497C20.7108 4.02433 21.4757 4.78924 21.955 5.73005C22.2568 6.32234 22.3826 6.96253 22.4422 7.69138C22.5 8.39925 22.5 9.27339 22.5 10.3572V13.6428C22.5 14.7266 22.5 15.6008 22.4422 16.3086C22.3826 17.0375 22.2568 17.6777 21.955 18.27C21.4757 19.2108 20.7108 19.9757 19.77 20.455C19.1777 20.7568 18.5375 20.8826 17.8086 20.9422C17.1008 21 16.2266 21 15.1428 21H8.85717C7.77339 21 6.89925 21 6.19138 20.9422C5.46253 20.8826 4.82234 20.7568 4.23005 20.455C3.28924 19.9757 2.52433 19.2108 2.04497 18.27C1.74318 17.6777 1.61737 17.0375 1.55782 16.3086C1.49998 15.6007 1.49999 14.7266 1.5 13.6428V10.3572C1.49999 9.27341 1.49998 8.39926 1.55782 7.69138C1.61737 6.96253 1.74318 6.32234 2.04497 5.73005C2.52433 4.78924 3.28924 4.02433 4.23005 3.54497C4.82234 3.24318 5.46253 3.11737 6.19138 3.05782C6.89926 2.99998 7.77341 2.99999 8.85719 3ZM6.35424 5.05118C5.74907 5.10062 5.40138 5.19279 5.13803 5.32698C4.57354 5.6146 4.1146 6.07354 3.82698 6.63803C3.69279 6.90138 3.60062 7.24907 3.55118 7.85424C3.50078 8.47108 3.5 9.26339 3.5 10.4V13.6C3.5 14.7366 3.50078 15.5289 3.55118 16.1458C3.60062 16.7509 3.69279 17.0986 3.82698 17.362C4.1146 17.9265 4.57354 18.3854 5.13803 18.673C5.40138 18.8072 5.74907 18.8994 6.35424 18.9488C6.97108 18.9992 7.76339 19 8.9 19H9.5V5H8.9C7.76339 5 6.97108 5.00078 6.35424 5.05118ZM11.5 5V19H15.1C16.2366 19 17.0289 18.9992 17.6458 18.9488C18.2509 18.8994 18.5986 18.8072 18.862 18.673C19.4265 18.3854 19.8854 17.9265 20.173 17.362C20.3072 17.0986 20.3994 16.7509 20.4488 16.1458C20.4992 15.5289 20.5 14.7366 20.5 13.6V10.4C20.5 9.26339 20.4992 8.47108 20.4488 7.85424C20.3994 7.24907 20.3072 6.90138 20.173 6.63803C19.8854 6.07354 19.4265 5.6146 18.862 5.32698C18.5986 5.19279 18.2509 5.10062 17.6458 5.05118C17.0289 5.00078 16.2366 5 15.1 5H11.5ZM5 8.5C5 7.94772 5.44772 7.5 6 7.5H7C7.55229 7.5 8 7.94772 8 8.5C8 9.05229 7.55229 9.5 7 9.5H6C5.44772 9.5 5 9.05229 5 8.5ZM5 12C5 11.4477 5.44772 11 6 11H7C7.55229 11 8 11.4477 8 12C8 12.5523 7.55229 13 7 13H6C5.44772 13 5 12.5523 5 12Z" fill="currentColor"></path></svg>
                    <svg onClick={handleCreateNewChat} className="w-10 h-10 p-1 rounded-xl cursor-pointer hover:bg-primaryText/10 icon-xl-heavy" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.6729 3.91287C16.8918 2.69392 18.8682 2.69392 20.0871 3.91287C21.3061 5.13182 21.3061 7.10813 20.0871 8.32708L14.1499 14.2643C13.3849 15.0293 12.3925 15.5255 11.3215 15.6785L9.14142 15.9899C8.82983 16.0344 8.51546 15.9297 8.29289 15.7071C8.07033 15.4845 7.96554 15.1701 8.01005 14.8586L8.32149 12.6785C8.47449 11.6075 8.97072 10.615 9.7357 9.85006L15.6729 3.91287ZM18.6729 5.32708C18.235 4.88918 17.525 4.88918 17.0871 5.32708L11.1499 11.2643C10.6909 11.7233 10.3932 12.3187 10.3014 12.9613L10.1785 13.8215L11.0386 13.6986C11.6812 13.6068 12.2767 13.3091 12.7357 12.8501L18.6729 6.91287C19.1108 6.47497 19.1108 5.76499 18.6729 5.32708ZM11 3.99929C11.0004 4.55157 10.5531 4.99963 10.0008 5.00007C9.00227 5.00084 8.29769 5.00827 7.74651 5.06064C7.20685 5.11191 6.88488 5.20117 6.63803 5.32695C6.07354 5.61457 5.6146 6.07351 5.32698 6.63799C5.19279 6.90135 5.10062 7.24904 5.05118 7.8542C5.00078 8.47105 5 9.26336 5 10.4V13.6C5 14.7366 5.00078 15.5289 5.05118 16.1457C5.10062 16.7509 5.19279 17.0986 5.32698 17.3619C5.6146 17.9264 6.07354 18.3854 6.63803 18.673C6.90138 18.8072 7.24907 18.8993 7.85424 18.9488C8.47108 18.9992 9.26339 19 10.4 19H13.6C14.7366 19 15.5289 18.9992 16.1458 18.9488C16.7509 18.8993 17.0986 18.8072 17.362 18.673C17.9265 18.3854 18.3854 17.9264 18.673 17.3619C18.7988 17.1151 18.8881 16.7931 18.9393 16.2535C18.9917 15.7023 18.9991 14.9977 18.9999 13.9992C19.0003 13.4469 19.4484 12.9995 20.0007 13C20.553 13.0004 21.0003 13.4485 20.9999 14.0007C20.9991 14.9789 20.9932 15.7808 20.9304 16.4426C20.8664 17.116 20.7385 17.7136 20.455 18.2699C19.9757 19.2107 19.2108 19.9756 18.27 20.455C17.6777 20.7568 17.0375 20.8826 16.3086 20.9421C15.6008 21 14.7266 21 13.6428 21H10.3572C9.27339 21 8.39925 21 7.69138 20.9421C6.96253 20.8826 6.32234 20.7568 5.73005 20.455C4.78924 19.9756 4.02433 19.2107 3.54497 18.2699C3.24318 17.6776 3.11737 17.0374 3.05782 16.3086C2.99998 15.6007 2.99999 14.7266 3 13.6428V10.3572C2.99999 9.27337 2.99998 8.39922 3.05782 7.69134C3.11737 6.96249 3.24318 6.3223 3.54497 5.73001C4.02433 4.7892 4.78924 4.0243 5.73005 3.54493C6.28633 3.26149 6.88399 3.13358 7.55735 3.06961C8.21919 3.00673 9.02103 3.00083 9.99922 3.00007C10.5515 2.99964 10.9996 3.447 11 3.99929Z" fill="currentColor"></path></svg>
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
                {/* Chat Navbar end */}

                {/* Chat Area start */}
                <div className={` ${isChatEmpty? 'visible' : 'hidden'} w-full xl:px-[20%] z-0 px-3 h-full flex flex-col gap-1 items-start justify-center`}>
                        <h1 className='text-primaryText text-4xl max-lg:text-xl font-sansMedium'>Hi there, {userInfo? userInfo.fullname : ''} </h1>
                        <h1 className='text-primaryText text-5xl max-lg:text-3xl font-sansSemibold'>What would you like to know?</h1>
                        <p className='text-lg text-primaryText'>Use one of the most common prompts below or use your own</p>
                        <div className='w-full flex flex-wrap md:gap-4 max-md:gap-y-4 md:justify-start justify-between pt-4'>
                            <div onClick={() => handleSubmitCommand(null, "What are the top stock picks for this week?")} 
                            className='flex flex-col justify-between gap-4 cursor-pointer w-56 max-md:w-[48%] py-4 px-4 rounded-lg bg-background border-2 border-primaryText/10 shadow-lg'>
                                <p>What are the top stock picks for this week?</p>
                                <svg className='w-8 h-auto' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M16.1583 8.23285C16.1583 10.5825 14.2851 12.4666 11.949 12.4666C9.61292 12.4666 7.73974 10.5825 7.73974 8.23285C7.73974 5.88227 9.61292 4 11.949 4C14.2851 4 16.1583 5.88227 16.1583 8.23285ZM11.9491 19.9999C8.51789 19.9999 5.58813 19.456 5.58813 17.2801C5.58813 15.1033 8.49909 14.5396 11.9491 14.5396C15.3803 14.5396 18.31 15.0835 18.31 17.2603C18.31 19.4361 15.3991 19.9999 11.9491 19.9999ZM17.957 8.30938C17.957 9.50719 17.5998 10.623 16.973 11.5507C16.9085 11.6461 16.9658 11.7749 17.0795 11.7947C17.2362 11.8217 17.3983 11.8371 17.5631 11.8416C19.2061 11.8848 20.6808 10.8212 21.0883 9.2199C21.6918 6.84139 19.9198 4.70605 17.6633 4.70605C17.418 4.70605 17.1834 4.73217 16.9551 4.779C16.9237 4.78621 16.8906 4.80062 16.8727 4.82854C16.8512 4.86276 16.8673 4.90869 16.8888 4.93841C17.5666 5.89395 17.957 7.05934 17.957 8.30938ZM20.6781 13.5125C21.7821 13.7295 22.5083 14.1726 22.8092 14.8166C23.0635 15.3452 23.0635 15.9585 22.8092 16.4863C22.3489 17.4851 20.8652 17.8057 20.2886 17.8885C20.1695 17.9065 20.0737 17.803 20.0862 17.6832C20.3808 14.9156 18.0376 13.6034 17.4314 13.3017C17.4054 13.2882 17.4 13.2675 17.4027 13.2549C17.4045 13.2459 17.4153 13.2315 17.435 13.2288C18.7467 13.2045 20.157 13.3846 20.6781 13.5125ZM6.43719 11.8411C6.60194 11.8366 6.76312 11.8222 6.92071 11.7942C7.03442 11.7744 7.09173 11.6456 7.02726 11.5502C6.40048 10.6226 6.04321 9.5067 6.04321 8.30889C6.04321 7.05885 6.43361 5.89347 7.11143 4.93792C7.13292 4.9082 7.14814 4.86227 7.12755 4.82805C7.10964 4.80103 7.07561 4.78572 7.04517 4.77852C6.81595 4.73168 6.58135 4.70557 6.33601 4.70557C4.07959 4.70557 2.30759 6.8409 2.91199 9.21941C3.3194 10.8207 4.79413 11.8843 6.43719 11.8411ZM6.59694 13.2545C6.59962 13.268 6.59425 13.2878 6.56918 13.3022C5.9621 13.6039 3.61883 14.9161 3.91342 17.6828C3.92595 17.8035 3.83104 17.9061 3.71195 17.889C3.13531 17.8062 1.65163 17.4855 1.19139 16.4868C0.936203 15.9581 0.936203 15.3457 1.19139 14.817C1.49225 14.1731 2.21752 13.73 3.32156 13.5121C3.84358 13.3851 5.25294 13.205 6.5656 13.2293C6.5853 13.232 6.59515 13.2464 6.59694 13.2545Z" fill="var(--svg-color)"/>
                                </svg>
                            </div>
                            <div onClick={() => handleSubmitCommand(null, "What are the key factors that affects the stock markets?")} 
                            className='flex flex-col justify-between gap-4 cursor-pointer w-56 max-md:w-[48%] py-4 px-4 rounded-lg bg-background border-2 border-primaryText/10 shadow-lg'>
                                <p>What are the key factors that affects the stock markets?</p>
                                <svg className='w-8 h-auto' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.47 16.83L18.86 19.99C18.96 20.82 18.07 21.4 17.36 20.97L13.9 18.91C13.66 18.77 13.6 18.47 13.73 18.23C14.23 17.31 14.5 16.27 14.5 15.23C14.5 11.57 11.36 8.59 7.50002 8.59C6.71002 8.59 5.94002 8.71 5.22002 8.95C4.85002 9.07 4.49002 8.73 4.58002 8.35C5.49002 4.71 8.99002 2 13.17 2C18.05 2 22 5.69 22 10.24C22 12.94 20.61 15.33 18.47 16.83Z" fill="var(--svg-color)"/>
                                <path d="M13 15.23C13 16.42 12.56 17.52 11.82 18.39C10.83 19.59 9.26 20.36 7.5 20.36L4.89 21.91C4.45 22.18 3.89 21.81 3.95 21.3L4.2 19.33C2.86 18.4 2 16.91 2 15.23C2 13.47 2.94 11.92 4.38 11C5.27 10.42 6.34 10.09 7.5 10.09C10.54 10.09 13 12.39 13 15.23Z" fill="var(--svg-color)"/>
                                </svg>
                            </div>
                            <div onClick={() => handleSubmitCommand(null, "What are the key indicators to watch when predicting stock market trends?")} 
                            className='flex flex-col justify-between gap-4 cursor-pointer w-56 max-md:w-[48%] py-4 px-4 rounded-lg bg-background border-2 border-primaryText/10 shadow-lg'>
                                <p>What are the key indicators to watch when predicting stock market trends?</p>
                                <svg className='w-8 h-auto' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z" fill="var(--svg-color)"/>
                                </svg>
                            </div>
                            <div onClick={() => handleSubmitCommand(null, "How can I build a balanced portfolio for long-term growth?")} 
                            className='flex flex-col justify-between gap-4 cursor-pointer w-56 max-md:w-[48%] py-4 px-4 rounded-lg bg-background border-2 border-primaryText/10 shadow-lg'>
                                <p>How can I build a balanced portfolio for long-term growth?</p>
                                <svg className='w-8 h-auto' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.75 3.56V2C16.75 1.59 16.41 1.25 16 1.25C15.59 1.25 15.25 1.59 15.25 2V3.5H8.74999V2C8.74999 1.59 8.40999 1.25 7.99999 1.25C7.58999 1.25 7.24999 1.59 7.24999 2V3.56C4.54999 3.81 3.23999 5.42 3.03999 7.81C3.01999 8.1 3.25999 8.34 3.53999 8.34H20.46C20.75 8.34 20.99 8.09 20.96 7.81C20.76 5.42 19.45 3.81 16.75 3.56Z" fill="var(--svg-color)"/>
                                <path d="M19 15C16.79 15 15 16.79 15 19C15 19.75 15.21 20.46 15.58 21.06C16.27 22.22 17.54 23 19 23C20.46 23 21.73 22.22 22.42 21.06C22.79 20.46 23 19.75 23 19C23 16.79 21.21 15 19 15ZM21.07 18.57L18.94 20.54C18.8 20.67 18.61 20.74 18.43 20.74C18.24 20.74 18.05 20.67 17.9 20.52L16.91 19.53C16.62 19.24 16.62 18.76 16.91 18.47C17.2 18.18 17.68 18.18 17.97 18.47L18.45 18.95L20.05 17.47C20.35 17.19 20.83 17.21 21.11 17.51C21.39 17.81 21.37 18.28 21.07 18.57Z" fill="var(--svg-color)"/>
                                <path d="M20 9.83997H4C3.45 9.83997 3 10.29 3 10.84V17C3 20 4.5 22 8 22H12.93C13.62 22 14.1 21.33 13.88 20.68C13.68 20.1 13.51 19.46 13.51 19C13.51 15.97 15.98 13.5 19.01 13.5C19.3 13.5 19.59 13.52 19.87 13.57C20.47 13.66 21.01 13.19 21.01 12.59V10.85C21 10.29 20.55 9.83997 20 9.83997ZM9.21 18.21C9.02 18.39 8.76 18.5 8.5 18.5C8.24 18.5 7.98 18.39 7.79 18.21C7.61 18.02 7.5 17.76 7.5 17.5C7.5 17.24 7.61 16.98 7.79 16.79C7.89 16.7 7.99 16.63 8.12 16.58C8.49 16.42 8.93 16.51 9.21 16.79C9.39 16.98 9.5 17.24 9.5 17.5C9.5 17.76 9.39 18.02 9.21 18.21ZM9.21 14.71C9.16 14.75 9.11 14.79 9.06 14.83C9 14.87 8.94 14.9 8.88 14.92C8.82 14.95 8.76 14.97 8.7 14.98C8.63 14.99 8.56 15 8.5 15C8.24 15 7.98 14.89 7.79 14.71C7.61 14.52 7.5 14.26 7.5 14C7.5 13.74 7.61 13.48 7.79 13.29C8.02 13.06 8.37 12.95 8.7 13.02C8.76 13.03 8.82 13.05 8.88 13.08C8.94 13.1 9 13.13 9.06 13.17C9.11 13.21 9.16 13.25 9.21 13.29C9.39 13.48 9.5 13.74 9.5 14C9.5 14.26 9.39 14.52 9.21 14.71ZM12.71 14.71C12.52 14.89 12.26 15 12 15C11.74 15 11.48 14.89 11.29 14.71C11.11 14.52 11 14.26 11 14C11 13.74 11.11 13.48 11.29 13.29C11.67 12.92 12.34 12.92 12.71 13.29C12.89 13.48 13 13.74 13 14C13 14.26 12.89 14.52 12.71 14.71Z" fill="var(--svg-color)"/>
                                </svg>
                            </div>
                        </div>
                </div>
                <div className={` ${isChatEmpty? 'hidden' : 'visible'} w-full xl:px-[20%] z-0 md:px-[5%] h-max flex flex-col items-center`}>
                    {chatCanvas
                    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
                    .map((chat, index) => (
                        <div key={index} className="w-full px-3 flex flex-col gap-y-6 py-4">
                            {/* Question */}
                            {/* <p className="text-md self-end py-2 px-4 bg-primaryText/10 rounded-3xl">{chat.question}</p> */}
                            {chat.question.length > maxChars ? 
                            (<div className='self-end py-2 px-4 bg-primaryText/10 rounded-3xl'>
                                <p className="text-md ">
                                    {showMore ? chat.question : `${chat.question.substring(0, maxChars)}...`}
                                </p>
                                <button
                                    onClick={toggleShowMore}
                                    className="text-primaryHeading dark:text-primaryText mt-2"
                                >
                                    {showMore ? "See less" : "See full message"}
                                </button>
                            </div>)
                            : 
                            (<p className="text-md self-end py-2 px-4 bg-primaryText/10 rounded-3xl">{chat.question}</p>
                            )}
                            {/* Answer */}
                            <div className='w-full flex gap-2 items-start'>
                                {/* <svg className='w-14 h-8' width="92" height="92" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="92" height="92" rx="46" fill="#131313"/>
                                <path d="M52.5386 50.455V50.4586L52.0969 50.712L52.5386 50.455Z" fill="url(#paint0_linear_2321_2655)"/>
                                <path d="M68.9964 35.5177V20.9895L46.5 8L24 20.9895V34.4932L50.3158 49.6874L46.4964 51.8922L24 38.9027V53.4308L46.5 66.4203L69 53.4308V39.9272L42.6806 24.7329L46.5 22.5282L69 35.5177H68.9964ZM25.7776 22.0177L46.5 10.0527L67.2188 22.0177V26.4272L46.5 14.5093L25.7776 26.4272V22.0177ZM25.7776 33.465V29.5044L55.5253 46.679L52.0933 48.6593L25.7776 33.465ZM67.2188 52.4027L46.5 64.3677L25.7776 52.4027V47.9932L46.4964 59.9545L67.2152 47.9932V52.4027H67.2188ZM67.2188 40.9553V44.9159L37.471 27.7413L40.9031 25.7611L67.2188 40.9553ZM40.9031 23.7084L40.4578 23.9654L33.9159 27.7413L66.3319 46.4545L46.5 57.9055L25.7776 45.9405V41.9799L46.4964 53.9413L52.0933 50.712L52.5386 50.4549L59.0805 46.679L26.6681 27.9658L46.4964 16.5583L67.2152 28.4763V32.4368L46.4964 20.4755L40.8994 23.7047L40.9031 23.7084Z" fill="url(#paint1_linear_2321_2655)"/>
                                <path d="M40.9031 23.7084L40.4578 23.9654V23.9618L40.9031 23.7084Z" fill="url(#paint2_linear_2321_2655)"/>
                                <path d="M46.5 70.3809L24 57.3914V71.9231L46.5 84.9127L69 71.9231V57.3914L46.5 70.3809ZM67.2188 70.895L46.5 82.8564L25.7776 70.895V66.4855L46.4964 78.4469L67.2152 66.4855V70.895H67.2188ZM67.2188 64.4328L46.5 76.3942L25.7776 64.4328V60.4722L46.4964 72.4336L67.2152 60.4722V64.4328H67.2188Z" fill="url(#paint3_linear_2321_2655)"/>
                                <defs>
                                <linearGradient id="paint0_linear_2321_2655" x1="74.5209" y1="28.3819" x2="28.1918" y2="74.7106" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#00FAFF"/>
                                <stop offset="0.52" stopColor="#8D80C5"/>
                                <stop offset="1" stopColor="#CB3596"/>
                                </linearGradient>
                                <linearGradient id="paint1_linear_2321_2655" x1="64.9236" y1="18.7848" x2="18.5949" y2="65.1134" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#00FAFF"/>
                                <stop offset="0.52" stopColor="#8D80C5"/>
                                <stop offset="1" stopColor="#CB3596"/>
                                </linearGradient>
                                <linearGradient id="paint2_linear_2321_2655" x1="55.3262" y1="9.18748" x2="8.99765" y2="55.5197" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#00FAFF"/>
                                <stop offset="0.52" stopColor="#8D80C5"/>
                                <stop offset="1" stopColor="#CB3596"/>
                                </linearGradient>
                                <linearGradient id="paint3_linear_2321_2655" x1="78.648" y1="32.5092" x2="32.3194" y2="78.8379" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#00FAFF"/>
                                <stop offset="0.52" stopColor="#8D80C5"/>
                                <stop offset="1" stopColor="#CB3596"/>
                                </linearGradient>
                                </defs>
                                </svg> */}
                                <svg className='w-[3%] max-sm:w-[5%] h-auto' width="126" height="127" viewBox="0 0 126 127" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M117.569 51.932C120.432 43.3101 119.441 33.8723 114.851 26.0353C107.948 14.0192 94.0759 7.83757 80.5291 10.7417C68.7206 -2.39461 48.5037 -3.46967 35.3683 8.33943C31.1999 12.0879 28.0897 16.8639 26.3514 22.194C17.451 24.0207 9.77046 29.5934 5.27389 37.4876C-1.70281 49.4846 -0.119088 64.6188 9.19031 74.9128C6.31783 83.53 7.29991 92.9702 11.8845 100.81C18.7946 112.83 32.6766 119.012 46.2305 116.103C52.2608 122.894 60.9211 126.759 70.0022 126.706C83.889 126.718 96.1921 117.751 100.432 104.527C109.33 102.698 117.01 97.1253 121.509 89.2335C128.403 77.2579 126.812 62.2047 117.569 51.9344V51.932ZM70.0022 118.425C64.4594 118.434 59.0901 116.491 54.8361 112.935L55.5851 112.512L80.7787 97.965C82.0533 97.2157 82.8403 95.8505 82.8499 94.3711V58.8415L93.5004 65.0041C93.6074 65.0588 93.6811 65.1611 93.7001 65.2776V94.7183C93.6716 107.798 83.0782 118.394 70.0022 118.422V118.425ZM19.068 96.6686C16.2883 91.8689 15.2895 86.2415 16.2502 80.7757L16.9992 81.2253L42.2167 95.7696C43.4865 96.5165 45.063 96.5165 46.3328 95.7696L77.1382 78.0072V90.3086C77.1311 90.4371 77.0669 90.556 76.9646 90.6321L51.4476 105.352C40.1075 111.886 25.6214 108.002 19.0703 96.6686H19.068ZM12.4338 41.7783C15.2325 36.9453 19.6506 33.261 24.9057 31.3749V61.3151C24.8866 62.7874 25.669 64.155 26.9507 64.8828L57.6063 82.5715L46.9557 88.7341C46.8392 88.7959 46.699 88.7959 46.5824 88.7341L21.1153 74.0375C9.79902 67.4777 5.91838 52.9976 12.4338 41.6523V41.7783ZM99.9349 62.1119L69.1794 44.2472L79.8038 38.1107C79.9203 38.0489 80.0606 38.0489 80.1771 38.1107L105.644 52.8311C116.98 59.3743 120.865 73.871 114.323 85.2068C111.57 89.9804 107.24 93.6433 102.077 95.5698V65.6296C102.032 64.1597 101.217 62.823 99.9325 62.1119H99.9349ZM110.536 46.169L109.786 45.7195L84.619 31.0491C83.3397 30.2998 81.756 30.2998 80.4791 31.0491L49.6998 48.8115V36.51C49.6879 36.384 49.7451 36.2579 49.8497 36.1866L75.3167 21.49C86.6687 14.9492 101.174 18.8499 107.713 30.2047C110.476 34.9997 111.475 40.6105 110.538 46.0643V46.1642L110.536 46.169ZM43.8883 67.9748L33.2378 61.8383C33.1308 61.7741 33.0571 61.6623 33.0381 61.5387V32.1717C33.0547 19.0663 43.691 8.45834 56.7907 8.47499C62.3193 8.48213 67.6743 10.4206 71.9259 13.9574L71.1769 14.3808L45.9832 28.9275C44.7087 29.6767 43.9216 31.0419 43.9121 32.5213L43.8883 67.9748ZM49.6737 55.4997L63.3917 47.5913L77.1359 55.4997V71.3166L63.4416 79.2274L49.6998 71.3166L49.6761 55.4997H49.6737Z" fill="var(--svg-color)"/>
                                </svg>
                                <p className="w-[90%] items-start markdown">
                                    <ReactMarkdown
                                        components={{
                                        code({ node, inline, className, children, ...props }) {
                                            const match = /language-(\w+)/.exec(className || '');
                                            return !inline && match ? (
                                            <SyntaxHighlighter
                                                // style={atomOneDark}
                                                language={match[1]}
                                                PreTag="div"
                                                {...props}
                                            >
                                                {String(children).replace(/\n$/, '')}
                                            </SyntaxHighlighter>
                                            ) : (
                                            <code className={className} {...props}>
                                                {children}
                                            </code>
                                            );
                                        },
                                        }}
                                    >
                                        {chat.answer}
                                    </ReactMarkdown>
                                </p>
                            </div>
                        </div>
                    ))}
                    <div className={` ${responseloading ? 'visible' : 'hidden'} flex justify-start`}>
                        {/* From Uiverse.io by kennyotsu */}
                            <div className="loader">
                                <p>Please wait</p>
                                <div className="words">
                                <span className="word">processing</span>
                                <span className="word">understanding</span>
                                <span className="word">searching</span>
                                <span className="word">thinking</span>
                                <span className="word">analyzing</span>
                                </div>
                            </div>
                    </div>
                </div>
                {/* Chat Area end */}
                {/* Input for Questions start */}
                <form onSubmit={handleSubmitCommand} className="sticky bottom-0 max-lg:fixed max-lg:bottom-0 max-lg:left-0 mt-auto py-3 px-2 w-full xl:px-[20%] md:px-[5%] z-10 flex flex-col items-center space-y-4 bg-background">
                    <div className="relative w-full rounded-[2rem] py-4 px-10 md:px-14 bg-primaryText/10 flex items-center">
                        <label htmlFor="question" className="absolute bottom-[.4rem] left-2 max-sm:left-0">
                            <svg className='w-12 h-10' width="15" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.90562 13.2484L8.76685 13.3274L8.90562 13.2484Z" fill="var(--svg-color)"/>
                            <path d="M14.0404 8.58739V4.05323L7.02018 0L0 4.05323V8.26677L8.21174 13.0079L7.02018 13.6958L0 9.64258V14.1767L7.02018 18.23L14.0404 14.1767V9.9632L5.82861 5.22206L7.02018 4.53416L14.0404 8.58739ZM0.555106 4.37385L7.02018 0.640047L13.4852 4.37385V5.74965L7.02018 2.0302L0.555106 5.74965V4.37385ZM0.555106 7.94615V6.71032L9.83758 12.07L8.76685 12.6885L0.555106 7.94735V7.94615ZM13.4864 13.8549L7.02137 17.5887L0.556303 13.8549V12.4791L7.02137 16.2117L13.4864 12.4791V13.8549ZM13.4864 10.2826V11.5185L4.20397 6.15881L5.2747 5.54029L13.4864 10.2814V10.2826ZM5.27351 4.90144L5.13473 4.9816L3.09376 6.16L13.2089 11.9994L7.02018 15.5729L0.555106 11.8391V10.6032L7.02018 14.3359L8.76685 13.3273L8.90562 13.2472L10.9466 12.0688L0.832659 6.22939L7.02018 2.67025L13.4852 6.3897V7.62553L7.02018 3.89292L5.27351 4.90144Z" fill="var(--svg-color)"/>
                            <path d="M5.27354 4.90149L5.13477 4.98164L5.27354 4.90149Z" fill="var(--svg-color)"/>
                            <path d="M7.02018 19.4658L0 15.4126V19.9468L7.02018 24L14.0404 19.9468V15.4126L7.02018 19.4658ZM13.4864 19.6261L7.02137 23.3587L0.556303 19.6261V18.2503L7.02137 21.9829L13.4864 18.2503V19.6261ZM13.4864 17.6091L7.02137 21.3417L0.556303 17.6091V16.3733L7.02137 20.1059L13.4864 16.3733V17.6091Z" fill="var(--svg-color)"/>
                            </svg>
                        </label>
                        <textarea
                        ref={textareaRef}
                        id="question"
                        autoComplete="off"
                        required
                        value={command}
                        onChange={(e) => setCommand(e.target.value)}
                        onKeyDown={handleKeyDown} // Handles Enter/Shift+Enter behavior
                        placeholder="Message StockVerseGPT"
                        className="w-full text-lg leading-[120%] border-0 bg-primaryText/0 text-primaryText focus:outline-none resize-none overflow-y-auto scrollbar-thin"
                        style={{ maxHeight: '300px' }} // Max height set here
                        />
                        <button
                            disabled={responseloading}
                            type="submit"
                            className="absolute bottom-[.45rem] right-2 rounded-full p-1 bg-primaryButtonBg text-primaryButtonText hover:bg-secondaryHeading hover:text-mobNavLink transition duration-300"
                        >
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-2xl"><path fillRule="evenodd" clipRule="evenodd" d="M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z" fill="currentColor"></path></svg>
                        </button>
                    </div>
                </form>
                {/* Input for Questions end */}
                {message && (
                    <p className="flex gap-2 h-max text-sm fixed bottom-2 left-2 text-primaryColor p-2 py-2 rounded-lg bg-primaryText border-2 border-primaryColor/10 text-center">
                    {message}
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => setMessage('')} // Clear the message on click
                        className="cursor-pointer" // Make it clickable
                    >
                        <path
                        d="M14.19 0H5.81C2.17 0 0 2.17 0 5.81V14.18C0 17.83 2.17 20 5.81 20H14.18C17.82 20 19.99 17.83 19.99 14.19V5.81C20 2.17 17.83 0 14.19 0ZM13.36 12.3C13.65 12.59 13.65 13.07 13.36 13.36C13.21 13.51 13.02 13.58 12.83 13.58C12.64 13.58 12.45 13.51 12.3 13.36L10 11.06L7.7 13.36C7.55 13.51 7.36 13.58 7.17 13.58C6.98 13.58 6.79 13.51 6.64 13.36C6.35 13.07 6.35 12.59 6.64 12.3L8.94 10L6.64 7.7C6.35 7.41 6.35 6.93 6.64 6.64C6.93 6.35 7.41 6.35 7.7 6.64L10 8.94L12.3 6.64C12.59 6.35 13.07 6.35 13.36 6.64C13.65 6.93 13.65 7.41 13.36 7.7L11.06 10L13.36 12.3Z"
                        fill="var(--opposite-svg-color)"
                        />
                    </svg>
                    </p>
                )}
            </div>
            {/* Chat canvas end */}
            {/* Theme Switch start */}
            <div className='fixed bottom-4 z-10 right-3'>
                <ThemeSwitch/>
            </div>
            {/* Theme Switch end */}
        </section>
    );
}