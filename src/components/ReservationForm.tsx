"use client";

import { useEffect, useState } from "react";
import { createReservation } from "../services/reservationServices";
import { useRestaurantContext } from "../context/RestaurantContext";
import { Table } from "@prisma/client";

interface ReservationFormProps {
  cancel: () => void;
}

const ReservationForm = ({ cancel }: ReservationFormProps) => {
  const [name, setName] = useState("");
  const [people, setPeople] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("Pending");
  const [tableId, setTableId] = useState("");
  const [tables, setTables] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { restaurantIdToMakeReservation, userId } = useRestaurantContext();

  const defaultUserId = "a27ae60f-f739-4356-b346-90b8dd2eca74";

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await fetch(
          `/api/tables/get-by-restaurant-id?restaurantId=${restaurantIdToMakeReservation}`,
        );
        if (!response.ok) {
          throw new Error("Error fetching tables");
        }
        const data = await response.json();
        setTables(data);
      } catch (err) {
        console.error(err);
        setError("Error loading tables");
      }
    };

    if (restaurantIdToMakeReservation) {
      fetchTables();
    }
  }, [restaurantIdToMakeReservation]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const reservation = {
      name,
      people: parseInt(people),
      date,
      time,
      status,
      userId: userId ? userId : defaultUserId,
      restaurantId: restaurantIdToMakeReservation,
      tableId,
    };
    console.log(reservation);

    try {
      const newReservation = await createReservation(reservation);
      setSuccess(true);
      setSuccessMessage(
        `Reservation created successfully: ${newReservation.name}`,
      );
      setError(null);
      setName("");
      setPeople("");
      setDate("");
      setTime("");
      setStatus("Pending");
      setTableId("");
    } catch {
      setError("Error creating the reservation");
      setSuccessMessage(null);
    }
  };

  return (
    <div className="bg-white w-[360px] z-30 relative p-6 rounded-lg border border-[#cfcfcf] shadow-2xl text-center mt-[200px]">
      {!success ? (
        <>
          <h2 className="text-center mb-6">Create a New Reservation</h2>
          <form className="space-y-3" onSubmit={handleSubmit}>
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
            <div className="flex flex-row justify-between my-2">
              <label>People:</label>
              <input
                className="w-[50%] bg-[#c8c8c8] rounded-lg text-center"
                type="number"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-between">
              <label>Date:</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-between">
              <label>Time:</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-between mb-8">
              <label>Status:</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="flex justify-between">
              <label>Table:</label>
              <select
                value={tableId}
                onChange={(e) => setTableId(e.target.value)}
                required
              >
                <option value="">Select a table</option>
                {tables.map((table: Table) => (
                  <option key={table.id} value={table.id}>
                    Table {table.number} - Capacity: {table.capacity}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-row justify-around pt-16">
              <button
                className="bg-green-500 text-white p-2 rounded-lg"
                type="submit"
              >
                Create Reservation
              </button>
              <button
                onClick={cancel}
                className="bg-black text-white p-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
          <button
            type="button"
            onClick={cancel}
            className="ml-2 mt-4 bg-brown text-white p-2 rounded"
          >
            OK
          </button>
        </>
      )}
    </div>
  );
};

export default ReservationForm;
