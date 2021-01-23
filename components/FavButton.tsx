import { useEffect, useState } from "react";
import styles from "./FavButton.module.css";
import PropTypes from "prop-types";

FavButton.PropTypes = {
  fav: PropTypes.bool,
  onClick: PropTypes.func,
};

export default function FavButton({ fav, onClick }) {
  const [animClass, setAnimClass] = useState<string>("");
  useEffect(() => {
    setAnimClass(styles.anim);
    setTimeout(() => setAnimClass(""), 1000);
  }, [fav]);

  return (
    <img
      onClick={onClick}
      src={fav ? "/heart.svg" : "/heart-off.svg"}
      className={styles.like + " " + animClass}
    />
  );
}
