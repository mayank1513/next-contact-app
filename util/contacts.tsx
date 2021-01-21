export const getContacts = () => localStorage.contacts || [];

export const getContact = (id: Number | String) => {
  const c = getContacts().filter((it) => it.id == id);
  return c.length ? c[0] : null;
};

export const createContact = (body) => {
  const c = getContacts();
  const l = c.length;
  const id = (l == 0 ? 0 : c[l - 1].id) + 1;
  const contact = {
    ...body,
    id,
  };
  localStorage.contacts = c.concat([contact]);
  return localStorage.contacts;
};
