export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  priceUnit: string;
  image: string;
  available: boolean;
  featured?: boolean;
}

export const categories = [
  "All",
  "Furniture",
  "Audio & Visual",
  "Tableware",
  "Decor & Effects",
  "Food & Fun",
];

const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Elegant Chiavari Chairs",
    category: "Furniture",
    description: "Premium gold chiavari chairs perfect for weddings, galas, and upscale events. Comfortable cushioned seats included.",
    price: 8,
    priceUnit: "per chair / day",
    image: "",
    available: true,
    featured: true,
  },
  {
    id: "2",
    name: "Round Banquet Tables",
    category: "Furniture",
    description: "Sturdy 60-inch round tables seating 8-10 guests. Perfect for dining events and conferences.",
    price: 25,
    priceUnit: "per table / day",
    image: "",
    available: true,
    featured: true,
  },
  {
    id: "3",
    name: "Premium Event Tents",
    category: "Furniture",
    description: "Waterproof 20x40 ft marquee tents with elegant draping. Ideal for outdoor ceremonies and receptions.",
    price: 350,
    priceUnit: "per tent / day",
    image: "",
    available: true,
    featured: true,
  },
  {
    id: "4",
    name: "Portable Speakers",
    category: "Audio & Visual",
    description: "High-powered 1000W portable speakers with crystal-clear sound. Built-in Bluetooth and wired connectivity.",
    price: 75,
    priceUnit: "per unit / day",
    image: "",
    available: true,
  },
  {
    id: "5",
    name: "Wireless Microphones",
    category: "Audio & Visual",
    description: "Professional UHF wireless microphone system with handheld and lapel options. Perfect for speeches and performances.",
    price: 35,
    priceUnit: "per set / day",
    image: "",
    available: true,
  },
  {
    id: "6",
    name: "Projectors & Screens",
    category: "Audio & Visual",
    description: "4K ultra-bright projector with 120-inch motorized screen. Great for presentations and movie nights.",
    price: 120,
    priceUnit: "per set / day",
    image: "",
    available: true,
    featured: true,
  },
  {
    id: "7",
    name: "Luxury Tablecloths & Linens",
    category: "Tableware",
    description: "Premium satin and organza tablecloths in 20+ colors. Includes matching napkins and table runners.",
    price: 15,
    priceUnit: "per set / day",
    image: "",
    available: true,
  },
  {
    id: "8",
    name: "Fine Dinnerware Sets",
    category: "Tableware",
    description: "Complete bone china dinnerware sets including plates, bowls, glassware, and silverware for 10 guests.",
    price: 45,
    priceUnit: "per set / day",
    image: "",
    available: true,
  },
  {
    id: "9",
    name: "Tiered Cake Stands",
    category: "Tableware",
    description: "Elegant 3-tier crystal cake stands with LED base lighting. Perfect for wedding cakes and dessert displays.",
    price: 30,
    priceUnit: "per stand / day",
    image: "",
    available: true,
  },
  {
    id: "10",
    name: "Custom Backdrops",
    category: "Decor & Effects",
    description: "Stunning floral and fabric backdrops for photo booths and stage areas. Customizable to your event theme.",
    price: 150,
    priceUnit: "per backdrop / day",
    image: "",
    available: true,
    featured: true,
  },
  {
    id: "11",
    name: "Popcorn & Cotton Candy Machines",
    category: "Food & Fun",
    description: "Commercial-grade popcorn and cotton candy machines with supplies for up to 200 servings.",
    price: 85,
    priceUnit: "per machine / day",
    image: "",
    available: true,
  },
  {
    id: "12",
    name: "Chocolate Fountains",
    category: "Food & Fun",
    description: "Premium 3-tier stainless steel chocolate fountain. Includes 10 lbs of Belgian chocolate.",
    price: 95,
    priceUnit: "per unit / day",
    image: "",
    available: true,
  },
  {
    id: "13",
    name: "Smoke & Bubble Machines",
    category: "Decor & Effects",
    description: "Professional-grade fog and bubble machines for dramatic event entrances and dance floors.",
    price: 60,
    priceUnit: "per unit / day",
    image: "",
    available: true,
  },
  {
    id: "14",
    name: "String & LED Fairy Lights",
    category: "Decor & Effects",
    description: "Warm white LED fairy lights — 100ft strands with dimmable controls. Transform any venue into a magical space.",
    price: 20,
    priceUnit: "per strand / day",
    image: "",
    available: true,
    featured: true,
  },
];

const STORAGE_KEY = "eventrentals_products";

export function getProducts(): Product[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts));
  return defaultProducts;
}

export function saveProducts(products: Product[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function addProduct(product: Omit<Product, "id">): Product {
  const products = getProducts();
  const newProduct = { ...product, id: Date.now().toString() };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>) {
  const products = getProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx !== -1) {
    products[idx] = { ...products[idx], ...updates };
    saveProducts(products);
  }
}

export function deleteProduct(id: string) {
  const products = getProducts().filter((p) => p.id !== id);
  saveProducts(products);
}
