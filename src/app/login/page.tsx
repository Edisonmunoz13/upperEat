"use client";
import React from "react";
import ModeSelector from "../../components/ModeSelector";
import { useRouter } from "next/navigation";
import Footer from "../../components/Footer";

const Page = () => {
  const router = useRouter();
  return (
    <div className="mt-[110px] flex items-center justify-center ">
      <ModeSelector
        list={() => {
          router.push("/reservations");
        }}
        create={() => {
          router.push("/new-reservation");
        }}
      />
      <Footer />
    </div>
  );
};

export default Page;
