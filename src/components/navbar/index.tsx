"use client";
import Link from "next/link";
import style from "@/sass/components/navbar/style.module.sass";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathRouter = usePathname();
  const router = useRouter();

  function logout() {
    router.push("/");
    localStorage.clear();
  }

  return (
    <header className={style.navbar}>
      <div className={style.container}>
        <h1>
          Contact
          <div>
            <span>Flex</span>
          </div>
        </h1>

        <nav>
          {pathRouter == "/home" && (
            <>
              <button onClick={() => logout()}>Logout</button>
              <Link href="/user">Perfil</Link>
            </>
          )}
          {pathRouter == "/" && (
            <>
              <Link href="/login">Entrar</Link>
              <Link href="/register">Cadastrar</Link>
            </>
          )}
          {pathRouter == "/login" && (
            <>
              <Link href="/">Home</Link>
              <Link href="/register">Cadastrar</Link>
            </>
          )}
          {pathRouter == "/register" && (
            <>
              <Link href="/">Home</Link>
              <Link href="/login">Entrar</Link>
            </>
          )}

          {pathRouter == "/user" && (
            <>
              <button onClick={() => logout()}>Logout</button>
              <Link href="/home">Contatos</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
