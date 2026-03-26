"use client";
/**
 * ChatBox.jsx
 * ─────────────────────────────────────────────────────────────
 * Renders the chat history between the user and the AI.
 * Each message is styled differently based on who sent it.
 *
 * Props:
 *   - messages: array of { role: "user"|"ai", text: string }
 *   - isAiThinking: boolean — shows a "typing" indicator
 * ─────────────────────────────────────────────────────────────
 */

import { useEffect, useRef } from "react";

export default function ChatBox({ messages, isAiThinking }) {
  // This ref lets us auto-scroll to the latest message
  const bottomRef = useRef(null);

  // Every time messages change, scroll to the bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAiThinking]);

  return (
    <div className="flex flex-col gap-3 h-96 overflow-y-auto p-4 bg-gray-50 rounded-xl border border-gray-200">
      {/* Render each message */}
      {messages.map((msg, index) => (
        <MessageBubble key={index} message={msg} />
      ))}

      {/* AI "typing" indicator */}
      {isAiThinking && (
        <div className="flex items-center gap-2 animate-fadeInUp">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-sm flex-shrink-0">
            🌍
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none px-4 py-2">
            <div className="flex gap-1 items-center h-5">
              {/* Three bouncing dots */}
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0ms]" />
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        </div>
      )}

      {/* Invisible anchor at the bottom for auto-scroll */}
      <div ref={bottomRef} />
    </div>
  );
}

/**
 * MessageBubble
 * Renders a single chat message.
 * User messages appear on the RIGHT, AI messages on the LEFT.
 */
function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex items-end gap-2 animate-fadeInUp ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
          isUser ? "bg-indigo-600 text-white" : "bg-indigo-100"
        }`}
      >
        {isUser ? "😊" : "🌍"}
      </div>

      {/* Message text */}
      <div
        className={`max-w-xs sm:max-w-sm px-4 py-2 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "bg-indigo-600 text-white rounded-br-none"
            : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        {/* Split on ** for bold formatting */}
        {formatMessage(message.text)}
      </div>
    </div>
  );
}

/**
 * formatMessage
 * Converts **bold** markdown to <strong> tags.
 * Simple inline parser — no need for a full markdown library.
 */
function formatMessage(text) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-bold">
        {part}
      </strong>
    ) : (
      part
    )
  );
}
