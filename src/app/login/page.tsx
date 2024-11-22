"use client";
import React from "react";
import ModeSelector from "../../components/ModeSelector";
import { useRouter } from "next/navigation";
import Footer from "../../components/Footer";
import Image from "next/image";

const Page = () => {
  const router = useRouter();
  return (
    <div className="mt-[80px] flex items-center justify-center ">
      <ModeSelector
        list={() => {
          router.push("/reservations");
        }}
        exploreRestaurants={() => {
          router.push("restaurant-search");
        }}
      />
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
      <Footer />
    </div>
  );
};

export default Page;
