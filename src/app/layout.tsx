import "@/sass/reset.sass";
import "@/sass/global.sass";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

const mont = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Contact Flex",
  description: "Aqui os seus contatos não somem",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={mont.className}>{children}</body>
    </html>
  );
}
