"use client";
import React, { useEffect, useState } from "react";
import EditForm from "../../../components/EditForm";
import { useParams } from "next/navigation";
import { Reservation } from "../../../interfaces/reservation.interface";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [reservationToEdit, setReservationToEdit] =
    useState<Reservation | null>(null);

  const handleCancel = () => {
    router.push("/reservations");
  };

  async function getReservationById(id: string | string[]): Promise<void> {
    try {
      const response = await fetch(`/api/reservations/${id}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Error fetching the reservation");
      }
      const data = await response.json();
      setReservationToEdit(data);
    } catch (error) {
      console.error("Error in getReservationById:", error);
    }
  }

  useEffect(() => {
    if (id) {
      getReservationById(id);
    }
  }, [id]);

  return (
    <div className="mt-[200px] relative z-50">
      <EditForm reservation={reservationToEdit} cancel={handleCancel} />
    </div>
  );
};

export default Page;
