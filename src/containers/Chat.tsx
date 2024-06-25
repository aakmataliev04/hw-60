import React, {useEffect, useState} from 'react';
import Messages from '../components/Messages/Messages';
import {MessageType} from '../types';


const url = 'http://146.185.154.90:8000/messages';

const Chat = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      if (response.ok) {
        const newMessages = await response.json();
        setMessages(newMessages);
      }
    };
    void fetchData();
  }, []);

  return (
    <div className={'row mt-4'}>
      <div className="col-md-12" style={{borderTop: '2px solid linen'}}>
        <h3 className={'mb-3 mt-3 ml-4'}>Chat:</h3>
        <Messages messages={messages}/>
      </div>
    </div>
  );
};

export default Chat;