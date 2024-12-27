'use client';

import { useUser } from '../context/UserContext';

export default function User() {
    const { user, loading } = useUser();

    // Function to extract initials
    const getInitials = (fullname) => {
        const nameArray = fullname.trim().split(' ').filter(Boolean);
        return nameArray.slice(0, 2).map((name) => name[0]).join('').toUpperCase();
    };

    if (loading) {
        return <div className="cursor-pointer bg-profileBg rounded-full w-9 h-9 flex items-center justify-center text-lg font-sansMedium text-white"></div>;
    }

    if (!user) {
        return <div className="cursor-pointer bg-profileBg rounded-full w-9 h-9 flex items-center justify-center text-lg font-sansMedium text-white">❌</div>;
    }

    return (
        <div className="flex flex-col relative">
            <div className="flex items-center gap-2">
                <p className="text-sm px-4 py-2 bg-primaryMain/10 rounded-lg font-sansMedium">
                    {user.fullname.trim().split(' ').slice(0, 2).join(' ')}
                </p>
                <div className="cursor-pointer bg-profileBg rounded-full w-9 h-9 flex items-center justify-center text-lg font-sansMedium text-white">
                    {getInitials(user.fullname)}
                </div>
            </div>
        </div>
    );
}