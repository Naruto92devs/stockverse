
export default function DELETEACCOUNT() {
    return (
        <div className="hero py-16 max-md:py-6 w-full">
        <div className="px-6 max-sm:px-3 mx-auto xl:container gap-y-4 max-sm:gap-y-3 flex flex-col items-start">
            <h1 className="text-3xl font-sansSemibold text-primaryText">Deleting your Stockverse account</h1>
            <p className="text-lg font-sansMedium text-primaryText">
            Last updated: November 18, 2024
            </p>
            <p className="text-base text-primaryText">Once your account is deleted, all associated resources and data will be permanently removed. Before proceeding, please download any data or information you wish to retain.</p>
            <p className="text-base text-primaryText"><span className="font-sansSemibold">If you wish to use Stockverse again in the future, you&#39;ll need to create a new account.</span></p>
            <h2 className="mt-8 text-primaryText text-lg font-sansSemibold">Steps to Delete Your Stockverse Account:</h2>
            <ol className="list-disc pl-8 flex flex-col gap-y-4">
                <li className="text-base text-primaryText">Log in to your Stockverse account.
                </li>
                <li className="text-base text-primaryText">Click on your account logo in the top-right corner.
                </li>
                <li className="text-base text-primaryText">Go to Manage Account.
                </li>
                <li className="text-base text-primaryText">Click on Delete Account at the bottom and enter your password.
                </li>
                <li className="text-base text-primaryText">Confirm your decision to delete your account by tapping the Confirm button.
                </li>
                <li className="text-base text-primaryText">You will receive an email confirmation of your deletion request.
                </li>
            </ol>
        </div>
        </div>
        );
}