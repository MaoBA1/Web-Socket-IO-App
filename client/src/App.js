import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

import Chat from './Chat';
const socket = io.connect("http://localhost:3001");

function App() {
  const [ userName, setUserName ] = useState("");
  const [ room, setRoom ] = useState("");
  const [ showChat, setShowChat ] = useState(false);
  const [ windowSize, setWindowSize ] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    const handelResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }
    window.addEventListener('resize', handelResize);
    
  },[])

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  }

  return (
    <div style={{
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      justifyContent:"center",
      width: windowSize.width,
      height: windowSize.height,
    }}>
      {
        !showChat ?
        ( 
          <>
            <h3 style={{
              fontSize:"50px",
              color:"green"
            }}>
              Join A Chat
            </h3>
            <div style={{
              width: windowSize.width,
              display:"flex",
              flexDirection:"column",
              alignItems:"center",
              justifyContent:"space-between"
            }}>
              <input
                type="text"
                placeholder="John..."
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
                style={{
                  width:"250px",
                  height:"30px",
                  margin:"5px",
                  border:"1px solid green",
                  borderRadius:"20px",
                  padding:"5px"
                }}
              />
              <input
                type="text"
                placeholder="Room Id..."
                value={room}
                onChange={(event) => setRoom(event.target.value)}
                style={{
                  width:"250px",
                  height:"30px",
                  margin:"5px",
                  border:"1px solid green",
                  borderRadius:"20px",
                  padding:"5px"
                }}
              />
              <button 
                onClick={joinRoom}
                style={{
                  marginTop:"30px",
                  width:"200px",
                  height:"40px",
                  backgroundColor:"green",
                  border:"2px solid grey",
                  borderRadius:"20px",
                  color:"#ffffff",
                  fontSize:"20px"
                }}
              >
                Join A Room
              </button>
            </div>
          </>
        )
        :
        (
          <Chat  
            socket={socket} 
            userName={userName} 
            room={room}
            windowSize={windowSize}
          />
        )
      }
    </div>
  );
}

export default App;
