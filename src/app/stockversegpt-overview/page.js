import Link from "next/link";
import Image from "next/image";

const Gptoverview = ()=>{
    return(
        <>
          <section className="max-lg:py-4 overview-bg flex-grow">
            <div className="flex md:flex-row flex-col-reverse items-center justify-between w-full xl:container mx-auto">
              <div className="md:w-[48%] max-md:px-6 w-full flex flex-col gap-4">
                  <p className="w-max bg-[#ffffff1c] text-[#fff] text-sansRegular text-lg px-4 py-2 rounded-lg flex items-center gap-3 mb-4">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.29461 0.957425C9.20797 0.732146 8.99153 0.583496 8.75016 0.583496C8.5088 0.583496 8.29236 0.732146 8.20571 0.957425L7.51818 2.745C7.34295 3.20061 7.28788 3.3319 7.21256 3.43783C7.13698 3.54412 7.04412 3.63698 6.93783 3.71256C6.8319 3.78788 6.70061 3.84295 6.245 4.01818L4.45743 4.70571C4.23215 4.79236 4.0835 5.0088 4.0835 5.25016C4.0835 5.49153 4.23215 5.70797 4.45743 5.79461L6.245 6.48214C6.70061 6.65738 6.8319 6.71244 6.93783 6.78777C7.04412 6.86334 7.13698 6.95621 7.21256 7.06249C7.28788 7.16842 7.34295 7.29971 7.51818 7.75532L8.20571 9.5429C8.29236 9.76818 8.5088 9.91683 8.75016 9.91683C8.99153 9.91683 9.20797 9.76818 9.29461 9.5429L9.98215 7.75532C10.1574 7.29971 10.2124 7.16842 10.2878 7.06249C10.3633 6.95621 10.4562 6.86334 10.5625 6.78777C10.6684 6.71244 10.7997 6.65738 11.2553 6.48214L13.0429 5.79461C13.2682 5.70797 13.4168 5.49153 13.4168 5.25016C13.4168 5.0088 13.2682 4.79236 13.0429 4.70571L11.2553 4.01818C10.7997 3.84295 10.6684 3.78788 10.5625 3.71256C10.4562 3.63698 10.3633 3.54412 10.2878 3.43783C10.2124 3.3319 10.1574 3.20061 9.98215 2.745L9.29461 0.957425Z" fill="white"/>
                    <path d="M4.31358 7.32262C4.21477 7.125 4.01278 7.00016 3.79183 7.00016C3.57088 7.00016 3.36889 7.125 3.27008 7.32262L2.81248 8.23782C2.6477 8.56739 2.59748 8.66223 2.53647 8.74138C2.47527 8.82077 2.4041 8.89194 2.32471 8.95314C2.24556 9.01415 2.15072 9.06436 1.82116 9.22915L0.905955 9.68675C0.708331 9.78556 0.583496 9.98755 0.583496 10.2085C0.583496 10.4294 0.708331 10.6314 0.905955 10.7302L1.82116 11.1878C2.15072 11.3526 2.24556 11.4028 2.32471 11.4639C2.4041 11.5251 2.47528 11.5962 2.53647 11.6756C2.59748 11.7548 2.6477 11.8496 2.81248 12.1792L3.27008 13.0944C3.36889 13.292 3.57088 13.4168 3.79183 13.4168C4.01278 13.4168 4.21477 13.292 4.31358 13.0944L4.77118 12.1792C4.93596 11.8496 4.98618 11.7548 5.04719 11.6756C5.10838 11.5962 5.17956 11.5251 5.25895 11.4639C5.3381 11.4028 5.43294 11.3526 5.7625 11.1878L6.6777 10.7302C6.87533 10.6314 7.00016 10.4294 7.00016 10.2085C7.00016 9.98755 6.87533 9.78556 6.6777 9.68675L5.7625 9.22915C5.43294 9.06436 5.3381 9.01415 5.25895 8.95314C5.17956 8.89194 5.10838 8.82077 5.04719 8.74138C4.98618 8.66223 4.93596 8.56739 4.77118 8.23782L4.31358 7.32262Z" fill="white"/>
                    </svg>
                    Introducing
                  </p>
                  <h1 className="text-[#FFF] 2xl:text-6xl text-6xl font-sansMedium"><span className="overview-gradient w-max">Stockverse </span>GPT</h1>
                  <p className="text-lg font-sansRegular text-[#fff]">We have developed a model named Stockverse GPT that engages in interactive conversations.</p>
                  <p className="text-lg font-sansRegular text-[#fff]">Stockverse GPT gives you real-time insights, technical analysis, and AI-powered predictions in seconds—no experience required.</p>
                  <div className="flex items-center gap-4">
                    <Link href="/register" className="bg-[#ffffff] hover:bg-[#ffffff]/90 transition-all transition-700 text-[#111111] font-sansMedium text-lg px-3 py-2 rounded-lg flex items-center gap-2">
                      Sign Up & Try Now
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.33317 0.166504C3.87293 0.166504 3.49984 0.5396 3.49984 0.999837C3.49984 1.46007 3.87293 1.83317 4.33317 1.83317H8.98799L0.410582 10.4106C0.0851447 10.736 0.0851447 11.2637 0.410582 11.5891C0.736018 11.9145 1.26366 11.9145 1.58909 11.5891L10.1665 3.01168V7.6665C10.1665 8.12674 10.5396 8.49984 10.9998 8.49984C11.4601 8.49984 11.8332 8.12674 11.8332 7.6665V0.999837C11.8332 0.5396 11.4601 0.166504 10.9998 0.166504H4.33317Z" fill="black"/>
                      </svg>
                    </Link>
                    <Link className="w-max bg-[#ffffff1c] text-[#fff] font-sansMedium text-lg px-3 py-2 rounded-lg hover:bg-[#fff] hover:text-[#111111] transition-all transition-700" href="/stockverse-gpt">Sign In</Link>
                  </div>
              </div>
              <div className="md:w-[48%] max-md:px-6 w-[60%]">
                <Image src="/images/gpt-img.png" alt="gpt" width={624} height={830} />
              </div>
            </div>
          </section>
        </>
    )
}
export default Gptoverview;