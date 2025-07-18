// Kerala Canteen Menu Items
export interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image_url?: string;
  is_available: boolean;
  daily_limit?: number;
  spice_level?: 'mild' | 'medium' | 'spicy';
  is_vegetarian?: boolean;
  preparation_time?: number; // in minutes
}

export const menuItems: MenuItem[] = [
  // Main Meals
  {
    id: 1,
    name: "Sadhya",
    category: "Meals",
    price: 85.0,
    description: "Traditional Kerala feast served on banana leaf with rice, sambar, rasam, aviyal, and more",
    is_available: true,
    daily_limit: 50,
    spice_level: "medium",
    is_vegetarian: true,
    preparation_time: 15,
  },
  {
    id: 2,
    name: "Fish Curry Meals",
    category: "Meals",
    price: 95.0,
    description: "Kerala style fish curry with rice, papadam, and pickle",
    is_available: true,
    daily_limit: 40,
    spice_level: "spicy",
    is_vegetarian: false,
    preparation_time: 20,
  },
  {
    id: 3,
    name: "Chicken Curry Meals",
    category: "Meals",
    price: 105.0,
    description: "Spicy Kerala chicken curry with rice and sides",
    is_available: true,
    daily_limit: 35,
    spice_level: "spicy",
    is_vegetarian: false,
    preparation_time: 25,
  },
  {
    id: 4,
    name: "Beef Fry Meals",
    category: "Meals",
    price: 110.0,
    description: "Kerala style beef fry with rice, kappa, and curry",
    is_available: true,
    daily_limit: 30,
    spice_level: "spicy",
    is_vegetarian: false,
    preparation_time: 30,
  },
  {
    id: 5,
    name: "Appam with Stew",
    category: "Meals",
    price: 45.0,
    description: "Soft appam with coconut vegetable stew",
    is_available: true,
    daily_limit: 25,
    spice_level: "mild",
    is_vegetarian: true,
    preparation_time: 10,
  },

  // Beverages
  {
    id: 6,
    name: "Filter Coffee",
    category: "Beverages",
    price: 15.0,
    description: "Traditional South Indian filter coffee",
    is_available: true,
    spice_level: "mild",
    is_vegetarian: true,
    preparation_time: 5,
  },
  {
    id: 7,
    name: "Masala Tea",
    category: "Beverages",
    price: 12.0,
    description: "Spiced tea with cardamom and ginger",
    is_available: true,
    spice_level: "mild",
    is_vegetarian: true,
    preparation_time: 5,
  },
  {
    id: 8,
    name: "Fresh Lime Juice",
    category: "Beverages",
    price: 20.0,
    description: "Fresh lime juice with mint and salt",
    is_available: true,
    spice_level: "mild",
    is_vegetarian: true,
    preparation_time: 3,
  },
  {
    id: 9,
    name: "Tender Coconut Water",
    category: "Beverages",
    price: 25.0,
    description: "Fresh tender coconut water",
    is_available: true,
    spice_level: "mild",
    is_vegetarian: true,
    preparation_time: 2,
  },
  {
    id: 10,
    name: "Buttermilk",
    category: "Beverages",
    price: 18.0,
    description: "Spiced buttermilk with curry leaves and ginger",
    is_available: true,
    spice_level: "mild",
    is_vegetarian: true,
    preparation_time: 3,
  },

  // Snacks
  {
    id: 11,
    name: "Banana Chips",
    category: "Snacks",
    price: 25.0,
    description: "Crispy Kerala style banana chips",
    is_available: true,
    spice_level: "mild",
    is_vegetarian: true,
    preparation_time: 1,
  },
  {
    id: 12,
    name: "Murukku",
    category: "Snacks",
    price: 30.0,
    description: "Traditional spiral-shaped snack",
    is_available: true,
    spice_level: "mild",
    is_vegetarian: true,
    preparation_time: 1,
  },
  {
    id: 13,
    name: "Pazham Pori",
    category: "Snacks",
    price: 20.0,
    description: "Banana fritters in batter",
    is_available: true,
    spice_level: "mild",
    is_vegetarian: true,
    preparation_time: 8,
  },
  {
    id: 14,
    name: "Kozhikodan Halwa",
    category: "Snacks",
    price: 35.0,
    description: "Sweet wheat halwa from Kozhikode",
    is_available: true,
    spice_level: "mild",
    is_vegetarian: true,
    preparation_time: 2,
  },
  {
    id: 15,
    name: "Unniappam",
    category: "Snacks",
    price: 40.0,
    description: "Sweet rice balls with jaggery and coconut",
    is_available: true,
    spice_level: "mild",
    is_vegetarian: true,
    preparation_time: 12,
  },

  // Specials
  {
    id: 16,
    name: "Puttu & Kadala",
    category: "Specials",
    price: 35.0,
    description: "Steamed rice cake with spiced chickpea curry",
    is_available: true,
    daily_limit: 20,
    spice_level: "medium",
    is_vegetarian: true,
    preparation_time: 15,
  },
  {
    id: 17,
    name: "Payasam",
    category: "Specials",
    price: 35.0,
    description: "Traditional sweet dessert with rice, milk, and jaggery",
    is_available: true,
    daily_limit: 15,
    spice_level: "mild",
    is_vegetarian: true,
    preparation_time: 5,
  },
  {
    id: 18,
    name: "Karimeen Fry",
    category: "Specials",
    price: 120.0,
    description: "Pearl spot fish marinated and fried Kerala style",
    is_available: true,
    daily_limit: 10,
    spice_level: "spicy",
    is_vegetarian: false,
    preparation_time: 25,
  },
  {
    id: 19,
    name: "Ela Ada",
    category: "Specials",
    price: 25.0,
    description: "Rice cake with coconut filling, steamed in banana leaf",
    is_available: true,
    daily_limit: 20,
    spice_level: "mild",
    is_vegetarian: true,
    preparation_time: 10,
  },
  {
    id: 20,
    name: "Thalassery Biryani",
    category: "Specials",
    price: 140.0,
    description: "Aromatic biryani with tender meat and fragrant rice",
    is_available: true,
    daily_limit: 15,
    spice_level: "medium",
    is_vegetarian: false,
    preparation_time: 35,
  },
];

export const categories = [
  'All',
  'Meals',
  'Beverages', 
  'Snacks',
  'Specials'
];

export const getItemsByCategory = (category: string): MenuItem[] => {
  if (category === 'All') {
    return menuItems;
  }
  return menuItems.filter(item => item.category === category);
};

export const getAvailableItems = (): MenuItem[] => {
  return menuItems.filter(item => item.is_available);
};

export const getVegetarianItems = (): MenuItem[] => {
  return menuItems.filter(item => item.is_vegetarian);
};

export default menuItems;
