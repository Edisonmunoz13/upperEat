"use client";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ReservationForm from "../components/ReservationForm";
import ReservationList from "../components/ReservationList";
import { useState } from "react";
import ModeSelector from "../components/ModeSelector";

export default function Home() {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isListVisible, setIsListVisible] = useState(true);
  const [isListMode, setIsListMode] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-900 p-4 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <Header />
      {!isListMode && !isCreateMode && (
        <ModeSelector
          list={() => {
            setIsListMode(true);
          }}
          create={() => {
            setIsCreateMode(true);
            setIsCreateModalVisible(true);
            setIsListVisible(false);
          }}
        />
      )}
      <div className="flex items-center justify-center w-full ">
        <div className="absolute inset-0 z-0">
          <Image
            className=" object-cover w-full opacity-30"
            src="/upperBackground.jpg"
            fill
            style={{ objectFit: "cover" }}
            alt="Background Image"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        </div>

        {(isCreateMode || isListMode) && (
          <>
            {isCreateModalVisible && (
              <div className="flex items-center justify-center mt-[500px]">
                <ReservationForm
                  cancel={() => {
                    setIsListVisible(true);
                    setIsCreateModalVisible(false);
                  }}
                />
              </div>
            )}
            {isListVisible && (
              <div className="mt-[300px] w-full max-w-[1200px] mx-4">
                <ReservationList />
                <div className="w-full flex items-center justify-center mb-20">
                  <button
                    onClick={() => {
                      setIsCreateModalVisible(true);
                      setIsListVisible(false);
                    }}
                    className="bg-green-500 text-white mt-8 z-20 py-2 w-[320px] rounded-lg"
                  >
                    Nueva reserva
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
