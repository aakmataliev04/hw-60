import React, {useEffect, useState} from 'react';
import Messages from '../components/Messages/Messages';
import {MessageType} from '../types';
import SendMessageForm from '../components/SendMessageForm/SendMessageForm';

const url = 'http://146.185.154.90:8000/messages';

const Chat = () => {
  const [formData, setFormData] = useState({author: '', message: ''});
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

  const changeFormData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => {
      return {...prevState, [event.target.name]: event.target.value};
    });
  };
  const sendMessage = async (event: React.FormEvent<HTMLFormElement>, formData) => {
    event.preventDefault();
    const body = new URLSearchParams();
    body.append('author', formData.author);
    body.append('message', formData.message);

    await fetch('http://146.185.154.90:8000/messages', {
      method: 'POST',
      body,
    });
  };

  return (
    <>
      <SendMessageForm
        formData={formData}
        onChangeFormData={(event) => changeFormData(event)}
        onSubmitForm={sendMessage}
      />
      <Messages messages={messages}/>
    </>
  );

};

export default Chat;
