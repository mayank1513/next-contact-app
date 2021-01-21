import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styles from "./ContactList.module.css";

export default function ContactListItem({
  contact,
  onChangeLike,
  onItemClick,
}) {
  const router = useRouter();
  const ref = useRef();
  const [animClass, setAnimClass] = useState("");

  const foo = () => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setAnimClass(
      rect.top >= 0 && rect.bottom <= window.innerHeight ? styles.animClass : ""
    );
  };
  useEffect(() => {
    foo();
    window.addEventListener("scroll", foo);
    window.addEventListener("resize", foo);
  }, []);
  return (
    <div
      ref={ref}
      onClick={onItemClick}
      className={styles.listItem + " " + animClass}
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
  );
}