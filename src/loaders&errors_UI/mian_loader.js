import Image from "next/image";


export default function MainLoader() {
  return (
    <section className="z-20 fixed bg-loaderBg w-full h-full top-0 left-0 bottom-0 right-0 flex flex-col gap-2 items-center justify-center text-center">
      <Image width={192} height={192} src='/images/error.png' alt='error'></Image>
    </section>
  );
}