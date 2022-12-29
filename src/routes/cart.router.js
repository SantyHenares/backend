import express from "express";

const cartRouter = express.Router();

cartRouter.get("/", async (req, res) => {
    try {
      const carts = await cartFileManager.getAll();
      res.send(carts);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  cartRouter.post("/", async (req, res) => {
    const newCart = {
      id: v4(),
      products: [],
    };
  
    try {
      const carts = await cartFileManager.getAll();
      await cartFileManager.writeAll([...carts, newCart]);
      res.send(newCart);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

export default cartRouter;