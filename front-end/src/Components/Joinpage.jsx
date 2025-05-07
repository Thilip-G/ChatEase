import React, { useState } from 'react';

const Joinpage = ({ setUsername, setEntered }) => {
  const [name, setName] = useState("");

  const handleJoin = () => {
    if (name.trim() !== "") {
      setUsername(name);
      setEntered(true);
    }
  };

  return (
    <div className="p-3 chat-bg container text-center">
      <h2 className='bg-white p-3'>Enter Your Name to Join Chat</h2>
      <input
        type="text"
        className="form-control my-3"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleJoin}>
        Join Chat
      </button>
    </div>
  );
};

export default Joinpage;
