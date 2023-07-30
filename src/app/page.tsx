import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Link from "next/link";
import style from "@/sass/pages/landing/style.module.sass";
import TitleCards from "@/components/titleCard";
import {
  MdOutlineFreeBreakfast,
  MdUpdate,
  MdOutlinePersonSearch,
} from "react-icons/md";
import { BsPersonCheck } from "react-icons/bs";
import { RiTimerFlashLine } from "react-icons/ri";

export default function Landing() {
  return (
    <>
      <Navbar />

      <main className={style.main}>
        <div className={style.container}>
          <section>
            <h2>Contact Flex alinhando com você!</h2>
            <p>
              A Contact Flex oferece uma série de benefícios e vantagens que
              tornam a organização e o acesso às informações de contato mais
              eficientes e convenientes.
            </p>

            <p>
              O processo de cadastro de usuário na Contact Flex oferece uma
              experiência eficiente e vantajosa para os usuários.
            </p>

            <Link href="#about">Veja mais</Link>
          </section>
        </div>

        <div className={style.container_about}>
          <section id="about">
            <h2>Gereciamento de contatos</h2>

            <div>
              <TitleCards icon={MdOutlineFreeBreakfast}>
                Centralização e Organização de Contatos
              </TitleCards>

              <TitleCards icon={RiTimerFlashLine}>
                Acesso Instantâneo aos Dados
              </TitleCards>

              <TitleCards icon={MdUpdate}>
                Atualizações em Tempo Real
              </TitleCards>
            </div>

            <h2>Cadrasto de contatos</h2>

            <div>
              <TitleCards icon={BsPersonCheck}>
                Cadastro Simplificado e Rápido
              </TitleCards>

              <TitleCards icon={MdOutlinePersonSearch}>
                Maior Consistência e Precisão dos Dados
              </TitleCards>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
