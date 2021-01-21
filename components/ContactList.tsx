import { useRouter } from "next/router";
import styles from "./ContactList.module.css";

function ContactList({ contacts, onChangeLike }) {
  const router = useRouter();
  return contacts.map((contact) => (
    <div
      key={contact.id}
      onClick={() => router.push(`/contacts/${contact.id}`)}
      className={styles.listItem}
    >
      <img src="/person.svg" className={"logo"} />
      <div className={styles.contactDetails}>
        <p>{contact.name}</p>
        <small className={styles.onHover}>{contact.email}</small>
      </div>
      <img
        onClick={(e) => {
          onChangeLike(contact);
          e.stopPropagation();
        }}
        src={contact.favorite ? "/heart.svg" : "/heart-off.svg"}
        className={styles.like}
      />
      {/* <img src="/cancel.svg" className={"logo" + " " + styles.btn} /> */}
    </div>
  ));
}

export default ContactList;
