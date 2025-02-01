import Image from "next/image";


export default function MainLoader() {
  return (
    <section 
    style={{backgroundImage: "url('/images/loader_bg.jpg')",}} 
    className="z-20 bg-cover bg-no-repeat bg-right-bottom fixed w-full h-full top-0 left-0 bottom-0 right-0 flex flex-col gap-2 items-center justify-center text-center"
    >
      <div className="flex gap-4 items-center rounded-xl">
        <div className="loader__skeleton w-16 h-16 flex items-center justify-center">
          <Image width={27} height={47.84} className="" src='/images/icon_s.png' alt='error'></Image>
        </div>
        <h1 className="text-primaryTextColor text-4xl font-sansMedium">StockVerse</h1>
      </div>
      {/* From Uiverse.io by kennyotsu */}
      <div className={`cardloader absolute bottom-0`}>
          <div className="loader">
            <div className="words">
              <span className="word">Empowering Smarter Investments, Every Day.</span>
              <span className="word">Your Gateway to Realtime Stock Insights.</span>
              <span className="word">Stay Ahead with AI Powered Stock Analysis.</span>
              <span className="word">Trade Confidently, Invest Wisely.</span>
              <span className="word">Unleasing the Power of Market Knowledge.</span>
            </div>
          </div>
      </div>
    </section>
  );
}