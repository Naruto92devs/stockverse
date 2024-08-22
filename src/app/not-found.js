// import Card from "@/components/Card";

import Link from "next/link";


export default function notFound() {
    return (
      <section className="w-[100%] h-[50dvh] flex flex-col gap-1 items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-primaryButtonBg">Oops, something went wrong!</h1>
        <p className="text-base text-primaryText">we could not find the page you were looking for.</p>
        <p className="text-base text-primaryText">Go back to the <Link className="underline" href="/">Home</Link></p>
        {/* <Card/> */}
      </section>
    );
  }