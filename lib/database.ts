import { connectDB } from "./mongodb";
import { LunchPlaceModel } from "./models/LunchPlace";

// Default lunch places for initialization
const defaultPlaces = [
  {
    name: "Burger Hub",
    address: "123 Main Street",
    price: 1 as const,
    distance: 0.5,
  },
  {
    name: "Sushi Paradise",
    address: "456 Oak Avenue",
    price: 3 as const,
    distance: 1.2,
  },
  {
    name: "Taco Tuesday",
    address: "789 Elm Road",
    price: 1 as const,
    distance: 0.8,
  },
  {
    name: "Italian Trattoria",
    address: "321 Pine Lane",
    price: 2 as const,
    distance: 1.5,
  },
  {
    name: "Thai Express",
    address: "654 Cedar Street",
    price: 2 as const,
    distance: 0.9,
  },
  {
    name: "Pizza Place",
    address: "987 Maple Drive",
    price: 1 as const,
    distance: 0.6,
  },
  {
    name: "Vietnamese Pho",
    address: "147 Birch Way",
    price: 1 as const,
    distance: 1.1,
  },
  {
    name: "French Bistro",
    address: "258 Spruce Boulevard",
    price: 3 as const,
    distance: 2.0,
  },
  {
    name: "Indian Curry House",
    address: "369 Willow Court",
    price: 2 as const,
    distance: 1.3,
  },
  {
    name: "Korean BBQ",
    address: "741 Aspen Street",
    price: 2 as const,
    distance: 1.8,
  },
];

export interface LunchPlaceDTO {
  _id?: string;
  name: string;
  address: string;
  price: 1 | 2 | 3;
  distance: number;
}

export async function initializeDatabase() {
  try {
    await connectDB();
    const count = await LunchPlaceModel.countDocuments();

    if (count === 0) {
      await LunchPlaceModel.insertMany(defaultPlaces);
      console.log("Database initialized with default places");
    }
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

export async function getAllPlaces(): Promise<LunchPlaceDTO[]> {
  try {
    await connectDB();
    const places = await LunchPlaceModel.find().lean();
    return places.map((place) => ({
      _id: place._id.toString(),
      name: place.name,
      address: place.address,
      price: place.price,
      distance: place.distance,
    }));
  } catch (error) {
    console.error("Error fetching places:", error);
    return [];
  }
}

export async function addPlace(
  place: Omit<LunchPlaceDTO, "_id">
): Promise<LunchPlaceDTO> {
  try {
    await connectDB();
    const newPlace = await LunchPlaceModel.create(place);
    return {
      _id: newPlace._id.toString(),
      name: newPlace.name,
      address: newPlace.address,
      price: newPlace.price,
      distance: newPlace.distance,
    };
  } catch (error) {
    console.error("Error adding place:", error);
    throw error;
  }
}

export async function getRandomPlace(): Promise<LunchPlaceDTO> {
  try {
    await connectDB();
    const count = await LunchPlaceModel.countDocuments();

    if (count === 0) {
      throw new Error("No lunch places available");
    }

    const randomIndex = Math.floor(Math.random() * count);
    const randomPlace = await LunchPlaceModel.findOne()
      .skip(randomIndex)
      .lean();

    if (!randomPlace) {
      throw new Error("Failed to fetch random place");
    }

    return {
      _id: randomPlace._id.toString(),
      name: randomPlace.name,
      address: randomPlace.address,
      price: randomPlace.price,
      distance: randomPlace.distance,
    };
  } catch (error) {
    console.error("Error fetching random place:", error);
    throw error;
  }
}
