import styles from '../App.module.css';
export default function Messages({ messages, removeMessage }) {
  if (messages.length === 0) {
    return null;
  }

  return (
    <div className={styles.messagesContainer}>
      {messages.map((message) => (
        <div className={styles.messages} key={message.id}>
          <div>{message.text}</div>
          <button className={styles.btnTurnOff} onClick={() => removeMessage(message.id)}>
            x
          </button>
        </div>
      ))}
    </div>
  );
}
