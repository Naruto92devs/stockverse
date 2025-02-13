import Image from "next/image";

export default function News () {
  return (
    <div className="w-full">
      {/* Top Banner Start*/}
      <div className="w-full bg-[#EFEDFE] flex md:flex-row flex-col gap-4 md:items-center justify-between px-[5%] py-8">
        <div className="md:w-[50%] w-full flex flex-col gap-4">
          <h1 className="xl:text-5xl text-4xl font-sansMedium text-primaryTextColor">One Stop Shop <br/> <span className="hero_h1">Everything Stocks</span></h1>
          <p className="text-lg font-sansRegular text-primaryTextColor">Discover real-time stock data, personalized insights, and AI-driven recommendations tailored to your trading style</p>
        </div>
        <div className="md:w-[45%] w-full flex flex-col">
          <Image className="rounded-3xl" width={552} height={291} src='/images/news_banner.jpg' alt='news banner'/>
        </div>
      </div>
      {/* Top Banner End*/}
    </div>
  );
}