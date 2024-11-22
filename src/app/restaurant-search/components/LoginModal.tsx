"use client";
import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal = ({ onClose }: LoginModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full sm:w-96">
        <h2 className="text-2xl font-semibold mb-4">
          Please log in to create a restaurant.
        </h2>
        <p className="text-gray-600 mb-4">
          You need to be logged in to create a restaurant.
        </p>
        <button
          onClick={() =>
            signIn("google", { callbackUrl: "/restaurant-search" })
          }
          className="flex flex-row items-center justify-center bg-softBlack text-lg font-semibold text-white w-full py-3 rounded-lg"
        >
          <>
            <Image
              className="mr-4"
              src={"/google.png"}
              width={30}
              height={30}
              alt="main"
            />
            <h3>Continue with Google</h3>
          </>
        </button>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-3 bg-red text-white rounded-lg w-full hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
