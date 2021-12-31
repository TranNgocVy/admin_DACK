const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_ID,
  api_secret: process.env.API_SECRET,
});

exports.uploadIMG = (file, path) => {
  const today = new Date(Date.now());
  return cloudinary.v2.uploader.upload(file, {
    folder: path,
    filename: today.toUTCString(),
  });
};
exports.deleteIMG = async (path) => {
  return await cloudinary.v2.uploader.destroy(path, { resource_type: 'image' });
};
