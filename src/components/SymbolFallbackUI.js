
export default function SymbolFallBackUI () {
    return (
        <div className="w-full flex flex-col gap-y-4 py-2 max-sm:px-1.5 lg:pr-[30%]">
            <div className="w-[100%]  flex max-md:flex-col-reverse max-md:items-start max-md:gap-4 items-end justify-between">
                <div className="w-[30%] max-md:w-[80%] flex items-end">
                    <div className="p-7 mr-2 max-sm:mr-1.5 rounded-full shadow-md card__skeleton"></div>
                    <div className="w-[100%] flex flex-col gap-y-1">
                        <h1 className="card__skeleton rounded w-[4rem] py-[.7rem]"></h1>
                        <p className="card__skeleton card__title rounded w-full"></p>
                    </div>
                </div>
                <div className="w-[26%] max-sm:w-[83%] max-md:w-[47%] gap-x-1 max-md:ml-auto flex items-center">
                    <p className="w-[50%] py-[1.12rem] px-12 card__skeleton"></p>
                    <p className="w-[50%] flex items-center gap-x-2 py-[1.12rem] card__skeleton"> 
                    </p>
                </div>
            </div>
            <div className="description-section gap-y-1 flex flex-col">
                <p className="card__skeleton card__title rounded w-full max-sm:py-4"></p>
                <p className="card__skeleton card__title rounded w-full max-sm:py-4"></p>
                <p className="card__skeleton card__title rounded w-full max-sm:py-4 md:hidden"></p>
                <p className="card__skeleton card__title rounded w-full max-sm:py-4 sm:hidden"></p>
                <p className="card__skeleton card__title rounded w-[14%] max-md:w-[40%]"></p>
            </div>
        </div>
    );
}