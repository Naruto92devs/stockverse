import Link from "next/link";
import Image from "next/image";


export default function notFound() {
    return (
      <section className="w-[100%] py-16 h-auto flex flex-col gap-1 items-center justify-center text-center">
        <Image width={256} height={256} src='/images/error.png' alt='error'></Image>
        <h1 className="text-4xl font-bold text-primaryTextColor">Oops, something went wrong!</h1>
        <p className="text-base text-primaryTextColor">we could not find the page you were looking for.</p>
        <p className="text-base text-primaryTextColor">Go back to the <Link className="underline" href="/">Home</Link></p>
      </section>
    );
  }