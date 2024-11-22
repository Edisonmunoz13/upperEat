"use client";
import ReservationForm from "@/components/ReservationForm";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Page = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center ">
      <div className="absolute inset-0 z-0">
        <Image
          className=" object-cover w-full opacity-30"
          src="/upperBackground.jpg"
          fill
          style={{
            objectFit: "cover",
          }}
          alt="Background Image"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      </div>
      <ReservationForm
        cancel={() => {
          router.push("/reservations");
        }}
      />
    </div>
  );
};

export default Page;
