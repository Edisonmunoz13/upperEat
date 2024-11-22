export interface Restaurant {
  id: string;
  name: string;
  location: string;
  description: string | null;
  imageUrl: string | null;
  restaurantOwnerId?: string;
}
