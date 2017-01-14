'use strict';
let Item = require('../models/item');
let console = require('console');

function handleError(res, err) {
    return res.send(500, err);
}

module.exports = {
    addItem: function (req, res) {
        let item = new Item(req.body);
        item.save(req.body, (err, data) => {
            if (err) {
                console.log(err);
                res.send(err.message);
            }
            res.send(data);
        });
    },
    getItems: function (req, res) {
        Item.find({}).sort({
            create: -1
        }).exec((err, items) => {

            if (err) {
                return handleError(res, err);
            }
            if (!items) {
                console.log("falskfjlasf");
                return res.send(404);
            }
            //console.log(" coming stores ", items);
            return res.send(items);
        });
    }
};
