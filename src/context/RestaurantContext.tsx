"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface RestaurantContextType {
  restaurantIdToMakeReservation: string | null;
  setRestaurantIdToMakeReservation: (id: string | null) => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(
  undefined,
);

export const RestaurantProvider = ({ children }: { children: ReactNode }) => {
  const [restaurantIdToMakeReservation, setRestaurantIdToMakeReservation] =
    useState<string | null>(null);

  return (
    <RestaurantContext.Provider
      value={{
        restaurantIdToMakeReservation,
        setRestaurantIdToMakeReservation,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurantContext = (): RestaurantContextType => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error(
      "useRestaurantContext must be used within a RestaurantProvider",
    );
  }
  return context;
};
