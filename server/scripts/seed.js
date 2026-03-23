require("dotenv").config();
const mongoose = require("mongoose");
const categoryModel = require("../models/categories");
const productModel = require("../models/products");

// Connect to MongoDB
const DATABASE = process.env.DATABASE || "mongodb://localhost:27017/Ecommerce";

const seedDatabase = async () => {
  try {
    console.log("Connecting to database:", DATABASE);
    await mongoose.connect(DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to MongoDB for seeding.");

    // Drop existing collections
    console.log("Dropping existing categories and products...");
    await categoryModel.deleteMany({});
    await productModel.deleteMany({});

    // 1. Create Categories
    console.log("Generating Categories...");
    const categoriesSeed = [
      {
        cName: "Ready to Wear",
        cDescription: "Exquisite seasonal apparel tailored for the modern silhouette.",
        cImage: "cat_clothing.jpg",
        cStatus: "Active",
      },
      {
        cName: "Footwear",
        cDescription: "Premium leather goods providing distinct comfort and elevated style.",
        cImage: "cat_shoes.jpg",
        cStatus: "Active",
      },
      {
        cName: "Handbags",
        cDescription: "Iconic structural designs crafted from the finest materials.",
        cImage: "cat_bags.jpg",
        cStatus: "Active",
      },
      {
        cName: "Accessories",
        cDescription: "Curated accents designed to complete your everyday aesthetic.",
        cImage: "cat_accessories.jpg",
        cStatus: "Active",
      },
    ];

    const insertedCategories = await categoryModel.insertMany(categoriesSeed);
    console.log(`Inserted ${insertedCategories.length} Categories`);

    // Mapping Category Names to ObjectIds
    const catMap = insertedCategories.reduce((acc, cat) => {
      acc[cat.cName] = cat._id;
      return acc;
    }, {});

    // 2. Create Products
    console.log("Generating Products...");
    const productsSeed = [
      // Ready to Wear
      {
        pName: "Signature Silk Blouse",
        pDescription: "A timeless, fluid silk blouse featuring delicate draped details and a refined neckline. Perfect for seamless day-to-night transitions.",
        pPrice: 450,
        pQuantity: 30,
        pCategory: catMap["Ready to Wear"],
        pImages: ["prod_shirt_1.jpg", "prod_shirt_2.jpg"],
        pStatus: "Active",
      },
      {
        pName: "Tailored Wool Coat",
        pDescription: "Constructed from Italian virgin wool, this overcoat provides a commanding yet elegant profile with structured shoulders and minimalist hardware.",
        pPrice: 1250,
        pQuantity: 15,
        pCategory: catMap["Ready to Wear"],
        pImages: ["prod_dress_1.jpg", "prod_shirt_1.jpg"],
        pStatus: "Active",
      },
      {
        pName: "Cashmere Turtleneck",
        pDescription: "Ultra-soft, fine gauge cashmere knit offering uncompromising warmth and a sleek, form-flattering fit.",
        pPrice: 320,
        pQuantity: 50,
        pCategory: catMap["Ready to Wear"],
        pImages: ["prod_shirt_2.jpg"],
        pStatus: "Active",
      },

      // Footwear
      {
        pName: "Leather Ankle Boots",
        pDescription: "Sleek, block-heeled ankle boots polished from full-grain leather, featuring a subtly squared toe and side-zip closure.",
        pPrice: 580,
        pQuantity: 25,
        pCategory: catMap["Footwear"],
        pImages: ["prod_shoes_1.jpg", "prod_shoes_2.jpg"],
        pStatus: "Active",
      },
      {
        pName: "Minimalist Leather Sneakers",
        pDescription: "Crisp white calfskin sneakers featuring a low-top silhouette, tonal stitching, and effortless everyday versatility.",
        pPrice: 350,
        pQuantity: 40,
        pCategory: catMap["Footwear"],
        pImages: ["prod_shoes_2.jpg"],
        pStatus: "Active",
      },

      // Handbags
      {
        pName: "Structured Midi Tote",
        pDescription: "A versatile daily carry expertly proportioned for essentials. Features durable pebbled leather and subtle logo stamping.",
        pPrice: 950,
        pQuantity: 10,
        pCategory: catMap["Handbags"],
        pImages: ["prod_bags_1.jpg", "prod_bags_2.jpg"],
        pStatus: "Active",
      },
      {
        pName: "Evening Clutch",
        pDescription: "A compact, architectural evening bag featuring smooth satin finishes and a detachable silver chain strap.",
        pPrice: 620,
        pQuantity: 20,
        pCategory: catMap["Handbags"],
        pImages: ["prod_bags_2.jpg"],
        pStatus: "Active",
      },

      // Accessories
      {
        pName: "Classic Hex Aviators",
        pDescription: "Sleek metallic frames offering 100% UV protection, designed to flatter a variety of face shapes with understated elegance.",
        pPrice: 280,
        pQuantity: 60,
        pCategory: catMap["Accessories"],
        pImages: ["prod_acc_1.jpg", "prod_acc_2.jpg"],
        pStatus: "Active",
      },
      {
        pName: "Signature Wrap Watch",
        pDescription: "Swiss quartz movement combined with a minimal dial and an interchangeable genuine leather wrap strap.",
        pPrice: 490,
        pQuantity: 15,
        pCategory: catMap["Accessories"],
        pImages: ["prod_acc_2.jpg"],
        pStatus: "Active",
      },
      {
        pName: "Saffiano Card Holder",
        pDescription: "Ultra-slim six-slot cardholder embossed with luxury Saffiano texture. Ideal for minimalist everyday carrying.",
        pPrice: 150,
        pQuantity: 100,
        pCategory: catMap["Accessories"],
        pImages: ["prod_acc_1.jpg"],
        pStatus: "Active",
      },
    ];

    const insertedProducts = await productModel.insertMany(productsSeed);
    console.log(`Inserted ${insertedProducts.length} Products`);

    console.log("Closing connection...");
    mongoose.connection.close();
    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();
