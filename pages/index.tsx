import Head from "next/head";
import Link from "next/link";
import { useEffect, useState, useReducer, useRef } from "react";
import ContactList from "../components/ContactList.tsx";
import ErrorBoundary from "../components/ErrorBoundary.tsx";
import styles from "../styles/Home.module.css";
import { getContacts } from "../util/contacts";
import { updateContact } from "../util/contacts";

export default function Home() {
  const actionContactsChange = "contacts";
  const actionSearchChange = "search";
  const actionFavOnlyChange = "fav";
  const ref = useRef();

  const [searchState, dispatch] = useReducer(
    (state, action) => {
      let search = state.search;
      let favOnly = state.favOnly;
      let contacts = state.contacts;
      switch (action.type) {
        case actionSearchChange:
          search = action.value;
          break;
        case actionFavOnlyChange:
          favOnly = action.value;
          break;
        case actionContactsChange:
          contacts = action.value;
      }
      const filteredContacts = contacts.filter((it) => {
        return (
          (!favOnly || it.favorite) &&
          (it.name.includes(search) ||
            it.email.includes(search) ||
            it.phone.includes(search))
        );
      });
      return { contacts, favOnly, search, filteredContacts };
    },
    {
      contacts: [],
      favOnly: false,
      search: "",
      filteredContacts: [],
    }
  );

  useEffect(() => {
    getContacts().then((c: any) => {
      dispatch({ type: actionContactsChange, value: c });
    });
  }, []);
  let onChangeLike = (contact) => {
    const newContact = { ...contact, favorite: !contact.favorite };
    updateContact(newContact).then((c) => {
      dispatch({ type: actionContactsChange, value: c });
    });
  };
  return (
    <div>
      <Head>
        <title>Contacts App | Favorite Medium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <img
          src="/search.svg"
          onClick={() => {
            ref.current.focus();
          }}
          className="logo"
        />
        <label className={styles.searchBox}>
          <input
            ref={ref}
            type="text"
            placeholder="start typing name or email"
            value={searchState.search}
            onChange={(e) =>
              dispatch({ type: actionSearchChange, value: e.target.value })
            }
          ></input>
          <span
            onClick={() =>
              dispatch({
                type: actionFavOnlyChange,
                value: !searchState.favOnly,
              })
            }
            className={
              styles.searchBoxOverlay +
              " " +
              (searchState.favOnly ? styles.favOnly : "")
            }
          >
            {searchState.favOnly ? "Only Favorite" : "All"}
          </span>
        </label>
        <Link href="/create">
          <img src="/person-add.svg" className="logo" />
        </Link>
      </header>
      <main className="main">
        <ErrorBoundary>
          <ContactList
            contacts={searchState.filteredContacts}
            onChangeLike={onChangeLike}
          />
        </ErrorBoundary>
      </main>
    </div>
  );
}
