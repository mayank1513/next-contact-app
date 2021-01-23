import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useEffect, useRef, useState, RefObject } from "react";
import { TypeContact } from "../util/custom-types";
import styles from "./ContactList.module.css";
import FavButton from "./FavButton";

function ContactListItem({ contact, onChangeLike, onItemClick }) {
  const router = useRouter();
  const ref = useRef() as RefObject<HTMLDivElement>;
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
      <FavButton
        fav={contact.favorite}
        onClick={(e) => {
          onChangeLike(contact);
          e.stopPropagation();
        }}
      />
      {/* <img src="/cancel.svg" className={"logo" + " " + styles.btn} /> */}
    </div>
  );
}

ContactListItem.PropTypes = {
  contact: PropTypes.shape(TypeContact),
  onChangeLike: PropTypes.string,
  onItemClick: PropTypes.func,
};
export default ContactListItem;
