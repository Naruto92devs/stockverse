import Image from "next/image";

export default function RequestError() {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <section className="w-full h-auto flex flex-col px-2 gap-1 items-center justify-center text-center">
      <Image width={192} height={192} src="/images/404.png" alt="error" />
      <h1 className="text-2xl font-sansMedium text-primaryTextColor">Oops, Something went wrong</h1>
      <p className="text-base text-primaryTextColor">Request failed, Please check your connection and try again.</p>
      {/* Refresh Button */}
      <button
        onClick={refreshPage}
        className="mt-4 px-4 py-2 text-white bg-primaryMain rounded-full hover:bg-primaryHover"
      >
        Refresh
      </button>
    </section>
  );
}