import '../app/globals.css';

export default function ArticleFallbackUI () {
    return (
    <div className="card news-list flex flex-wrap max-lg:flex-col justify-between gap-y-4">
        <div className="news-item shadow-lg p-6 max-md:p-4 bg-primaryText/10  rounded-2xl w-[32.5%] max-xl:w-[49%] max-lg:w-full mb-4 flex flex-col gap-y-4 items-start">
            {/* Source, Sentiment, Category */}
            <div className="flex w-full items-center justify-end gap-x-3">
                {/* <a
                className="max-sm:text-[3.3vw] mr-auto text-primaryText text-base max-xl:text-sm"
                href={`https://${item.source_domain}`}
                >
                <p>Source: {item.source}</p>
                </a> */}

                <p
                className="w-36 h-10 rounded-full card__skeleton"
                >
                </p>
                <p
                className="w-36 h-10 rounded-full card__skeleton"
                >
                </p>
            </div>

            {/* Banner image */}
            <div
                className="w-full h-[300px] max-md:h-[250px] max-sm:h-[200px] card__skeleton rounded-xl"
            ></div>

            {/* Title and Summary */}
            <h3 className="card__title w-full card__skeleton rounded py-5 max-sm:px-1.5"></h3>
            <p className="card__description w-full card__skeleton rounded py-5 max-sm:px-1.5"></p>

            {/* Author, Date, and Full Article Link */}
            <div className="flex w-full items-center justify-between">
                <div className=" w-[50%]">
                    <p className="card__title w-full card__skeleton rounded py-5"></p>
                </div>
                <a
                className="w-36 h-10 rounded-full card__skeleton">
                </a>
            </div>
        </div>
        <div className="news-item shadow-lg p-6 max-md:p-4 bg-primaryText/10  rounded-2xl w-[32.5%] max-xl:w-[49%] max-lg:w-full mb-4 flex flex-col gap-y-4 items-start">
            {/* Source, Sentiment, Category */}
            <div className="flex w-full items-center justify-end gap-x-3">
                {/* <a
                className="max-sm:text-[3.3vw] mr-auto text-primaryText text-base max-xl:text-sm"
                href={`https://${item.source_domain}`}
                >
                <p>Source: {item.source}</p>
                </a> */}

                <p
                className="w-36 h-10 rounded-full card__skeleton"
                >
                </p>
                <p
                className="w-36 h-10 rounded-full card__skeleton"
                >
                </p>
            </div>

            {/* Banner image */}
            <div
                className="w-full h-[300px] max-md:h-[250px] max-sm:h-[200px] card__skeleton rounded-xl"
            ></div>

            {/* Title and Summary */}
            <h3 className="card__title w-full card__skeleton rounded py-5 max-sm:px-1.5"></h3>
            <p className="card__description w-full card__skeleton rounded py-5 max-sm:px-1.5"></p>

            {/* Author, Date, and Full Article Link */}
            <div className="flex w-full items-center justify-between">
                <div className=" w-[50%]">
                    <p className="card__title w-full card__skeleton rounded py-5"></p>
                </div>
                <a
                className="w-36 h-10 rounded-full card__skeleton">
                </a>
            </div>
        </div>
        <div className="news-item shadow-lg max-xl:hidden p-6 max-md:p-4 bg-primaryText/10  rounded-2xl w-[32.5%] max-xl:w-[49%] max-lg:w-full mb-4 flex flex-col gap-y-4 items-start">
            {/* Source, Sentiment, Category */}
            <div className="flex w-full items-center justify-end gap-x-3">
                {/* <a
                className="max-sm:text-[3.3vw] mr-auto text-primaryText text-base max-xl:text-sm"
                href={`https://${item.source_domain}`}
                >
                <p>Source: {item.source}</p>
                </a> */}

                <p
                className="w-36 h-10 rounded-full card__skeleton"
                >
                </p>
                <p
                className="w-36 h-10 rounded-full card__skeleton"
                >
                </p>
            </div>

            {/* Banner image */}
            <div
                className="w-full h-[300px] max-md:h-[250px] max-sm:h-[200px] card__skeleton rounded-xl"
            ></div>

            {/* Title and Summary */}
            <h3 className="card__title w-full card__skeleton rounded py-5 max-sm:px-1.5"></h3>
            <p className="card__description w-full card__skeleton rounded py-5 max-sm:px-1.5"></p>

            {/* Author, Date, and Full Article Link */}
            <div className="flex w-full items-center justify-between">
                <div className=" w-[50%]">
                    <p className="card__title w-full card__skeleton rounded py-5"></p>
                </div>
                <a
                className="w-36 h-10 rounded-full card__skeleton">
                </a>
            </div>
        </div>
    </div>
    );
}