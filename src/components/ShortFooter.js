import Link from "next/link";

export default function ShortFooter () {
    return (
      <div className="bg-primaryBg">
          <div className="px-6 max-sm:px-3 mx-auto xl:container flex flex-col justify-between py-4 items-start gap-3">
              <h5 className="text-3xl font-sansMedium text-primaryTextColor"></h5>
              <p className="text-base font-sansRegular text-primaryTextColor">
                <span className="font-sansMedium text-xl">Disclaimer: </span>
                Stockverse is a financial information and analysis platform, not a licensed investment adviser. The content, tools, and stock picks provided are for educational and informational purposes only and do not constitute investment advice, solicitation, or a recommendation to buy or sell any securities. Always consult with a licensed financial professional before making investment decisions. Past performance is not indicative of future results.
                &nbsp; <Link href='/disclaimer' className="text-primaryMain underline">View full disclaimer</Link>
              </p>
          </div>
      </div>
    );
}