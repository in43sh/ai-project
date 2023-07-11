import Image from "next/image";

export default function Home() {
  return (
    <main className="relative h-screen">
      <div className="absolute bottom-0 w-full">
        <form className="relative flex flex-col relative mx-3 py-3">
          <input
            className="input p-3 rounded-xl"
            id="prompt"
            placeholder="Send a message"
          />
          <button className="send absolute right-0" title="submit">
            <Image
              src="/images/send.svg"
              alt="send"
              className="send-image"
              // color="#6b6c7b"
              width={16}
              height={16}
              priority
            />
          </button>
          {/* <input title="submit">
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </input> */}
        </form>
      </div>
    </main>
  );
}
