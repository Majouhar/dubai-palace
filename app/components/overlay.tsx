import React from "react";
import classes from "./overlay.module.css";
import { OverlayConstants } from "@/lib/enums";
import Loading from "./loading";
function Overlay({
  message,
  action = OverlayConstants.LOADING,
}: Readonly<{ message?: string; action?: OverlayConstants }>) {
  let mainItem;
  switch (action) {
    case OverlayConstants.ERROR:
      mainItem = <p>Error</p>;
      break;
    case OverlayConstants.LOADING:
      mainItem = <Loading />;
      break;
  }
  return (
    <div className={classes.overlay}>
      {mainItem}
      {message && <p>{message}</p>}
    </div>
  );
}

export default Overlay;
