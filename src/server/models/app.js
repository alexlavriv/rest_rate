let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let appSchema = new Schema({
    tags: [String]
});

module.exports = mongoose.model('AppModel', appSchema);
