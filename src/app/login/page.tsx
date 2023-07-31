"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import style from "@/sass/pages/login/style.module.sass";
import { SubmitHandler, useForm } from "react-hook-form";
import apiContact from "@/api/contact";
import { isAxiosError } from "axios";
import { useState } from "react";
import { ILogin, ILoginResponse } from "./interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "./schema";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({ resolver: zodResolver(loginSchema) });
  const router = useRouter();

  const login: SubmitHandler<ILogin> = async (data) => {
    try {
      const response = await apiContact.post<ILoginResponse>("login", data);
      const { token } = response.data;

      localStorage.setItem("token", token);

      router.push("/home");
    } catch (error) {
      if (isAxiosError(error)) {
        const message: string = error.response?.data.message;

        toast(message);
      }

      toast.error(
        "Desculpe, nosso servidor esta com problemas. Tente mais tarde!"
      );
    }
  };

  return (
    <>
      <Navbar />

      <main className={style.login}>
        <div className={style.container}>
          <div>
            <h2>Bem-vindo de volta!</h2>
            <small>Seus contatos sempre seguros e atualizados</small>
          </div>

          <form onSubmit={handleSubmit(login)}>
            <div>
              <AiOutlineUser />
              <input
                type="text"
                placeholder="Username ou email"
                {...register("credential")}
              />
            </div>
            {errors.credential && <small>{errors.credential.message}</small>}

            <div>
              <RiLockPasswordLine />
              <input
                type="password"
                placeholder="No minimo 8 caracteres"
                {...register("password")}
              />
            </div>
            {errors.password && <small>{errors.password.message}</small>}

            <button type="submit">Entrar</button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}
