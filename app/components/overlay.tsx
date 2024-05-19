import React from "react";
import classes from "./overlay.module.css";
import { OverlayConstants } from "@/lib/enums";
import Loading from "./loading";
import Modal from "./modal";
function Overlay({
  message,
  action = OverlayConstants.LOADING,
  okAction,
  cancelAction,
}: Readonly<{
  message?: string;
  action?: OverlayConstants;
  okAction?: () => void;
  cancelAction?: () => void;
}>) {
  let mainItem;
  switch (action) {
    case OverlayConstants.ERROR:
      mainItem = (
        <Modal
          closeAction={cancelAction ?? (() => {})}
          okAction={okAction}
          message={message ?? ""}
        />
      );
      break;
    case OverlayConstants.LOADING:
      mainItem = <Loading />;
      break;
  }
  return (
    <div className={classes.overlay}>
      {mainItem}
      {action != OverlayConstants.ERROR && message && <p>{message}</p>}
    </div>
  );
}

export default Overlay;
