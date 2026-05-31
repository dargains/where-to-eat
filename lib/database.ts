export interface LunchPlace {
  id: number;
  name: string;
  address: string;
  price: 1 | 2 | 3; // 1: budget, 2: moderate, 3: expensive
  distance: number; // in km
}

export const lunchPlaces: LunchPlace[] = [
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
