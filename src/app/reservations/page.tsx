"use client";
import React from "react";
import ReservationList from "../../components/ReservationList";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center mt-[140px] ">
      <div className=" px-4 max-w-[1200px] w-full ">
        <ReservationList />
        <div className=" w-full flex items-center justify-center ">
          <button
            onClick={() => router.push("/new-reservation")}
            className=" py-3 max-w-[360px] w-full bg-green-500 mt-3 z-40 relative text-white font-semibold mx-auto rounded-lg"
          >
            Crear una nueva reserva
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
