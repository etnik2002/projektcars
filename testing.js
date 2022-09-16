// const requiredPath = require('express');
// //import schemas

// const User = require('../models/User');
// const Category = require('../models/Category');
// const Product = require('../models/Product');
// const { Query } = require('mongoose');

// module.exports = {
//   getProducts: async (req, res) => {
//     const allProducts = await Product.find({})
//       .sort({ createdAt: 'desc' })
//       .lean();
//     res.render('products/index', { allProducts });
//   },
//   getCreateProduct: async (req, res) => {
//     const categories = await Category.find({}).lean();
//     res.render('products/create', { categories });
//   },
//   postCreateProduct: async (req, res) => {
//     const { name, category, price, description } = req.body;
//     console.log(req.user);
//     console.log(req.body);
//     console.log(req.file);

//     try {
//       const newProduct = new Product({
//         name,
//         category,
//         price,
//         description,
//         image: req.file.filename,
//         User: req.user._id,
//         seller: req.user.username,
//         phone: req.user.phone,
//       });
//       const savedProduct = await newProduct.save();
//       console.log(savedProduct);
//       res.redirect('/products/');
//     } catch (error) {
//       if (error) {
//         console.log(error);
//         res.redirect('/products/create?success=false');
//       }
//     }
//   },
//   getSingleProduct: async (req, res) => {
//     console.log('Product ID : ' + req.params.id);
//     const singleProduct = await Product.findById({ _id: req.params.id });
//     res.render('products/singleproduct', { singleProduct });
//   },
//   getEditSingle: async (req, res) => {
//     let produkti = await Product.findOne({ _id: req.params.id }).lean();
//     if (!produkti) {
//       return res.redirect('/');
//     }
//     if (produkti.User != req.user.id) {
//       res.redirect('/');
//     } else {
//       res.render('products/edit', { prod: produkti });
//     }
//   },
//   postEditSingle: async (req, res) => {
//     try {
//       const prodUpdate = {
//         name: req.body.name,
//         price: req.body.price,
//         description: req.body.description,
//       };

//       let prodId = {
//         _id: req.params.id,
//       };

//       const updateProd = await Product.findOneAndUpdate({ prodId, prodUpdate });

//       if (updateProd) {
//         res.redirect('/users/profile?updated=PO');
//       } else {
//         res.redirect('/users/profile?updated=JO');
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   },
//   postDeleteSingle: async (req, res, next) => {
//     console.log(req.params);
//     try {
//       let produkti = await Product.findById(req.params.id).lean();
//       console.log({ produkti });
//       if (!produkti) {
//         res.redirect('users/profile?sukses=JO');
//       }
//       if (produkti.User != req.user.id) {
//         res.redirect('/users/profile?sukses=JO');
//       } else {
//         await Product.deleteOne({ _id: req.params.id });
//         res.redirect('/users/profile?sukses=PO');
//       }
//       if (produkti.User === req.user) {
//         const notAuthenticated = await Product.findById({ _id: req.params.id });
//         notAuthenticated ? res.redirect('/') : res.redircet('/users/profile');

//     }
//     } catch (error) {
//       console.log(error);
//       res.redirect('users/profile?deleted=JO');
//     }
//   },
//   searchedProducts: async (req, res) => {
//     let query = req.query.search;
//     console.log({ query });
//     Product.find(
//       {
//         $text: { $search: query },
//       },
//       (err, newSearch) => {
//         try {
//           res.render('products/index', { allProducts: newSearch });
//         } catch (error) {
//           res.redirect('errors/404');
//         }
//       }
//     );
//   },
// };

const butoni = document.getElementById('swalButton');
butoni.addEventListener('click', quksh());
function quksh() {
  // swal('Hello world!');
  alert('feasfaeseasfesfs');
}
