import React from "react";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";

export function LanguageLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <div  className={params.lang === "ml"?"ml-lang main-container":"en-lang main-container"}>
      <Header language={params.lang} />
      {children}
  
    </div>
  );
}

export default LanguageLayout;
