'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import ProfileInfo from '@/components/ProfileInfo';
import ProfileSecurity from '@/components/ProfileSecurity';
import MembershipInfo from '@/components/MembershipInfo';
import DeleteAccount from '@/components/DeleteAccount';
import Image from 'next/image';

export default function UserSettings({settings, setSettings}) {
    const token = Cookies.get('authToken');
    const [currentView, setCurrentView] = useState(null); // Initialize with null to wait for sessionStorage
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Load the current view from sessionStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedView = sessionStorage.getItem('profileInfo');
            if (savedView) {
                setCurrentView(savedView);
            } else {
                setCurrentView('General Setigns');  // Set default view
            }
        }
    }, []);

    // Save the current view to sessionStorage whenever it changes
    useEffect(() => {
        if (currentView && typeof window !== 'undefined') {
            sessionStorage.setItem('profileInfo', currentView);
        }
    }, [currentView]);

    // Handle tab navigation by setting the current view
    const handleViewChange = (view) => {
        setCurrentView(view);
    };

    const handleLogout = async () => {
      setLoading(true);

      try {
          // await axios.post(`${STOCKVERSE_BACK_END}/logout`, {}, { withCredentials: true });
          // Redirect to the login page or home page after successful logout
          Cookies.remove('authToken');
          localStorage.removeItem('UserInfo');
          localStorage.removeItem('MembershipStatus');
          localStorage.removeItem('SearchHistory');
          localStorage.removeItem('Watchlist');
          localStorage.removeItem('ChatHistory');
          sessionStorage.removeItem('chatId');

          router.push('/login');
      } catch (err) {
          console.error('Error logging out:', err);
      } finally {
          setLoading(false);
      }
    };

    // // Wait until the current view is loaded before rendering
    // if (!settings) return null;
    // if (currentView === null) return null;
    if (!token || !settings || currentView === null) return null;

    return (
      <div className="w-full h-full p-6 flex flex-col items-center justify-center absolute top-0 left-0 bottom-0 right-0 z-20 bg-black/30 backdrop-blur-sm overflow-y-scroll scrollbar-hide">
        <div className='w-full min-h-max xl:w-[60%] md:w-[80%] flex flex-col bg-primaryBg rounded-xl'>
          <div className='w-full flex-none border-b border-black/5 p-4 flex flex-wrap-reverse gap-4 justify-between'>
            <h1 className='font-sansMedium text-lg text-primaryTextColor'>Account Settings</h1>
            <Image onClick={() => setSettings(false)} className='cursor-pointer' width={32} height={32} src='/images/cross.svg' alt='close' />
          </div>
          <div className='w-full flex flex-grow'>
            <div className="flex-none py-4 flex flex-col items-start border-r border-black/5 overflow-y-scroll scrollbar-hide">
              <div title="General Setigns" onClick={() => handleViewChange('General Setigns')} className={`w-max p-3 pl-4 border-l-4 cursor-pointer flex items-center gap-4 ${currentView === 'General Setigns' ? 'border-primaryMain' : 'border-white'}`}>
                <svg className="w-6 h-6" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.04677 14.5283L7.4851 15.5142C7.61541 15.8076 7.82806 16.057 8.09727 16.232C8.36648 16.4069 8.68069 16.5001 9.00177 16.5C9.32285 16.5001 9.63706 16.4069 9.90627 16.232C10.1755 16.057 10.3881 15.8076 10.5184 15.5142L10.9568 14.5283C11.1128 14.1785 11.3753 13.8869 11.7068 13.695C12.0404 13.5026 12.4263 13.4206 12.8093 13.4608L13.8818 13.575C14.201 13.6088 14.5232 13.5492 14.8093 13.4035C15.0954 13.2578 15.333 13.0322 15.4934 12.7542C15.6541 12.4763 15.7306 12.1577 15.7137 11.8372C15.6969 11.5166 15.5873 11.2079 15.3984 10.9483L14.7634 10.0758C14.5373 9.76285 14.4165 9.38611 14.4184 9C14.4184 8.61494 14.5403 8.23976 14.7668 7.92833L15.4018 7.05583C15.5907 6.79632 15.7002 6.48755 15.7171 6.16701C15.7339 5.84646 15.6574 5.52791 15.4968 5.25C15.3363 4.97193 15.0987 4.74637 14.8126 4.60067C14.5265 4.45497 14.2044 4.3954 13.8851 4.42917L12.8126 4.54333C12.4296 4.58356 12.0437 4.50159 11.7101 4.30917C11.3779 4.11619 11.1154 3.82302 10.9601 3.47167L10.5184 2.48583C10.3881 2.19238 10.1755 1.94304 9.90627 1.76805C9.63706 1.59306 9.32285 1.49995 9.00177 1.5C8.68069 1.49995 8.36648 1.59306 8.09727 1.76805C7.82806 1.94304 7.61541 2.19238 7.4851 2.48583L7.04677 3.47167C6.89147 3.82302 6.62892 4.11619 6.29677 4.30917C5.96318 4.50159 5.57727 4.58356 5.19427 4.54333L4.11844 4.42917C3.79918 4.3954 3.47699 4.45497 3.19092 4.60067C2.90485 4.74637 2.6672 4.97193 2.50677 5.25C2.34614 5.52791 2.26961 5.84646 2.28647 6.16701C2.30333 6.48755 2.41286 6.79632 2.60177 7.05583L3.23677 7.92833C3.46323 8.23976 3.58517 8.61494 3.5851 9C3.58517 9.38506 3.46323 9.76024 3.23677 10.0717L2.60177 10.9442C2.41286 11.2037 2.30333 11.5124 2.28647 11.833C2.26961 12.1535 2.34614 12.4721 2.50677 12.75C2.66736 13.0279 2.90504 13.2534 3.19107 13.399C3.4771 13.5447 3.79921 13.6044 4.11844 13.5708L5.19094 13.4567C5.57394 13.4164 5.95985 13.4984 6.29344 13.6908C6.62683 13.8833 6.89059 14.1765 7.04677 14.5283Z" stroke={currentView === 'General Setigns' ? 'rgba(var(--primary-main))' : 'black'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9.00043 11.25C10.2431 11.25 11.2504 10.2426 11.2504 9C11.2504 7.75736 10.2431 6.75 9.00043 6.75C7.75779 6.75 6.75043 7.75736 6.75043 9C6.75043 10.2426 7.75779 11.25 9.00043 11.25Z" stroke={currentView === 'General Setigns' ? 'rgba(var(--primary-main))' : 'black'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className={`font-sansMedium max-sm:hidden text-base ${currentView === 'General Setigns' ? 'text-primaryMain' : 'text-primaryTextColor'}`}>General Setigns</p>
              </div>
              <div title="Security" onClick={() => handleViewChange('Security')} className={`w-max p-3 pl-4 border-l-4 cursor-pointer flex items-center gap-4 ${currentView === 'Security' ? 'border-primaryMain' : 'border-white'}`}>
                <svg className='w-6 h-6' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.75 6.74996C12.75 6.36609 12.6035 5.98222 12.3107 5.68934C12.0178 5.39645 11.6339 5.25 11.25 5.25M11.25 11.25C13.7353 11.25 15.75 9.23528 15.75 6.75C15.75 4.26472 13.7353 2.25 11.25 2.25C8.76472 2.25 6.75 4.26472 6.75 6.75C6.75 6.95526 6.76374 7.15731 6.79036 7.35528C6.83413 7.68089 6.85602 7.84369 6.84129 7.94669C6.82594 8.05399 6.8064 8.11181 6.75352 8.20642C6.70275 8.29725 6.61328 8.38672 6.43435 8.56565L2.60147 12.3985C2.47176 12.5282 2.4069 12.5931 2.36052 12.6688C2.3194 12.7359 2.2891 12.809 2.27072 12.8856C2.25 12.9719 2.25 13.0636 2.25 13.2471V14.55C2.25 14.97 2.25 15.1801 2.33175 15.3405C2.40365 15.4816 2.51839 15.5963 2.65951 15.6683C2.81994 15.75 3.02996 15.75 3.45 15.75H5.25V14.25H6.75V12.75H8.25L9.43435 11.5657C9.61328 11.3867 9.70275 11.2973 9.79358 11.2465C9.88819 11.1936 9.94601 11.1741 10.0533 11.1587C10.1563 11.144 10.3191 11.1659 10.6447 11.2096C10.8427 11.2363 11.0447 11.25 11.25 11.25Z" stroke={currentView === 'Security' ? 'rgba(var(--primary-main))' : 'black'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className={`font-sansMedium max-sm:hidden text-base ${currentView === 'Security' ? 'text-primaryMain' : 'text-primaryTextColor'}`}>Security</p>
              </div>
              <div title="Membership" onClick={() => handleViewChange('Membership')} className={`w-max p-3 pl-4 border-l-4 cursor-pointer flex items-center gap-4 ${currentView === 'Membership' ? 'border-primaryMain' : 'border-white'}`}>
                <svg className='w-6 h-6' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.5 7.5H1.5M8.25 10.5H4.5M1.5 6.15L1.5 11.85C1.5 12.6901 1.5 13.1101 1.66349 13.431C1.8073 13.7132 2.03677 13.9427 2.31901 14.0865C2.63988 14.25 3.05992 14.25 3.9 14.25L14.1 14.25C14.9401 14.25 15.3601 14.25 15.681 14.0865C15.9632 13.9427 16.1927 13.7132 16.3365 13.431C16.5 13.1101 16.5 12.6901 16.5 11.85V6.15C16.5 5.30992 16.5 4.88988 16.3365 4.56902C16.1927 4.28677 15.9632 4.0573 15.681 3.91349C15.3601 3.75 14.9401 3.75 14.1 3.75L3.9 3.75C3.05992 3.75 2.63988 3.75 2.31901 3.91349C2.03677 4.0573 1.8073 4.28677 1.66349 4.56901C1.5 4.88988 1.5 5.30992 1.5 6.15Z" stroke={currentView === 'Membership' ? 'rgba(var(--primary-main))' : 'black'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className={`font-sansMedium max-sm:hidden text-base ${currentView === 'Membership' ? 'text-primaryMain' : 'text-primaryTextColor'}`}>Membership</p>
              </div>
              <div title="Delete" onClick={() => handleViewChange('Delete')} className={`w-max mb-4 p-3 pl-4 border-l-4 cursor-pointer flex items-center gap-4 ${currentView === 'Delete' ? 'border-primaryMain' : 'border-white'}`}>
                <svg className='w-6 h-6' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.75 2.25H11.25M2.25 4.5H15.75M14.25 4.5L13.724 12.3895C13.6451 13.5732 13.6057 14.165 13.35 14.6138C13.1249 15.0088 12.7854 15.3265 12.3762 15.5248C11.9115 15.75 11.3183 15.75 10.132 15.75H7.86799C6.68168 15.75 6.08852 15.75 5.62375 15.5248C5.21457 15.3265 4.87507 15.0088 4.64999 14.6138C4.39433 14.165 4.35488 13.5732 4.27596 12.3895L3.75 4.5M7.5 7.875V11.625M10.5 7.875V11.625" stroke={currentView === 'Delete' ? 'rgba(var(--primary-main))' : 'black'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className={`font-sansMedium max-sm:hidden text-base ${currentView === 'Delete' ? 'text-primaryMain' : 'text-primaryTextColor'}`}>Delete Account</p>
              </div>
              <button
                  onClick={handleLogout}
                  className={`mt-auto w-max p-3 pl-4 border-l-4 cursor-pointer flex items-center gap-4 ${loading ? 'cursor-not-allowed border-primaryMain' : 'border-white'}`}
                  disabled={loading} // Disable button while loading
              >
                <svg className='w-6 h-6' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12.75L15.75 9M15.75 9L12 5.25M15.75 9H6.75M6.75 2.25H5.85C4.58988 2.25 3.95982 2.25 3.47852 2.49524C3.05516 2.71095 2.71095 3.05516 2.49524 3.47852C2.25 3.95982 2.25 4.58988 2.25 5.85V12.15C2.25 13.4101 2.25 14.0402 2.49524 14.5215C2.71095 14.9448 3.05516 15.289 3.47852 15.5048C3.95982 15.75 4.58988 15.75 5.85 15.75H6.75" stroke={loading ? 'rgba(var(--primary-main))' : 'black'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className={`font-sansMedium max-sm:hidden text-base ${loading ? 'text-primaryMain' : 'text-primaryTextColor'}`}>
                  {loading ? 'Logging out...' : 'Logout Account'}
                </div>
              </button>
            </div>
            <div className="flex-grow flex flex-col items-center py-6 mx-auto xl:container md:px-6 px-3">
                {/* Conditionally render based on the selected view */}
                {currentView === 'General Setigns' && <ProfileInfo />}
                {currentView === 'Security' && <ProfileSecurity />}
                {currentView === 'Membership' && <MembershipInfo />}
                {currentView === 'Delete' && <DeleteAccount />}
            </div>
          </div>
        </div>
      </div>
    );
}