export const getHome = (req, res) => {
  res.render("home", {});
};

export const getRealTimeProducts = (req, res) => {
  res.render("realTimeProducts", {});
};

export const getRenderProducts = (req, res) => {
  res.render("products", {});
};

export const getRenderCartId = (req, res) => {
  res.render("carts", {});
};

export const getRenderMocking = (req, res) => {
  res.render("mockingproducts", {});
};
