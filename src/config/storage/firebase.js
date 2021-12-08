const admin = require('firebase-admin')

// Initialize firebase admin SDK
var serviceAccount = require("./../../../firebase.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.MY_BUCKET ,
});
// Cloud storage
const bucket = admin.storage().bucket()
module.exports = {
    bucket
}