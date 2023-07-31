"use client";
import ContactCard from "@/components/contactCard";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import style from "@/sass/pages/home/style.module.sass";
import { IoSearchOutline } from "react-icons/io5";
import { BsFillTelephonePlusFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import apiContact from "@/api/contact";
import { isAxiosError } from "axios";
import IContactResponse, { ICreateContact } from "./interfaces";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsTelephone } from "react-icons/bs";
import createContactSchema from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Home() {
  const [contactList, setContactList] = useState<IContactResponse[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [emailField, setEmailField] = useState(false);
  const [search, setSearch] = useState<IContactResponse[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateContact>({ resolver: zodResolver(createContactSchema) });

  const createContact: SubmitHandler<ICreateContact> = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const contactCreated = await apiContact.post<IContactResponse>(
        "contacts",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      contactList
        ? setContactList([...contactList, contactCreated.data])
        : setContactList([contactCreated.data]);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.status);
      }
    }
  };

  function searchContact(data: string) {
    const searchFormated = data.toLowerCase();
    const contactsFound = contactList.filter((contact) =>
      contact.fullname.toLowerCase().includes(searchFormated)
    );

    setSearch(contactsFound);
  }

  useEffect(() => {
    async function getContacts(): Promise<void> {
      try {
        const token = localStorage.getItem("token");
        const contacts = await apiContact.get<IContactResponse[]>("contacts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setContactList(contacts.data);
      } catch (error) {
        if (isAxiosError(error)) {
          console.log(error.status);
        }
      }
    }

    getContacts();
  }, [contactList]);

  return (
    <>
      <Navbar />

      <main className={style.home}>
        <div className={style.container}>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              onChange={(element) => searchContact(element.target.value)}
              placeholder="Pesquisar pelo nome..."
              name="search"
            />
            <button type="submit">
              <IoSearchOutline />
            </button>
          </form>

          <section>
            <ul>
              {contactList.length > 0 &&
                search.length == 0 &&
                contactList.map((contact) => (
                  <ContactCard
                    contact={contact}
                    setListContact={setContactList}
                    listContact={contactList}
                    key={contact.id}
                  />
                ))}

              {search.length > 0 &&
                search.map((contact) => (
                  <ContactCard
                    contact={contact}
                    setListContact={setContactList}
                    listContact={contactList}
                    key={contact.id}
                  />
                ))}

              {search.length == 0 && contactList.length == 0 ? (
                <li>Sem contatos por hoje</li>
              ) : null}
            </ul>

            <button onClick={() => setOpenModal(true)}>
              <BsFillTelephonePlusFill />
            </button>
          </section>
        </div>
      </main>

      {openModal && (
        <section className={style.modal}>
          <div>
            <h3>Adcionar contato</h3>
            <form onSubmit={handleSubmit(createContact)}>
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

              <button onClick={() => setEmailField(!emailField)}>
                <AiOutlineMail />
              </button>

              {emailField && (
                <>
                  <div>
                    <AiOutlineMail />
                    <input
                      type="email"
                      placeholder="example@mail.com"
                      {...register("email")}
                    />
                  </div>

                  {errors.email && <small>{errors.email.message}</small>}
                </>
              )}

              <div>
                <button onClick={() => setOpenModal(false)}>Cancelar</button>
                <button type="submit">Criar</button>
              </div>
            </form>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
