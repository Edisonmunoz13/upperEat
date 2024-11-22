export interface Reservation {
  id: string;
  name: string;
  people: number;
  date: Date;
  time: string;
  status: "Pending" | "Confirmed" | "Cancelled";
  createdAt: Date;
  userId: string;
  restaurantId: string;
  tableId?: string;
}
