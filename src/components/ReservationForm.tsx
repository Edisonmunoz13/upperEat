"use client";
import { useState } from "react";
import { createReservation } from "../services/reservationServices";

interface ReservationFormProps {
  cancel: () => void;
}

const ReservationForm = ({ cancel }: ReservationFormProps) => {
  const [name, setName] = useState("");
  const [people, setPeople] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("Pending");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const reservation = {
      name,
      people: parseInt(people),
      date,
      time,
      status,
    };

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
    } catch {
      setError("Error creating the reservation");
      setSuccessMessage(null);
    }
  };

  return (
    <div className=" bg-white w-[360px] z-30 relative p-6 rounded-lg text-center mt-[200px] ">
      {!success ? (
        <>
          <h2 className="text-center mb-6  ">Crear una nueva reserva</h2>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="flex flex-row justify-between my-2 ">
              <label>Name:</label>
              <input
                className="w-[50%] bg-[#c8c8c8] rounded-lg text-center "
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-row justify-between my-2 ">
              <label>People:</label>
              <input
                className="w-[50%] bg-[#c8c8c8] rounded-lg text-center "
                type="number"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Date:</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
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
            <div className="mb-8">
              <label>Status:</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="Pending">Pendiente</option>
                <option value="Confirmed">Confirmada</option>
                <option value="Cancelled">Cancelada</option>
              </select>
            </div>
            <div className="flex flex-row justify-around pt-16 ">
              <button
                className="bg-green-500 text-white p-2 rounded-lg "
                type="submit"
              >
                Crear una reserva
              </button>
              <button
                onClick={cancel}
                className="bg-black text-white p-2 rounded-lg "
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
