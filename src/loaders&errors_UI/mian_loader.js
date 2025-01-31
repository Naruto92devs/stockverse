import Image from "next/image";


export default function MainLoader() {
  return (
    <section className="w-full h-auto flex flex-col gap-2 items-center justify-center text-center">
      <Image width={192} height={192} src='/images/error.png' alt='error'></Image>
    </section>
  );
}