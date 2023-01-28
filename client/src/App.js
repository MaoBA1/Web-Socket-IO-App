import React, { useState } from 'react';
import { io } from 'socket.io-client';

const socket = io.connect("http://localhost:3001");

function App() {
  const [ userName, setUserName ] = useState("");
  const [ room, setRoom ] = useState("");

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      
    }
  }

  return (
    <div>
      <h3>Join A Chat</h3>
      <input
        type="text"
        placeHolder="John..."
        value={userName}
        onChange={(event) => setUserName(event.target.value)}
      />
      <input
        type="text"
        placeHolder="Room Id..."
        value={room}
        onChange={(event) => setRoom(event.target.value)}
      />
      <button>Join A Room</button>
    </div>
  );
}

export default App;
