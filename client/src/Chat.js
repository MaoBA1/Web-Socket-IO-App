import React, { useEffect, useState } from 'react';

function Chat({ socket, userName, room }) {
    const [ currentMessage, setCurrentMessage ] = useState("");

    const sendMessage = async() => {
        if(currentMessage !== "") {
            const messageData = {
                room: room,
                author: userName,
                message : currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message", messageData);
        }

        
    }

    useEffect(() => {
        socket.on("recive_message", (data) => {
            console.log(data);
        })
    }, [socket])
    return ( 
        <div>
            <div className='chat-header'>
                <p>Live Chat</p>
            </div>
            <div className='chat-body'>

            </div>
            <div className='chat-footer'>
                <input 
                    type={"text"}
                    placeholder={"hey..."}
                    value={currentMessage}
                    onChange={event => setCurrentMessage(event.target.value)}
                />
            </div>
            <button onClick={sendMessage}>
                &#9658;
            </button>
        </div>
    );
}

export default Chat;