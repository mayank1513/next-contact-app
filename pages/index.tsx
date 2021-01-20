import Head from "next/head";
import ContactList from "../components/ContactList.tsx";
import styles from "../styles/Home.module.css";

export default function Home() {
  let contacts = [
    {
      name: "Mayank Chaudhari",
      email: "mayank.srmu@gmail.com",
      phone: "+91 8127987043",
    },
    {
      name: "Sangwon Park",
      email: "abc@favoritemedium.com",
    },
    {
      name: "Slava Olenin",
      email: "xyz@favoritemedium.com",
    },
  ];
  return (
    <div className={styles.container}>
      <Head>
        <title>Contacts App | Favorite Medium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ContactList contacts={contacts} />
      </main>
    </div>
  );
}
