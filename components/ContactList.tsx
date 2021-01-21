import styles from "./ContactList.module.css";
function ContactList({ contacts, onChangeLike, onItemClick }) {
  return contacts.map((contact) => (
    <div
      key={contact.id}
      className={styles.listItem}
      onClick={() => onItemClick(contact.id)}
    >
      <img src="/person.svg" className={"logo"} />
      <div className={styles.contactDetails}>
        <p>{contact.name}</p>
        <small className={styles.onHover}>{contact.email}</small>
      </div>
      <img
        onClick={() => onChangeLike(contact.id)}
        src={contact.favorite ? "/heart.svg" : "/heart-off.svg"}
        className={styles.like}
      />
      {/* <img src="/cancel.svg" className={"logo" + " " + styles.btn} /> */}
    </div>
  ));
}

export default ContactList;
