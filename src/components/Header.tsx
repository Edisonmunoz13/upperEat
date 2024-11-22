"use client";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div className="w-full z-40 fixed top-0 left-0 bg-opacity-50 backdrop-blur-lg flex flex-row items-center justify-between">
      <div className="w-[40%]">
        {session && (
          <div className="ml-16 flex flex-row items-center justify-center text-center">
            <Image
              src={session.user?.image || "/default-avatar.png"}
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full mr-4"
            />
            <p className="text-softBlack text-sm font-light">
              Welcome,
              <span className="text-green-600 font-semibold">
                {" "}
                {session.user?.name}
              </span>
            </p>
            <div
              onClick={() => {
                signOut({ callbackUrl: "/login" });
              }}
              className="flex flex-row justify-center items-center space-x-3 ml-8 cursor-pointer"
            >
              <Image src={"/logout.png"} width={30} height={30} alt="logout" />
              <h2 className="text-softBlack text-sm font-light">Log Out</h2>
            </div>
          </div>
        )}
      </div>
      <div>
        <Image
          className="cursor-pointer mx-4 py-4 sm:max-w-[200px] sm:max-h-[200px] max-w-[100px] max-h-[100px]"
          onClick={() => router.push("/login")}
          src={"/upperEatLogo.png"}
          width={200}
          height={200}
          alt="logo"
        />
      </div>

      <div className="hidden md:block md:w-[40%]"></div>
    </div>
  );
};
export default Header;
