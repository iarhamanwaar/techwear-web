var Cart = require("../models/cart");
var CartItem = require("../models/cartitem");
var Product = require("../models/product");
var User = require("../models/user");

exports.get = function (req, res) {
  var cartId = req.user.cartId;

  try {
    findCart({ cartId: cartId, promoCode: promoCode }).then(function (cart) {
      if (cart.status == StatusCodes.BadRequest) {
        return response({
          res: res,
          error: true,
          message: cart.message,
          status: StatusCodes.BadRequest,
        });
      } else {
        response({ res: res, data: cart });
      }
    });
  } catch (error) {
    response({ res: res, error: error });
  }
};

exports.update = async function (req, res) {
  try {
    var productId = req.body.productId;
    var type = req.body.type;
    var email = req.body.email;

    var user = await User.findOne({ where: { email: email } });

    var cartId = user.cartId;

    if (productId && type) {
      CartItem.findOne({
        where: { cartId: cartId, productId: productId },
      }).then(async function (cartItem) {
        if (!cartItem) {
          if (type === "add") {
            CartItem.create({
              cartId: cartId,
              productId: productId,
              quantity: 1,
            }).then(function (cartItem) {
              if (cartItem && cartItem.message)
                return res.status(200).json({
                  message: cartItem.message,
                });
            });
          } else if (type === "delete") {
            var deleteQuery = { cartId: cartId, productId: productId };

            CartItem.destroy({
              where: deleteQuery,
            }).then(function (deleteItem) {
              if (deleteItem === 0) {
                return res.status(400).json({
                  message: "Item not found",
                });
              }
            });
          } else {
            return res.status(400).json({
              message: "Item not found",
            });
          }
        } else {
          handleExistingCartItem({
            res: res,
            cartId: cartId,
            type: type,
            cartItem: cartItem,
          }).then(function (existingCart) {
            if (existingCart === "empty") {
              return res.status(200).json({
                message: "Cart is empty",
                data: {
                  total: 0,
                  CartItems: [],
                },
              });
            }
          });
        }
      });
    }

    findCart({ cartId: cartId }).then(function (cart) {
      if (cart.status == 400) {
        return res.status(400).json({
          message: cart.message,
        });
      } else {
        Cart.update(
          {
            total: cart.total,
          },
          { where: { id: cartId } }
        ).then(function () {
          return res.status(200).json({
            message: cart.message,
            data: cart,
          });
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Bad request",
    });
  }
};

async function handleExistingCartItem(options) {
  var cartId = options.cartId;
  var type = options.type;
  var cartItem = options.cartItem;

  if (type === "add") {
    cartItem.quantity++;
    return await cartItem.save();
  } else if (type === "remove" && cartItem.quantity > 1) {
    cartItem.quantity--;
    return await cartItem.save();
  } else if (type === "delete") {
    return cartItem.destroy().then(async function () {
      return CartItem.findAll({
        where: { cartId: cartId },
        raw: true,
      }).then(function (remainingCartItems) {
        if (remainingCartItems.length < 1) {
          return Cart.update(
            {
              total: 0,
            },
            { where: { id: cartId } }
          ).then(function () {
            return "empty";
          });
        }
      });
    });
  }
}

function findCart(options) {
  var cartId = options.cartId;

  return Cart.findByPk(cartId, {
    include: [
      {
        model: CartItem,
        include: [
          {
            model: Product,
          },
        ],
      },
    ],
  }).then(function (cart) {
    if (!cart || (cart.CartItems && cart.CartItems.length === 0)) {
      return {
        data: {
          id: cartId,
          total: 0,
          CartItems: [],
        },
      };
    }

    cart = cart.toJSON();

    var total = 0;

    cart.CartItems.forEach(function (cartItem) {
      cartItem.name = cartItem.Product.name;
      cartItem.description = cartItem.Product.description;
      cartItem.price = parseFloat(
        (cartItem.quantity * cartItem.Product.price).toFixed(3)
      );

      delete cartItem.Product;
      total += cartItem.price;
    });

    cart.total = total;

    return cart;
  });
}

exports.getCartById = function (cartId) {
  try {
    findCart({ cartId: cartId }).then(function (cart) {
      if (cart.status == 400) {
        return {
          message: "Bad request",
        };
      } else {
        return {
          message: "Cart found",
          data: cart,
        };
      }
    });
  } catch (error) {
    return {
      message: "Bad request",
    };
  }
};
