"use client";
import { useEffect, useState } from "react";
import { Reservation } from "../interfaces/reservation.interface";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  fetchReservations,
  deleteReservation,
} from "../services/reservationServices";

const ReservationList = () => {
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<
    Reservation[]
  >([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const loadReservations = async () => {
    try {
      const data = await fetchReservations();
      setReservations(data);
      setFilteredReservations(data);
    } catch {
      setError("Error al cargar las reservas");
    }
  };

  useEffect(() => {
    loadReservations();
  }, []);

  useEffect(() => {
    if (filterStatus === "") {
      setFilteredReservations(reservations);
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
      await deleteReservation(id);
      setReservations(
        reservations.filter((reservation) => reservation.id !== id),
      );
    } catch {
      setError("Error al eliminar la reserva");
    }
  };

  const handleEdit = (reservation: Reservation) => {
    router.push(`/edit-reservation/${reservation.id}`);
  };

  const currentReservations = filteredReservations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4 bg-white z-30 relative rounded-lg">
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
          <option value="Pending">Pendiente</option>
          <option value="Confirmed">Confirmada</option>
          <option value="Cancelled">Cancelada</option>
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
                onClick={() => handleEdit(reservation)}
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
    </div>
  );
};

export default ReservationList;
