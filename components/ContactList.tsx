function ContactList({ contacts }) {
  return contacts.map((contact) => <div>{contact.name}</div>);
}

export default ContactList;
