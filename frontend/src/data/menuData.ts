// src/data/menuData.ts
export interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  is_available: boolean;
  daily_limit: number;
  image_url?: string;
}

export const menuItems: MenuItem[] = [
  // Meals
  {
    id: 1,
    name: "Kerala Meals",
    category: "Meals",
    price: 40,
    description: "Traditional Kerala meals with rice, sambar, rasam, and vegetables",
    is_available: true,
    daily_limit: 240
  },
  {
    id: 2,
    name: "Egg Curry + Meals",
    category: "Meals",
    price: 55,
    description: "Kerala meals with delicious egg curry",
    is_available: true,
    daily_limit: 80
  },
  {
    id: 3,
    name: "Chicken Curry + Meals",
    category: "Meals",
    price: 80,
    description: "Kerala meals with spicy chicken curry",
    is_available: true,
    daily_limit: 60
  },
  {
    id: 4,
    name: "Fish Curry + Meals",
    category: "Meals",
    price: 85,
    description: "Kerala meals with traditional fish curry",
    is_available: true,
    daily_limit: 40
  },

  // Beverages
  {
    id: 5,
    name: "Chai",
    category: "Beverages",
    price: 10,
    description: "Hot tea with milk and spices",
    is_available: true,
    daily_limit: 210
  },
  {
    id: 6,
    name: "Sambharam",
    category: "Beverages",
    price: 10,
    description: "Traditional Kerala buttermilk",
    is_available: true,
    daily_limit: 100
  },
  {
    id: 7,
    name: "Lime Juice",
    category: "Beverages",
    price: 12,
    description: "Fresh lime juice",
    is_available: true,
    daily_limit: 80
  },
  {
    id: 8,
    name: "Orange/Grape Juice",
    category: "Beverages",
    price: 15,
    description: "Fresh fruit juice",
    is_available: true,
    daily_limit: 60
  },
  {
    id: 9,
    name: "Cold Coffee",
    category: "Beverages",
    price: 25,
    description: "Chilled coffee with milk",
    is_available: true,
    daily_limit: 50
  },

  // Snacks
  {
    id: 10,
    name: "Bread Omelette",
    category: "Snacks",
    price: 15,
    description: "Bread with spicy omelette",
    is_available: true,
    daily_limit: 50
  },
  {
    id: 11,
    name: "Pazhampori (2 pcs)",
    category: "Snacks",
    price: 12,
    description: "Banana fritters - 2 pieces",
    is_available: true,
    daily_limit: 100
  },
  {
    id: 12,
    name: "Cutlet",
    category: "Snacks",
    price: 15,
    description: "Vegetable cutlet",
    is_available: true,
    daily_limit: 80
  },
  {
    id: 13,
    name: "Parippu Vada (2 pcs)",
    category: "Snacks",
    price: 10,
    description: "Lentil fritters - 2 pieces",
    is_available: true,
    daily_limit: 120
  },
  {
    id: 14,
    name: "Veg Roll",
    category: "Snacks",
    price: 25,
    description: "Vegetarian roll with fresh vegetables",
    is_available: true,
    daily_limit: 40
  },
  {
    id: 15,
    name: "Chicken Roll",
    category: "Snacks",
    price: 35,
    description: "Chicken roll with spicy filling",
    is_available: true,
    daily_limit: 30
  },

  // Specials
  {
    id: 16,
    name: "Mini Meals",
    category: "Specials",
    price: 30,
    description: "Smaller portion of Kerala meals",
    is_available: true,
    daily_limit: 60
  },
  {
    id: 17,
    name: "Kanji & Payar",
    category: "Specials",
    price: 20,
    description: "Rice porridge with green gram curry",
    is_available: true,
    daily_limit: 40
  },
  {
    id: 18,
    name: "Evening Combo",
    category: "Specials",
    price: 35,
    description: "Evening snack combination",
    is_available: true,
    daily_limit: 50
  },
  {
    id: 19,
    name: "Shawarma",
    category: "Specials",
    price: 60,
    description: "Chicken shawarma roll",
    is_available: true,
    daily_limit: 25
  }
];

export const getMenuByCategory = (category: string) => {
  if (category === 'All') return menuItems;
  return menuItems.filter(item => item.category === category);
};

export const getMenuItemById = (id: number) => {
  return menuItems.find(item => item.id === id);
};
