import React, { useState, useEffect, Fragment } from "react";
import "./chat.css";
import M from "materialize-css";


export default function Chat({ socket, gameId, pSign, chatOpen_}) {
  const [messages, setMessages] = useState([

  ]);

  const [newMessage, setNewMessage] = useState('')
  const [chatOpen, setChatOpen] = useState(chatOpen_)
  


  const handleNewMessageChange = (e) => {
      e.preventDefault()

      setNewMessage(e.target.value)
  }

  const sendMessage = () => {
    let message = {text: newMessage, pSign: pSign, gameId:gameId}
    socket.emit("message",message)
    console.log(message)

    setNewMessage("")
  }

  function notifyNewMessage(chatOpen) {
    console.log("chatOpen " + chatOpen)
    if (!chatOpen) {
      console.log("notify!")
      M.toast({ html: "New Message in Chat", displayLength: 500 });
    }

  };

  const updateMessages = (incomingMessage) =>{

    setMessages(messages => [...messages, incomingMessage ])
  }

  const onKeyDown  = (e) => {
    if(e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      sendMessage()
    }
  }

  useEffect(()=>{
      socket.on("message", (incomingMessage)=> updateMessages(incomingMessage))


  },[])

  useEffect(()=>{
    setChatOpen(chatOpen_)
    if (messages.length > 0) {notifyNewMessage(chatOpen)}
    console.log("chatOpen: " + chatOpen)
    console.log("chatOpen_: " + chatOpen_)
    console.log("-----------CHAT MOUNTED---------- ")
    
},[ messages])


  return (
    <Fragment>
      <div class="chat">
        <div class="messages">
          <div class="messages-content mCustomScrollbar _mCS_1 mCS_no_scrollbar" style={{ overflow:"auto", display:"flex", flexDirection:"column-reverse"}}>
            <div
              id="mCSB_1"
              class="mCustomScrollBox mCS-light mCSB_vertical mCSB_inside"
              style={{ maxHeight: "none"}}
              tabindex="0"
            >
              <div
                id="mCSB_1_container"
                class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y"
                style={{ position: "relative", top: "0", left: "0", overflow:"auto" , height: "100%"}}
                dir="ltr"
              >

                {messages.map((message) => (
                     <div className={message.pSign == pSign ? "message message-personal new" : "message new"}>
                     {message.text}
                   </div>
                ))}

              </div>
             
            </div>
          </div>
        </div>

        <div class="message-box">
          <textarea
            type="text"
            class="message-input"
            placeholder="Type message..."
            value={newMessage}
            onChange={handleNewMessageChange}
            onKeyDown={onKeyDown}
          ></textarea>
          <button type="submit" class="message-submit" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
      <div class="bg"></div>
    </Fragment>
  );
}
