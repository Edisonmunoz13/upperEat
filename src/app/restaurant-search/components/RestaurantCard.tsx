"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Restaurant } from "../../../interfaces/Restaurant.interface";
import TableCreationModal from "./TableCreationModal";
import SuccessModal from "./SuccessModal";

interface RestaurantCardProps {
  restaurant: Restaurant;
  userId: string | null;
  onReservation: (id: string) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  userId,
  onReservation,
}) => {
  const [showTableModal, setShowTableModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleTableCreated = () => {
    setShowTableModal(false);
    setShowSuccessModal(true);
  };

  return (
    <>
      <div
        key={restaurant.id}
        className="flex flex-col sm:flex-row justify-between p-4 border border-[#cfcfcf] rounded-lg shadow-2xl w-full max-w-[700px] mx-auto"
      >
        <div className="flex flex-col sm:flex-row sm:w-[70%]">
          <Image
            onClick={() => onReservation(restaurant.id)}
            src={restaurant.imageUrl || "/default-restaurant.png"}
            width={200}
            height={200}
            alt={restaurant.name}
            className="w-full sm:w-48 sm:h-48 object-cover rounded-md mx-auto sm:mx-0"
          />
          <div className="mt-4 sm:mt-0 sm:ml-6">
            <h2 className="text-xl text-blue-500 font-semibold">
              {restaurant.name}
            </h2>
            <p className="text-[#7f7f7f]">{restaurant.location}</p>
            <p className="text-gray text-xs mt-6">{restaurant.description}</p>
          </div>
        </div>

        <div className="flex flex-col sm:w-[30%] sm:items-end mt-4 sm:mt-0">
          <button
            onClick={() => onReservation(restaurant.id)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold text-sm rounded-lg hover:bg-gray-400"
          >
            Make a reservation
          </button>

          {userId !== null && restaurant.restaurantOwnerId === userId && (
            <button
              onClick={() => setShowTableModal(true)}
              className="mt-4 px-4 py-2 bg-softBlack text-white font-semibold text-sm rounded-lg hover:bg-gray-400"
            >
              Add a table
            </button>
          )}
        </div>
      </div>
      {showTableModal && (
        <TableCreationModal
          restaurantId={restaurant.id}
          onClose={() => setShowTableModal(false)}
          onTableCreated={handleTableCreated}
        />
      )}
      {showSuccessModal && (
        <SuccessModal
          message="Table created successfully!"
          onClose={() => setShowSuccessModal(false)}
        />
      )}
    </>
  );
};

export default RestaurantCard;
