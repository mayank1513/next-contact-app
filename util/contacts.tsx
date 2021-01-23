import { ContactInterface } from "./custom-types";
const getCtx = (): Array<ContactInterface> => {
  if (localStorage.contacts) return JSON.parse(localStorage.contacts);
  return [
    {
      id: 1,
      name: "Sangwon PARK",
      email: "abcxyz@favoritemedium.com",
      favorite: true,
      phone: "",
    },
    {
      id: 2,
      name: "Slava Olenin",
      email: "xyzabc@favoritemedium.com",
      favorite: true,
      phone: "",
    },
    {
      id: 3,
      name: "Mayank Chaudhari",
      email: "mayank.srmu@gmail.com",
      favorite: true,
      phone: "",
    },
  ];
};

export const getContacts = (): Promise<Array<ContactInterface>> =>
  new Promise((resolve, reject) => resolve(getCtx()));

export const getContact = (id: number): Promise<ContactInterface> => {
  const c = getCtx().filter((it) => it.id == id);
  return new Promise((resolve, reject) =>
    c.length ? resolve(c[0]) : reject("Contact Not Found")
  );
};

export const createContact = (body: any) => {
  const c = getCtx();
  const l = c.length;
  const id = (l == 0 ? 0 : c[l - 1].id) + 1;
  const contact = {
    ...body,
    id,
  };
  localStorage.contacts = JSON.stringify(c.concat([contact]));
  return new Promise((resolve, reject) => resolve(true));
};

export const updateContact = (
  contact: ContactInterface
): Promise<Array<ContactInterface>> => {
  const c = getCtx().map((it) => (it.id == contact.id ? contact : it));
  localStorage.contacts = JSON.stringify(c);
  return new Promise((resolve, reject) => resolve(c));
};

export const removeContact = (id: number) => {
  localStorage.contacts = JSON.stringify(getCtx().filter((it) => it.id != id));
  new Promise((resolve, reject) => resolve(true));
};
