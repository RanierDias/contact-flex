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
          Contact{" "}
          <div>
            <span>Flex</span>
          </div>
        </h1>

        <nav>
          {pathRouter == "/home" && (
            <button onClick={() => logout()}>Logout</button>
          )}

          {(pathRouter == "/" || pathRouter == "/register") && (
            <Link href="/login">Entrar</Link>
          )}

          {(pathRouter == "/login" || pathRouter == "/register") && (
            <Link href="/">Home</Link>
          )}

          {(pathRouter == "/" || pathRouter == "/login") && (
            <Link href="/register">Cadastrar</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
