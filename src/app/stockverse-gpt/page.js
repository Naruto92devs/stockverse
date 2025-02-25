'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import axios from 'axios';
import User from '@/components/ProfileLogo';
import Image from 'next/image';
import Loading from '@/loaders&errors_UI/loading';
import UserSettings from '../dashboard/components/Settings';
import LogInPopup from '@/components/loginPopup';
import { useUser } from '@/context/UserContext';

const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

export default function Stockverse_GPT() {
    const { user } = useUser();
    const [loadingText, setLoadingText] = useState('');
    const loadingMessages = ["Searching...", "Thinking...", "Analyzing...", "Processing...", "Almost there..."];
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
    const chatCanvasRef = useRef(null);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [chatCanvas, setChatCanvas] = useState([]);
    const [chatHistory, setChatHistory] = useState(null);
    const [sidebarHide, setSidebarHide] = useState(false);
    const [favouriteStatus, setFavouriteStatus] = useState({}); // Track favorite status for each chat
    const [isChatEmpty, setIsChatEmpty] = useState(true);
    const [settings, setSettings] = useState(false);
    const token = Cookies.get('authToken');

    useEffect(() => {
        let index = 0;
        let interval;
    
        if (responseloading) {
            setLoadingText(loadingMessages[index]);
            interval = setInterval(() => {
                index = (index + 1) % loadingMessages.length;
                setLoadingText(loadingMessages[index]);
            }, 1000);
        } else {
            clearInterval(interval);
            setLoadingText('');
        }
    
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [responseloading]);

    useEffect(() => {
        setIsChatEmpty(chatCanvas.length === 0 ? true : false);
    }, [chatCanvas]);

    useEffect(() => {
        if (chatCanvasRef.current) {
            chatCanvasRef.current.scrollTop = chatCanvasRef.current.scrollHeight;
        }
    }, [chatCanvas]);

    
    // useEffect(() => {
    //     if (token) {
    //         fetchChatHistory();
    //         handleCreateNewChat();
    //     }
    // }, [token]);
    
    // Load userInfo and chatHistory from sessionStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // const savedUserInfo = localStorage.getItem('UserInfo');
            const savedChatHistory = localStorage.getItem('ChatHistory');
            
            if (user) {
                // const parsedUserInfo = JSON.parse(savedUserInfo);
                setUserInfo(user);
                setUserid(user.userid);
            }

            if (savedChatHistory) {
                setChatHistory(JSON.parse(savedChatHistory)); // Render from sessionStorage
            } else if (!savedChatHistory) {
                fetchChatHistory();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]); // Run only once on mount

    // UseEffect to run fetchChatHistory only when userid is set
    useEffect(() => {
        if (userid) {
            fetchChatHistory();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        if (e) e.preventDefault(); 
        
        const commandToSubmit = inputCommand || command; 
        setResponseLoading(true);
        setQuestion(commandToSubmit);
        setCommand(''); 
    
        const tempId = Date.now();
    
        const newChatObject = {
            id: tempId,
            chat_id: chatId,
            question: commandToSubmit,
            answer: '',
            created_at: new Date().toISOString(),
        };
    
        setChatCanvas((prevChatCanvas) => {
            const updatedCanvas = [...prevChatCanvas, newChatObject];
            sessionStorage.setItem('chatCanvas', JSON.stringify(updatedCanvas));
            return updatedCanvas;
        });
    
        try {
            const response = await axios.post(
                `${STOCKVERSE_BACK_END}/stockgpt`,
                { chatId, command: commandToSubmit },
                { withCredentials: true }
            );
    
            if (response.status === 207) {
                typeAnswer(tempId, response.data.answer); // Trigger typing effect
                fetchChatHistory();
                setResponseLoading(false);
            } else {
                setMessage(response.data.message || 'Something went wrong');
                setResponseLoading(false);
            }
    
        } catch (error) {
            setMessage('An error occurred. Please try again.');
            setResponseLoading(false);
        }
    };

    // const typeAnswer = (chatId, fullText) => {
    //     let index = 0;
    //     const speed = 20; // Typing speed in milliseconds
    
    //     setChatCanvas((prevChatCanvas) =>
    //         prevChatCanvas.map((chat) =>
    //             chat.id === chatId ? { ...chat, answer: '' } : chat
    //         )
    //     );
    
    //     const interval = setInterval(() => {
    //         setChatCanvas((prevChatCanvas) => {
    //             const updatedCanvas = prevChatCanvas.map((chat) =>
    //                 chat.id === chatId
    //                     ? { ...chat, answer: fullText.substring(0, index) }
    //                     : chat
    //             );
    
    //             sessionStorage.setItem('chatCanvas', JSON.stringify(updatedCanvas)); // Save updated chat history to sessionStorage
    
    //             return updatedCanvas;
    //         });
    
    //         if (index >= fullText.length) {
    //             clearInterval(interval);
    //         } else {
    //             index++;
    //         }
    //     }, speed);
    // };

    const typeAnswer = (chatId, fullText) => {
        let index = 0;
        const speed = 10; // Faster interval
        const step = 6; // Number of characters added per interval
    
        setChatCanvas((prevChatCanvas) =>
            prevChatCanvas.map((chat) =>
                chat.id === chatId ? { ...chat, answer: '' } : chat
            )
        );
    
        // const interval = setInterval(() => {
        //     setChatCanvas((prevChatCanvas) => {
        //         const updatedCanvas = prevChatCanvas.map((chat) =>
        //             chat.id === chatId
        //                 ? { ...chat, answer: fullText.substring(0, index) }
        //                 : chat
        //         );
    
        //         sessionStorage.setItem('chatCanvas', JSON.stringify(updatedCanvas));
    
        //         // Scroll to the bottom during typing
        //         if (chatCanvasRef.current) {
        //             chatCanvasRef.current.scrollTop = chatCanvasRef.current.scrollHeight;
        //         }
    
        //         return updatedCanvas;
        //     });
    
        //     if (index >= fullText.length) {
        //         clearInterval(interval);
        //     } else {
        //         index++;
        //     }
        // }, speed);

        const interval = setInterval(() => {
            setChatCanvas((prevChatCanvas) => {
                const updatedCanvas = prevChatCanvas.map((chat) =>
                    chat.id === chatId
                        ? { ...chat, answer: fullText.substring(0, index) }
                        : chat
                );

                sessionStorage.setItem('chatCanvas', JSON.stringify(updatedCanvas));

                if (chatCanvasRef.current) {
                    chatCanvasRef.current.scrollTop = chatCanvasRef.current.scrollHeight;
                }

                return updatedCanvas;
            });

            if (index >= fullText.length) {
                clearInterval(interval);
            } else {
                index += step; // Increase by more characters per step
            }
        }, speed);
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
    
    const DeleteChatId = async (chatId) => {
    
        // Optimistically update the UI by removing the chat
        const updatedChatHistory = chatHistory.filter(chat => chat.chat_id !== chatId);
        setChatHistory(updatedChatHistory);
    
        try {
            const response = await axios.post(`${STOCKVERSE_BACK_END}/delete-chat`, {
                chatId,
            }, {
                withCredentials: true,
            });
    
            const data = response.data;
            if (response.status === 200) {
                setChatHistory(updatedChatHistory);  // Update state immediately   
                fetchChatHistory();
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
            <div className='pl-4 pr-2 pb-8 flex flex-col bg-primaryBg gap-1' key={daysAgo}>
                <h3 className="text-xs text-primaryTextColor sticky top-0 bg-white font-sansMedium py-1 min-w-full w-max z-[3] mb-2">{daysAgo}</h3>
                {groupedChats[daysAgo].map(chat => (
                    <div key={chat.chat_id} className={`cursor-pointer p-2 relative flex items-center hover:bg-black/5 rounded-lg w-full group overflow-none ${
                        chat.chat_id === activeChatId ? 'bg-black/10' : ''
                    }`}>
                        {/* Gradient Overlay for Half Fade Effect */}
                        <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white/0 via-white/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        <div onClick={() => ConversationIdHistory(chat.chat_id)} className="w-full overflow-x-hidden">
                            <p className="text-sm text-primaryTextColor/80 font-sansRegular w-max">
                                {chat.title.replace(/\b\w/g, (char) => char.toUpperCase())}
                            </p>
                        </div>
                        <Image onClick={() => DeleteChatId(chat.chat_id)} className='w-[36px] h-[36px] absolute right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300' width={62} height={62} src='/images/deletechat.png' alt='dots'/>
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
            return "Previous 2 Days";
        } else {
            return `Previous ${diffDays} Days`;
        }
    };

    // Text Area height manage automatic funtion
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = '14px'; // Initial height
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 300)}px`; // Max height 200px
        }
    }, [command, isChatEmpty]);

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
            <LogInPopup/>
            {/* side bar start */}
            <div className={`relative pr-1 max-lg:absolute top-0 left-0 bg-white z-10 transition-width flex-shrink-0 overflow-x-hidden flex flex-col h-[100%] ${sidebarHide ? 'lg:w-0 w-[18rem] max-lg:translate-x-[0]' : 'lg:w-[18rem] w-[18rem] max-lg:translate-x-[-900px]'} transition-transform duration-300 ease-in-out`}>
                <div className="bg-primaryBg w-full p-2 flex justify-between">
                    <svg onClick={toggleSidebar} className="w-10 h-10 p-1.5 rounded-lg cursor-pointer hover:bg-black/5" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M8.85719 3H15.1428C16.2266 2.99999 17.1007 2.99998 17.8086 3.05782C18.5375 3.11737 19.1777 3.24318 19.77 3.54497C20.7108 4.02433 21.4757 4.78924 21.955 5.73005C22.2568 6.32234 22.3826 6.96253 22.4422 7.69138C22.5 8.39925 22.5 9.27339 22.5 10.3572V13.6428C22.5 14.7266 22.5 15.6008 22.4422 16.3086C22.3826 17.0375 22.2568 17.6777 21.955 18.27C21.4757 19.2108 20.7108 19.9757 19.77 20.455C19.1777 20.7568 18.5375 20.8826 17.8086 20.9422C17.1008 21 16.2266 21 15.1428 21H8.85717C7.77339 21 6.89925 21 6.19138 20.9422C5.46253 20.8826 4.82234 20.7568 4.23005 20.455C3.28924 19.9757 2.52433 19.2108 2.04497 18.27C1.74318 17.6777 1.61737 17.0375 1.55782 16.3086C1.49998 15.6007 1.49999 14.7266 1.5 13.6428V10.3572C1.49999 9.27341 1.49998 8.39926 1.55782 7.69138C1.61737 6.96253 1.74318 6.32234 2.04497 5.73005C2.52433 4.78924 3.28924 4.02433 4.23005 3.54497C4.82234 3.24318 5.46253 3.11737 6.19138 3.05782C6.89926 2.99998 7.77341 2.99999 8.85719 3ZM6.35424 5.05118C5.74907 5.10062 5.40138 5.19279 5.13803 5.32698C4.57354 5.6146 4.1146 6.07354 3.82698 6.63803C3.69279 6.90138 3.60062 7.24907 3.55118 7.85424C3.50078 8.47108 3.5 9.26339 3.5 10.4V13.6C3.5 14.7366 3.50078 15.5289 3.55118 16.1458C3.60062 16.7509 3.69279 17.0986 3.82698 17.362C4.1146 17.9265 4.57354 18.3854 5.13803 18.673C5.40138 18.8072 5.74907 18.8994 6.35424 18.9488C6.97108 18.9992 7.76339 19 8.9 19H9.5V5H8.9C7.76339 5 6.97108 5.00078 6.35424 5.05118ZM11.5 5V19H15.1C16.2366 19 17.0289 18.9992 17.6458 18.9488C18.2509 18.8994 18.5986 18.8072 18.862 18.673C19.4265 18.3854 19.8854 17.9265 20.173 17.362C20.3072 17.0986 20.3994 16.7509 20.4488 16.1458C20.4992 15.5289 20.5 14.7366 20.5 13.6V10.4C20.5 9.26339 20.4992 8.47108 20.4488 7.85424C20.3994 7.24907 20.3072 6.90138 20.173 6.63803C19.8854 6.07354 19.4265 5.6146 18.862 5.32698C18.5986 5.19279 18.2509 5.10062 17.6458 5.05118C17.0289 5.00078 16.2366 5 15.1 5H11.5ZM5 8.5C5 7.94772 5.44772 7.5 6 7.5H7C7.55229 7.5 8 7.94772 8 8.5C8 9.05229 7.55229 9.5 7 9.5H6C5.44772 9.5 5 9.05229 5 8.5ZM5 12C5 11.4477 5.44772 11 6 11H7C7.55229 11 8 11.4477 8 12C8 12.5523 7.55229 13 7 13H6C5.44772 13 5 12.5523 5 12Z" fill="black"></path></svg>
                    <svg onClick={handleCreateNewChat} className="w-10 h-10 p-1.5 rounded-lg cursor-pointer hover:bg-black/5" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.6729 3.91287C16.8918 2.69392 18.8682 2.69392 20.0871 3.91287C21.3061 5.13182 21.3061 7.10813 20.0871 8.32708L14.1499 14.2643C13.3849 15.0293 12.3925 15.5255 11.3215 15.6785L9.14142 15.9899C8.82983 16.0344 8.51546 15.9297 8.29289 15.7071C8.07033 15.4845 7.96554 15.1701 8.01005 14.8586L8.32149 12.6785C8.47449 11.6075 8.97072 10.615 9.7357 9.85006L15.6729 3.91287ZM18.6729 5.32708C18.235 4.88918 17.525 4.88918 17.0871 5.32708L11.1499 11.2643C10.6909 11.7233 10.3932 12.3187 10.3014 12.9613L10.1785 13.8215L11.0386 13.6986C11.6812 13.6068 12.2767 13.3091 12.7357 12.8501L18.6729 6.91287C19.1108 6.47497 19.1108 5.76499 18.6729 5.32708ZM11 3.99929C11.0004 4.55157 10.5531 4.99963 10.0008 5.00007C9.00227 5.00084 8.29769 5.00827 7.74651 5.06064C7.20685 5.11191 6.88488 5.20117 6.63803 5.32695C6.07354 5.61457 5.6146 6.07351 5.32698 6.63799C5.19279 6.90135 5.10062 7.24904 5.05118 7.8542C5.00078 8.47105 5 9.26336 5 10.4V13.6C5 14.7366 5.00078 15.5289 5.05118 16.1457C5.10062 16.7509 5.19279 17.0986 5.32698 17.3619C5.6146 17.9264 6.07354 18.3854 6.63803 18.673C6.90138 18.8072 7.24907 18.8993 7.85424 18.9488C8.47108 18.9992 9.26339 19 10.4 19H13.6C14.7366 19 15.5289 18.9992 16.1458 18.9488C16.7509 18.8993 17.0986 18.8072 17.362 18.673C17.9265 18.3854 18.3854 17.9264 18.673 17.3619C18.7988 17.1151 18.8881 16.7931 18.9393 16.2535C18.9917 15.7023 18.9991 14.9977 18.9999 13.9992C19.0003 13.4469 19.4484 12.9995 20.0007 13C20.553 13.0004 21.0003 13.4485 20.9999 14.0007C20.9991 14.9789 20.9932 15.7808 20.9304 16.4426C20.8664 17.116 20.7385 17.7136 20.455 18.2699C19.9757 19.2107 19.2108 19.9756 18.27 20.455C17.6777 20.7568 17.0375 20.8826 16.3086 20.9421C15.6008 21 14.7266 21 13.6428 21H10.3572C9.27339 21 8.39925 21 7.69138 20.9421C6.96253 20.8826 6.32234 20.7568 5.73005 20.455C4.78924 19.9756 4.02433 19.2107 3.54497 18.2699C3.24318 17.6776 3.11737 17.0374 3.05782 16.3086C2.99998 15.6007 2.99999 14.7266 3 13.6428V10.3572C2.99999 9.27337 2.99998 8.39922 3.05782 7.69134C3.11737 6.96249 3.24318 6.3223 3.54497 5.73001C4.02433 4.7892 4.78924 4.0243 5.73005 3.54493C6.28633 3.26149 6.88399 3.13358 7.55735 3.06961C8.21919 3.00673 9.02103 3.00083 9.99922 3.00007C10.5515 2.99964 10.9996 3.447 11 3.99929Z" fill="black"></path></svg>
                </div>
                <div className="gap-4 h-[100%] bg-primaryBg min-w-full overflow-y-auto overflow-x-hidden scrollbar-thin">
                    <div className="flex flex-col">
                        {chatHistory && chatHistory.length > 0 ? (
                            <>
                                {groupChatsByDate
                                    (chatHistory
                                        .filter(chat => chat.title !== null)
                                        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))  // Sort favorites by date
                                    )
                                }
                            </>
                        ) : (
                            <p className='p-2 text-base font-sansMedium text-primaryTextColor'>No conversation history available</p>
                        )}
                    </div>
                </div>
                {/* user profile related links */}
                <div className="mt-auto sticky min-w-full w-max bg-primaryBg bottom-0 left-0 flex flex-col">
                    <div onClick={() => setSettings(true)} title="Settings" className={`w-max p-3 pl-4 cursor-pointer flex items-center gap-4`}>
                        <svg className="w-6 h-6" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.04677 14.5283L7.4851 15.5142C7.61541 15.8076 7.82806 16.057 8.09727 16.232C8.36648 16.4069 8.68069 16.5001 9.00177 16.5C9.32285 16.5001 9.63706 16.4069 9.90627 16.232C10.1755 16.057 10.3881 15.8076 10.5184 15.5142L10.9568 14.5283C11.1128 14.1785 11.3753 13.8869 11.7068 13.695C12.0404 13.5026 12.4263 13.4206 12.8093 13.4608L13.8818 13.575C14.201 13.6088 14.5232 13.5492 14.8093 13.4035C15.0954 13.2578 15.333 13.0322 15.4934 12.7542C15.6541 12.4763 15.7306 12.1577 15.7137 11.8372C15.6969 11.5166 15.5873 11.2079 15.3984 10.9483L14.7634 10.0758C14.5373 9.76285 14.4165 9.38611 14.4184 9C14.4184 8.61494 14.5403 8.23976 14.7668 7.92833L15.4018 7.05583C15.5907 6.79632 15.7002 6.48755 15.7171 6.16701C15.7339 5.84646 15.6574 5.52791 15.4968 5.25C15.3363 4.97193 15.0987 4.74637 14.8126 4.60067C14.5265 4.45497 14.2044 4.3954 13.8851 4.42917L12.8126 4.54333C12.4296 4.58356 12.0437 4.50159 11.7101 4.30917C11.3779 4.11619 11.1154 3.82302 10.9601 3.47167L10.5184 2.48583C10.3881 2.19238 10.1755 1.94304 9.90627 1.76805C9.63706 1.59306 9.32285 1.49995 9.00177 1.5C8.68069 1.49995 8.36648 1.59306 8.09727 1.76805C7.82806 1.94304 7.61541 2.19238 7.4851 2.48583L7.04677 3.47167C6.89147 3.82302 6.62892 4.11619 6.29677 4.30917C5.96318 4.50159 5.57727 4.58356 5.19427 4.54333L4.11844 4.42917C3.79918 4.3954 3.47699 4.45497 3.19092 4.60067C2.90485 4.74637 2.6672 4.97193 2.50677 5.25C2.34614 5.52791 2.26961 5.84646 2.28647 6.16701C2.30333 6.48755 2.41286 6.79632 2.60177 7.05583L3.23677 7.92833C3.46323 8.23976 3.58517 8.61494 3.5851 9C3.58517 9.38506 3.46323 9.76024 3.23677 10.0717L2.60177 10.9442C2.41286 11.2037 2.30333 11.5124 2.28647 11.833C2.26961 12.1535 2.34614 12.4721 2.50677 12.75C2.66736 13.0279 2.90504 13.2534 3.19107 13.399C3.4771 13.5447 3.79921 13.6044 4.11844 13.5708L5.19094 13.4567C5.57394 13.4164 5.95985 13.4984 6.29344 13.6908C6.62683 13.8833 6.89059 14.1765 7.04677 14.5283Z" stroke='black' strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9.00043 11.25C10.2431 11.25 11.2504 10.2426 11.2504 9C11.2504 7.75736 10.2431 6.75 9.00043 6.75C7.75779 6.75 6.75043 7.75736 6.75043 9C6.75043 10.2426 7.75779 11.25 9.00043 11.25Z" stroke='black' strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className={`font-sansMedium text-md text-primaryTextColor`}>Settings</p>
                    </div>
                    <Link href='/help-center' title="Help Center" className={`w-max p-3 pl-4 max-lg:pb-5 cursor-pointer flex items-center gap-4`}>
                    <svg className="w-6 h-6" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.75 13.5V9C15.75 5.27208 12.7279 2.25 9 2.25C5.27208 2.25 2.25 5.27208 2.25 9V13.5M4.125 15.75C3.08947 15.75 2.25 14.9105 2.25 13.875V12.375C2.25 11.3395 3.08947 10.5 4.125 10.5C5.16053 10.5 6 11.3395 6 12.375V13.875C6 14.9105 5.16053 15.75 4.125 15.75ZM13.875 15.75C12.8395 15.75 12 14.9105 12 13.875V12.375C12 11.3395 12.8395 10.5 13.875 10.5C14.9105 10.5 15.75 11.3395 15.75 12.375V13.875C15.75 14.9105 14.9105 15.75 13.875 15.75Z" stroke='black' strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className={`font-sansMedium text-md text-primaryTextColor`}>Help Center</p>
                    </Link>
                </div>
            </div>

            <UserSettings settings={settings} setSettings={setSettings}/>

            {/* Chat canvas start */}
            <div ref={chatCanvasRef}  className="relative bg-stockversegptBg bg-cover bg-top-right relative flex flex-col max-lg:pb-[4rem] max-lg:pt-[4rem] items-start justify-start gap-y-4 max-w-full flex-grow h-[100%] overflow-y-auto scrollbar-thin">
                
                {/* Loader start*/}
                <div className={`${loading ? 'visible' : 'hidden'} absolute z-10 top-0 left-0 bottom-0 right-0 bg-black/10 backdrop-blur-sm flex items-center justify-center`}>
                    <Loading />
                </div>
                {/* Loader end*/}
                
                {/* Chat Navbar start */}
                <div className='max-lg:bg-white sticky z-[5] top-0 max-lg:fixed py-3 px-2 flex items-center gap-2 w-full h-max'>
                    <div className={`${sidebarHide ? 'lg:visible' : 'lg:hidden'} flex gap-2`}>
                        <svg onClick={toggleSidebar} className="w-10 h-10 p-1.5 rounded-lg cursor-pointer hover:bg-black/5" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M8.85719 3H15.1428C16.2266 2.99999 17.1007 2.99998 17.8086 3.05782C18.5375 3.11737 19.1777 3.24318 19.77 3.54497C20.7108 4.02433 21.4757 4.78924 21.955 5.73005C22.2568 6.32234 22.3826 6.96253 22.4422 7.69138C22.5 8.39925 22.5 9.27339 22.5 10.3572V13.6428C22.5 14.7266 22.5 15.6008 22.4422 16.3086C22.3826 17.0375 22.2568 17.6777 21.955 18.27C21.4757 19.2108 20.7108 19.9757 19.77 20.455C19.1777 20.7568 18.5375 20.8826 17.8086 20.9422C17.1008 21 16.2266 21 15.1428 21H8.85717C7.77339 21 6.89925 21 6.19138 20.9422C5.46253 20.8826 4.82234 20.7568 4.23005 20.455C3.28924 19.9757 2.52433 19.2108 2.04497 18.27C1.74318 17.6777 1.61737 17.0375 1.55782 16.3086C1.49998 15.6007 1.49999 14.7266 1.5 13.6428V10.3572C1.49999 9.27341 1.49998 8.39926 1.55782 7.69138C1.61737 6.96253 1.74318 6.32234 2.04497 5.73005C2.52433 4.78924 3.28924 4.02433 4.23005 3.54497C4.82234 3.24318 5.46253 3.11737 6.19138 3.05782C6.89926 2.99998 7.77341 2.99999 8.85719 3ZM6.35424 5.05118C5.74907 5.10062 5.40138 5.19279 5.13803 5.32698C4.57354 5.6146 4.1146 6.07354 3.82698 6.63803C3.69279 6.90138 3.60062 7.24907 3.55118 7.85424C3.50078 8.47108 3.5 9.26339 3.5 10.4V13.6C3.5 14.7366 3.50078 15.5289 3.55118 16.1458C3.60062 16.7509 3.69279 17.0986 3.82698 17.362C4.1146 17.9265 4.57354 18.3854 5.13803 18.673C5.40138 18.8072 5.74907 18.8994 6.35424 18.9488C6.97108 18.9992 7.76339 19 8.9 19H9.5V5H8.9C7.76339 5 6.97108 5.00078 6.35424 5.05118ZM11.5 5V19H15.1C16.2366 19 17.0289 18.9992 17.6458 18.9488C18.2509 18.8994 18.5986 18.8072 18.862 18.673C19.4265 18.3854 19.8854 17.9265 20.173 17.362C20.3072 17.0986 20.3994 16.7509 20.4488 16.1458C20.4992 15.5289 20.5 14.7366 20.5 13.6V10.4C20.5 9.26339 20.4992 8.47108 20.4488 7.85424C20.3994 7.24907 20.3072 6.90138 20.173 6.63803C19.8854 6.07354 19.4265 5.6146 18.862 5.32698C18.5986 5.19279 18.2509 5.10062 17.6458 5.05118C17.0289 5.00078 16.2366 5 15.1 5H11.5ZM5 8.5C5 7.94772 5.44772 7.5 6 7.5H7C7.55229 7.5 8 7.94772 8 8.5C8 9.05229 7.55229 9.5 7 9.5H6C5.44772 9.5 5 9.05229 5 8.5ZM5 12C5 11.4477 5.44772 11 6 11H7C7.55229 11 8 11.4477 8 12C8 12.5523 7.55229 13 7 13H6C5.44772 13 5 12.5523 5 12Z" fill="black"></path></svg>
                        <svg onClick={handleCreateNewChat} className="w-10 h-10 p-1.5 rounded-lg cursor-pointer hover:bg-black/5" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.6729 3.91287C16.8918 2.69392 18.8682 2.69392 20.0871 3.91287C21.3061 5.13182 21.3061 7.10813 20.0871 8.32708L14.1499 14.2643C13.3849 15.0293 12.3925 15.5255 11.3215 15.6785L9.14142 15.9899C8.82983 16.0344 8.51546 15.9297 8.29289 15.7071C8.07033 15.4845 7.96554 15.1701 8.01005 14.8586L8.32149 12.6785C8.47449 11.6075 8.97072 10.615 9.7357 9.85006L15.6729 3.91287ZM18.6729 5.32708C18.235 4.88918 17.525 4.88918 17.0871 5.32708L11.1499 11.2643C10.6909 11.7233 10.3932 12.3187 10.3014 12.9613L10.1785 13.8215L11.0386 13.6986C11.6812 13.6068 12.2767 13.3091 12.7357 12.8501L18.6729 6.91287C19.1108 6.47497 19.1108 5.76499 18.6729 5.32708ZM11 3.99929C11.0004 4.55157 10.5531 4.99963 10.0008 5.00007C9.00227 5.00084 8.29769 5.00827 7.74651 5.06064C7.20685 5.11191 6.88488 5.20117 6.63803 5.32695C6.07354 5.61457 5.6146 6.07351 5.32698 6.63799C5.19279 6.90135 5.10062 7.24904 5.05118 7.8542C5.00078 8.47105 5 9.26336 5 10.4V13.6C5 14.7366 5.00078 15.5289 5.05118 16.1457C5.10062 16.7509 5.19279 17.0986 5.32698 17.3619C5.6146 17.9264 6.07354 18.3854 6.63803 18.673C6.90138 18.8072 7.24907 18.8993 7.85424 18.9488C8.47108 18.9992 9.26339 19 10.4 19H13.6C14.7366 19 15.5289 18.9992 16.1458 18.9488C16.7509 18.8993 17.0986 18.8072 17.362 18.673C17.9265 18.3854 18.3854 17.9264 18.673 17.3619C18.7988 17.1151 18.8881 16.7931 18.9393 16.2535C18.9917 15.7023 18.9991 14.9977 18.9999 13.9992C19.0003 13.4469 19.4484 12.9995 20.0007 13C20.553 13.0004 21.0003 13.4485 20.9999 14.0007C20.9991 14.9789 20.9932 15.7808 20.9304 16.4426C20.8664 17.116 20.7385 17.7136 20.455 18.2699C19.9757 19.2107 19.2108 19.9756 18.27 20.455C17.6777 20.7568 17.0375 20.8826 16.3086 20.9421C15.6008 21 14.7266 21 13.6428 21H10.3572C9.27339 21 8.39925 21 7.69138 20.9421C6.96253 20.8826 6.32234 20.7568 5.73005 20.455C4.78924 19.9756 4.02433 19.2107 3.54497 18.2699C3.24318 17.6776 3.11737 17.0374 3.05782 16.3086C2.99998 15.6007 2.99999 14.7266 3 13.6428V10.3572C2.99999 9.27337 2.99998 8.39922 3.05782 7.69134C3.11737 6.96249 3.24318 6.3223 3.54497 5.73001C4.02433 4.7892 4.78924 4.0243 5.73005 3.54493C6.28633 3.26149 6.88399 3.13358 7.55735 3.06961C8.21919 3.00673 9.02103 3.00083 9.99922 3.00007C10.5515 2.99964 10.9996 3.447 11 3.99929Z" fill="black"></path></svg>
                    </div>
                    <a href="/dashboard" className="mr-auto font-sansMedium bg-primaryBg hover:invert px-2 rounded-lg py-1 shadow-md text-base flex items-center w-max justify-start gap-2 transition duration-300">
                        <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Dashboard
                    </a>
                    <User settings={settings} setSettings={setSettings}/>
                </div>
                {/* Chat Navbar end */}

                {/* Chat Area start */}
                <div className={` ${isChatEmpty? 'visible' : 'hidden'} w-full xl:w-[800px] md:w-[750px] z-0 sm:px-8 px-3 h-full flex flex-col self-center gap-1 items-center justify-center`}>
                    <Image width={64} height={64} src='/images/stockverse_gpt.png' alt='logo'/>
                    <h1 className='text-primaryTextColor/50 text-4xl max-lg:text-xl font-sansMedium'>Hi, {userInfo? userInfo.fullname : ''} </h1>
                    <h3 className='text-primaryTextColor text-5xl max-lg:text-3xl font-sansMedium'>What would you like to know?</h3>
                    <div className='w-full flex flex-wrap md:gap-4 max-md:gap-y-4 md:justify-center justify-between pt-12'>
                        <div onClick={() => handleSubmitCommand(null, "What are the top AI stocks to watch in 2025 for massive growth?")} 
                        className='flex flex-col gap-2 cursor-pointer w-56 max-md:w-[48%] py-4 px-4 rounded-lg bg-primaryBg shadow'>
                            <Image className='w-7 h-7' width={64} height={64} src='/images/world_logo.png' alt='logo'/>
                            <p className='font-sansMedium text-sm'>What are the top AI stocks to watch in 2025 for massive growth?</p>
                        </div>
                        <div onClick={() => handleSubmitCommand(null, "What are the key factors that affects the stock markets?")} 
                        className='flex flex-col gap-2 cursor-pointer w-56 max-md:w-[48%] py-4 px-4 rounded-lg bg-primaryBg shadow'>
                            <Image className='w-7 h-7' width={64} height={64} src='/images/world_logo.png' alt='logo'/>
                            <p className='font-sansMedium text-sm'>What are the key factors that affects the stock markets?</p>
                        </div>
                        <div onClick={() => handleSubmitCommand(null, "What are the key indicators to watch when predicting stock market trends?")} 
                        className='flex flex-col gap-2 cursor-pointer w-56 max-md:w-[48%] py-4 px-4 rounded-lg bg-primaryBg shadow'>
                            <Image className='w-7 h-7' width={64} height={64} src='/images/world_logo.png' alt='logo'/>
                            <p className='font-sansMedium text-sm'>What are the key indicators to watch when predicting stock market trends?</p>
                        </div>
                        <div onClick={() => handleSubmitCommand(null, "How can I build a balanced portfolio for long-term growth?")} 
                        className='xl:hidden flex flex-col gap-2 cursor-pointer w-56 max-md:w-[48%] py-4 px-4 rounded-lg bg-primaryBg shadow'>
                            <Image className='w-7 h-7' width={64} height={64} src='/images/world_logo.png' alt='logo'/>
                            <p className='font-sansMedium text-sm'>How can I build a balanced portfolio for long-term growth?</p>
                        </div>
                    </div>
                    {isChatEmpty && (
                        <form onSubmit={handleSubmitCommand} className="py-3 px-2 w-full z-10 flex flex-col items-center space-y-4">
                            <div className="relative w-full rounded-xl py-5 pl-4 pr-10 md:pr-24 bg-white flex items-end">
                                <textarea
                                ref={textareaRef}
                                id="question"
                                autoComplete="off"
                                required
                                value={command}
                                onChange={(e) => setCommand(e.target.value)}
                                onKeyDown={handleKeyDown} // Handles Enter/Shift+Enter behavior
                                placeholder="Message StockVerseGPT"
                                className="w-full text-lg leading-[110%] border-0 bg-black/0 text-primaryText focus:outline-none resize-none overflow-y-auto scrollbar-thin"
                                style={{ maxHeight: '300px' }} // Max height set here
                                />
                                <button
                                    disabled={responseloading}
                                    type="submit"
                                    className="absolute bottom-1.5 right-2 px-6 py-3 rounded-lg bg-primaryMain text-white hover:bg-white hover:text-black transition duration-300"
                                >
                                    Send
                                </button>
                            </div>
                        </form>
                    )}
                </div>
                
                <div className={` ${isChatEmpty? 'hidden' : 'visible'} w-full relative xl:w-[800px] md:w-[750px] z-0 sm:px-8 px-3 self-center h-max flex flex-col`}>
                    {chatCanvas
                    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
                    .map((chat, index) => (
                        <div key={index} className="w-full px-3 flex flex-col gap-y-6 py-4">
                            {/* Question */}
                            {/* <p className="text-md self-end py-2 px-4 bg-primaryText/10 rounded-3xl">{chat.question}</p> */}
                            {chat.question.length > maxChars ? 
                            (<div className='self-end py-2 px-4 bg-white rounded-3xl'>
                                <p className="text-base font-sansMedium ">
                                    {showMore ? chat.question : `${chat.question.substring(0, maxChars)}...`}
                                </p>
                                <button
                                    onClick={toggleShowMore}
                                    className="text-primaryMain mt-2"
                                >
                                    {showMore ? "See less" : "See full message"}
                                </button>
                            </div>)
                            : 
                            (<p className="text-base self-end py-2 px-4 bg-white rounded-3xl">{chat.question}</p>
                            )}
                            {/* Answer */}
                            <div className='w-full flex gap-2 items-start'>
                                <Image className='w-[3%] max-sm:w-[5%] h-auto' width={64} height={64} src='/images/stockverse_gpt.png' alt='logo'/>
                                <div className="w-[90%] items-start markdown">
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
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className={` ${responseloading ? 'visible' : 'hidden'} flex justify-start pl-12 -mt-10`}>
                        <p className="text-lg text-black/60">{loadingText}</p>
                    </div>
                </div>
                {/* Chat Area end */}

                {/* Input for Questions start */}
                {!isChatEmpty && (
                    <form onSubmit={handleSubmitCommand} className={`${isChatEmpty? 'hidden' : 'visible'} xl:w-[800px] md:w-[750px] z-0 sm:px-8 px-3 self-center sticky bottom-0 max-lg:fixed max-lg:bottom-0 max-lg:left-0 mt-auto py-3 w-full z-10 flex flex-col items-center space-y-4`}>
                        <div className="relative w-full rounded-xl py-5 pl-4 pr-10 md:pr-24 bg-white flex items-end">
                            <textarea
                            ref={textareaRef}
                            id="question"
                            autoComplete="off"
                            required
                            value={command}
                            onChange={(e) => setCommand(e.target.value)}
                            onKeyDown={handleKeyDown} // Handles Enter/Shift+Enter behavior
                            placeholder="Message StockVerseGPT"
                            className="w-full text-lg leading-[110%] border-0 bg-black/0 text-primaryText focus:outline-none resize-none overflow-y-auto scrollbar-thin"
                            style={{ maxHeight: '300px' }} // Max height set here
                            />
                            <button
                                disabled={responseloading}
                                type="submit"
                                className="absolute bottom-1.5 right-2 px-6 py-3 rounded-lg bg-primaryMain text-white hover:bg-white hover:text-black transition duration-300"
                            >
                                Send
                            </button>
                        </div>
                    </form>
                )}
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
            
        </section>
    );
}