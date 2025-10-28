"use client";
import React, { useState } from "react";
import VentorRegisterPage from "@/components/Becomeavendor/VentorRegisterPage";
import LoginModal from "@/common/LoginModel";

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  return (
    <main>
      <VentorRegisterPage setShowModal={setShowModal} />
      <LoginModal showModal={showModal} setShowModal={setShowModal} />
    </main>
  );
}
