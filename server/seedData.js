const mongoose = require("mongoose");
const MenuItem = require("./models/MenuItem");
require("dotenv").config();

const menuItems = [
  {
    name: "Combo Plate",
    description: "A combo of our three different types of tacos",
    price: 90,
    category: "Mains",
    image: "combo.jpg",
  },
  {
    name: "Carne Asada",
    description: "3x tacos with Beef, Onion, Cilantro, Salsa verde",
    price: 90,
    category: "Mains",
    image: "carneasada.jpg",
  },
  {
    name: "Al Pastor",
    description: "3x tacos with Pork, Onion, Cilantro, Pineapple, Salsa verde",
    price: 90,
    category: "Mains",
    image: "alpastor.jpg",
  },
  {
    name: "Veggie",
    description: "3x tacos with Beans, Onion, Cilantro, Salsa verde",
    price: 90,
    category: "Mains",
    image: "veggie.jpg",
  },
  {
    name: "Churros",
    description: "With cinnamon and sugar",
    price: 40,
    category: "Desserts",
    image: "churros.png",
  },
  {
    name: "Tres Leches Cake",
    description: "Soaked in condensed milk",
    price: 50,
    category: "Desserts",
    image: "tresleches.png",
  },
  {
    name: "Nachos",
    description: "Fried tortillabread with tomato salsa",
    price: 50,
    category: "Sides",
    image: "nachos.jpg",
  },
  {
    name: "Guacamole",
    description: "Avocado spread with onion, cilantro, cumin and lime",
    price: 40,
    category: "Sides",
    image: "guacamole.jpg",
  },
  {
    name: "Beans and rice",
    description: "Spicy mexican rice with fried beans",
    price: 40,
    category: "Sides",
    image: "frijoles.png",
  },
  {
    name: "Elote",
    description: "Corn on the cob with mayo, cotija cheese and tajin",
    price: 40,
    category: "Sides",
    image: "elote.png",
  },
  {
    name: "Jarritos - Cola",
    description: "Mexican cola soda",
    price: 40,
    category: "Drinks",
    image: "drink1.jpg",
  },
  {
    name: "Jarritos - Orange",
    description: "Mexican orange soda",
    price: 40,
    category: "Drinks",
    image: "drink3.jpg",
  },
  {
    name: "Jarritos - Lime",
    description: "Mexican lime soda",
    price: 40,
    category: "Drinks",
    image: "drink2.jpg",
  },
  {
    name: "Corona",
    description: "Mexican beer",
    price: 50,
    category: "Drinks",
    image: "drink4.jpg",
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Rensa gamla items
    await MenuItem.deleteMany({});
    console.log("Cleared old menu items");

    // Lägg till nya items
    await MenuItem.insertMany(menuItems);
    console.log("Added menu items to database");

    mongoose.connection.close();
    console.log("Database seeding completed!");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
