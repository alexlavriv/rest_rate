let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let gallerySchema = new Schema({
  tag: String,
  photos: [{
    id: String,
    owner: String,
    secret: String,
    server: String,
    farm: Number,
    title: String,
    ispublic: Boolean,
    isfriend: Boolean,
    isfamily: Boolean
  }]
});

module.exports = mongoose.model('GalleryModel', gallerySchema);
