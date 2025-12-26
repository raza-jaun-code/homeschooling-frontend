import { useState } from "react";
import { MessageSquare, Send } from "lucide-react";

const Messages = () => {
  const [messages, setMessages] = useState([
    { id: 1, from: "Teacher A", text: "Homework reminder: submit by Friday.", time: "2h ago" },
    { id: 2, from: "Admin", text: "New schedule uploaded.", time: "1d ago" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { id: messages.length + 1, from: "You", text: input.trim(), time: "now" }]);
    setInput("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-[#111827] p-3 rounded-lg">
          <MessageSquare className="w-6 h-6 text-indigo-300" />
        </div>
        <h2 className="text-2xl font-bold text-white">Messages</h2>
      </div>

      <div className="bg-[#0f172a]/70 border border-gray-800 rounded-2xl p-4">
        <div className="space-y-3 max-h-64 overflow-y-auto pb-2">
          {messages.map((m) => (
            <div key={m.id} className={`p-3 rounded-lg ${m.from === "You" ? "bg-indigo-600/20 text-white ml-auto max-w-[80%]" : "bg-[#111827] text-gray-200"}`}>
              <div className="text-sm font-semibold">{m.from}</div>
              <div className="text-sm mt-1">{m.text}</div>
              <div className="text-xs text-gray-400 mt-1">{m.time}</div>
            </div>
          ))}
        </div>

        <form onSubmit={sendMessage} className="mt-4 flex gap-3">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Write a message..." className="flex-1 bg-[#0b0f19] border border-gray-700 rounded-lg px-3 py-2 text-white outline-none" />
          <button type="submit" className="relative group inline-flex items-center px-4 py-2 rounded-lg text-white font-semibold bg-[#1e293b] overflow-hidden">
            <span className="relative z-10">Send</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Messages;