import React, { useState } from 'react';
import { io } from 'socket.io-client';

import Chat from './Chat';
const socket = io.connect("http://localhost:3001");

function App() {
  const [ userName, setUserName ] = useState("");
  const [ room, setRoom ] = useState("");
  const [ showChat, setShowChat ] = useState(false);

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  }

  return (
    <div style={{
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      justifyContent:"center",
      width:"100%",
      height:"100%",
      border:"1px solid"
    }}>
      <h3>Join A Chat</h3>
      <div>
        <input
          type="text"
          placeholder="John..."
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
        <input
          type="text"
          placeholder="Room Id..."
          value={room}
          onChange={(event) => setRoom(event.target.value)}
        />
        <button onClick={joinRoom}>Join A Room</button>
      </div>
      {
        showChat &&
        <Chat  
          socket={socket} 
          userName={userName} 
          room={room}
        />
      }
    </div>
  );
}

export default App;
