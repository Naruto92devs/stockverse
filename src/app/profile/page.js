import React from 'react';

export default function Profile() {
    return (
    <div className="w-full h-full">
        <div className="py-16 max-sm:py-10 w-full bg-newsBg bg-no-repeat bg-cover bg-center">
            <div className="lg:pr-[25%] max-md:py-0 py-10 px-6 max-sm:px-3 mx-auto xl:container gap-y-4 max-sm:gap-y-3 flex flex-col items-start">
                <h1 className="text-secondaryHeading max-sm:text-3xl text-6xl font-sansSemibold">Settings</h1>
                {/* <p className="text-base max-sm:text-sm text-secondaryHeading">Stay updated with the most relevant and timely news from the financial world. Explore insights on market movements, economic policies, earnings reports, technological advancements, and more. Dive into a curated selection of articles that provide a comprehensive view of the current market landscape and help you stay informed about the factors shaping the financial markets.</p> */}
            </div>
        </div>
        <div className="md:px-6 bg-primaryText/10 overflow-x-scroll scrollbar-hide">
            <div className="flex mx-auto xl:container w-max">
                <div className="cursor-pointer px-10 max-xl:px-6 max-sm:px-4 py-3 text-base hover:bg-background text-primaryText font-sansMedium border-b-4 border-article/0 hover:border-article/100">Profile</div>
                <div className="cursor-pointer px-10 max-xl:px-6 max-sm:px-4 py-3 text-base hover:bg-background text-primaryText font-sansMedium border-b-4 border-article/0 hover:border-article/100">Security</div>
                <div className="cursor-pointer px-10 max-xl:px-6 max-sm:px-4 py-3 text-base hover:bg-background text-primaryText font-sansMedium border-b-4 border-article/0 hover:border-article/100">Membership</div>
                <div className="cursor-pointer px-10 max-xl:px-6 max-sm:px-4 py-3 text-base hover:bg-background text-primaryText font-sansMedium border-b-4 border-article/0 hover:border-article/100">Your Stocks</div>
            </div>
        </div>
    </div>
    );
}