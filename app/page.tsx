'use client'; // This is a client component
import React from "react";

interface Conversation {
  role: string;
  content: string;
}

export default function Home() {
  // current input text field content
  const [value, setValue] = React.useState<string>("");

  // chat history state
  const [conversation, setConversation] = React.useState<Conversation[]>([]);

  // Handlers
  // handels changes in the input text field
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // handles pressing the Enter while focused on input field
  const handleEnterDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
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

      setValue("");
      setConversation([...chatHistory, { role: "user", content: data.item }]);
    }
  };

  // handels button click
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

    setValue("");
    setConversation([...chatHistory, { role: "user", content: data.item }]);
  };

  return (
    <main className="h-screen">
      <div className="textarea p-3">
        {conversation.map((item, index) => (
          <React.Fragment key={index}>
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
      <div className="bottom-0 w-full">
        <div className="sticky bottom flex flex-col mx-3 py-3">
          <input
            className="input p-3 rounded-xl"
            placeholder="Enter your message"
            value={value}
            onChange={handleInput}
            onKeyDown={handleEnterDown}
          />
          <button
            onClick={handleSubmit}
            className="send absolute right-0"
            title="submit"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="none"
              className="h-4 w-4 m-1 md:m-0"
              strokeWidth="2"
            >
              <path
                d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z"
                fill="#6b6c7b"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}
