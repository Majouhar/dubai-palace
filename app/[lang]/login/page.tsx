"use client";
import React, { useState } from "react";
import classes from "./login.module.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [pincode, setPincode] = useState("");
  const [password, setPassword] = useState("");
  const [district, setDistrict] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({
        mobile,
        password,
        firstName,
        lastName,
        pincode,
        district,
        addressLine1,
        addressLine2,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then(() => {
      });
    // Perform form submission logic here
  };

  return (
    <div className={classes.flex}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Mobile:
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </label>
        <label>
          Address Line 1:
          <input
            type="text"
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
          />
        </label>
        <label>
          Address Line 2:
          <input
            type="text"
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
          />
        </label>
        <label>
          Pincode:
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          District:
          <input
            type="text"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

const SignInForm = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform sign-in logic here
    const result = await signIn("credentials", {
      redirect: false,
      mobile,
      password,
    });
    if (result && !result.error) {
      const callbackUrl = new URLSearchParams((result.url ?? "").split("?")[1]);
      router.replace(callbackUrl.get("callbackUrl") ?? "/items");
    }else{
      console.log(result?.error)
    }
  };
  return (
    <div className={classes.flex}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Mobile:
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

const Login = () => {
  return (
    <div>
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Login;
