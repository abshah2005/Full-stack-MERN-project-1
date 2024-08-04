import mongoose, { Schema } from "mongoose";

const OrderItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  SellerId:{
    type: Schema.Types.ObjectId,
    ref:"Sellers"
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  pic: {
    type: String,
    required: true
  }
});

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true
  },
  orders: [OrderItemSchema],
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Delivered", "Cancelled"],
    default: "Pending"
  },
  paymentMethod: {
    type: String,
    required: true
  },
  userinfo: {
    type: Object,
    required: true
  }
}, { timestamps: true });

export const Orders = mongoose.model("Orders", OrderSchema);





// {
//   "user": "668f8f51deb93bc899f4599a",
//   "orders": [
//       {
//           "productId": "669cd4579fbb0e6128b11c4d",
//           "name": "Bed test",
//           "price": "1000000",
//           "quantity": 2,
//           "pic": "http://res.cloudinary.com/dvmccihlf/image/upload/v1721553699/dmq7wpyf21iboganmfyn.avif"
//       }
//   ],
//   "total": "2000000.00",
//   "status": "Pending",
//   "paymentMethod": "Cash on Delivery",
//   "userinfo": {
//       "name": "abdullah",
//       "email": "abdullah03350904415@gmail.com",
//       "phone": "03174213756",
//       "country": "Pakistan",
//       "city": "lahore",
//       "address": "house no 47A street 18 walton railway officers colony Lahore",
//       "postalCode": "123456",
//       "permanentAddress": "house no 47A street 18 walton railway officers colony Lahore",
//       "shippingAddress": "house no 47A street 18 walton railway officers colony Lahore"
//   }
// }

  