import styles from '../App.module.css';
import { useState } from 'react';

export default function Account({ account, onDestroy, onUpdate }) {
  const [amount, setAmount] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const showDelModal = () => {
    setShowDeleteModal(true);
  };

  const removeClient = () => {
    onDestroy(account.id);
  };

  const addToAccount = (balanceChange) => {
    if (balanceChange === '' || balanceChange === 0) {
      return;
    }
    const accBalanceObj = { accountBalance: +account.accountBalance + balanceChange };
    onUpdate(account.id, accBalanceObj, balanceChange);
    setAmount('');
  };

  return (
    <>
      <div className={styles.list}>
        <div className={styles.fieldLength}>{account.firstName}</div>
        <div className={styles.fieldLength}>{account.lastName}</div>
        <div className={styles.fieldLength}>{account.accountBalance} €</div>
        <button className={styles.btnRemove} onClick={showDelModal}>
          Remove client
        </button>
        <div>
          <input
            onChange={(e) => setAmount(+e.target.value)}
            className={styles.balanceInput}
            value={amount}
            name="accBalance"
            type="number"
          ></input>
          <button className={styles.btnAdd} onClick={() => addToAccount(amount)}>
            Add to account
          </button>
          <button className={styles.btnDeduct} onClick={() => addToAccount(-amount)}>
            Deduct from account
          </button>
        </div>
      </div>

      {showDeleteModal ? (
        <div className={styles.modalContainer}>
          <div className={styles.modal}>
            <p>
              Are you sure you want to delete{' '}
              <b>
                {account.firstName} {account.lastName}
              </b>{' '}
              account?
            </p>
            <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
            <button className={styles.btnRemove} onClick={() => removeClient()}>
              Remove
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
