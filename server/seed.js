const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const products = [
  {
    name: "Logitech G Pro X Mechanical Keyboard",
    category: "Keyboard",
    brand: "Logitech",
    price: 129.99,
    stock: 50,
    description: "Tenkeyless mechanical gaming keyboard with swappable switches.",
    image: "https://images.unsplash.com/photo-1595225476474-89731ff8e6c2?w=500",
    rating: 4.6
  },
  {
    name: "Razer BlackWidow V4",
    category: "Keyboard",
    brand: "Razer",
    price: 169.99,
    stock: 35,
    description: "Full-size mechanical keyboard with dedicated macro keys and RGB.",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
    rating: 4.4
  },
  {
    name: "Logitech G502 Hero Gaming Mouse",
    category: "Mouse",
    brand: "Logitech",
    price: 49.99,
    stock: 100,
    description: "High-precision gaming mouse with adjustable weights and 11 programmable buttons.",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
    rating: 4.7
  },
  {
    name: "Razer DeathAdder V3",
    category: "Mouse",
    brand: "Razer",
    price: 69.99,
    stock: 80,
    description: "Ergonomic gaming mouse with lightweight design and 30K DPI sensor.",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500",
    rating: 4.8
  },
  {
    name: "SteelSeries Rival 3",
    category: "Mouse",
    brand: "SteelSeries",
    price: 29.99,
    stock: 60,
    description: "Budget-friendly gaming mouse with durable switches rated for 60M clicks.",
    image: "https://images.unsplash.com/photo-1618410320928-25228d811631?w=500",
    rating: 4.3
  },
  {
    name: "HyperX Cloud II Gaming Headset",
    category: "Headset",
    brand: "HyperX",
    price: 99.99,
    stock: 70,
    description: "7.1 virtual surround sound headset with memory foam ear cushions.",
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=500",
    rating: 4.6
  },
  {
    name: "SteelSeries Arctis 7",
    category: "Headset",
    brand: "SteelSeries",
    price: 149.99,
    stock: 40,
    description: "Wireless gaming headset with lossless 2.4GHz connection and long battery life.",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500",
    rating: 4.5
  },
  {
    name: "Razer Kraken V3",
    category: "Headset",
    brand: "Razer",
    price: 79.99,
    stock: 55,
    description: "Comfortable gaming headset with chroma RGB lighting and THX spatial audio.",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
    rating: 4.2
  },
  {
    name: "ASUS TUF Gaming 27\" Monitor",
    category: "Monitor",
    brand: "ASUS",
    price: 279.99,
    stock: 25,
    description: "27-inch 165Hz IPS gaming monitor with 1ms response time.",
    image: "https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=500",
    rating: 4.7
  },
  {
    name: "Samsung Odyssey G5 Curved Monitor",
    category: "Monitor",
    brand: "Samsung",
    price: 329.99,
    stock: 20,
    description: "32-inch curved QHD monitor with 144Hz refresh rate.",
    image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=500",
    rating: 4.5
  },
  {
    name: "LG UltraGear 24\" Monitor",
    category: "Monitor",
    brand: "LG",
    price: 199.99,
    stock: 30,
    description: "24-inch Full HD gaming monitor with 1ms response and AMD FreeSync.",
    image: "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=500",
    rating: 4.4
  },
  {
    name: "Xbox Wireless Controller",
    category: "Controller",
    brand: "Microsoft",
    price: 59.99,
    stock: 90,
    description: "Wireless controller with textured grip and hybrid D-pad.",
    image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=500",
    rating: 4.7
  },
  {
    name: "DualSense Wireless Controller",
    category: "Controller",
    brand: "Sony",
    price: 69.99,
    stock: 85,
    description: "PS5 controller with haptic feedback and adaptive triggers.",
    image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=500",
    rating: 4.8
  },
  {
    name: "Secretlab Titan Evo Gaming Chair",
    category: "Chair",
    brand: "Secretlab",
    price: 549.99,
    stock: 15,
    description: "Ergonomic gaming chair with magnetic head pillow and 4-way lumbar support.",
    image: "https://images.unsplash.com/photo-1596079890744-c1a0462d0975?w=500",
    rating: 4.6
  },
  {
    name: "Razer Goliathus Extended Mousepad",
    category: "Mousepad",
    brand: "Razer",
    price: 34.99,
    stock: 120,
    description: "Extended gaming mousepad with smooth cloth surface for precision tracking.",
    image: "https://images.unsplash.com/photo-1616077168712-fc6c788db4af?w=500",
    rating: 4.4
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    await Product.deleteMany({});
    console.log('Old products cleared');

    await Product.insertMany(products);
    console.log(`${products.length} products inserted successfully`);

    mongoose.connection.close();
  } catch (err) {
    console.error('Seeding error:', err);
    mongoose.connection.close();
  }
};

seedDB();