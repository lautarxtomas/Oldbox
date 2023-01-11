import slugify from "slugify";
import Product from "../models/product.js";
import fs from "fs";

export const create = async (req, res) => {
  try {
    // console.log(req.fields) // los campos que están en Body -> form-data
    // console.log(req.files)
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // validation
    switch (
      true // se puede hacer con switch o con if como en las validaciones de los otros controllers
    ) {
      case !name.trim(): // se puede dejar el trim (para sacar espacios de los costados) o dejarlo sin, se va a validar igual.
        res.json({ error: "Name is required" });
      case !description.trim():
        res.json({ error: "Description is required" });
      case !price.trim():
        res.json({ error: "Price is required" });
      case !category.trim():
        res.json({ error: "Category is required" });
      case !quantity.trim():
        res.json({ error: "Quantity is required" });
      case !shipping.trim():
        res.json({ error: "Shipping is required" });
      case photo && photo.size > 1000000:
        res.json({ error: "Image should be less than 1mb in size" });
    }

    // create product
    const product = new Product({ ...req.fields, slug: slugify(name) });

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    res.json({ added_product: product });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const getAll = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .select("-photo") // muestra todo MENOS LA FOTO
      .limit(12)
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    res.json(product);
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

// GET PHOTO FROM PRODUCT
export const photo = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).select(
      "photo"
    );
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.send(product.photo.data);
    }
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

export const remove = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(
      req.params.productId
    ).select("-photo");
    res.json({ deleted_product: product });
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

export const update = async (req, res) => {
  try {
    // console.log(req.fields) // los campos que están en Body -> form-data
    // console.log(req.files)
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // validation
    switch (
      true // se puede hacer con switch o con if como en las validaciones de los otros controllers
    ) {
      case !name.trim(): // se puede dejar el trim (para sacar espacios de los costados) o dejarlo sin, se va a validar igual.
        res.json({ error: "Name is required" });
      case !description.trim():
        res.json({ error: "Description is required" });
      case !price.trim():
        res.json({ error: "Price is required" });
      case !category.trim():
        res.json({ error: "Category is required" });
      case !quantity.trim():
        res.json({ error: "Quantity is required" });
      case !shipping.trim():
        res.json({ error: "Shipping is required" });
      case photo && photo.size > 1000000:
        res.json({ error: "Image should be less than 1mb in size" });
    }

    // update product
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    } // SOLO MODIFICA LA FOTO SI LA RECIBE

    await product.save();
    res.json({ updated_product: product });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};
