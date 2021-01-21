import Head from "next/head";
import { useEffect, useState } from "react";
import ContactList from "../components/ContactList.tsx";
import ErrorBoundary from "../components/ErrorBoundary.tsx";
import styles from "../styles/Home.module.css";
import { getContacts } from "../util/contacts";

export default function Home() {
  const [contacts, setContact] = useState([]);
  useEffect(() => {
    getContacts().then((c: any) => setContact(c));
  }, []);
  let onChangeLike = (id) => {};
  return (
    <div>
      <Head>
        <title>Contacts App | Favorite Medium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <ErrorBoundary>
          <ContactList contacts={contacts} onChangeLike={onChangeLike} />
        </ErrorBoundary>
      </main>
    </div>
  );
}
