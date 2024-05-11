import React from "react";
import Header from "../components/header/header";
import { Nova_Flat , Anek_Malayalam } from "next/font/google";


type LanguageLayoutProps = {
  children: React.ReactNode; 
  params: { lang: string };
};
const novaFlat = Nova_Flat({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});
const anekMalayalam = Anek_Malayalam({
  subsets: ["malayalam"],
  display: "swap",
});
const LanguageLayout: React.FC<LanguageLayoutProps> = ({
  children,
  params,
}) => {
  return (
    <div
      className={
        params.lang === "ml"
          ? `${anekMalayalam.className} main-container`
          : `${novaFlat.className} main-container`
      }
    >
      <Header language={params.lang} />
      {children}
    </div>
  );
};

export default LanguageLayout;
