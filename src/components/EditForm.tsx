"use client";
import React, { useEffect, useState } from "react";
import { Reservation } from "../interfaces/reservation.interface";
import { updateReservation } from "../services/reservationServices";
import { useRouter } from "next/navigation";

interface EditFormProps {
  cancel: () => void;
  reservation: Reservation | null;
}

const EditForm = ({ cancel, reservation }: EditFormProps) => {
  const [name, setName] = useState("");
  const [people, setPeople] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState("");
  const [status, setStatus] = useState<"Pending" | "Confirmed" | "Cancelled">(
    "Pending",
  );
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (reservation) {
      setName(reservation.name);
      setPeople((reservation.people ?? 0).toString());
      setDate(reservation.date ? new Date(reservation.date) : null);
      setTime(reservation.time);
      setStatus(reservation.status);
    }
  }, [reservation]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDateValue = e.target.value;
    setDate(newDateValue ? new Date(newDateValue) : null);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (reservation) {
      const body = {
        id: reservation.id,
        name,
        people: parseInt(people, 10),
        date: date ?? undefined,
        time,
        status,
        createdAt: reservation.createdAt,
      };

      try {
        await updateReservation(body);
        router.push("/reservations");
        setError(null);
      } catch {
        setError("Error updating reservation");
        console.log(error);
      }
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg text-center space-y-2">
        <h3 className="mb-6">Edit Reservation {reservation?.id.slice(-5)}</h3>
        <form onSubmit={handleUpdate}>
          <div className="flex flex-row justify-between my-2">
            <label>Name:</label>
            <input
              className="w-[50%] bg-[#c8c8c8] rounded-lg text-center"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-row justify-between">
            <label>People:</label>
            <input
              className="w-[50%] bg-[#c8c8c8] rounded-lg text-center"
              type="number"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              required
            />
          </div>
          <div className="my-2">
            <label>Date:</label>
            <input
              type="date"
              value={date ? date.toISOString().split("T")[0] : ""}
              onChange={handleDateChange}
              required
            />
          </div>
          <div>
            <label>Time:</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Status:</label>
            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value as "Pending" | "Confirmed" | "Cancelled",
                )
              }
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded"
            >
              Update
            </button>
            <button
              type="button"
              onClick={cancel}
              className="bg-black text-white p-2 rounded ml-4"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
