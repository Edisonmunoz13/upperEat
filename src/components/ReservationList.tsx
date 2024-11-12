"use client";
import { useEffect, useState } from "react";
import { Reservation } from "../interfaces/reservation.interface";
import Image from "next/image";

const ReservationList = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<
    Reservation[]
  >([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentReservation, setCurrentReservation] =
    useState<Reservation | null>(null);
  const [name, setName] = useState("");
  const [people, setPeople] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("");
  const [filterStatus, setFilterStatus] = useState(""); // Estado del filtro
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const itemsPerPage = 6; // Número de elementos por página

  const fetchReservations = async () => {
    try {
      const response = await fetch("/api/reservations/read");
      if (!response.ok) throw new Error("Error al obtener reservas");
      const data = await response.json();
      setReservations(data);
      setFilteredReservations(data); // Inicializamos con todas las reservas
    } catch {
      setError(error || "Error al cargar las reservas");
    }
  };

  useEffect(() => {
    fetchReservations();
  });

  useEffect(() => {
    if (filterStatus === "") {
      setFilteredReservations(reservations); // Si no hay filtro, mostramos todas
    } else {
      setFilteredReservations(
        reservations.filter(
          (reservation) => reservation.status === filterStatus,
        ),
      );
    }
  }, [filterStatus, reservations]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/reservations/delete?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error al eliminar la reserva");
      setReservations(
        reservations.filter((reservation) => reservation.id !== id),
      );
    } catch {
      setError(error || "Error al eliminar la reserva");
    }
  };

  const handleEdit = (reservation: Reservation) => {
    setCurrentReservation(reservation);
    setName(reservation.name);
    setPeople(reservation.people.toString());
    setDate(reservation.date.split("T")[0]);
    setTime(reservation.time);
    setModalOpen(true);
    setStatus(reservation.status);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    if (currentReservation) {
      e.preventDefault();
      const body = {
        id: currentReservation.id,
        name,
        people: parseInt(people),
        date,
        time,
        status,
      };

      try {
        const response = await fetch("/api/reservations/edit", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) throw new Error("Error al actualizar la reserva");

        const updatedReservation = await response.json();
        setReservations(
          reservations.map((reservation) =>
            reservation.id === updatedReservation.id
              ? updatedReservation
              : reservation,
          ),
        );

        setModalOpen(false);
        setError(null);
      } catch {
        setError(error || "Error al actualizar la reserva");
      }
    }
  };

  // Calcular las reservas a mostrar para la página actual
  const currentReservations = filteredReservations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4 bg-white z-30 relative rounded-lg mt-[500px]">
      <h2 className="text-center font-semibold text-xl mb-2">
        Lista de Reservas
      </h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="my-3 text-xs">
        <label className="mr-2">Filtrar por estado:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-1 rounded"
        >
          <option value="">Todos</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <ul>
        {currentReservations.map((reservation: Reservation, index: number) => (
          <li
            key={reservation.id}
            className={`flex justify-between items-center  ${
              index !== currentReservations.length - 1
                ? "border-b border-[#c8c8c8]"
                : ""
            }`}
          >
            <div className="flex flex-row items-center w-full text-sm">
              <h3 className="w-[30%]">{reservation.name}</h3>
              <h3 className="w-[35%]">Personas: {reservation.people}</h3>
              <h3 className="w-[25%]">Status: {reservation.status}</h3>
            </div>
            <div className="space-y-1 flex flex-col">
              <button
                onClick={() => {
                  handleEdit(reservation);
                }}
                className="bg-blue-500 text-white p-1 rounded-full"
              >
                <Image src="/edit.png" width={14} height={14} alt="edit" />
              </button>
              <button
                onClick={() => handleDelete(reservation.id)}
                className="bg-red text-white p-1 rounded-full"
              >
                <Image src="/delete.png" width={14} height={14} alt="delete" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex text-xs justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-l"
        >
          Anterior
        </button>
        <span className="px-4 py-2">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-r"
        >
          Siguiente
        </button>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg text-center space-y-2">
            <h3 className="mb-6">Editar Reserva</h3>
            <form onSubmit={handleUpdate}>
              <div className="flex flex-row justify-between my-2">
                <label>Nombre:</label>
                <input
                  className="w-[50%] bg-[#c8c8c8] rounded-lg text-center"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-row justify-between">
                <label>Personas:</label>
                <input
                  className="w-[50%] bg-[#c8c8c8] rounded-lg text-center"
                  type="number"
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                  required
                />
              </div>
              <div className="my-2">
                <label>Fecha:</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Hora:</label>
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
                  Actualizar
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-black text-white p-2 rounded ml-4"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationList;
