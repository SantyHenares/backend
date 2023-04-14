import productModel from "../dao/models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    let products = await productModel.find();
    const limit = req.query.limit;
    let limitedProducts;
    if (limit) {
      limitedProducts = products.slice(0, limit);
    }
    res.send(limitedProducts || products);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getProductsId = async (req, res) => {
  const pid = req.params.pid;
  try {
    const product = await productModel.findOne({ _id: pid });
    if (!product) {
      res.status(404).send("Producto no encontrado");
      return;
    }
    res.send({
      status: "success",
      payload: product,
      totalPages: 1,
      prevPage: 1,
      nextPage: 1,
      page: 1,
      hasPrevPage: false,
      hasNextPage: false,
      prevLink: null,
      nextLink: null,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const postProducts = async (req, res) => {
  const newProduct = req.body;
  try {
    const result = await productModel.insertMany(newProduct);
    res.send({ status: "success", payload: result });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const putProducts = async (req, res) => {
  const { pid } = req.params;
  const updateProduct = req.body;

  try {
    const result = await productModel.updateOne({ _id: pid }, updateProduct);
    res.send({ status: "success", payload: result });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const deleteProducts = async (req, res) => {
  const pid = req.params;
  try {
    const result = await productModel.deleteOne({ _id: pid });
    res.send({ status: "success", payload: result });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
