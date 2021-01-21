import Link from "next/link";
import { useEffect, useState } from "react";
import { getContact, removeContact } from "../util/contacts";
import styles from "./DisplayContact.module.css";

export default function DisplayContact({ id }) {
  const [contact, setContact] = useState();
  useEffect(() => {
    getContact(id)
      .then((it) => setContact(it))
      .catch((err) => console.error(err));
  }, [id]);
  return (
    <div>
      <header>
        <Link href="/">
          <a>
            <img src="/arrow-back.svg" className="logo" />
          </a>
        </Link>
        <span className="spacer"></span>
        <img src={"/heart-off.svg"} className={"logo "} />
      </header>
      {contact && (
        <div className={styles.container}>
          <img src="/person.svg" className={styles.avatar} />
          <h1>{contact.name}</h1>
          <p>{contact.email}</p>
          {contact.phone && <p>contact.phone</p>}
          <div className={styles.btns}>
            <Link href={`/contacts/${contact.id}/update`}>
              <a>
                <button>Edit Contact</button>
              </a>
            </Link>
            <button onClick={() => removeContact(contact.id)}>
              Remove Contact
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
