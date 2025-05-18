const cloudinary = require("cloudinary").v2;

const fs = require("fs");

cloudinary.config({
  cloud_name: "djgoho3ih",
  api_key: "464528714531576",
  api_secret: "SkKZUjSCunuyojD8NyORpqpCdrc",
});

const uploadCloudinary = async (localFilepath) => {
  try {
    if (!localFilepath) throw "No file path provided";

    console.log(localFilepath);

    const response = await cloudinary.uploader.upload(localFilepath, {
      resource_type: "image",
    });

    // console.log(response );

    return response;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  uploadCloudinary,
};
