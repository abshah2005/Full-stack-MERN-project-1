import { asynchandler } from "../utils/Asynchandler.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import { Apierror } from "../utils/Apierror.js";

import { Orders } from "../models/Orders.js";

import { updateProductStock } from "../utils/Instockupdate.util.js";
// import { sendConfrimationEmail } from "../utils/Nodemailer.js";

const postOrder = asynchandler(async (req, res) => {
  const { user, orders, total, status, paymentMethod, userinfo, SellerId } =
    req.body;

  // const order = await Orders.create({
  //   user,
  //   orders,
  //   total,
  //   status,
  //   paymentMethod,
  //   userinfo,
  //   SellerId,
  // });
  // if (!order) {
  //   throw new Apierror(400, "Order not placed");
  // }

  // for(const orderItem of orders){
  //    await updateProductStock(orderItem.productId,orderItem.quantity);
  // }

  // res
  //   .status(201)
  //   .json(new Apiresponse(200, order, "Order Placed Successfully"));

  try {
    const order = await Orders.create({
      user,
      orders,
      total,
      status,
      paymentMethod,
      userinfo,
      SellerId,
    });

    if (!order) {
      throw new Apierror(400, "Order not placed");
    }

    for (const orderItem of orders) {
      await updateProductStock(orderItem.productId, orderItem.quantity);
    }
    res
      .status(201)
      .json(new Apiresponse(200, order, "Order Placed Successfully"));
  } catch (error) {
    console.log(error);
    console.log(error.message);
    throw new Apierror(500, "Internal Server Error");
  }
});

const getOrders = asynchandler(async (req, res) => {
  const orders = await Orders.find();
  if (!orders) {
    throw new Apierror(400, "Orders not fetched successfully");
  }
  res
    .status(200)
    .json(new Apiresponse(200, orders, "Orders Fetched Successfully"));
});

const getOrdersByUserId = asynchandler(async (req, res) => {
  const { id } = req.params; // Assuming userId is provided in the request body
  const orders = await Orders.find({ user: id }).populate(
    "userinfo",
    "username email"
  );
  if (!orders) {
    throw new Apierror(404, "Orders not found for this user");
  }
  res
    .status(200)
    .json(new Apiresponse(200, orders, "Orders Fetched Successfully"));
});

const getOrderById = asynchandler(async (req, res) => {
  const { orderId } = req.body;
  const order = await Orders.findById(orderId).populate(
    "userinfo",
    "username email"
  );
  if (!order) {
    throw new Apierror(404, "Order not found");
  }
  res
    .status(200)
    .json(new Apiresponse(200, order, "Order Fetched Successfully"));
});

const updateOrderStatus = asynchandler(async (req, res) => {
  const {id} = req.params;
  const {status}=req.body;

  const order=await Orders.findById(id);
  if(!order){
    throw new Apierror(404,"Order not found");
  }
  order.status=status;
  await order.save({validateBeforeSave:false});
  res
    .status(200)
    .json(
      new Apiresponse(200, order, "Order Status Updated Successfully")
    );
});

const deleteOrder = asynchandler(async (req, res) => {
  const { orderId } = req.params;
  const deletedOrder = await Orders.findByIdAndDelete(orderId);
  if (!deletedOrder) {
    throw new Apierror(404, "Order not found");
  }
  res
    .status(200)
    .json(new Apiresponse(200, deletedOrder, "Order Deleted Successfully"));
});

export {
  postOrder,
  getOrderById,
  getOrdersByUserId,
  updateOrderStatus,
  deleteOrder,
  getOrders,
};
