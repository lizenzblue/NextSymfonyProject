"use client";
import React, { useState } from "react";
import RegisterForm from "@/components/RegisterForm/page";

export default function Register() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <RegisterForm />
    </div>
  );
}
