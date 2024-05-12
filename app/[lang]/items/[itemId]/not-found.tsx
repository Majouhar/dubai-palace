"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

function NotFound() {
  const pathname = usePathname();
  const lang = pathname.split("/")[1];
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (lang == "ml") {
      setMessage("ഈ സാധനം നിലവിലില്ല");
    } else {
      setMessage("The Item does not exists");
    }
  }, [lang]);
  return (
    <main className="not-found">
      <h1>{message}</h1>
    </main>
  );
}

export default NotFound;
