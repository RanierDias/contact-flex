"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import style from "@/sass/pages/user/style.module.sass";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { BsPersonBadge } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import { IUser, IUserResponse } from "../register/interface";
import userSchema from "../register/schema";
import apiContact from "@/api/contact";
import jwtDecode from "jwt-decode";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface IToken {
  user: string;
  sub: string;
}

export default function User() {
  const token = localStorage.getItem("token");
  const { sub } = jwtDecode<IToken>(token!);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser>({
    resolver: zodResolver(userSchema),
  });

  const updateUser: SubmitHandler<IUser> = async (data) => {
    try {
      const { password, ...rest } = data;
      const payload = password.includes("hoje não hacker") ? rest : data;
      const userFound = await apiContact.patch<IUserResponse>(
        `users/${sub}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Usuário atualizado");
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.status === 401) {
          const messages: string[] = error.response?.data.message;

          messages.forEach((message) => toast.error(message));
        }
      }
    }
  };

  async function deleteUser() {
    try {
      const userDeleted = await apiContact.delete("users");

      toast.success("Usuário deletado");
      localStorage.clear();
      router.push("/");
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.status === 404) {
          const message: string = error.response?.data.message;

          toast.error(message);
        }
      }
    }
  }

  useEffect(() => {
    async function getUser() {
      try {
        const userFound = await apiContact.get<IUserResponse>(`users/${sub}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { username, email, fullname, phone } = userFound.data;

        reset({
          username,
          email,
          fullname,
          phone,
          password: "hoje não hacker!",
        });
      } catch (error) {
        if (isAxiosError(error)) {
          if (error.status === 404) {
            const message: string = error.response?.data.message;

            toast.error(message);
          }
        }
      }
    }

    getUser();
  }, []);

  return (
    <>
      <Navbar />

      <main className={style.user}>
        <div className={style.container}>
          <h2>Editar Usuário</h2>

          <form onSubmit={handleSubmit(updateUser)}>
            <div>
              <AiOutlineUser />
              <input
                type="text"
                placeholder="Username"
                {...register("username")}
              />
            </div>
            {errors.username && <small>{errors.username.message}</small>}

            <div>
              <BsPersonBadge />
              <input
                type="text"
                placeholder="Nome completo"
                {...register("fullname")}
              />
            </div>
            {errors.fullname && <small>{errors.fullname.message}</small>}

            <div>
              <AiOutlineMail />
              <input
                type="text"
                placeholder="example@mail.cm"
                {...register("email")}
              />
            </div>
            {errors.email && <small>{errors.email.message}</small>}

            <div>
              <AiOutlinePhone />
              <input
                type="text"
                placeholder="(DD) xxxx-xxxx"
                {...register("phone")}
              />
            </div>
            {errors.phone && <small>{errors.phone.message}</small>}

            <div>
              <RiLockPasswordLine />
              <input
                type="password"
                placeholder="No minimo 8 caracteres"
                {...register("password")}
              />
            </div>
            {errors.password && <small>{errors.password.message}</small>}

            <div>
              <button type="button" onSubmit={() => deleteUser()}>
                Deletar
              </button>
              <button type="submit">Atualizar</button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}
