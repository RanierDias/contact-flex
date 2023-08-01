"use client";
import apiContact from "@/api/contact";
import IContact, { ICreateContact } from "@/app/home/interfaces";
import style from "@/sass/components/contactCard/style.module.sass";
import { isAxiosError } from "axios";
import jwtDecode from "jwt-decode";
import {
  AiFillPhone,
  AiFillMail,
  AiOutlineUser,
  AiOutlineMail,
} from "react-icons/ai";
import { BsFillTelephoneXFill, BsPenFill, BsTelephone } from "react-icons/bs";
import { toast } from "react-toastify";
import ModalContainer from "../modal";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import contactSchema from "@/app/home/schema";

interface IProps {
  contact: IContact;
  listContact: IContact[];
  setListContact: (contacts: IContact[]) => void;
}

interface IToken {
  user: string;
  sub: string;
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
  const token = localStorage.getItem("token");
  const { sub } = jwtDecode<IToken>(token!);
  const [openModal, setOpenModal] = useState(false);
  const [update, setUpdate] = useState<IContact>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICreateContact>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullname: contact.fullname,
      phone: contact.phone,
      email: contact.email || "example@mail.com",
    },
  });

  async function deleteContact() {
    try {
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

  const updateContact: SubmitHandler<ICreateContact> = async (data) => {
    try {
      const { fullname, phone, email } = data;
      const payload = email?.includes("example@")
        ? { fullname, phone }
        : { ...data };
      const contactUpdate = await apiContact.patch<IContact>(
        `contacts/${contact.id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUpdate(contactUpdate.data);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.status === 400) {
          const messages: string[] = error.response?.data.message;

          messages.forEach((message) => toast.error(message));
        }

        if (error.status === 401) {
          toast.error(error.response?.data.meesage);
        }

        if (error.status === 501) {
          toast.error(
            "Desculpe, nosso servidor esta com problemas. Tente mais tarde!"
          );
        }
      }
    }
  };

  return (
    <>
      <li className={style.card}>
        <h3>{update?.fullname || contact.fullname}</h3>
        <div>
          <div>
            <AiFillPhone />
            <p>{phoneFormated}</p>
          </div>
          {contact.email && (
            <div>
              <AiFillMail />
              <p>{update?.email || contact.email}</p>
            </div>
          )}

          <div>
            <button onClick={() => deleteContact()}>
              <BsFillTelephoneXFill />
            </button>

            {contact.createdBy === Number(sub) && (
              <button onClick={() => setOpenModal(!openModal)}>
                <BsPenFill />
              </button>
            )}
          </div>
        </div>
      </li>
      {openModal && (
        <ModalContainer>
          <h3 className={style.title_modal}>Atualizar contato</h3>
          <form
            className={style.form_modal}
            onSubmit={handleSubmit(updateContact)}
          >
            <div>
              <AiOutlineUser />
              <input
                type="text"
                placeholder="Nome completo"
                {...register("fullname")}
              />
            </div>
            {errors.fullname && <small>{errors.fullname.message}</small>}

            <div>
              <BsTelephone />
              <input
                type="text"
                placeholder="(DD) xxxx-xxxx"
                {...register("phone")}
              />
            </div>
            {errors.phone && <small>{errors.phone.message}</small>}

            <div>
              <AiOutlineMail />
              <input
                type="email"
                placeholder="example@mail.com"
                {...register("email")}
              />
            </div>

            {errors.email && <small>{errors.email.message}</small>}

            <div>
              <button onClick={() => setOpenModal(false)}>Fechar</button>
              <button type="submit">Atualizar</button>
            </div>
          </form>
        </ModalContainer>
      )}
    </>
  );
}
