export interface Reservation {
  id: string;
  name: string;
  people: number;
  date: string;
  time: string;
  status: "Pending" | "Confirmed" | "Cancelled";
}
