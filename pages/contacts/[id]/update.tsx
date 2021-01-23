import UpdateContact from "../../../components/UpdateContact";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getContact } from "../../../util/contacts";
import { ContactInterface } from "../../../util/custom-types";

export default () => {
  const router = useRouter();
  const { id } = router.query;
  const [contact, setContact] = useState<ContactInterface>();
  useEffect(() => {
    getContact(+id).then((ct) => setContact(ct));
  }, [id]);

  return (
    <main className="main">
      {contact && <UpdateContact contact={contact} />}
    </main>
  );
};
