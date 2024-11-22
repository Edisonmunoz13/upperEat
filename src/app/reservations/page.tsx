"use client";
import React from "react";
import ReservationList from "../../components/ReservationList";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Page = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center mt-[140px] ">
      <div className=" px-4 max-w-[1200px] w-full ">
        <ReservationList />
        <div className=" w-full flex items-center justify-center ">
          <button
            onClick={() => router.push("/restaurant-search")}
            className="px-4 mb-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 z-20 mt-2"
          >
            Create a new reservation
          </button>
        </div>
      </div>

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
    </div>
  );
};

export default Page;
