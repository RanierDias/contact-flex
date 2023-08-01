"use client";
import apiContact from "@/api/contact";
import IContact from "@/app/home/interfaces";
import style from "@/sass/components/contactCard/style.module.sass";
import { isAxiosError } from "axios";
import { AiFillPhone, AiFillMail } from "react-icons/ai";
import { BsFillTelephoneXFill } from "react-icons/bs";
import { toast } from "react-toastify";

interface IProps {
  contact: IContact;
  listContact: IContact[];
  setListContact: (contacts: IContact[]) => void;
}

export default function ContactCard({
  contact,
  listContact,
  setListContact,
}: IProps) {
  const phoneFormated =
    contact.phone.length == 10
      ? contact.phone.replace(/^(\d\d)(\d{4})(\d{4}).*/, "($1) 9$2-$3")
      : contact.phone.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");

  async function deleteContact() {
    try {
      const token = localStorage.getItem("token");
      await apiContact.delete(`contacts/${contact.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const newListContact = listContact.filter(
        (contactOfList) => contactOfList.id != contact.id
      );

      setListContact(newListContact);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.status === 404) {
          const message: string = error.response?.data.message;

          toast.error(message);
        }

        if (error.status === undefined) {
          toast.error(
            "Desculpe, nosso servidor esta com problemas. Tente mais tarde!"
          );
        }
      }
    }
  }

  return (
    <li className={style.card}>
      <h3>{contact.fullname}</h3>
      <div>
        <div>
          <AiFillPhone />
          <p>{phoneFormated}</p>
        </div>
        {contact.email && (
          <div>
            <AiFillMail />
            <p>{contact.email}</p>
          </div>
        )}

        <button onClick={() => deleteContact()}>
          <BsFillTelephoneXFill />
        </button>
      </div>
    </li>
  );
}
