import React from 'react';
import {MessageType} from '../../types';
import Message from './Message';

interface Props {
  messages: MessageType[]
}

const Messages: React.FC<Props> = ({messages}) => {
  return (
    <div className="row mt-4">
      <div className="col-md-12" style={{borderTop: '2px solid linen'}}>
        <h3 className="mb-3 mt-3 ml-4">Chat:</h3>
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
      </div>
    </div>
  );
};

export default Messages;