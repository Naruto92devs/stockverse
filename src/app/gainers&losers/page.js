import TopGainers from "@/components/TopGainers";
import TopLosers from "@/components/TopLosers";
import ActiveStocks from "@/components/ActiveStocks";

export default function Gaioners_Losers() {
    return (
      <section className="w-full">
        <div className="px-6 max-sm:px-3 mx-auto xl:container gap-y-4 max-sm:gap-y-3 flex flex-wrap gap-1 items-start justify-between">
          <div className="w-[32%] max-lg:w-[48%] max-sm:w-full bg-primaryColor">
            <ActiveStocks/>
          </div>
          <div className="w-[32%] max-lg:w-[48%] max-sm:w-full bg-primaryColor">
            <TopGainers/>
          </div>
          <div className="w-[32%] max-lg:w-[48%] max-sm:w-full bg-primaryColor">
            <TopLosers/>
          </div>
        </div>
      </section>
    );
  }