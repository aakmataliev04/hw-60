import React from 'react';
import {MessageType} from '../../types';

interface Props {
  message: MessageType
}
const Message: React.FC<Props> = ({message}) => {
  const formatDatetime = (datetime) => {
    return new Date(datetime).toLocaleString();
  };
  return (
    <li className={'list-group-item'}>
      <b>{message.author}</b> ({formatDatetime(message.datetime)}): <span style={{background: 'antiquewhite', padding: '2px 10px', marginLeft: '20px'}}>{message.message}</span>
    </li>
  );
};

export default Message;