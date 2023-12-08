import styles from '../App.module.css';

export default function Create({ onCreate }) {
  const add = (e) => {
    e.preventDefault();
    const newAccount = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      accountBalance: 0,
    };

    onCreate(newAccount);
    e.target.reset();
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.clientBox}>
          <div className={styles.newClient}>
            <h2>Add new client</h2>
          </div>
          <form onSubmit={add}>
            <div>
              <label>First Name </label>
              <input type="text" name="firstName" required></input>
            </div>
            <div>
              <label>Last Name </label>
              <input type="text" name="lastName" required></input>
            </div>
            <button type="submit">Add new client</button>
          </form>
        </div>
      </div>
    </>
  );
}
