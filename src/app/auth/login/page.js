"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./login.css"
import { login } from "@/services/auth";
import { AuthContext } from "@/context/auth";

function Login() {
  const router = useRouter();
  const { setIsLoggedIn } = useContext(AuthContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await login(form);
      const { token } = await response.json();
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
      router.push("/dashboard");
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  return (
    <div className="main">
      <div className="text">
      <h1>Welcome back</h1>
      <p>Enter your email to sign in to your account</p>
      </div>
      <div className="form">
      <form className="form_main1" onChange={handleForm} onSubmit={handleSubmit}>
        <label className="label_form">Email</label>
        <br/>
        <input className="input_form" name="email" type="email" placeholder="dummyuser@example.com" />
        <br/>
        <label className="label_form1">Password</label>
        <br/>
        <input className="input_form" name="password" type="password" placeholder="password123" />
        <br/>
        <button className="buttonn_form" type="submit">Login</button>
      </form>
      <hr className="hr2"></hr>
      <p>
        Do not have an account? <Link className="link" href="/auth/signup">Signup</Link> first
      </p>
      </div>
      <div className="demo-credentials">
          <p>Want to try without signing up? Use demo account:
          </p>
          <p>dummyuser@example.com</p>
          <p>password123</p>
        </div>
    </div>
  );
}
export default Login;
