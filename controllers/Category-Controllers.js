// const { default: slugify } = require('slugify');
const slugify = require('slugify');
const Category = require('../models/Category');
const Product = require('../models/Product');

module.exports = {
  getCategories: async (req, res) => {
    const categories = await Category.find({}).lean();
    const sortedCat = categories.sort((a, b) =>
      a.catName.localeCompare(b.catName)
    );
    console.log({ categories });
    res.render('categories/index', { categories });
  },
  getCreate: (req, res) => {
    res.render('categories/newcat');
  },

  postCreate: async (req, res) => {
    const lkc = req.body.location;
    const lokacioni = Product.find({ lkc }).lean();
    try {
      const newCat = new Category({
        catName: req.body.catName,
        catDesc: req.body.catDesc,
        catSlug: slugify(req.body.catName),
        catImg: req.file.filename,
      });
      const savedCat = await newCat.save();
      res.redirect('/');
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  },
  getSingleCatPost: async (req, res) => {
    const catId = await Category.findById(req.params.id).lean();
    const prodCat = await Product.find({ category: catId }).lean();
    const categories = await Category.find({}).lean();
    res.render('categories/singleCat', { prodCat, categories });
  },
  postDeleteCat: async (req, res, next) => {
    console.log(req.params);
    try {
      let kategoria = await Category.findById(req.params.id).lean();
      console.log({ kategoria });
      if (!kategoria) {
        res.redirect('categories/category?sukses=JO');
      }
      await Category.deleteOne({ _id: req.params.id });
      res.redirect('/?sukses=PO');
    } catch (error) {
      console.log(error);
      res.redirect('/category?deleted=JO');
    }
  },
};
