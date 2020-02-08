let AppModel = require('../model/app');

let _handleError = function(err){
    if (err) return console.log(err);
};

module.exports = (app) => {
    app.get('/api/load/tags', function(req, res) {
        console.log('app.get/api/load/tags');
        AppModel
            .findOne()
            .then(doc => {
                res.json(doc.tags);
                res.end();
            });

    });
    app.post('/api/load/images', function(req, res, next) {
        console.log('updating tag array');
        AppModel
            .findOne()
            .then(doc => {
                if (doc === null) {
                    let newDoc = new AppModel();
                    newDoc.tags.push(req.body.tag);
                    newDoc.save(_handleError);
                }else if (!doc.tags.includes(req.body.tag)) {
                        doc.tags.push(req.body.tag);
                        doc.save(_handleError);
                    }
            });
        next();
    });
};
