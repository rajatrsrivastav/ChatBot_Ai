"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./signup.css";
import { signup } from "@/services/auth";

function Signup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    
    try {
      if (!form.name || !form.email || !form.password) {
        alert("Please fill all fields!");
        return;
      }

      setIsLoading(true);
      const response = await signup(form);
      const data = await response.json();
      alert(data.message);
      router.push("/set-api-key");
    } catch (err) {
      console.error(err);
      alert("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fromMain">
      <div className="headerText">
        <h1>Create an account</h1>
        <p>Enter your details to create your ChatBot account</p>
      </div>

      <div className="formInput">
        <form className="form_main" onSubmit={handleSubmit}>
          <label className="label_form">Name</label>
          <br />
          <input
            className="form_input"
            name="name"
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={handleForm}
            disabled={isLoading}
          />
          <br />
          <label className="label_form">Email</label>
          <br />
          <input
            className="form_input"
            name="email"
            type="email"
            placeholder="name@example.com"
            value={form.email}
            onChange={handleForm}
            disabled={isLoading}
          />
          <br />
          <label className="label_form">Password</label>
          <br />
          <input
            className="form_input"
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleForm}
            disabled={isLoading}
          />
          <br />
          <button className="submitButton" type="submit" disabled={isLoading}>
            {isLoading ? (
              <span className="signup_loading">
                <span className="signup_spinner"></span>
                Signing up...
              </span>
            ) : (
              "Signup"
            )}
          </button>
        </form>

        <hr className="hr1" />

        <p>
          Already have an account?{" "}
          <Link className="link1" href="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;