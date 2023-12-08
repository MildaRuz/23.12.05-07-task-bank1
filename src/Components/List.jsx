import styles from '../App.module.css';
import Account from './Account';

export default function List({ accounts, onDestroy, onUpdate }) {
  const sortedAccounts = accounts.sort((a, b) => a.lastName.localeCompare(b.lastName));
  return (
    <div className={styles.container}>
      <div className={styles.listBox}>
        <h2>Clients List</h2>
        <div className={styles.list}></div>
        {sortedAccounts.map((account) => {
          return <Account key={account.id} account={account} onDestroy={onDestroy} onUpdate={onUpdate} />;
        })}
      </div>
    </div>
  );
}
