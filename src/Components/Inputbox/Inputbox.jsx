import React, { useEffect, useState, useRef } from 'react';
import Picker from 'emoji-picker-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './inputbox.css';
import { sendmessage, getallmessage, host } from '../../Utils/APIRoutes';
import Chatcontainer from '../Chatcontainer/Chatcontainer';
import { io } from 'socket.io-client';
import axios from 'axios';

const Inputbox = ({ currrentchat, currrentuser }) => {
  const [inputText, setInputText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    if (currrentuser) {
      socket.current = io(host, { withCredentials: true });
      socket.current.emit("add-user", currrentuser._id);

      socket.current.on("msg-received", (msg) => {
        console.log("Message received:", msg); 
        if (msg.from === currrentchat._id) {
          setArrivalMessage({ fromSelf: false, message: msg.message });
        }
      });
    }
  }, [currrentuser, currrentchat]);

  useEffect(() => {
    async function getAllMessages() {
      if (currrentchat && currrentuser) {
        const response = await axios.post(getallmessage, {
          from: currrentuser._id,
          to: currrentchat._id,
        });
        setMessages(response.data);
      }
    }
    getAllMessages();
  }, [currrentchat, currrentuser]);

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const sendMessages = async (e) => {
    e.preventDefault();
    const message = {
      from: currrentuser._id,
      to: currrentchat._id,
      message: inputText,
    };

    await axios.post(sendmessage, message);
    socket.current.emit("send-msg", message);

    setMessages((prev) => [...prev, { fromSelf: true, message: inputText }]);
    setInputText('');
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  return (
    <>
      <Chatcontainer messages={messages} scrollRef={scrollRef} currrentuser={currrentuser} currrentchat={currrentchat}/>
      <div className="inputbox-container">
        <form action="" style={{ width: "100%" }} onSubmit={sendMessages} className='inputform'>
          <div className="inputbox">
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              placeholder="Type a message..."
            />
            <button className="emoji-button" type="button" onClick={toggleEmojiPicker}>
              😊
            </button>
            {showEmojiPicker && (
              <div className="emoji-picker">
                <Picker onEmojiClick={(e, emojiObject) => setInputText(prevText => prevText + emojiObject.emoji)} />
              </div>
            )}
            <button className="send-button" type="submit">
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Inputbox;
