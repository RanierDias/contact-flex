"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { BsPersonBadge } from "react-icons/bs";
import style from "@/sass/pages/register/style.module.sass";
import { SubmitHandler, useForm } from "react-hook-form";
import { IUser, IUserResponse } from "./interface";
import { zodResolver } from "@hookform/resolvers/zod";
import userSchema from "./schema";
import apiContact from "@/api/contact";
import { useRouter } from "next/navigation";
import { ILoginResponse } from "../login/interfaces";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export default function () {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({ resolver: zodResolver(userSchema) });
  const router = useRouter();

  const registerUser: SubmitHandler<IUser> = async (data) => {
    try {
      const user = await apiContact.post<IUserResponse>("users", data);
      const login = await apiContact.post<ILoginResponse>("login", {
        credential: user.data.username,
        password: data.password,
      });

      localStorage.setItem("token", login.data.token);

      router.push("/home");
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.status === 400) {
          const messages: string[] = error.response?.data.message;

          messages.forEach((message) => toast.error(message));
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
      <Navbar />

      <main className={style.login}>
        <div className={style.container}>
          <div>
            <h2>Cadastro de usuário</h2>
            <small>Seus contatos sempre seguros e atualizados</small>
          </div>

          <form onSubmit={handleSubmit(registerUser)}>
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

            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}
