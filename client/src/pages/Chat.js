import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import axios from "axios";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

// Connection
const socket = io("http://localhost:7070");

const Chat = () => {
    const [nickname, setNickname] = useState('')
  const [disabled, setDisabled] = useState(false)

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [storedMessages, setStoredMessages] = useState([])
  const [firstTime, setfirstTime] = useState(false)


  useEffect(() =>{
    const receivedMessage = (message) =>{
      //console.log(message)
      setMessages([message, ...messages])
    
    }
    socket.on('message', receivedMessage)

    return () => {
      socket.off('message', receivedMessage)
    }
    

  }, [messages])

  if(!firstTime){
    axios.get(`${process.env.REACT_APP_API}/messages`).then(res => {
      setStoredMessages(res.data.messages);
    })
    setfirstTime(true)
  }
  

  const handlerSubmit = (e) => {

    e.preventDefault()

    if(nickname !== ''){
    
      socket.emit('message', message, nickname)

      const newMessage = {
        body: message,
        from: 'Yo'
      }
     
      setMessages([newMessage, ...messages])
      setMessage('')

      axios.post(`${process.env.REACT_APP_API}/messages`, {
        message: message,
        from: nickname
      })


    }else{
      toast.error('You need to set nickname before sending a message!!!')
    }
    
  }

  const nicknameSubmit = (e) => {
    e.preventDefault()
    setNickname(nickname)
    setDisabled(true)
  }

  return (
    <div className="App">
      <div className="container mt-3">

              <div className="card shadow border-0">
              <div className="card-body">
                <h5 className="text-center mb-3">CHAT</h5>

                {/* nickname */}

                <form onSubmit={nicknameSubmit}>
                  <div className="d-flex mb-3">
                    <input type="text" className="form-control" id="nickname" placeholder="Nickname..." disabled={disabled} onChange={e => setNickname(e.target.value)} value={nickname} required/>
                    <button className="btn btn-success mx-3" type="submit" id="btn-nickname" disabled={disabled}>Establecer</button>
                  </div>
                </form>

                {/* chat form */}

                <form onSubmit={handlerSubmit}>
                  <div className="d-flex">
                    <input type="text" className="form-control" placeholder="Message..." onChange={e => setMessage(e.target.value)} value={message}/>
                    <button className="btn btn-success mx-3" type="submit">Send</button>
                  </div>
                </form> 
              </div>
            </div>

            {/* chat messages */}

            <div className="card mt-3 mb-3 shadow border-0" id="content-chat">
              <div className="card-body">

                {messages.map((message, index) => (
                  <div key={index} className={`d-flex p-3 ${message.from === "Yo" ? "justify-content-end" : "justify-content-start"}`}>
                    <div className={`card mb-3 shadow border-1 ${message.from === "Yo" ? "bg-success bg-opacity-25" : "bg-light"}`}>
                      <div className="card-body">
                        <small className="">{message.from}: {message.body}</small>
                      </div>
                    </div>
                  </div>

                ))}

                {/* chat stored messages */}
                <small className="text-center text-muted">... Stored messages ...</small>
                {storedMessages.map((message, index) => (
                  <div key={index} className={`d-flex p-3 ${message.from === nickname ? "justify-content-end" : "justify-content-start"}`}>
                    <div className={`card mb-3 shadow border-1 ${message.from === nickname ? "bg-success bg-opacity-25" : "bg-light"}`}>
                      <div className="card-body">
                        <small className="text-muted">{message.from}: {message.message}</small>
                      </div>
                    </div>
                  </div>

                ))}

              </div>
            </div>
      </div>
    </div>
  );
};

export default Chat;
