import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "bootstrap/dist/css/bootstrap.min.css";
import Joinpage from "./Components/Joinpage";

const socket = io("http://localhost:3001");

const App = () => {
  const [username, setUsername] = useState("");
  const [entered, setEntered] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      const messageData = {
        sender: username,
        text: message,
        time: new Date().toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })
        
      };
      socket.emit("send_message", messageData);
      setMessages((prev) => [...prev, messageData]);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => socket.off("receive_message");
  }, []);

  if (!entered) {
    return <Joinpage setUsername={setUsername} setEntered={setEntered} />;
  }

  return (
    <div className="container py-2">
      <h2 className="bg-white text-center p-3 rounded shadow fw-bold mb-2">
        ChatEase
      </h2>

      <div style={{overflowY:"scroll"}} className="mb-2 p-3 chat-bg rounded shadow">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-3 p-2 rounded ${msg.sender === username ? "text-end bg-text" : "text-start bg-white"}`}
          >
            <strong>{msg.sender}</strong><br />{msg.text}
            <br />
            <small><sub className="text-muted small">{msg.time}</sub></small>
          </div>
        ))}
      </div>

      <div className="row align-items-center">
        <div className="col-9 col-md-10">
          <input
            type="text"
            className="form-control rounded-pill px-4"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="col-3 col-md-2">
          <button className="btn btn-success w-100 rounded-pill" onClick={sendMessage}>
            <i className="fa-solid fa-paper-plane me-2"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
