import { useState } from "react";

//import { useParams } from "react-router-dom"

const Chat = () => {
    //const {target} = useParams();


const [input, setInput] = useState("");
const [chatMessages, setChatMessages] = useState([
    {
        text: "Hey, how are you?",
        img: "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
    },
    {
        text: "I'm good! How about you?",
        img: "https://img.daisyui.com/images/profile/demo/anakeen@192.webp",
        right: true
    },
    {
        text: "Doing well, thanks! Excited to chat.",
        img: "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
    }
]);

const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    setChatMessages([
        ...chatMessages,
        {
            text: input,
            img: "https://img.daisyui.com/images/profile/demo/anakeen@192.webp",
            right: true
        }
    ]);
    setInput("");
};

return (
    <div className="border border-1 border-[#56629d] m-9 p-9 pt-6 flex flex-col gap-3 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-2 text-center ">Chat</h2>
        <hr className="mb-2" />
        <div className="flex-1 flex flex-col gap-1">
            {chatMessages.map((msg, idx) => (
                <div
                    className = {`chat ${msg.right ? "chat-end" : "chat-start"}`}
                    key={idx}
                >
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS chat bubble component"
                                src={msg.img}
                            />
                        </div>
                    </div>
                    <div className="chat-bubble break-words max-w-sm">
                        {msg.text}
                    </div>
                </div>
            ))}
        </div>
        <hr className="my-2" />
        <form className="flex gap-2 items-center mt-2" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Type your message…"
                className="input input-bordered flex-1"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
                Send
            </button>
        </form>
    </div>
)
}

export default Chat