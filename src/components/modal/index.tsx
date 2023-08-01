import { ReactNode } from "react";
import style from "@/sass/components/modal/style.module.sass";

interface IProps {
  children: ReactNode;
}

export default function ModalContainer({ children }: IProps) {
  return (
    <section className={style.modal}>
      <div className={style.container}>{children}</div>
    </section>
  );
}
