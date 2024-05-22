import { getUserDetails } from "@/lib/userActions";
import classes from "./user.module.css";
import React from "react";
import UserClient from "@/app/components/user/userClient";

async function User() {
  const userDetails = await getUserDetails();

  return (
    <main className={classes.container}>
      <div className={classes.profileContainer}>
        <div className={classes.photoSection}>
          <p className={classes.circle}>
            {userDetails?.first_name?.[0]}
            {userDetails?.last_name?.[0]}
          </p>
          <p className={classes.mobile}>{userDetails?.mobile}</p>
        </div>
        {/* @ts-expect-error */}
        <UserClient {...userDetails} />

      </div>
    </main>
  );
}

export default User;
