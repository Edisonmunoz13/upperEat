export const fetchReservations = async () => {
  try {
    const response = await fetch("/api/reservations/read");
    if (!response.ok) throw new Error("Error retrieving reservations");
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error loading reservations",
    );
  }
};

export const createReservation = async (reservation: {
  name: string;
  people: number;
  date: string;
  time: string;
  status: string;
}) => {
  try {
    const response = await fetch("/api/reservations/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservation),
    });

    if (!response.ok) {
      throw new Error("Error creating reservation");
    }

    return await response.json();
  } catch {
    throw new Error("Error creating reservation");
  }
};

export const updateReservation = async (body: any): Promise<void> => {
  const response = await fetch("/api/reservations/edit", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar la reserva");
  }
};

export const deleteReservation = async (id: string) => {
  try {
    const response = await fetch(`/api/reservations/delete?id=${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Error deleting reservation");
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error deleting reservation",
    );
  }
};
