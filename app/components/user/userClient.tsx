"use client";
import CommonInput from "../commonInput";

import classes from "./userClient.module.css";

import React, { useState } from "react";
import UserPageButtons from "./userPageButtons";

function UserClient({
  first_name,
  last_name,
  email: serverEmail,
  mobile: serverMobile,
  address_line1,
  address_line2,
  pincode: serverPincode,
  district: serverDistrict,
}: Readonly<{
  user_id: number;
  first_name: string;
  last_name: string;
  email: string | null;
  mobile: string;
  address_line1: string | null;
  address_line2: string | null;
  pincode: string;
  password: string | null;
  district: string;
}>) {
  const [firstName, setFirstName] = useState(first_name);
  const [lastName, setLastName] = useState(last_name);
  const [email, setEmail] = useState(serverEmail ?? "");
  const [mobile, setMobile] = useState(serverMobile);
  const [addressLine1, setAddressLine1] = useState(address_line1);
  const [addressLine2, setAddressLine2] = useState(address_line2);
  const [pincode, setPincode] = useState(serverPincode);
  const [password, setPassword] = useState("");
  const [district, setDistrict] = useState(serverDistrict);
  const [cnfPassword, setCnfPassword] = useState("");
  return (
    <>
      <div className={classes.container}>
        <div>
          <CommonInput
            handleChange={setFirstName}
            label="First Name"
            required
            value={firstName}
          />
          <CommonInput
            handleChange={setLastName}
            label="Last Name"
            required
            value={lastName}
          />
        </div>
        <div>
          <CommonInput
            handleChange={setEmail}
            label="Email"
            type="email"
            required={false}
            value={email ?? ""}
          />
          <CommonInput
            handleChange={setMobile}
            label="Mobile"
            required
            type="tel"
            value={mobile}
            isEditable={false}
          />
        </div>
        <div>
          <CommonInput
            handleChange={setAddressLine1}
            label="Address Line 1"
            value={addressLine1 ?? ""}
          />
          <CommonInput
            handleChange={setAddressLine2}
            label="Address Line 2"
            value={addressLine2 ?? ""}
          />
        </div>
        <div>
          <CommonInput
            handleChange={setPincode}
            label="Pincode"
            value={pincode}
          />
          <CommonInput
            handleChange={setDistrict}
            label="District"
            value={district}
            required
          />
        </div>

        <div>
          <CommonInput
            handleChange={setPassword}
            label="Password"
            value={password}
            type="password"
            required
          />
          <CommonInput
            handleChange={setCnfPassword}
            label="Confirm Password"
            value={cnfPassword}
            type="password"
            required
          />
        </div>
      </div>
      <UserPageButtons
        user={{
          firstName,
          lastName,
          email,
          mobile,
          addressLine1,
          addressLine2,
          pincode,
          password,
          district,
          userId:-1,
          cartId:-1,
          orders:[],
          wishListId:-1

        }}
        cnfPwd ={cnfPassword}
      />
    </>
  );
}

export default UserClient;
