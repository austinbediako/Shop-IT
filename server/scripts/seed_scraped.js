const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const https = require("https");
require("dotenv").config();

const categoryModel = require("../models/categories");
const productModel = require("../models/products");

const DATABASE = process.env.DATABASE || "mongodb://localhost:27017/Ecommerce";

const downloadImage = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      // Handle redirects via sanity if needed
      if (response.statusCode === 302 || response.statusCode === 301) {
        https.get(response.headers.location, (res) => {
          res.pipe(file);
          file.on("finish", () => file.close(resolve)).on("error", reject);
        }).on("error", reject);
      } else {
        response.pipe(file);
        file.on("finish", () => file.close(resolve)).on("error", reject);
      }
    }).on("error", reject);
  });
};

const categoriesData = [
  { cName: "Ready to Wear", cDescription: "Exclusive clothing pieces for everyday elegance.", cStatus: "Active", cImage: "cat_rtw.jpg", rawUrl: "https://picsum.photos/600/400" },
  { cName: "Footwear", cDescription: "Step into luxury with our curated shoe collection.", cStatus: "Active", cImage: "cat_footwear.jpg", rawUrl: "https://picsum.photos/600/400" },
  { cName: "Accessories", cDescription: "The absolute finishing touches for any look.", cStatus: "Active", cImage: "cat_accessories.jpg", rawUrl: "https://picsum.photos/600/400" },
  { cName: "Handbags", cDescription: "Carry your world in high-end premium leather.", cStatus: "Active", cImage: "cat_bag.jpg", rawUrl: "https://picsum.photos/600/400" }
];

const rawProducts = [
  // Men's Products (Ready to Wear)
  { cName: "Ready to Wear", pName: "Men's Casual Wear Set", pPrice: 39, pDescription: "Stylish man in white tee and light blue jeans. Special promo casual wear.", pImages: ["fn_mens_1.jpg"], pQuantity: 80, rawUrl: "https://cdn.sanity.io/images/0v989dzu/production/e2e06ad8709ce3bd1db526a54c29ae1aca1d3188-2880x1134.jpg?w=800" },
  { cName: "Ready to Wear", pName: "Dark Green Jacket", pPrice: 59, pDescription: "Trendy dark green jacket paired with light wash jeans. Part of the new season men's fashion arrivals.", pImages: ["fn_mens_2.jpg"], pQuantity: 20, rawUrl: "https://cdn.sanity.io/images/0v989dzu/production/9161579fd51752917f3f18555e4354567655cc37-2880x1134.jpg?w=800" },
  { cName: "Ready to Wear", pName: "Men's Matching Sets", pPrice: 54, pDescription: "Stylish matching sets in brown, patterned brown, grey, and sage green co-ordinates. Perfect for a coordinated look.", pImages: ["fn_mens_3.jpg"], pQuantity: 45, rawUrl: "https://cdn.sanity.io/images/0v989dzu/production/cec82a22ff7f99b055f1841724be1a246db791c8-2880x1134.jpg?w=800" },
  { cName: "Ready to Wear", pName: "Nova Activewear Jacket", pPrice: 49, pDescription: "Athletic white jacket paired with headphones and sunglasses. From the Nova Activewear Volume 02 collection.", pImages: ["fn_mens_4.jpg"], pQuantity: 30, rawUrl: "https://cdn.sanity.io/images/0v989dzu/production/91f78eced1a121b8b71c018be2cb5d3ddccb15da-2880x1134.jpg?w=800" },
  { cName: "Ready to Wear", pName: "Striped Polo Shirt", pPrice: 29, pDescription: "Black and off-white striped short-sleeve polo featuring a quarter-zip and collared neckline. A stylish addition to any wardrobe.", pImages: ["fn_mens_5.jpg"], pQuantity: 75, rawUrl: "https://cdn.sanity.io/images/0v989dzu/production/ef0ba682a1ec35f393620170d3ab15a1f30e3067-633x852.jpg?w=800" },
  { cName: "Ready to Wear", pName: "Flared Jeans", pPrice: 44, pDescription: "Washed black flared jeans with tan-brown fading. A vintage-inspired denim piece that fits perfectly with any top.", pImages: ["fn_mens_6.jpg"], pQuantity: 100, rawUrl: "https://cdn.sanity.io/images/0v989dzu/production/ca1937d8d2345e6c014f2efbae9d303f552fc5b2-633x852.jpg?w=800" },
  { cName: "Ready to Wear", pName: "Utility Cargo Pants", pPrice: 39, pDescription: "Tan cargo pants with utility pockets and adjustable side straps. Ideal for a casual and functional look.", pImages: ["fn_mens_7.jpg"], pQuantity: 110, rawUrl: "https://cdn.sanity.io/images/0v989dzu/production/21368c430f5e080b24f528ca09ef55013885c619-633x852.jpg?w=800" },

  // Women's Products (Ready to Wear, Footwear, Accessories, Handbags)
  { cName: "Ready to Wear", pName: "Sunday’s Best Dress", pPrice: 39, pDescription: "A stunning pastel dress perfect for any occasion. Features a flowy silhouette and chic design.", pImages: ["fn_womens_1.jpg"], pQuantity: 40, rawUrl: "https://cdn.sanity.io/images/0v989dzu/production/f90b6e385a641bdc0c73c02b365475475412a752-633x852.jpg?w=800" },
  { cName: "Ready to Wear", pName: "Prom Queen Energy Dress", pPrice: 49, pDescription: "This glamorous dress is designed for prom night! It has a sparkling finish and a flattering fit.", pImages: ["fn_womens_2.jpg"], pQuantity: 25, rawUrl: "https://cdn.sanity.io/images/0v989dzu/production/ac242f2de05944180b37c771bde0298f2252e6fd-633x852.jpg?w=800" },
  { cName: "Ready to Wear", pName: "Resort Escape Dress", pPrice: 45, pDescription: "Escape into elegance with this floral resort dress. Perfect for holidays or brunch.", pImages: ["fn_womens_3.jpg"], pQuantity: 50, rawUrl: "https://cdn.sanity.io/images/0v989dzu/production/d40e4d0a9804f1c7f85b0efc9e4c7c6867908db7-633x852.jpg?w=800" },
  { cName: "Ready to Wear", pName: "Spring Essentials Top", pPrice: 29, pDescription: "Must-have top for spring! Lightweight and airy, ideal for layering or wearing alone.", pImages: ["fn_womens_4.jpg"], pQuantity: 80, rawUrl: "https://cdn.sanity.io/images/0v989dzu/production/768ca13aa90a773cc469f806f045959e8a4fd16c-633x852.jpg?w=800" },
  { cName: "Accessories", pName: "Trendy Accessories Set", pPrice: 19, pDescription: "Trendy accessories set including necklace and earrings, perfect to complete your outfit.", pImages: ["fn_acc_1.jpg"], pQuantity: 150, rawUrl: "https://cdn.sanity.io/images/0v989dzu/production/810c112096261b260ccae231215c51eff1e7028b-381x477.jpg?w=800" },
  { cName: "Footwear", pName: "Chic Boots", pPrice: 59, pDescription: "Stylish boots that can elevate any outfit. Featuring a chunky heel and soft material.", pImages: ["fn_fw_1.jpg"], pQuantity: 30, rawUrl: "https://cdn.sanity.io/images/0v989dzu/production/8cc0a0629d5d4a54a9ec5f68177bc1ca6545968d-381x477.jpg?w=800" },
  { cName: "Footwear", pName: "Summer Sandals", pPrice: 24, pDescription: "Light and stylish sandals for warm weather. Ideal for casual outings or beach days.", pImages: ["fn_fw_2.jpg"], pQuantity: 90, rawUrl: "https://cdn.sanity.io/images/0v989dzu/production/3c30d33ae0d259b3653f12d6758f1ae59f6117bf-381x477.jpg?w=800" },
  { cName: "Handbags", pName: "Classic Vegan Tote", pPrice: 79, pDescription: "A structured, premium faux-leather tote bag that elevates your everyday aesthetics. Spacious and organized.", pImages: ["fn_bags_1.jpg"], pQuantity: 40, rawUrl: "https://cdn.sanity.io/images/0v989dzu/production/3c30d33ae0d259b3653f12d6758f1ae59f6117bf-381x477.jpg?w=800" } // Reusing an image URL as fallback, as bag wasnt scraped distinctively 
];

