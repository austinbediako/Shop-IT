const fs = require("fs");
const categoryModel = require("../models/categories");
const productModel = require("../models/products");
const orderModel = require("../models/orders");
const userModel = require("../models/users");
const customizeModel = require("../models/customize");

class Customize {
  async getImages(req, res) {
    try {
      let Images = await customizeModel.find({});
      if (Images) {
        return res.json({ Images });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async uploadSlideImage(req, res) {
    let image = req.file.path;
    if (!image) {
      return res.json({ error: "All field required" });
    }
    try {
      let newCustomzie = new customizeModel({
        slideImage: image,
      });
      let save = await newCustomzie.save();
      if (save) {
        return res.json({ success: "Image upload successfully" });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async deleteSlideImage(req, res) {
    let { id } = req.body;
    if (!id) {
      return res.json({ error: "All field required" });
    } else {
      try {
        let deletedSlideImage = await customizeModel.findById(id);
        const filePath = `../server/public/uploads/customize/${deletedSlideImage.slideImage}`;

        let deleteImage = await customizeModel.findByIdAndDelete(id);
        if (deleteImage) {
          // Delete Image from uploads -> customizes folder
          fs.unlink(filePath, (err) => {
            if (err) {
              console.log(err);
            }
            return res.json({ success: "Image deleted successfully" });
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async getAllData(req, res) {
    try {
      const calculateGrowth = async (model) => {
        const thirtyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 30));
        const sixtyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 60));

        const currentPeriodCount = await model.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });
        const previousPeriodCount = await model.countDocuments({ createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo } });

        if (previousPeriodCount === 0) return currentPeriodCount > 0 ? 100 : 0;
        return Math.round(((currentPeriodCount - previousPeriodCount) / previousPeriodCount) * 100);
      };

      let Categories = await categoryModel.countDocuments({});
      let Products = await productModel.countDocuments({});
      let Orders = await orderModel.countDocuments({});
      let Users = await userModel.countDocuments({});

      let CategoriesGrowth = await calculateGrowth(categoryModel);
      let ProductsGrowth = await calculateGrowth(productModel);
      let OrdersGrowth = await calculateGrowth(orderModel);
      let UsersGrowth = await calculateGrowth(userModel);

      return res.json({ 
        Categories, Products, Orders, Users,
        CategoriesGrowth, ProductsGrowth, OrdersGrowth, UsersGrowth
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

const customizeController = new Customize();
module.exports = customizeController;
