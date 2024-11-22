export const fetchRestaurants = async () => {
  try {
    const response = await fetch("/api/restaurants/read");
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error fetching restaurants");
      return [];
    }
  } catch (error) {
    console.error("Error fetching restaurants", error);
    return [];
  }
};

export const fetchUser = async (email: string | undefined | null) => {
  try {
    const response = await fetch(`/api/users/get-by-email?email=${email}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error fetching user");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const createRestaurant = async (newRestaurant: unknown) => {
  try {
    const response = await fetch("/api/restaurants/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRestaurant),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error creating restaurant");
      return null;
    }
  } catch (error) {
    console.error("Error creating restaurant", error);
    return null;
  }
};
