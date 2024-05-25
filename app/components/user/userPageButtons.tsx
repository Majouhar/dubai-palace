"use client";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import classes from "./userPageButtons.module.css";
import HttpClient from "@/utility/httpClient";
import { User } from "@/app/types/commonTypes";
import Overlay from "../overlay";
import { OverlayConstants } from "@/lib/enums";

function UserPageButtons({
  user,
  cnfPwd,
}: Readonly<{ user: User; cnfPwd: string }>) {
  const [overlayMessage, setOverlayMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignout = async () => {
    setIsLoading(true);
    await signOut();
  };
  const handleUserUpdate = () => {
    user.password = user.password.trim();
    if (user.password.length > 0 && user.password.length < 8) {
      setOverlayMessage("Enter a Valid Password");
    } else if (user.password.length && user.password != cnfPwd) {
      setOverlayMessage("Passwords doesn't Match");
    } else {
      setIsLoading(true);
      new HttpClient()
        .post("/api/user", user)
        .then(() => {
          setOverlayMessage("User Updated");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  return (
    <>
      <div className={classes.container}>
        <button onClick={handleSignout}>Logout</button>
        <button onClick={handleUserUpdate}>Save</button>
      </div>
      {overlayMessage.length > 0 && (
        <Overlay
          action={OverlayConstants.ERROR}
          cancelAction={() => setOverlayMessage("")}
          message={overlayMessage}
        />
      )}
      {isLoading && <Overlay action={OverlayConstants.LOADING} />}
    </>
  );
}

export default UserPageButtons;
