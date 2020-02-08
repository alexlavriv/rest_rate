let axios = require('axios');
let GalleryModel = require('../model/gallery');

async function getImages(tag) {
  const getImagesUrl = `services/rest/?method=flickr.photos.search&api_key=522c1f9009ca3609bcbaf08545f067ad&tags=${tag}&tag_mode=any&per_page=100&format=json&safe_search=1&nojsoncallback=1`;
  const baseUrl = 'https://api.flickr.com/';
  return await axios({
    url: getImagesUrl,
    baseURL: baseUrl,
    method: 'GET'
  })
}

module.exports = (app) => {
    app.post('/api/load/images', function (req, res) {
        console.log('in load images');
        GalleryModel
            .findOne({tag: req.body.tag})
            .then(doc => {
                if (doc != null) {
                    console.log('tag found=', req.body.tag);
                    res.json(doc.photos);
                } else {
                    console.log('new tag=', req.body.tag);
                    getImages(req.body.tag)
                        .then(e => e.data)
                        .then(e => {
                            if (
                                e &&
                                e.photos &&
                                e.photos.photo &&
                                e.photos.photo.length > 0
                            ) {
                                let gallery = new GalleryModel({tag: req.body.tag, photos: e.photos.photo});
                                gallery
                                    .save(gallery)
                                    .then(() => {
                                        res.json(gallery);
                                        res.end();
                                    })
                            }
                        });

                }
            })
    });
};
