import { asynchandler } from "../utils/Asynchandler.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import { Apierror } from "../utils/Apierror.js";
import { Category } from "../models/Category.model.js";
import { uploadonCloudinary } from "../utils/Fileupload.js";

const postCategories = asynchandler(async (req, res) => {
  const { name } = req.body;

  if (!req.files || !req.files.pic || !req.files.pic[0]) {
    throw new Apierror(400, "No file uploaded");
  }

  const filepath = req.files.pic[0].path;
  const pic = await uploadonCloudinary(filepath);

  if (!pic || !pic.url) {
    throw new Apierror(400, "File not uploaded to Cloudinary");
  }

  const fileurl = pic.url;

  const category = await Category.create({
    name: name,
    pic: fileurl,
  });

  if (!category) {
    throw new Apierror(400, "Category couldn't be created");
  }

  return res
    .status(201)
    .json(new Apiresponse(201, category, "Category is Created"));
});

const getCategories = asynchandler(async (req, res) => {
  const categories = await Category.find({});

  if (!categories || categories.length === 0) {
    throw new Apierror(404, "No categories found");
  }
  console.log(categories);
  return res.status(200).json(new Apiresponse(200, categories, "Categories fetched successfully"));
});

const getCategoryById = asynchandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);
  if (!category) {
    throw new Apierror(404, "Category not found");
  }

  return res
    .status(200)
    .json(new Apiresponse(200, category, "Category Fetched Successfully"));
});

const updateCategory = asynchandler(async (req, res) => {
  const { id } = req.params; // Corrected destructuring to get id from req.params
  const { name } = req.body;

  if (!id) {
    throw new Apierror(400, "Category ID is required for update");
  }

  let updateData = { name };

  if (req.files && req.files.pic && req.files.pic[0]) {
    const filepath = req.files.pic[0].path;
    const pic = await uploadonCloudinary(filepath);

    if (!pic || !pic.url) {
      throw new Apierror(400, "File not uploaded to Cloudinary");
    }

    updateData.pic = pic.url;
  }

  const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedCategory) {
    throw new Apierror(404, "Category not found");
  }

  return res
    .status(200)
    .json(new Apiresponse(200, updatedCategory, "Category updated successfully"));
});

const deleteCategory = asynchandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new Apierror(400, "Category ID is required for deletion");
  }

  const deletedCategory = await Category.findByIdAndDelete(id);

  if (!deletedCategory) {
    throw new Apierror(404, "Category not found");
  }

  return res
    .status(200)
    .json(new Apiresponse(200, deletedCategory, "Category deleted successfully"));
});


export { postCategories, getCategories, getCategoryById,updateCategory,deleteCategory };
