import Image from "next/image";


export default function DataNotAvailable() {
  return (
    <section className="w-full h-auto flex flex-col gap-1 items-center justify-center text-center">
      <Image width={192} height={192} src='/images/error.png' alt='error'></Image>
      <h1 className="text-2xl font-sansMedium text-primaryTextColor">Oops, No Data Available</h1>
      <p className="text-base text-primaryTextColor">Try Something else.</p>
    </section>
  );
}