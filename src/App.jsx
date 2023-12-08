import './App.module.css';
import { v4 as uuidv4 } from 'uuid';
import List from './Components/List';
import Create from './Components/Create';
import Messages from './Components/Messages';
import { useState, useEffect } from 'react';
import { readLS, storeLS, destroyLS, updateLS } from './Functions/ls';

function App() {
  const [accounts, setAccounts] = useState([]);
  const [messages, setMessages] = useState([]);
  const key = 'key';

  const handleNewAccount = (newAccount) => {
    const id = storeLS(key, newAccount);
    setAccounts((prevAccounts) => [...prevAccounts, { ...newAccount, id }]);
    addMessage('New client added successfully');
  };

  const handleDestroy = (id) => {
    destroyLS(key, id);
    setAccounts((prevAccounts) => prevAccounts.filter((account) => account.id !== id));
    addMessage('Client removed');
  };

  const updateAccount = (id, value, balanceChange) => {
    updateLS(key, id, value);
    setAccounts((prevAccounts) => prevAccounts.map((item) => (item.id === id ? { ...item, ...value, id } : item)));
    if (balanceChange > 0) {
      addMessage('Added to account');
    } else {
      addMessage('Deducted from account');
    }
  };

  useEffect(() => {
    setAccounts(readLS(key));
  }, []);

  const addMessage = (text) => {
    const id = uuidv4();
    setMessages((m) => [{ id, text }, ...m]);
    setTimeout(() => {
      setMessages((m) => m.filter((message) => message.id !== id));
    }, 2000);
  };

  const removeMessage = (id) => {
    setMessages((m) => m.filter((message) => message.id !== id));
  };

  return (
    <>
      <h1>Bank</h1>
      <Create onCreate={handleNewAccount} />
      <List accounts={accounts} onDestroy={handleDestroy} onUpdate={updateAccount} />
      <Messages messages={messages} removeMessage={removeMessage} />
    </>
  );
}

export default App;
