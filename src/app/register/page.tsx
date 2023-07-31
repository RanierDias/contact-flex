"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import style from "@/sass/pages/register/style.module.sass";
import { SubmitHandler, useForm } from "react-hook-form";
import { IRegister, IRegisterResponse } from "./interface";
import { zodResolver } from "@hookform/resolvers/zod";
import registerSchema from "./schema";
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
  } = useForm<IRegister>({ resolver: zodResolver(registerSchema) });
  const router = useRouter();

  const registerUser: SubmitHandler<IRegister> = async (data) => {
    try {
      const user = await apiContact.post<IRegisterResponse>("users", data);
      const login = await apiContact.post<ILoginResponse>("login", {
        credential: user.data.username,
        password: data.password,
      });

      localStorage.setItem("token", login.data.token);

      router.push("/home");
    } catch (error) {
      if (isAxiosError(error)) {
        const message: string = error.response?.data.message;

        toast.error(message);
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
              <AiOutlineUser />
              <input
                type="text"
                placeholder="Nome completo"
                {...register("fullname")}
              />
            </div>
            {errors.fullname && <small>{errors.fullname.message}</small>}

            <div>
              <AiOutlineUser />
              <input
                type="text"
                placeholder="example@mail.cm"
                {...register("email")}
              />
            </div>
            {errors.email && <small>{errors.email.message}</small>}

            <div>
              <AiOutlineUser />
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
