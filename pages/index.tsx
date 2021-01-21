import Head from "next/head";
import ContactList from "../components/ContactList.tsx";
import styles from "../styles/Home.module.css";

export default function Home() {
  let contacts = [
    {
      id: 0,
      name: "Mayank Chaudhari",
      email: "mayank.srmu@gmail.com",
      phone: "+91 8127987043",
      favorite: false,
    },
    {
      id: 1,
      name: "Sangwon Park",
      email: "abc@favoritemedium.com",
      favorite: true,
    },
    {
      id: 2,
      name: "Slava Olenin",
      email: "xyz@favoritemedium.com",
      favorite: true,
    },
  ];
  let onChangeLike = (id) => {};
  let onItemClick = (id) => {};
  return (
    <div>
      <Head>
        <title>Contacts App | Favorite Medium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ContactList
          contacts={contacts}
          onChangeLike={onChangeLike}
          onItemClick={onItemClick}
        />
      </main>
    </div>
  );
}
