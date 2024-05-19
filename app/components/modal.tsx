import React from "react";
import classes from "./modal.module.css";

function Modal({
  message,
  okAction,
  closeAction,
}: Readonly<{
  message: string;
  okAction?: () => void;
  closeAction: () => void;
}>) {
  return (
    <div className={classes.container}>
      <p>{message}</p>
      <div className={classes.buttonContainer}>
        <button className={classes.cancel} onClick={closeAction}>
          Close
        </button>
        {okAction && (
          <button className={classes.ok} onClick={okAction}>
            OK
          </button>
        )}
      </div>
    </div>
  );
}

export default Modal;
