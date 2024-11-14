"use client";
import React from "react";
import ModeSelector from "../../components/ModeSelector";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return (
    <div className="mt-[140px] flex items-center justify-center ">
      <ModeSelector
        list={() => {
          router.push("/reservations");
        }}
        create={() => {
          router.push("/new-reservation");
        }}
      />
    </div>
  );
};

export default page;
