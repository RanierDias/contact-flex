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
        {pathRouter == "/home" ? (
          <nav>
            <button onClick={() => logout()}>Logout</button>
          </nav>
        ) : (
          <nav>
            <Link href="/login">Entrar</Link>
            <Link href="/register">Cadastrar</Link>
          </nav>
        )}
      </div>
    </header>
  );
}