const seedDatabase = async () => {
  try {
    console.log("Connecting to database:", DATABASE);
    await mongoose.connect(DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to MongoDB for Fashion Nova seeding.");

    const catDir = path.join(__dirname, "../public/uploads/categories");
    const prodDir = path.join(__dirname, "../public/uploads/products");
    if (!fs.existsSync(catDir)) fs.mkdirSync(catDir, { recursive: true });
    if (!fs.existsSync(prodDir)) fs.mkdirSync(prodDir, { recursive: true });

    console.log("Dropping existing collections...");
    await categoryModel.deleteMany({});
    await productModel.deleteMany({});
    console.log("Collections dropped.");

    console.log("Downloading Category Images...");
    for (const cat of categoriesData) {
      const dest = path.join(catDir, cat.cImage);
      if (!fs.existsSync(dest)) {
        await downloadImage(cat.rawUrl, dest).catch(e => console.error("Img fallback:", e));
      }
    }

    console.log("Inserting Categories...");
    const insertedCategories = await categoryModel.insertMany(categoriesData.map(c => ({
      cName: c.cName,
      cDescription: c.cDescription,
      cStatus: c.cStatus,
      cImage: c.cImage
    })));
    console.log(`Inserted ${insertedCategories.length} Categories.`);

    // Map Category Names to ObjectIds
    const categoryMap = {};
    for (const cat of insertedCategories) {
      categoryMap[cat.cName] = cat._id;
    }

    console.log("Downloading Product Images and Mapping Categories...");
    const productsToInsert = [];

    for (const p of rawProducts) {
      const dest = path.join(prodDir, p.pImages[0]);
      await downloadImage(p.rawUrl, dest).catch(e => console.error("Img fallback on product:", p.pName));
      
      productsToInsert.push({
        pName: p.pName,
        pDescription: p.pDescription,
        pPrice: p.pPrice,
        pQuantity: p.pQuantity,
        pCategory: categoryMap[p.cName] || categoryMap["Ready to Wear"],
        pImages: p.pImages,
        pStatus: "Active",
      });
    }

    console.log("Inserting Products...");
    const insertedProducts = await productModel.insertMany(productsToInsert);
    console.log(`Inserted ${insertedProducts.length} Fashion Nova Products.`);

    console.log("Closing connection...");
    mongoose.connection.close();
    console.log("Scraped Data Seeding Completed!");
    process.exit(0);

  } catch (err) {
    console.error("Error Seeding Scraped Database:", err);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();
