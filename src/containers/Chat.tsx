import React, { useEffect, useState } from 'react';
import Messages from '../components/Messages/Messages';
import { MessageType } from '../types';

const url = 'http://146.185.154.90:8000/messages';

const Chat = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [dateTimeForLastMessages, setDateTimeForLastMessages] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      if (response.ok) {
        const newMessages = await response.json();
        setMessages(newMessages);

        setDateTimeForLastMessages(newMessages[newMessages.length - 1].datetime);
      }
    };
    void fetchData();
  }, []);

  useEffect(() => {
    const updateMessages = async () => {
      let fetchUrl = url;
      if (dateTimeForLastMessages) {
        const dateAsString = encodeURIComponent(dateTimeForLastMessages);
        fetchUrl = `${url}?datetime=${dateAsString}`;
      }
      const response = await fetch(fetchUrl);
      if (response.ok) {
        const newMessages = await response.json();
        if (newMessages.length > 0) {
          setMessages((prevMessages) => [...prevMessages, ...newMessages]);
          setDateTimeForLastMessages(newMessages[newMessages.length - 1].datetime);
        }
      }
    };

    const interval = setInterval(() => {
      // console.log('Interval');
      void updateMessages();
    }, 3000);

    return () => clearInterval(interval);
  }, [dateTimeForLastMessages]);

  return (
    <div className="row mt-4">
      <div className="col-md-12" style={{ borderTop: '2px solid linen' }}>
        <h3 className="mb-3 mt-3 ml-4">Chat:</h3>
        <Messages messages={messages} />
      </div>
    </div>
  );

};

export default Chat;
