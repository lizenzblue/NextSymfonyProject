"use client";
import React, { useState } from "react";

export default function RegisterForm() {
  const [isFocused, setIsFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const checkIfValidEmail = (email) => {
    return email.includes("@") && email.includes(".");
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (newEmail === "") {
      setIsEmailValid(true);
      return;
    }
    setIsEmailValid(checkIfValidEmail(newEmail));
  };

  const handleIsFocused = () => {
    setIsFocused(true);
  };

  return (
    <div
      className="bg-zinc-900 p-6 rounded-lg shadow-lg shadow-green-500 w-80"
      style={{ caretColor: "transparent" }}
    >
      <h2 className="text-2xl font-bold mb-5 text-white-800">Register</h2>
      <form>
        <div className="mb-4">
          <label className="font-bold text-white-800" htmlFor="email">
            Email
          </label>
          <input
            className={`h-10 px-4 w-full bg-zinc-800 border rounded-lg text-white-800 focus:outline-none ${
              isEmailValid
                ? "border-zinc-700 focus:border-green-500"
                : "border-red-500 focus:border-red-500"
            }`}
            onFocus={handleIsFocused}
            onChange={handleEmailChange}
            value={email}
            style={{ caretColor: isFocused ? "auto" : "transparent" }}
            type="email"
            name="email"
            id="email"
            required
          />
          {!isEmailValid && (
            <p className="text-red-500 text-sm mt-1">Invalid email address</p>
          )}
        </div>
        <div className="mb-4">
          <label className="font-bold text-white-800" htmlFor="username">
            Username
          </label>
          <input
            className="h-10 px-4 w-full border rounded-lg text-white-800 focus:outline-none border-zinc-700 focus:border-green-500 bg-zinc-800"
            onFocus={handleIsFocused}
            style={{ caretColor: isFocused ? "auto" : "transparent" }}
            type="text"
            name="username"
            id="username"
            required
          />
        </div>
        <div className="mb-4">
          <label className="font-bold text-white-800" htmlFor="password">
            Password
          </label>
          <input
            className="h-10 px-4 w-full border rounded-lg text-white-800 focus:outline-none border-zinc-700 focus:border-green-500 bg-zinc-800"
            onFocus={handleIsFocused}
            style={{ caretColor: isFocused ? "auto" : "transparent" }}
            type="password"
            name="password"
            id="password"
            required
          />
        </div>
        <button
          className="bg-green-500 text-white font-bold px-4 py-2 rounded-lg w-full hover:bg-green-600"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
}
