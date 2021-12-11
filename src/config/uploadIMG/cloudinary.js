const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_ID,
    api_secret: process.env.API_SECRET
});

exports.uploadIMG = (file,path) => {
    return cloudinary.v2.uploader.upload(file,{
        folder: path,
    });
}

exports.updateIMG = async(file, IMG_ID,path) => {
    await cloudinary.v2.uploader.destroy(IMG_ID);
    return cloudinary.v2.uploader.upload(file,{
        folder: path,
    });
}
exports.deleteIMG =  async(IMG_ID) => {
    await cloudinary.v2.uploader.destroy(IMG_ID);
}

