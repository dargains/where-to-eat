import { kv } from "@vercel/kv";

export interface LunchPlace {
  id: number;
  name: string;
  address: string;
  price: 1 | 2 | 3; // 1: budget, 2: moderate, 3: expensive
  distance: number; // in km
}

// Default lunch places to initialize the database
const defaultPlaces: LunchPlace[] = [
  {
    id: 1,
    name: "Burger Hub",
    address: "123 Main Street",
    price: 1,
    distance: 0.5,
  },
  {
    id: 2,
    name: "Sushi Paradise",
    address: "456 Oak Avenue",
    price: 3,
    distance: 1.2,
  },
  {
    id: 3,
    name: "Taco Tuesday",
    address: "789 Elm Road",
    price: 1,
    distance: 0.8,
  },
  {
    id: 4,
    name: "Italian Trattoria",
    address: "321 Pine Lane",
    price: 2,
    distance: 1.5,
  },
  {
    id: 5,
    name: "Thai Express",
    address: "654 Cedar Street",
    price: 2,
    distance: 0.9,
  },
  {
    id: 6,
    name: "Pizza Place",
    address: "987 Maple Drive",
    price: 1,
    distance: 0.6,
  },
  {
    id: 7,
    name: "Vietnamese Pho",
    address: "147 Birch Way",
    price: 1,
    distance: 1.1,
  },
  {
    id: 8,
    name: "French Bistro",
    address: "258 Spruce Boulevard",
    price: 3,
    distance: 2.0,
  },
  {
    id: 9,
    name: "Indian Curry House",
    address: "369 Willow Court",
    price: 2,
    distance: 1.3,
  },
  {
    id: 10,
    name: "Korean BBQ",
    address: "741 Aspen Street",
    price: 2,
    distance: 1.8,
  },
];

export async function initializeDatabase() {
  try {
    const existing = await kv.get("lunch-places");
    if (!existing) {
      await kv.set("lunch-places", JSON.stringify(defaultPlaces));
    }
  } catch (error) {
    console.log(
      "KV not available (local development). Using default places."
    );
  }
}

export async function getAllPlaces(): Promise<LunchPlace[]> {
  try {
    const places = await kv.get("lunch-places");
    return places ? JSON.parse(places as string) : defaultPlaces;
  } catch (error) {
    console.log("KV not available. Using default places.");
    return defaultPlaces;
  }
}

export async function addPlace(
  place: Omit<LunchPlace, "id">
): Promise<LunchPlace> {
  try {
    const places = await getAllPlaces();
    const newPlace: LunchPlace = {
      ...place,
      id: Math.max(...places.map((p) => p.id), 0) + 1,
    };
    places.push(newPlace);
    await kv.set("lunch-places", JSON.stringify(places));
    return newPlace;
  } catch (error) {
    console.error("Error adding place:", error);
    throw error;
  }
}

export async function getRandomPlace(): Promise<LunchPlace> {
  const places = await getAllPlaces();
  const randomIndex = Math.floor(Math.random() * places.length);
  return places[randomIndex];
}
