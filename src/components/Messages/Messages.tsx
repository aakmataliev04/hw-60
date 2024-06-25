import React from 'react';
import {MessageType} from '../../types';
import Message from './Message';

interface Props {
  messages: MessageType[]
}
const Messages: React.FC<Props> = ({messages}) => {
  return (
    <ul className={'list-group w-100'}>
      <li className="list-group-item text-white message-item" style={{background: '#d2d26f'}}>Last Messages</li>
      {
        messages.map((message) => {
          return (
            <Message key={message._id} message={message}/>
          );
        })
      }
    </ul>
  );
};

export default Messages;