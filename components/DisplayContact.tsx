import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getContact, removeContact, updateContact } from "../util/contacts";
import styles from "./DisplayContact.module.css";

export default function DisplayContact({ id }) {
  const [contact, setContact] = useState();
  useEffect(() => {
    getContact(id)
      .then((it) => setContact(it))
      .catch((err) => console.error(err));
  }, [id]);
  const router = useRouter();
  return (
    <div>
      <header>
        <Link href="/">
          <a>
            <img src="/arrow-back.svg" className="logo" />
          </a>
        </Link>
        <span className="spacer"></span>
        <img
          onClick={() => {
            const newContact = { ...contact, favorite: !contact.favorite };
            updateContact(newContact).then(() => {
              setContact(newContact);
            });
          }}
          src={contact && contact.favorite ? "/heart.svg" : "/heart-off.svg"}
          className={"logo " + styles.like}
        />
      </header>
      {contact && (
        <div className={styles.container}>
          <img src="/person.svg" className={styles.avatar} />
          <h1>{contact.name}</h1>
          <p>
            <a href={"mailto:" + contact.email}>{contact.email}</a>
          </p>
          {contact.phone && <p>{contact.phone}</p>}
          <div className={styles.btns}>
            <Link href={`/contacts/${contact.id}/update`}>
              <a>
                <button>Edit Contact</button>
              </a>
            </Link>
            <button
              onClick={() => {
                removeContact(contact.id);
                router.push("/");
              }}
            >
              Remove Contact
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
