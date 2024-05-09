import React from "react";
import Header from "../components/header/header";

type LanguageLayoutProps = {
  children: React.ReactNode;
  params: { lang: string };
};

const LanguageLayout: React.FC<LanguageLayoutProps> = ({
  children,
  params,
}) => {
  return (
    <div
      className={
        params.lang === "ml"
          ? "ml-lang main-container"
          : "en-lang main-container"
      }
    >
      <Header language={params.lang} />
      {children}
    </div>
  );
};

export default LanguageLayout;
