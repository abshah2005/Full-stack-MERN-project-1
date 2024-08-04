import { Products } from "../models/Products.model.js";
import { Apierror } from "./Apierror.js";

export const updateProductStock = async (productId, quantity) => {
  // Find the product and ensure it exists
  const product = await Products.findById(productId);
  if (!product) {
    throw new Apierror(400, "Product not found");
  }

  // Ensure there is enough stock
  if (product.quantity < quantity) {
    throw new Apierror(400, "Insufficient stock");
  }

  // Calculate the new quantity
  const newQuantity = product.quantity - quantity;

  // Update the product with the new quantity and set instock based on the new quantity
  const result = await Products.updateOne(
    { _id: productId, quantity: { $gte: quantity } },
    {
      $set: {
        quantity: newQuantity,
        instock: newQuantity > 0,
      },
    }
  );

  if (result.modifiedCount === 0) {
    throw new Apierror(400, "Failed to update stock");
  }
};
