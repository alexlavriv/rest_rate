let mongoose = require('mongoose');
let Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

let appSchema = new Schema({
    tags: [String]
});

module.exports = mongoose.model('AppModel', appSchema);
