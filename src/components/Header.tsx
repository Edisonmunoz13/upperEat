import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="w-full z-40 fixed top-0 left-0 bg-white flex flex-row items-center justify-between  ">
      <div className="w-[25%]">
        {session && (
          <div className="pl-12 flex flex-row items-center justify-center text-center">
            <Image
              src={session.user?.image || "/default-avatar.png"}
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full mr-4 "
            />
            <p className="text-softBlack text-sm  font-light ">
              Bienvenido,
              <span className="text-red font-semibold">
                {" "}
                {session.user?.name}
              </span>
            </p>
          </div>
        )}
      </div>
      <div>
        <Image
          className="cursor-pointer mx-4 "
          onClick={() => window.location.reload()}
          src={"/ueLogo.jpeg"}
          width={100}
          height={100}
          alt="logo"
        />
      </div>

      <div className="hidden md:block md:w-[25%]"></div>
    </div>
  );
};
export default Header;
