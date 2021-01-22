import styles from "./FavButton.module.css";

export default function FavButton({ fav, onClick }) {
  return (
    <img
      onClick={onClick}
      src={fav ? "/heart.svg" : "/heart-off.svg"}
      className={styles.like}
    />
  );
}
