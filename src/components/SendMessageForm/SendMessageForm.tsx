import React from 'react';
import {FormData} from '../../types';

interface Props {
  formData: FormData
  onChangeFormData: (event) => void
  onSubmitForm: (event: React.FormEvent<HTMLFormElement>, formData: FormData) => void
}
const SendMessageForm: React.FC<Props> = ({formData, onChangeFormData, onSubmitForm}) => {
  return (
    <div className="row">
      <div className="col-md-8 mx-auto">
        <form onSubmit={(event) => onSubmitForm(event, formData)} className="row d-flex flex-column" id="send-form">
          <div className="mb-3">
            <label htmlFor="authorField" className="form-label">Name</label>
            <input
              type="text"
              name={'author'}
              value={formData.author}
              onChange={onChangeFormData}
              className="form-control"
              id="authorField" />
          </div>
          <div className="mb-3">
            <label htmlFor="messageField" className="form-label">Message</label>
            <input
              type="text"
              name={'message'}
              value={formData.message}
              onChange={onChangeFormData}
              className="form-control"
              id="messageField" />
          </div>
          <button type="submit" className="btn btn-block" id="sendMessageBtn" style={{background: '#d2d26f'}}>Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default SendMessageForm;