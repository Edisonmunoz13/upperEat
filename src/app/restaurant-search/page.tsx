"use client";
import React, { useEffect, useState } from "react";
import { useRestaurantContext } from "../../context/RestaurantContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  fetchRestaurants,
  fetchUser,
  createRestaurant,
} from "./services/restaurantServices";
import { User } from "../../interfaces/User.interface";
import { Restaurant } from "../../interfaces/Restaurant.interface";
import LoginModal from "./components/LoginModal";
import RestaurantCard from "./components/RestaurantCard";
import RestaurantCreationModal from "./components/RestaurantCreationModal";

const Page = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const { setRestaurantIdToMakeReservation } = useRestaurantContext();
  const router = useRouter();
  const { data: session } = useSession();
  const [user, setuser] = useState<User | null>(null);

  useEffect(() => {
    if (session?.user?.email) {
      const loadUser = async () => {
        setLoading(true);
        const userData = await fetchUser(session?.user?.email);
        if (userData) {
          setuser(userData);
        }
        setLoading(false);
      };

      loadUser();
    } else {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    const loadRestaurants = async () => {
      setLoading(true);
      const data = await fetchRestaurants();
      setRestaurants(data);
      setLoading(false);
    };

    loadRestaurants();
  }, []);

  const handleCreateRestaurant = async (restaurant: {
    name: string;
    location: string;
    description: string;
    imageUrl: string;
  }) => {
    setLoadingCreate(true);

    const newRestaurant = {
      ...restaurant,
      restaurantOwnerId: user?.id,
    };
    const createdRestaurant = await createRestaurant(newRestaurant);

    if (createdRestaurant) {
      setRestaurants((prevRestaurants) => [
        ...prevRestaurants,
        createdRestaurant,
      ]);
      setShowModal(false);
    }

    setLoadingCreate(false);
  };

  const handleReservation = (id: string) => {
    setRestaurantIdToMakeReservation(id);
    router.push("/new-reservation");
  };

  const handleCreateButtonClick = () => {
    if (!user) {
      setShowLoginModal(true);
    } else {
      setShowModal(true);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4 bg-[#f3f3f3]  z-20 relative mt-24 flex flex-col items-center justify-center">
      <h1 className="text-2xl text-center font-bold mb-6 text-[#888888] ">
        Available restaurants for reservations
      </h1>

      <div className="flex justify-between w-full text-sm  max-w-[700px] ">
        <button
          onClick={() => router.push("reservations")}
          className="px-4 mb-4 py-2 bg-softBlack text-white mx-2 rounded-lg "
        >
          See the reservations list
        </button>
        <button
          onClick={handleCreateButtonClick}
          className="px-4 mb-4 py-2 bg-green-500 text-white mx-2 rounded-lg hover:bg-green-600"
        >
          Publish your restaurant
        </button>
      </div>

      <div className="flex flex-col items-center justify-center gap-6 mb-4 px-6 w-full">
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            userId={user?.id || null}
            onReservation={handleReservation}
          />
        ))}
      </div>

      {showModal && (
        <RestaurantCreationModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreateRestaurant}
          loadingCreate={loadingCreate}
        />
      )}

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
};

export default Page;
