import { ReactNode } from "react";
import { IconType } from "react-icons";
import style from "@/sass/components/titleCard/style.module.sass";

interface IProps {
  children: ReactNode;
  icon: IconType;
}

export default function TitleCards({ children, icon: Icon }: IProps) {
  return (
    <div className={style.card}>
      <h4>{children}</h4>
      <Icon />
    </div>
  );
}
