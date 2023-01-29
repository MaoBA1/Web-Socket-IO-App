import React, { useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

function Chat({ socket, userName, room, windowSize }) {
    const [ currentMessage, setCurrentMessage ] = useState("");
    const [ messagesList, setMessagesList ] = useState([]);
    const sendMessage = async() => {
        if(currentMessage !== "") {
            const messageData = {
                room: room,
                author: userName,
                message : currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            setCurrentMessage("");
            await socket.emit("send_message", messageData);
            setMessagesList((list) => [...list, messageData]);
        }

        
    }

    
      
    useEffect(() => {
        socket.on("recive_message", (data) => {
            let formattedData = {
                room: data.room,
                author: data.author,
                message: data.message,
                time: data.time,
                right: true
            }
            setMessagesList((list) => [...list, formattedData]);
        })
        
    }, [socket])
    
    return ( 
        <div style={{
            display:"flex",
            flexDirection:"column",
            border:"2px solid grey",
            borderRadius:"22px",
            width: windowSize.width / 2,
            height: windowSize.height / 2
        }}>
            <div style={{
                height:"10%",
                borderBottom:"2px solid grey",
                borderTopLeftRadius:"20px",
                borderTopRightRadius:"20px",
                display:"flex",
                flexDirection:"row",
                padding:"5px",
                backgroundColor:"#1e4e9c",
                alignItems:"center"
            }}>
                <div
                    style={{
                        width:"18px",
                        height:"18px",
                        backgroundColor:"green",
                        borderRadius:"50px"
                    }}
                />
                <h4 style={{
                    color:"#ffffff",
                    marginLeft:"10px"
                }}>
                    Live Chat On Room {room}
                </h4>
            </div>
            <Scrollbars style={{
                height:"84%",
                display:"flex",
                flexDirection:"column",
            }}>
                {
                    messagesList.map((item, index) => 
                        !item.right?
                        (
                            <div style={{
                                display:"flex",
                                flexDirection:"column",
                                margin:"10px",
                                padding:"7px",
                                alignSelf:"flex-start",
                                width:"30%",
                                backgroundColor:"grey",
                                borderRadius:"20px"
                            }}>
                                <label style={{
                                    fontSize:'18px',
                                    fontWeight:"bold"
                                }}>{item.author}</label>
                                <label>{item.message}</label>
                            </div>
                        )
                        :
                        (
                            <div style={{
                                width:"30%",
                                border:"1px solid",
                                display:"flex",
                                flexDirection:"column",
                                margin:"10px",
                                padding:"5px",
                                alignSelf:"flex-end"
                            }}>
                                <h4 key={index}>{item.message}</h4>
                            </div>
                        )
                        
                    )
                }
            </Scrollbars>
            <div style={{
                height:"6%",
                display:"flex",
                flexDirection:"row"
            }}>
                <input 
                    type={"text"}
                    placeholder={"hey..."}
                    value={currentMessage}
                    onChange={event => setCurrentMessage(event.target.value)}
                    style={{
                        width:"85%",
                        borderBottomLeftRadius:"20px",
                        border:"0px",
                        borderTop:"2px solid grey",
                        paddingLeft:"10px"
                    }}
                />
                <div style={{backgroundColor:"gray", width:"0.3%"}}/>
                <button 
                    style={{
                        width:"14.7%",
                        borderBottomRightRadius:"20px",
                        border:"0px",
                        borderTop:"2px solid grey"
                    }}
                    onClick={sendMessage}
                >
                    &#9658;
                </button>
            </div>
            
        </div>
    );
}

export default Chat;