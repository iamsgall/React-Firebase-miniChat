import React, {useEffect, useState} from 'react';

export default function ChatRoom() {
  const [messages, setMessages] = useState({
    id: '',
    text: '',
    arrayMessages: [],
  });

  useEffect(() => {
    window.firebase
      .database()
      .ref('messages/')
      .on('value', snapshot => {
        const currentMessages = snapshot.val();
        if (currentMessages !== null) {
          setMessages({
            ...messages,
            arrayMessages: (messages.arrayMessages = currentMessages),
          });
          console.log(currentMessages);
          console.log(messages.arrayMessages);
        }
      });
  }, []);

  const handleSubmit = e => {
    const newMessage = {
      id: messages.arrayMessages.length,
      text: messages.text,
    };
    window.firebase
      .database()
      .ref(`messages/${newMessage.id}`)
      .set({id: newMessage.id, text: newMessage.text});
    setMessages({
      ...messages,
      //   arrayMessages: [...messages.arrayMessages, newMessage],
      text: '',
    });

    // e.preventDefault();
  };

  const handleChange = e => {
    setMessages({
      ...messages,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <h2>Mini Chat with Firebase</h2>
      <ul>
        {messages.arrayMessages
          ? messages.arrayMessages.map(message => (
              <li key={message.id}>{message.text}</li>
            ))
          : null}
      </ul>
      <form onSubmit={handleSubmit}>
        <label htmlFor='inputChatId'></label>
        <input
          type='text'
          name='text'
          value={messages.text}
          onChange={handleChange}
          id='inputChatId'
        />
        <input type='submit' value='Send' />
      </form>
    </>
  );
}
