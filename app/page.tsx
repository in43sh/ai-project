//import Image from 'next/image';
"use client"; // This is a client component
import React, { useRef } from "react";

interface Conversation {
  role: string;
  content: string;
}

export default function Home() {
  const [value, setValue] = React.useState<string>("");
  const [conversation, setConversation] = React.useState<Conversation[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // const handleInput = React.useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     console.log("e.target.value ===> ", e.target.value);
  //     setValue(e.target.value);
  //   },
  //   []
  // );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  console.log("value ===> ", value);

  // const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") {
  //     console.log("here");
  //     const chatHistory = [
  //       ...conversation,
  //       { role: "assistant", content: value },
  //     ];
  //     const response = await fetch("/api/gpt", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ messages: chatHistory }),
  //     });

  //     const data = await response.json();
  //     console.log("data ===> ", data);

  //     setValue("");
  //     setConversation([...chatHistory, { role: "user", content: data.item }]);
  //   }
  // };

  const handleSubmit = async () => {
    const chatHistory = [
      ...conversation,
      { role: "assistant", content: value },
    ];
    const response = await fetch("/api/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: chatHistory }),
    });

    const data = await response.json();
    console.log("data ===> ", data);

    setValue("");
    setConversation([...chatHistory, { role: "user", content: data.item }]);
  };

  // const handleRefresh = () => {
  //   inputRef.current?.focus();
  //   setValue("");
  //   setConversation([]);
  // };

  return (
    <main className="relative h-screen">
      <div className="textarea">
        {conversation.map((item, index) => (
          <React.Fragment key={index}>
            ``
            <br />
            {item.role === "user" ? (
              <div>
                <div>
                  <strong>AI Assistant</strong>
                  <br />
                  {item.content}
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <strong>User</strong>
                  <br />
                  {item.content}
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="absolute bottom-0 w-full">
        <div className="relative flex flex-col relative mx-3 py-3">
          <input
            className="input p-3 rounded-xl"
            // id="prompt"
            placeholder="Send a message"
            value={value}
            onChange={handleInput}
          />
          <button
            onClick={handleSubmit}
            className="send absolute right-0"
            title="submit"
            type="button"
          >
            {/* <button onClick={handleRefresh} className="send absolute right-0" title="submit"> */}
            Send
            {/* <Image
              src="/images/send.svg"
              alt="send"
              className="send-image"
              // color="#6b6c7b"
              width={16}
              height={16}
              priority
            /> */}
          </button>
        </div>
      </div>
    </main>
  );
}
