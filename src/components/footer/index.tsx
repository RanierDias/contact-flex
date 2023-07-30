import style from "@/sass/components/footer/style.module.sass";

export default function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.container}>
        <div>
          <small>created by</small>
          <p>ranierfernandodias@gmail.com</p>
        </div>
        <div>
          <small>all rights reserved</small>
          <p>Contact Flex - 2023</p>
        </div>
      </div>
    </footer>
  );
}
