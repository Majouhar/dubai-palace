"use client";
import React, { useState } from "react";
import classes from "./login.module.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import CommonInput from "@/app/components/commonInput";

const SignUpForm = ({ toggleForm }: Readonly<{ toggleForm: () => void }>) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [pincode, setPincode] = useState("");
  const [password, setPassword] = useState("");
  const [district, setDistrict] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === cnfPassword) {
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
        .then(() => {});
    } else {
      console.log("Password Not Matches");
    }
  };

  return (
    <div className={classes.signUpFlex}>
      <form className={classes.signUpForm} onSubmit={handleSubmit}>
        <h2 className={classes.formTitle}>Create Account</h2>
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
            value={email}
          />
          <CommonInput
            handleChange={setMobile}
            label="Mobile"
            required
            type="tel"
            value={mobile}
          />
        </div>
        <div>
          <CommonInput
            handleChange={setAddressLine1}
            label="Address Line 1"
            value={addressLine1}
          />
          <CommonInput
            handleChange={setAddressLine2}
            label="Address Line 2"
            value={addressLine2}
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
            handleChange={setPassword}
            label="Confirm Password"
            value={password}
            type="password"
            required
          />
        </div>

        <button className={classes.submitBtn} type="submit">
          Sign Up
        </button>
        <button onClick={toggleForm} className={classes.toggleBtn}>
          Already Have an Account?
        </button>
      </form>
    </div>
  );
};

const SignInForm = ({ toggleForm }: Readonly<{ toggleForm: () => void }>) => {
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
    } else {
      console.log(result?.error);
    }
  };
  return (
    <div className={classes.flex}>
      <div className={classes.signInFormContainer}>
        <div></div>
        <form className={classes.signInForm} onSubmit={handleSubmit}>
          <h2 className={classes.formTitle}>Welcome Back</h2>
          <CommonInput
            handleChange={setMobile}
            label="Mobile"
            required
            type="tel"
            value={mobile}
          />
          <CommonInput
            handleChange={setPassword}
            label="Password"
            value={password}
            type="password"
            required
          />
          <button className={classes.submitBtn} type="submit">
            Sign In
          </button>
          <button className={classes.toggleBtn} onClick={toggleForm}>
            {"Don't have an account?"}
          </button>
        </form>
      </div>
    </div>
  );
};

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const toggleSignUp = () => {
    setIsSignUp((prev) => !prev);
  };
  return (
    <div className={classes.container}>
      {!isSignUp && <SignInForm toggleForm={toggleSignUp} />}
      {isSignUp && <SignUpForm toggleForm={toggleSignUp} />}
    </div>
  );
};

export default Login;
